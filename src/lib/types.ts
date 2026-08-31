export interface TutorProfile {
  id: string;
  name: string;
  avatar: string;
  headline: string;
  bio: string;
  rating: number;
  totalStudents: number;
  totalCourses: number;
  isVerified: boolean;
  subjects: string[];
  education: string[];
  achievements: string[];
}

export type Tutor = TutorProfile;

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  description?: string;
}

export interface AttachmentItem {
  id: string;
  title: string;
  fileSize: string;
  fileType: string;
  downloadUrl: string;
}

export interface LessonItem {
  id: string;
  title: string;
  description: string;
  durationSeconds: number;
  videoUrl: string;
  isFreePreview: boolean;
  attachments?: AttachmentItem[];
}

export interface ChapterItem {
  id: string;
  title: string;
  lessons: LessonItem[];
}

export interface CourseItem {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  coverImage: string;
  trailerVideoUrl: string;
  price: number;
  salePrice?: number;
  level: string;
  status?: "PUBLISHED" | "DRAFT" | "ARCHIVED" | "CLOSED";
  category: string;
  categorySlug: string;
  instructor: TutorProfile;
  totalDurationHours: number;
  totalLessons: number;
  rating: number;
  reviewCount: number;
  studentCount: number;
  isFeatured: boolean;
  whatYouWillLearn: string[];
  requirements: string[];
  chapters: ChapterItem[];
}

export interface StudentReview {
  id: string;
  studentName: string;
  school: string;
  faculty: string;
  score: string;
  comment: string;
  avatar: string;
}
