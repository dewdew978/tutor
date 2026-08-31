import { supabase } from "./supabase";
import { CourseItem, CategoryItem, TutorProfile, StudentReview, ChapterItem, LessonItem, AttachmentItem } from "./types";

/**
 * Fetch all published courses from Supabase (for public storefront)
 */
export async function getPublishedCourses(): Promise<CourseItem[]> {
  try {
    const { data: coursesData, error: coursesError } = await supabase
      .from("Course")
      .select(`
        *,
        category:Category(name, slug),
        instructor:User(id, name, image, headline, bio, isVerifiedTutor),
        chapters:Chapter(
          id,
          title,
          order,
          lessons:Lesson(
            id,
            title,
            description,
            videoDuration,
            videoUrl,
            isFreePreview,
            order,
            attachments:Attachment(id, name, fileUrl, fileType, fileSize)
          )
        ),
        reviews:Review(rating)
      `)
      .eq("status", "PUBLISHED")
      .order("createdAt", { ascending: false });

    if (coursesError || !coursesData) {
      console.error("Error fetching published courses:", coursesError);
      return [];
    }

    return coursesData.map(mapDatabaseCourseToCourseItem);
  } catch (err) {
    console.error("Unexpected error fetching courses:", err);
    return [];
  }
}

/**
 * Fetch all courses including draft, archived and closed for Admin
 */
export async function getAllAdminCourses(): Promise<CourseItem[]> {
  try {
    const { data: coursesData, error: coursesError } = await supabase
      .from("Course")
      .select(`
        *,
        category:Category(name, slug),
        instructor:User(id, name, image, headline, bio, isVerifiedTutor),
        chapters:Chapter(
          id,
          title,
          order,
          lessons:Lesson(
            id,
            title,
            description,
            videoDuration,
            videoUrl,
            isFreePreview,
            order,
            attachments:Attachment(id, name, fileUrl, fileType, fileSize)
          )
        ),
        reviews:Review(rating)
      `)
      .order("createdAt", { ascending: false });

    if (coursesError || !coursesData) {
      console.error("Error fetching admin courses:", coursesError);
      return [];
    }

    return coursesData.map(mapDatabaseCourseToCourseItem);
  } catch (err) {
    console.error("Unexpected error fetching admin courses:", err);
    return [];
  }
}

/**
 * Update course status (PUBLISHED, DRAFT, ARCHIVED, CLOSED)
 */
export async function updateCourseStatus(
  courseId: string,
  status: "PUBLISHED" | "DRAFT" | "ARCHIVED" | "CLOSED"
): Promise<{ success: boolean; error?: any }> {
  try {
    const { error } = await supabase
      .from("Course")
      .update({ status, updatedAt: new Date().toISOString() })
      .eq("id", courseId);

    if (error) {
      console.error("Error updating course status:", error);
      return { success: false, error };
    }
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}

/**
 * Delete a course permanently
 */
export async function deleteCourse(courseId: string): Promise<{ success: boolean; error?: any }> {
  try {
    const { error } = await supabase
      .from("Course")
      .delete()
      .eq("id", courseId);

    if (error) {
      console.error("Error deleting course:", error);
      return { success: false, error };
    }
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}

/**
 * Fetch single course by its slug from Supabase
 */
export async function getCourseBySlug(slug: string): Promise<CourseItem | null> {
  try {
    const { data, error } = await supabase
      .from("Course")
      .select(`
        *,
        category:Category(name, slug),
        instructor:User(id, name, image, headline, bio, isVerifiedTutor),
        chapters:Chapter(
          id,
          title,
          order,
          lessons:Lesson(
            id,
            title,
            description,
            videoDuration,
            videoUrl,
            isFreePreview,
            order,
            attachments:Attachment(id, name, fileUrl, fileType, fileSize)
          )
        ),
        reviews:Review(id, rating, comment, user:User(name, image))
      `)
      .eq("slug", slug)
      .single();

    if (error || !data) {
      console.error("Error fetching course by slug:", error);
      return null;
    }

    return mapDatabaseCourseToCourseItem(data);
  } catch (err) {
    console.error("Unexpected error fetching course by slug:", err);
    return null;
  }
}

/**
 * Fetch all categories from Supabase
 */
export async function getCategories(): Promise<CategoryItem[]> {
  try {
    const { data, error } = await supabase
      .from("Category")
      .select("*")
      .order("name", { ascending: true });

    if (error || !data) {
      console.error("Error fetching categories:", error);
      return [
        { id: "all", name: "คอร์สทั้งหมด", slug: "all" },
      ];
    }

    const categoriesList: CategoryItem[] = [
      { id: "all", name: "คอร์สทั้งหมด", slug: "all" },
      ...data.map((c: any) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        icon: c.icon,
        description: c.description,
      })),
    ];

    return categoriesList;
  } catch (err) {
    console.error("Unexpected error fetching categories:", err);
    return [{ id: "all", name: "คอร์สทั้งหมด", slug: "all" }];
  }
}

/**
 * Fetch main tutor profile from Supabase
 */
export async function getMainTutor(): Promise<TutorProfile> {
  try {
    const { data, error } = await supabase
      .from("User")
      .select("*")
      .eq("role", "INSTRUCTOR")
      .limit(1)
      .single();

    const { count: courseCount } = await supabase
      .from("Course")
      .select("*", { count: "exact", head: true })
      .eq("status", "PUBLISHED");

    const { count: studentCount } = await supabase
      .from("Enrollment")
      .select("*", { count: "exact", head: true });

    if (error || !data) {
      return {
        id: "tutor-ptoh",
        name: "พี่โต๋ (P'Toh)",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
        headline: "เกียรตินิยมอันดับ 1 • ผู้เชี่ยวชาญคณิตศาสตร์ & ฟิสิกส์ ม.ปลาย",
        bio: "ประสบการณ์สอนกวดวิชากว่า 10 ปี เน้นสอนจากความเข้าใจใน Concept ลึกซึ้ง ลุยโจทย์ข้อสอบแข่งขันจริง",
        rating: 5.0,
        totalStudents: studentCount || 0,
        totalCourses: courseCount || 0,
        isVerified: true,
        subjects: ["คณิตศาสตร์ ม.ปลาย", "A-Level Math 1", "ฟิสิกส์ ม.ปลาย"],
        education: ["ปริญญาตรี เกียรตินิยมอันดับ 1", "เหรียญรางวัล โอลิมปิกวิชาการ"],
        achievements: ["ติวเตอร์ยอดนิยม", "ดูแลและตอบคำถามนักเรียนด้วยตัวเอง 100%"],
      };
    }

    return {
      id: data.id,
      name: data.name,
      avatar: data.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
      headline: data.headline || "เกียรตินิยมอันดับ 1 • ผู้เชี่ยวชาญคณิตศาสตร์ & ฟิสิกส์ ม.ปลาย",
      bio: data.bio || "ประสบการณ์สอนกวดวิชากว่า 10 ปี เน้นสอนจากความเข้าใจใน Concept ลึกซึ้ง",
      rating: 5.0,
      totalStudents: studentCount || 0,
      totalCourses: courseCount || 0,
      isVerified: Boolean(data.isVerifiedTutor),
      subjects: ["คณิตศาสตร์ ม.ปลาย", "A-Level Math 1", "ฟิสิกส์ ม.ปลาย"],
      education: ["ปริญญาตรี เกียรตินิยมอันดับ 1", "เหรียญรางวัล โอลิมปิกวิชาการ"],
      achievements: ["ติวเตอร์ยอดนิยม", "ดูแลและตอบคำถามนักเรียนด้วยตัวเอง 100%"],
    };
  } catch (err) {
    return {
      id: "tutor-ptoh",
      name: "พี่โต๋ (P'Toh)",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
      headline: "เกียรตินิยมอันดับ 1 • ผู้เชี่ยวชาญคณิตศาสตร์ & ฟิสิกส์ ม.ปลาย",
      bio: "ประสบการณ์สอนกวดวิชากว่า 10 ปี เน้นสอนจากความเข้าใจใน Concept ลึกซึ้ง",
      rating: 5.0,
      totalStudents: 0,
      totalCourses: 0,
      isVerified: true,
      subjects: ["คณิตศาสตร์ ม.ปลาย", "A-Level Math 1", "ฟิสิกส์ ม.ปลาย"],
      education: ["ปริญญาตรี เกียรตินิยมอันดับ 1", "เหรียญรางวัล โอลิมปิกวิชาการ"],
      achievements: ["ติวเตอร์ยอดนิยม", "ดูแลและตอบคำถามนักเรียนด้วยตัวเอง 100%"],
    };
  }
}

/**
 * Enroll a user into a course (Writes to Supabase and syncs local storage)
 */
export async function enrollStudentInCourse(
  userId: string,
  userEmail: string,
  userName: string,
  courseId: string,
  courseSlug: string,
  amountPaid: number = 0
): Promise<{ success: boolean; error?: string }> {
  if (!userId || !courseId) return { success: false, error: "Missing parameters" };

  try {
    // 1. Store in localStorage for instant, bulletproof persistence
    if (typeof window !== "undefined") {
      const storageKey = `tutor_enrolled_courses_${userId}`;
      const existing: string[] = JSON.parse(localStorage.getItem(storageKey) || "[]");
      if (!existing.includes(courseId)) existing.push(courseId);
      if (courseSlug && !existing.includes(courseSlug)) existing.push(courseSlug);
      localStorage.setItem(storageKey, JSON.stringify(existing));
    }

    // 2. Ensure User exists in public.User table to avoid foreign key errors
    try {
      await supabase.from("User").upsert(
        {
          id: userId,
          email: userEmail || `${userId}@student.ptoh`,
          name: userName || userEmail?.split("@")[0] || "นักเรียน",
          role: "STUDENT",
        },
        { onConflict: "id" }
      );
    } catch (userErr) {
      console.warn("User upsert warning:", userErr);
    }

    // 3. Insert into Supabase Enrollment table
    try {
      const { data: existing } = await supabase
        .from("Enrollment")
        .select("id")
        .eq("userId", userId)
        .eq("courseId", courseId)
        .maybeSingle();

      if (!existing) {
        const payload: any = {
          userId: userId,
          courseId: courseId,
          amountPaid: amountPaid,
          currency: "THB",
          paymentMethod: "PROMPTPAY",
          paymentStatus: "COMPLETED",
        };
        if (typeof crypto !== "undefined" && crypto.randomUUID) {
          payload.id = crypto.randomUUID();
        }

        await supabase.from("Enrollment").insert(payload);
      }
    } catch (enrollErr) {
      console.warn("Supabase enrollment insert warning:", enrollErr);
    }

    return { success: true };
  } catch (err: any) {
    console.error("Error in enrollStudentInCourse:", err);
    return { success: false, error: err.message };
  }
}

/**
 * Fetch courses that a specific student is enrolled in
 */
export async function getStudentEnrolledCourses(userId: string): Promise<any[]> {
  if (!userId) return [];

  // 1. Read locally stored enrolled course IDs/slugs
  let localIds: string[] = [];
  try {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`tutor_enrolled_courses_${userId}`);
      if (saved) {
        localIds = JSON.parse(saved);
      }
    }
  } catch (e) {
    console.error("Error reading local enrollments:", e);
  }

  // 2. Query Supabase Enrollment table
  let dbCourseIds: string[] = [];
  try {
    const { data: enrollments, error } = await supabase
      .from("Enrollment")
      .select("courseId")
      .eq("userId", userId);

    if (!error && enrollments) {
      dbCourseIds = enrollments.map((e: any) => e.courseId).filter(Boolean);
    }
  } catch (err) {
    console.warn("Error querying Supabase enrollments:", err);
  }

  const allTargetIds = Array.from(new Set([...localIds, ...dbCourseIds]));
  if (allTargetIds.length === 0) {
    return [];
  }

  // 3. Fetch all courses and filter to only the enrolled ones
  try {
    const allCourses = await getAllAdminCourses();
    const enrolled = allCourses.filter((c) => 
      allTargetIds.includes(c.id) || allTargetIds.includes(c.slug)
    );

    return enrolled.map((courseItem) => ({
      course: courseItem,
      progressPercent: 0,
      completedLessons: 0,
      totalLessons: courseItem.totalLessons,
      lastLessonTitle: courseItem.chapters[0]?.lessons[0]?.title || "บทเรียนเริ่มต้น",
      lastLessonId: courseItem.chapters[0]?.lessons[0]?.id || "",
      lastWatchedDate: "ล่าสุด",
      totalStudyHours: 0,
    }));
  } catch (err) {
    console.error("Error fetching courses for enrollments:", err);
    return [];
  }
}

/**
 * Fetch orders/enrollments for instructor dashboard
 */
export async function getInstructorOrders(): Promise<any[]> {
  try {
    const { data, error } = await supabase
      .from("Enrollment")
      .select(`
        id,
        createdAt,
        user:User(name, email, image),
        course:Course(title, price)
      `)
      .order("createdAt", { ascending: false })
      .limit(20);

    if (error || !data || data.length === 0) {
      return [];
    }

    return data.map((e: any) => ({
      id: e.id || `ORD-${Date.now()}`,
      studentName: e.user?.name || "นักเรียน",
      studentEmail: e.user?.email || "student@ptoh.edu",
      avatar: e.user?.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
      courseTitle: e.course?.title || "คอร์สเรียนออนไลน์",
      amount: Number(e.course?.price) || 2490,
      paymentMethod: "PromptPay QR",
      date: new Date(e.createdAt).toLocaleDateString("th-TH"),
      status: "COMPLETED",
    }));
  } catch {
    return [];
  }
}

/**
 * Fetch Q&A messages for instructor
 */
export async function getInstructorQuestions(): Promise<any[]> {
  try {
    const { data, error } = await supabase
      .from("Question")
      .select(`
        id,
        question,
        createdAt,
        user:User(name),
        course:Course(title),
        answers:Answer(id, content, createdAt)
      `)
      .order("createdAt", { ascending: false })
      .limit(20);

    if (error || !data || data.length === 0) {
      return [];
    }

    return data.map((q: any) => ({
      id: q.id,
      studentName: q.user?.name || "นักเรียน",
      courseTitle: q.course?.title || "คอร์สเรียนออนไลน์",
      lessonTitle: "บทเรียนออนไลน์",
      question: q.question,
      status: q.answers && q.answers.length > 0 ? "ANSWERED" : "PENDING",
      reply: q.answers && q.answers.length > 0 ? q.answers[0].content : "",
    }));
  } catch {
    return [];
  }
}

/**
 * Fetch reviews from Supabase
 */
export async function getStudentReviews(): Promise<StudentReview[]> {
  try {
    const { data, error } = await supabase
      .from("Review")
      .select(`
        id,
        rating,
        comment,
        user:User(name, image, headline)
      `)
      .order("createdAt", { ascending: false })
      .limit(10);

    if (error || !data || data.length === 0) {
      return [];
    }

    return data.map((r: any) => ({
      id: r.id,
      studentName: r.user?.name || "นักเรียน",
      school: "โรงเรียนเตรียมอุดมศึกษา",
      faculty: r.user?.headline || "สอบติดมหาวิทยาลัยชั้นนำ",
      score: "A-Level คะแนนระดับท็อป",
      comment: r.comment || "สอนเข้าใจง่ายมากครับ",
      avatar: r.user?.image || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    }));
  } catch {
    return [];
  }
}

/**
 * Fetch tutor applications for instructor
 */
export async function getTutorApplications(): Promise<any[]> {
  try {
    const { data, error } = await supabase
      .from("TutorApplication")
      .select("*")
      .order("createdAt", { ascending: false })
      .limit(20);

    if (error || !data || data.length === 0) {
      return [];
    }

    return data.map((a: any) => ({
      id: a.id,
      name: a.name,
      email: a.email,
      subject: a.subjects || a.subject || "วิชาการ ม.ปลาย",
      education: a.education || "ปริญญาตรี",
      date: new Date(a.createdAt).toLocaleDateString("th-TH"),
      status: a.status || "PENDING",
    }));
  } catch {
    return [];
  }
}

/**
 * Mapper helper to format Supabase query response into CourseItem
 */
function mapDatabaseCourseToCourseItem(row: any): CourseItem {
  // Sort chapters
  const sortedChapters: ChapterItem[] = (row.chapters || [])
    .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
    .map((ch: any) => {
      const sortedLessons: LessonItem[] = (ch.lessons || [])
        .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
        .map((les: any) => ({
          id: les.id,
          title: les.title,
          description: les.description || "",
          durationSeconds: les.videoDuration || 0,
          videoUrl: les.videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          isFreePreview: Boolean(les.isFreePreview),
          attachments: (les.attachments || []).map((att: any): AttachmentItem => ({
            id: att.id,
            title: att.name,
            fileSize: att.fileSize ? `${(att.fileSize / 1000000).toFixed(1)} MB` : "3.5 MB",
            fileType: att.fileType || "application/pdf",
            downloadUrl: att.fileUrl,
          })),
        }));

      return {
        id: ch.id,
        title: ch.title,
        lessons: sortedLessons,
      };
    });

  const totalLessons = sortedChapters.reduce((acc, ch) => acc + ch.lessons.length, 0);
  const totalSeconds = sortedChapters.reduce(
    (acc, ch) => acc + ch.lessons.reduce((lAcc, l) => lAcc + (l.durationSeconds || 0), 0),
    0
  );

  let parsedWhatYouWillLearn: string[] = [];
  try {
    parsedWhatYouWillLearn = row.whatYouWillLearn ? JSON.parse(row.whatYouWillLearn) : [];
  } catch {
    parsedWhatYouWillLearn = [];
  }

  let parsedRequirements: string[] = [];
  try {
    parsedRequirements = row.requirements ? JSON.parse(row.requirements) : [];
  } catch {
    parsedRequirements = [];
  }

  // Calculate rating from reviews
  const reviews = row.reviews || [];
  const reviewCount = reviews.length;
  const rating = reviewCount > 0
    ? reviews.reduce((sum: number, r: any) => sum + (r.rating || 5), 0) / reviewCount
    : 4.95;

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    subtitle: row.subtitle || "",
    description: row.description || "",
    coverImage: row.coverImage || "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800",
    trailerVideoUrl: row.trailerVideoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    price: Number(row.price) || 0,
    salePrice: row.salePrice ? Number(row.salePrice) : undefined,
    level: row.level || "ม.ปลาย",
    status: (row.status as any) || "PUBLISHED",
    category: row.category?.name || "คณิตศาสตร์ ม.ปลาย",
    categorySlug: row.category?.slug || "math-m6",
    instructor: {
      id: row.instructor?.id || "tutor-ptoh",
      name: row.instructor?.name || "พี่โต๋ (P'Toh)",
      avatar: row.instructor?.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
      headline: row.instructor?.headline || "เกียรตินิยมอันดับ 1",
      bio: row.instructor?.bio || "",
      rating: 5.0,
      totalStudents: 0,
      totalCourses: 0,
      isVerified: Boolean(row.instructor?.isVerifiedTutor),
      subjects: ["คณิตศาสตร์ ม.ปลาย", "A-Level Math 1", "ฟิสิกส์ ม.ปลาย"],
      education: ["ปริญญาตรี เกียรตินิยมอันดับ 1", "เหรียญรางวัล โอลิมปิกวิชาการ"],
      achievements: ["ติวเตอร์ยอดนิยม"],
    },
    totalDurationHours: Math.round((totalSeconds / 3600) * 10) / 10 || 0,
    totalLessons: totalLessons || 0,
    rating: Math.round(rating * 100) / 100,
    reviewCount: reviewCount,
    studentCount: 0,
    isFeatured: Boolean(row.isFeatured),
    whatYouWillLearn: parsedWhatYouWillLearn,
    requirements: parsedRequirements,
    chapters: sortedChapters,
  };
}
