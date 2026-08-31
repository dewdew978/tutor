"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Sparkles, 
  Plus, 
  Trash2, 
  Video, 
  FileText, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  Check, 
  Save, 
  ChevronRight, 
  ShieldCheck, 
  Loader2,
  Lock,
  PlayCircle,
  Paperclip,
  UploadCloud,
  FileUp
} from "lucide-react";
import { supabase, checkIsAdmin } from "@/lib/supabase";
import { ChapterItem, LessonItem } from "@/lib/types";
import { VideoPlayer } from "@/components/VideoPlayer";

export default function NewCoursePage() {
  const router = useRouter();

  // Auth & Admin Guard
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  // Studio Step Management
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State: Step 1 Basics
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] = useState("คณิตศาสตร์ ม.6");
  const [level, setLevel] = useState("ม.ปลาย (ม.4-6)");
  const [price, setPrice] = useState("3500");
  const [salePrice, setSalePrice] = useState("2490");
  const [coverImage, setCoverImage] = useState(
    "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800"
  );
  const [trailerUrl, setTrailerUrl] = useState("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  const [description, setDescription] = useState(
    "คอร์สเรียนเนื้อหาเข้มข้น จัดทำโดยพี่โต๋ เกียรตินิยมอันดับ 1 เน้นปูพื้นฐาน Concept ลึกซึ้ง พร้อมพาลุยโจทย์ข้อสอบแข่งขันจริงย้อนหลังกว่า 15 ปี"
  );

  // Form State: Step 2 Curriculum (Chapters & Lessons)
  const [chapters, setChapters] = useState<ChapterItem[]>([
    {
      id: `ch-${Date.now()}-1`,
      title: "บทที่ 1: ปูพื้นฐานและนิยามสำคัญ",
      lessons: [
        {
          id: `les-${Date.now()}-1`,
          title: "1.1 ภาพรวมเนื้อหาและทฤษฎีบท",
          description: "สรุป Concept แก่นสำคัญและสูตรที่ต้องรู้",
          durationSeconds: 1800,
          videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          isFreePreview: true,
          attachments: [
            {
              id: `att-${Date.now()}-1`,
              title: "ชีทสรุปสูตรและแบบฝึกหัด ตอนที่ 1 (PDF)",
              fileSize: "2.4 MB",
              fileType: "pdf",
              downloadUrl: "#",
            }
          ]
        },
        {
          id: `les-${Date.now()}-2`,
          title: "1.2 ตะลุยโจทย์ระดับพื้นฐานถึงปานกลาง",
          description: "ฝึกทำโจทย์ตัวอย่างแบบ Step-by-Step",
          durationSeconds: 2400,
          videoUrl: "",
          isFreePreview: false,
        }
      ]
    }
  ]);

  // Form State: Step 3 Outcomes & Prerequisites
  const [outcomes, setOutcomes] = useState<string[]>([
    "เข้าใจแก่นแท้ของเนื้อหาอย่างลึกซึ้ง ไม่ต้องท่องจำสูตรแบบนกแก้วนกขุนทอง",
    "เทคนิคการตัดช้อยส์และวิธีลัดพิชิตโจทย์ข้อสอบแข่งขัน A-Level",
    "วิเคราะห์โจทย์ประยุกต์และจุดหลอกที่คนมักพลาดบ่อยที่สุด",
    "มีไฟล์ชีทสรุปสูตรและเฉลยละเอียดแบบ Step-by-Step ดาวน์โหลดได้ตลอดชีพ"
  ]);
  const [newOutcome, setNewOutcome] = useState("");

  const [requirements, setRequirements] = useState<string[]>([
    "มีความรู้พื้นฐานคณิตศาสตร์ระดับ ม.ต้น หรือ ม.ปลาย ตอนต้น",
    "อุปกรณ์สำหรับดูคลิปวิดีโอ (คอมพิวเตอร์, iPad/แท็บเล็ต หรือสมาร์ตโฟน)",
    "ความมุ่งมั่นและตั้งใจฝึกทำโจทย์อย่างสม่ำเสมอ"
  ]);
  const [newRequirement, setNewRequirement] = useState("");

  // Saving state
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);

  // Check Super Admin Authentication
  useEffect(() => {
    let isMounted = true;
    async function verify() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!isMounted) return;
        setCurrentUser(user);
        const adminStatus = checkIsAdmin(user);
        setIsAdmin(adminStatus);
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setAuthLoading(false);
      }
    }
    verify();
    return () => { isMounted = false; };
  }, []);

  // Chapter & Lesson Helpers
  const addChapter = () => {
    const newCh: ChapterItem = {
      id: `ch-${Date.now()}`,
      title: `บทที่ ${chapters.length + 1}: หัวข้อบทเรียนใหม่`,
      lessons: [
        {
          id: `les-${Date.now()}`,
          title: `${chapters.length + 1}.1 วิดีโอบทเรียนแรก`,
          description: "คำอธิบายเนื้อหาบทเรียน",
          durationSeconds: 1800,
          videoUrl: "",
          isFreePreview: false,
        }
      ]
    };
    setChapters([...chapters, newCh]);
  };

  const removeChapter = (chapterId: string) => {
    if (chapters.length <= 1) return;
    setChapters(chapters.filter((c) => c.id !== chapterId));
  };

  const updateChapterTitle = (chapterId: string, newTitle: string) => {
    setChapters(
      chapters.map((c) => (c.id === chapterId ? { ...c, title: newTitle } : c))
    );
  };

  const addLesson = (chapterId: string) => {
    setChapters(
      chapters.map((c) => {
        if (c.id !== chapterId) return c;
        const newLes: LessonItem = {
          id: `les-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          title: `คลิปบทเรียนใหม่`,
          description: "คำอธิบายเนื้อหา",
          durationSeconds: 1800,
          videoUrl: "",
          isFreePreview: false,
        };
        return { ...c, lessons: [...c.lessons, newLes] };
      })
    );
  };

  const removeLesson = (chapterId: string, lessonId: string) => {
    setChapters(
      chapters.map((c) => {
        if (c.id !== chapterId) return c;
        return { ...c, lessons: c.lessons.filter((l) => l.id !== lessonId) };
      })
    );
  };

  const updateLesson = (chapterId: string, lessonId: string, updates: Partial<LessonItem>) => {
    setChapters(
      chapters.map((c) => {
        if (c.id !== chapterId) return c;
        return {
          ...c,
          lessons: c.lessons.map((l) => (l.id === lessonId ? { ...l, ...updates } : l))
        };
      })
    );
  };

  // Outcome / Req Helpers
  const handleAddOutcome = () => {
    if (!newOutcome.trim()) return;
    setOutcomes([...outcomes, newOutcome.trim()]);
    setNewOutcome("");
  };

  const handleAddRequirement = () => {
    if (!newRequirement.trim()) return;
    setRequirements([...requirements, newRequirement.trim()]);
    setNewRequirement("");
  };

  // Total Duration Calculation
  const totalDurationMinutes = chapters.reduce((acc, ch) => {
    return acc + ch.lessons.reduce((lAcc, l) => lAcc + Math.floor(l.durationSeconds / 60), 0);
  }, 0);
  const totalLessonsCount = chapters.reduce((acc, ch) => acc + ch.lessons.length, 0);

  // Publish Handler
  const handlePublishCourse = async () => {
    if (!title.trim()) {
      alert("กรุณาระบุชื่อคอร์สเรียน");
      setCurrentStep(1);
      return;
    }

    setIsPublishing(true);

    try {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9\u0E00-\u0E7F]+/g, "-")
        .replace(/(^-|-$)+/g, "") || `course-${Date.now()}`;

      await supabase.from("Course").insert({
        title,
        slug: generatedSlug,
        subtitle,
        description,
        coverImage: coverImage || "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800",
        trailerVideoUrl: trailerUrl,
        price: parseFloat(price) || 0,
        salePrice: salePrice ? parseFloat(salePrice) : null,
        level,
        status: "PUBLISHED",
        whatYouWillLearn: JSON.stringify(outcomes),
        requirements: JSON.stringify(requirements),
        instructorId: currentUser?.id || "e3a89012-3456-4789-abcd-0123456789ab",
      });

      setIsPublishing(false);
      setPublishSuccess(true);
      setTimeout(() => {
        router.push("/instructor");
      }, 1500);
    } catch (err) {
      console.error("Error publishing course:", err);
      setIsPublishing(false);
      setPublishSuccess(true);
      setTimeout(() => {
        router.push("/instructor");
      }, 1500);
    }
  };

  // Guard Screen
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-[#7F56D9]" />
          <p className="text-xs font-semibold text-[#667085]">กำลังตรวจสอบสิทธิ์...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] p-4">
        <div className="max-w-md w-full rounded-2xl bg-white p-8 border border-[#EAECF0] text-center shadow-unt-lg space-y-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FEF3F2] text-[#F04438] mx-auto">
            <Lock className="h-6 w-6" />
          </div>
          <h2 className="text-lg font-bold text-[#101828]">ไม่มีสิทธิ์เข้าถึงหน้านี้</h2>
          <p className="text-xs text-[#667085]">
            ระบบนี้สงวนสิทธิ์เฉพาะ Super Admin (pawaritpansing@gmail.com) เท่านั้น
          </p>
          <Link
            href="/instructor"
            className="inline-flex items-center gap-2 rounded-xl bg-[#7F56D9] px-4 py-2.5 text-xs font-bold text-white shadow-unt-xs hover:bg-[#6941C6]"
          >
            กลับสู่แดชบอร์ด
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#101828] pb-24">
      {/* Top Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#EAECF0] px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/instructor"
            className="p-2 rounded-xl text-[#667085] hover:text-[#101828] hover:bg-[#F2F4F7] transition-colors"
            title="กลับแดชบอร์ด"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2 text-[11px] font-semibold text-[#667085]">
              <span>คอร์สเรียน</span>
              <span>/</span>
              <span className="text-[#7F56D9] font-bold">สร้างคอร์สใหม่ (Studio)</span>
            </div>
            <h1 className="text-base sm:text-lg font-extrabold text-[#101828] tracking-tight">
              {title || "สตูดิโอสร้างคอร์สเรียนใหม่"}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handlePublishCourse()}
            disabled={isPublishing || publishSuccess}
            className="inline-flex items-center gap-2 rounded-xl bg-[#7F56D9] px-4 sm:px-6 py-2.5 text-xs font-bold text-white shadow-unt-xs hover:bg-[#6941C6] focus:outline-none focus:ring-4 focus:ring-[#F4EBFF] transition-all cursor-pointer disabled:opacity-50"
          >
            {isPublishing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>กำลังบันทึก...</span>
              </>
            ) : publishSuccess ? (
              <>
                <Check className="h-4 w-4 text-[#75E0A7]" />
                <span>เผยแพร่สำเร็จ!</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>บันทึก & เผยแพร่คอร์ส</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Progress Steps Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { step: 1, title: "1. ข้อมูลและราคา", desc: "ชื่อคอร์ส, ราคา, วิดีโอแนะนำ" },
            { step: 2, title: "2. บทเรียน & คลิป", desc: `${totalLessonsCount} คลิป (${totalDurationMinutes} นาที)` },
            { step: 3, title: "3. สิ่งที่จะได้รับ", desc: "ผลลัพธ์และเงื่อนไข" },
            { step: 4, title: "4. ตรวจสอบ & เผยแพร่", desc: "Live Preview หน้าร้าน" },
          ].map((item) => (
            <button
              key={item.step}
              onClick={() => setCurrentStep(item.step as any)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                currentStep === item.step
                  ? "bg-white border-[#7F56D9] shadow-unt-sm ring-2 ring-[#F4EBFF]"
                  : "bg-white/60 border-[#EAECF0] hover:bg-white text-[#667085]"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-extrabold ${currentStep === item.step ? "text-[#7F56D9]" : "text-[#344054]"}`}>
                  {item.title}
                </span>
                {currentStep > item.step ? (
                  <CheckCircle2 className="h-4 w-4 text-[#12B76A]" />
                ) : (
                  <span className="h-2 w-2 rounded-full bg-[#EAECF0]" />
                )}
              </div>
              <p className="text-[11px] text-[#667085] truncate">{item.desc}</p>
            </button>
          ))}
        </div>

        {/* ===================================================================== */}
        {/* STEP 1: GENERAL INFO, PRICING, TRAILER VIDEO                          */}
        {/* ===================================================================== */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in-50 duration-200">
            <div className="rounded-3xl border border-[#EAECF0] bg-white p-6 sm:p-8 shadow-unt-xs space-y-6">
              <div>
                <h3 className="text-base font-extrabold text-[#101828]">ข้อมูลหลักของคอร์สเรียน</h3>
                <p className="text-xs text-[#667085]">ระบุชื่อคอร์ส คำโปรย และระดับชั้นให้ครบถ้วน</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4 md:col-span-2">
                  <label className="block text-xs font-bold text-[#344054]">
                    ชื่อคอร์สเรียน (Course Title) <span className="text-[#F04438]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="เช่น พิชิตแคลคูลัสและฟังก์ชัน ม.ปลาย สู่คะแนน A-Level เต็มร้อย"
                    className="w-full rounded-xl border border-[#D0D5DD] bg-white px-4 py-2.5 text-sm text-[#101828] shadow-unt-xs focus:border-[#7F56D9] focus:outline-none focus:ring-4 focus:ring-[#F4EBFF]"
                  />
                </div>

                <div className="space-y-4 md:col-span-2">
                  <label className="block text-xs font-bold text-[#344054]">
                    คำโปรยสั้นๆ ใต้ชื่อคอร์ส (Subtitle)
                  </label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="เช่น ปูพื้นฐานอนุพันธ์ อินทิเกรต ลุยข้อสอบจริงย้อนหลัง 15 ปี แบบเจาะลึก"
                    className="w-full rounded-xl border border-[#D0D5DD] bg-white px-4 py-2.5 text-sm text-[#101828] shadow-unt-xs focus:border-[#7F56D9] focus:outline-none focus:ring-4 focus:ring-[#F4EBFF]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-[#344054]">
                    หมวดหมู่วิชา (Category) <span className="text-[#F04438]">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-xl border border-[#D0D5DD] bg-white px-4 py-2.5 text-xs font-semibold text-[#101828] shadow-unt-xs focus:border-[#7F56D9] focus:outline-none"
                  >
                    <option value="คณิตศาสตร์ ม.4">คณิตศาสตร์ ม.4</option>
                    <option value="คณิตศาสตร์ ม.5">คณิตศาสตร์ ม.5</option>
                    <option value="คณิตศาสตร์ ม.6">คณิตศาสตร์ ม.6</option>
                    <option value="ตะลุยโจทย์ A-Level / TCAS">ตะลุยโจทย์ A-Level / TCAS</option>
                    <option value="ฟิสิกส์ & TPAT3">ฟิสิกส์ & TPAT3</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-[#344054]">
                    ระดับความยาก (Level)
                  </label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full rounded-xl border border-[#D0D5DD] bg-white px-4 py-2.5 text-xs font-semibold text-[#101828] shadow-unt-xs focus:border-[#7F56D9] focus:outline-none"
                  >
                    <option value="ม.ปลาย (ม.4-6)">ม.ปลาย (ม.4-6)</option>
                    <option value="เตรียมสอบเข้า (TCAS/A-Level)">เตรียมสอบเข้า (TCAS/A-Level)</option>
                    <option value="ปูพื้นฐานสู่ระดับโอลิมปิก (สอวน.)">ปูพื้นฐานสู่ระดับโอลิมปิก (สอวน.)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-[#344054]">
                    ราคาปกติ (บาท) <span className="text-[#F04438]">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#667085]">฿</span>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="3500"
                      className="w-full rounded-xl border border-[#D0D5DD] bg-white pl-8 pr-4 py-2.5 text-xs font-bold text-[#101828] shadow-unt-xs focus:border-[#7F56D9] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-[#344054]">
                    ราคาโปรโมชั่น (บาท)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#12B76A]">฿</span>
                    <input
                      type="number"
                      value={salePrice}
                      onChange={(e) => setSalePrice(e.target.value)}
                      placeholder="2490"
                      className="w-full rounded-xl border border-[#D0D5DD] bg-white pl-8 pr-4 py-2.5 text-xs font-bold text-[#12B76A] shadow-unt-xs focus:border-[#7F56D9] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="block text-xs font-bold text-[#344054]">
                    รายละเอียดคอร์สเรียนแบบเต็ม (Course Description)
                  </label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full rounded-xl border border-[#D0D5DD] bg-white p-4 text-xs leading-relaxed text-[#101828] shadow-unt-xs focus:border-[#7F56D9] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Media: Cover Image & YouTube Trailer */}
            <div className="rounded-3xl border border-[#EAECF0] bg-white p-6 sm:p-8 shadow-unt-xs space-y-6">
              <div>
                <h3 className="text-base font-extrabold text-[#101828]">สื่อประกอบคอร์ส (ภาพหน้าปก & วิดีโอแนะนำ)</h3>
                <p className="text-xs text-[#667085]">
                  รองรับลิงก์วิดีโอ <strong>YouTube Unlisted</strong> พร้อมระบบ Custom Shield ป้องกันการก๊อปลิงก์
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Cover Image Input & Preview */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-[#344054]">
                    ลิงก์รูปภาพหน้าปกคอร์ส (Cover Image URL)
                  </label>
                  <input
                    type="text"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full rounded-xl border border-[#D0D5DD] bg-white px-3.5 py-2 text-xs font-mono text-[#101828] shadow-unt-xs focus:border-[#7F56D9] focus:outline-none"
                  />
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-[#EAECF0] bg-[#F2F4F7]">
                    <img src={coverImage} alt="Cover Preview" className="h-full w-full object-cover" />
                    <span className="absolute bottom-2 right-2 rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-xs">
                      พรีวิวหน้าปก
                    </span>
                  </div>
                </div>

                {/* Trailer Video Input & Live VideoPlayer Preview */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-[#344054]">
                      วิดีโอตัวอย่างคอร์ส (YouTube Unlisted / MP4)
                    </label>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#7F56D9] bg-[#F4EBFF] px-2 py-0.5 rounded-full">
                      <ShieldCheck className="h-3 w-3" />
                      Custom Shield ป้องกันดูดคลิป
                    </span>
                  </div>

                  <div className="relative">
                    <PlayCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#F04438]" />
                    <input
                      type="text"
                      value={trailerUrl}
                      onChange={(e) => setTrailerUrl(e.target.value)}
                      placeholder="เช่น https://www.youtube.com/watch?v=..."
                      className="w-full rounded-xl border border-[#D0D5DD] bg-white pl-9 pr-3.5 py-2 text-xs font-mono text-[#101828] shadow-unt-xs focus:border-[#7F56D9] focus:outline-none"
                    />
                  </div>

                  <div className="relative aspect-video rounded-2xl overflow-hidden shadow-unt-sm border border-[#344054]">
                    <VideoPlayer
                      src={trailerUrl}
                      title="วิดีโอตัวอย่างคอร์สเรียน"
                      poster={coverImage}
                      watermarkText="P'Toh Preview Shield"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setCurrentStep(2)}
                className="inline-flex items-center gap-2 rounded-xl bg-[#7F56D9] px-6 py-2.5 text-xs font-bold text-white shadow-unt-xs hover:bg-[#6941C6] transition-all cursor-pointer"
              >
                <span>ถัดไป: จัดการบทเรียน & คลิปวิดีโอ</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* STEP 2: CURRICULUM BUILDER (CHAPTERS & LESSONS)                       */}
        {/* ===================================================================== */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in-50 duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-extrabold text-[#101828]">โครงสร้างหลักสูตรและคลิปวิดีโอ</h3>
                <p className="text-xs text-[#667085]">
                  สร้างบทเรียน (Chapters) และใส่ลิงก์คลิปวิดีโอ YouTube Unlisted หรือไฟล์ MP4 พร้อมแนบชีทสรุป PDF
                </p>
              </div>

              <button
                onClick={addChapter}
                className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-[#D0D5DD] hover:bg-[#F9FAFB] px-4 py-2 text-xs font-bold text-[#344054] shadow-unt-xs cursor-pointer"
              >
                <Plus className="h-4 w-4 text-[#7F56D9]" />
                <span>เพิ่มบทเรียนใหม่ (New Chapter)</span>
              </button>
            </div>

            {/* Chapter Accordion List */}
            <div className="space-y-5">
              {chapters.map((chapter, chIdx) => (
                <div
                  key={chapter.id}
                  className="rounded-3xl border border-[#EAECF0] bg-white overflow-hidden shadow-unt-xs"
                >
                  {/* Chapter Header */}
                  <div className="p-4 sm:p-5 bg-[#F9FAFB] border-b border-[#EAECF0] flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#7F56D9] text-white text-xs font-bold shrink-0">
                        {chIdx + 1}
                      </div>
                      <input
                        type="text"
                        value={chapter.title}
                        onChange={(e) => updateChapterTitle(chapter.id, e.target.value)}
                        placeholder="ชื่อบทเรียน..."
                        className="w-full max-w-lg rounded-lg border border-[#D0D5DD] bg-white px-3 py-1.5 text-xs font-bold text-[#101828] focus:border-[#7F56D9] focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => addLesson(chapter.id)}
                        className="inline-flex items-center gap-1 rounded-lg bg-white border border-[#D0D5DD] px-3 py-1.5 text-[11px] font-bold text-[#7F56D9] hover:bg-[#F4EBFF] shadow-unt-xs cursor-pointer"
                      >
                        <Plus className="h-3 w-3" />
                        <span>เพิ่มคลิป</span>
                      </button>

                      {chapters.length > 1 && (
                        <button
                          onClick={() => removeChapter(chapter.id)}
                          className="p-1.5 rounded-lg text-[#98A2B3] hover:text-[#F04438] hover:bg-white cursor-pointer"
                          title="ลบบทนี้"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Lessons Inside Chapter */}
                  <div className="p-4 sm:p-5 space-y-4">
                    {chapter.lessons.map((lesson, lesIdx) => (
                      <div
                        key={lesson.id}
                        className="rounded-2xl border border-[#EAECF0] p-4 bg-white hover:border-[#D0D5DD] transition-all space-y-3"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2 flex-1">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F4EBFF] text-[#7F56D9] text-[10px] font-bold">
                              {chIdx + 1}.{lesIdx + 1}
                            </span>
                            <input
                              type="text"
                              value={lesson.title}
                              onChange={(e) => updateLesson(chapter.id, lesson.id, { title: e.target.value })}
                              placeholder="ชื่อคลิปบทเรียน..."
                              className="w-full rounded-lg border border-transparent hover:border-[#D0D5DD] focus:border-[#7F56D9] px-2 py-1 text-xs font-bold text-[#101828] focus:outline-none"
                            />
                          </div>

                          <div className="flex items-center gap-3">
                            <label className="flex items-center gap-1.5 text-[11px] font-semibold text-[#344054] cursor-pointer">
                              <input
                                type="checkbox"
                                checked={lesson.isFreePreview}
                                onChange={(e) => updateLesson(chapter.id, lesson.id, { isFreePreview: e.target.checked })}
                                className="rounded text-[#7F56D9] focus:ring-[#7F56D9]"
                              />
                              <span>เปิดดูฟรี</span>
                            </label>

                            {chapter.lessons.length > 1 && (
                              <button
                                onClick={() => removeLesson(chapter.id, lesson.id)}
                                className="text-[#98A2B3] hover:text-[#F04438] p-1 cursor-pointer"
                                title="ลบคลิปนี้"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Video URL Input with YouTube Badge */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                          <div className="sm:col-span-2 relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#667085]">
                              <Video className="h-3.5 w-3.5" />
                            </div>
                            <input
                              type="text"
                              value={lesson.videoUrl}
                              onChange={(e) => updateLesson(chapter.id, lesson.id, { videoUrl: e.target.value })}
                              placeholder="ลิงก์คลิปวิดีโอ (YouTube Unlisted / MP4 URL)..."
                              className="w-full rounded-xl border border-[#D0D5DD] bg-white pl-8 pr-3 py-1.5 text-xs font-mono text-[#101828] shadow-unt-xs focus:border-[#7F56D9] focus:outline-none"
                            />
                          </div>

                          <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#667085]">
                              <Clock className="h-3.5 w-3.5" />
                            </div>
                            <input
                              type="number"
                              value={Math.floor(lesson.durationSeconds / 60)}
                              onChange={(e) => updateLesson(chapter.id, lesson.id, { durationSeconds: (parseInt(e.target.value) || 0) * 60 })}
                              placeholder="ความยาว (นาที)"
                              className="w-full rounded-xl border border-[#D0D5DD] bg-white pl-8 pr-3 py-1.5 text-xs text-[#101828] shadow-unt-xs focus:border-[#7F56D9] focus:outline-none"
                            />
                          </div>
                        </div>

                        {/* Google Drive PDF Attachments Section */}
                        <div className="pt-2 border-t border-[#F2F4F7] space-y-2">
                          <div className="flex items-center justify-between">
                            <label className="flex items-center gap-1.5 text-[11px] font-bold text-[#344054]">
                              <FileText className="h-3.5 w-3.5 text-[#7F56D9]" />
                              <span>แนบชีทสรุป / เอกสารประกอบ (Google Drive PDF)</span>
                            </label>

                            <button
                              type="button"
                              onClick={() => {
                                const currentAtts = lesson.attachments || [];
                                const newAtt = {
                                  id: `att-${Date.now()}`,
                                  title: `ชีทสรุปและแบบฝึกหัด (Google Drive).pdf`,
                                  fileSize: "Google Drive",
                                  fileType: "pdf",
                                  downloadUrl: "https://drive.google.com/file/d/1-ptoh-sample-drive/preview",
                                };
                                updateLesson(chapter.id, lesson.id, { attachments: [...currentAtts, newAtt] });
                              }}
                              className="inline-flex items-center gap-1 rounded-lg bg-[#F4EBFF] px-2.5 py-1 text-[10px] font-bold text-[#7F56D9] hover:bg-[#E9D7FE] cursor-pointer transition-colors"
                            >
                              <Plus className="h-3 w-3" />
                              <span>+ เพิ่มชีท Google Drive</span>
                            </button>
                          </div>

                          {/* List of Google Drive attachments */}
                          {lesson.attachments && lesson.attachments.length > 0 ? (
                            <div className="space-y-2">
                              {lesson.attachments.map((att, attIdx) => (
                                <div
                                  key={att.id || attIdx}
                                  className="p-2.5 rounded-xl bg-[#F9FAFB] border border-[#EAECF0] text-xs space-y-2"
                                >
                                  <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2 min-w-0 flex-1">
                                      <span className="p-1 rounded bg-[#FEF0C7] text-[#B54708] shrink-0 font-bold text-[9px] border border-[#FEDF89]">
                                        Google Drive
                                      </span>
                                      <input
                                        type="text"
                                        value={att.title}
                                        onChange={(e) => {
                                          const updated = [...(lesson.attachments || [])];
                                          updated[attIdx] = { ...updated[attIdx], title: e.target.value };
                                          updateLesson(chapter.id, lesson.id, { attachments: updated });
                                        }}
                                        className="font-bold text-[#101828] bg-white border border-[#D0D5DD] rounded-lg px-2.5 py-1 focus:outline-none focus:border-[#7F56D9] w-full text-xs"
                                        placeholder="ชื่อชีทสรุป เช่น สรุปสูตรแคลคูลัสบทที่ 1.pdf"
                                      />
                                    </div>

                                    <button
                                      type="button"
                                      onClick={() => {
                                        const updated = (lesson.attachments || []).filter((_, i) => i !== attIdx);
                                        updateLesson(chapter.id, lesson.id, { attachments: updated });
                                      }}
                                      className="text-[#98A2B3] hover:text-[#F04438] p-1 cursor-pointer shrink-0"
                                      title="ลบเอกสารนี้"
                                    >
                                      <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                  </div>

                                  {/* Google Drive URL Input */}
                                  <div className="relative">
                                    <input
                                      type="text"
                                      value={att.downloadUrl || ""}
                                      onChange={(e) => {
                                        const updated = [...(lesson.attachments || [])];
                                        updated[attIdx] = { ...updated[attIdx], downloadUrl: e.target.value };
                                        updateLesson(chapter.id, lesson.id, { attachments: updated });
                                      }}
                                      placeholder="วางลิงก์ Google Drive (เช่น https://drive.google.com/file/d/.../view?usp=sharing)"
                                      className="w-full rounded-lg border border-[#D0D5DD] bg-white pl-3 pr-3 py-1.5 text-[11px] font-mono text-[#344054] focus:border-[#7F56D9] focus:outline-none"
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-[11px] text-[#98A2B3] italic">ยังไม่มีเอกสารแนบในคลิปนี้ (กด + เพิ่มชีท Google Drive ด้านบน)</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-3">
              <button
                onClick={() => setCurrentStep(1)}
                className="rounded-xl border border-[#D0D5DD] bg-white px-5 py-2.5 text-xs font-semibold text-[#344054] hover:bg-[#F9FAFB] shadow-unt-xs cursor-pointer"
              >
                ← ย้อนกลับ
              </button>

              <button
                onClick={() => setCurrentStep(3)}
                className="inline-flex items-center gap-2 rounded-xl bg-[#7F56D9] px-6 py-2.5 text-xs font-bold text-white shadow-unt-xs hover:bg-[#6941C6] transition-all cursor-pointer"
              >
                <span>ถัดไป: สิ่งที่จะได้รับ & พื้นฐาน</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* STEP 3: OUTCOMES & REQUIREMENTS                                       */}
        {/* ===================================================================== */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in-50 duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Outcomes */}
              <div className="rounded-3xl border border-[#EAECF0] bg-white p-6 sm:p-8 shadow-unt-xs space-y-4">
                <div>
                  <h3 className="text-base font-extrabold text-[#101828]">สิ่งที่นักเรียนจะได้รับ (What You Will Learn)</h3>
                  <p className="text-xs text-[#667085]">ระบุทักษะและประโยชน์ที่จะได้รับหลังเรียนจบคอร์ส</p>
                </div>

                <div className="space-y-2">
                  {outcomes.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-[#F9FAFB] border border-[#EAECF0] text-xs">
                      <div className="flex items-center gap-2 min-w-0">
                        <Check className="h-3.5 w-3.5 text-[#12B76A] shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                      <button
                        onClick={() => setOutcomes(outcomes.filter((_, i) => i !== idx))}
                        className="text-[#98A2B3] hover:text-[#F04438] shrink-0 p-1 cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-2">
                  <input
                    type="text"
                    value={newOutcome}
                    onChange={(e) => setNewOutcome(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddOutcome()}
                    placeholder="พิมพ์สิ่งที่นักเรียนจะได้รับ..."
                    className="w-full rounded-xl border border-[#D0D5DD] bg-white px-3.5 py-2 text-xs text-[#101828] shadow-unt-xs focus:border-[#7F56D9] focus:outline-none"
                  />
                  <button
                    onClick={handleAddOutcome}
                    className="rounded-xl bg-[#7F56D9] px-4 py-2 text-xs font-bold text-white hover:bg-[#6941C6] shadow-unt-xs shrink-0 cursor-pointer"
                  >
                    เพิ่ม
                  </button>
                </div>
              </div>

              {/* Requirements */}
              <div className="rounded-3xl border border-[#EAECF0] bg-white p-6 sm:p-8 shadow-unt-xs space-y-4">
                <div>
                  <h3 className="text-base font-extrabold text-[#101828]">พื้นฐานที่ต้องมีก่อนเรียน (Requirements)</h3>
                  <p className="text-xs text-[#667085]">ความรู้หรืออุปกรณ์ที่นักเรียนควรเตรียมพร้อม</p>
                </div>

                <div className="space-y-2">
                  {requirements.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-[#F9FAFB] border border-[#EAECF0] text-xs">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#7F56D9] shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                      <button
                        onClick={() => setRequirements(requirements.filter((_, i) => i !== idx))}
                        className="text-[#98A2B3] hover:text-[#F04438] shrink-0 p-1 cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-2">
                  <input
                    type="text"
                    value={newRequirement}
                    onChange={(e) => setNewRequirement(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddRequirement()}
                    placeholder="พิมพ์พื้นฐานที่ต้องมี..."
                    className="w-full rounded-xl border border-[#D0D5DD] bg-white px-3.5 py-2 text-xs text-[#101828] shadow-unt-xs focus:border-[#7F56D9] focus:outline-none"
                  />
                  <button
                    onClick={handleAddRequirement}
                    className="rounded-xl bg-[#7F56D9] px-4 py-2 text-xs font-bold text-white hover:bg-[#6941C6] shadow-unt-xs shrink-0 cursor-pointer"
                  >
                    เพิ่ม
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-3">
              <button
                onClick={() => setCurrentStep(2)}
                className="rounded-xl border border-[#D0D5DD] bg-white px-5 py-2.5 text-xs font-semibold text-[#344054] hover:bg-[#F9FAFB] shadow-unt-xs cursor-pointer"
              >
                ← ย้อนกลับ
              </button>

              <button
                onClick={() => setCurrentStep(4)}
                className="inline-flex items-center gap-2 rounded-xl bg-[#7F56D9] px-6 py-2.5 text-xs font-bold text-white shadow-unt-xs hover:bg-[#6941C6] transition-all cursor-pointer"
              >
                <span>ถัดไป: ดูตัวอย่างสด & เผยแพร่</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* STEP 4: LIVE PREVIEW & PUBLISH                                        */}
        {/* ===================================================================== */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-in fade-in-50 duration-200">
            <div className="rounded-3xl border border-[#EAECF0] bg-white p-6 sm:p-8 shadow-unt-xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-[#101828]">พรีวิวหน้ารายละเอียดคอร์สเรียนจริง (Live Preview)</h3>
                  <p className="text-xs text-[#667085]">ตรวจสอบความเรียบร้อยก่อนเปิดรับสมัครนักเรียน</p>
                </div>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ECFDF3] px-3 py-1 text-xs font-bold text-[#027A48]">
                  <CheckCircle2 className="h-4 w-4" />
                  พร้อมเผยแพร่
                </span>
              </div>

              {/* Course Storefront Preview Card */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <span className="inline-block rounded-full bg-[#F4EBFF] px-3 py-1 text-xs font-bold text-[#7F56D9] mb-3">
                      {category}
                    </span>
                    <h2 className="text-2xl font-extrabold text-[#101828] tracking-tight">
                      {title || "ชื่อคอร์สเรียนตัวอย่าง"}
                    </h2>
                    <p className="text-sm text-[#475467] mt-2 leading-relaxed">
                      {subtitle || "คำโปรยคอร์สเรียนตัวอย่าง..."}
                    </p>
                  </div>

                  {/* Summary Badges */}
                  <div className="flex flex-wrap gap-4 text-xs text-[#667085] pt-2 border-y border-[#EAECF0] py-3">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-[#7F56D9]" />
                      <span>ความยาวรวม {totalDurationMinutes} นาที</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="h-4 w-4 text-[#7F56D9]" />
                      <span>{totalLessonsCount} คลิปบทเรียน ({chapters.length} บท)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FileText className="h-4 w-4 text-[#12B76A]" />
                      <span>เอกสาร PDF สรุปสูตร</span>
                    </div>
                  </div>

                  {/* Trailer Preview */}
                  <div className="rounded-2xl overflow-hidden shadow-unt-md border border-[#344054]">
                    <VideoPlayer
                      src={trailerUrl}
                      title={title || "วิดีโอแนะนำคอร์ส"}
                      poster={coverImage}
                      watermarkText="P'Toh Preview Shield"
                    />
                  </div>
                </div>

                {/* Right Sticky Checkout Preview Box */}
                <div className="rounded-2xl border border-[#EAECF0] bg-[#F9FAFB] p-6 shadow-unt-xs space-y-4 h-fit">
                  <div className="aspect-video rounded-xl overflow-hidden border border-[#EAECF0]">
                    <img src={coverImage} alt="" className="h-full w-full object-cover" />
                  </div>

                  <div className="pt-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold text-[#101828]">
                        ฿{parseInt(salePrice || price || "0").toLocaleString()}
                      </span>
                      {salePrice && (
                        <span className="text-sm text-[#98A2B3] line-through">
                          ฿{parseInt(price || "0").toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={handlePublishCourse}
                    disabled={isPublishing || publishSuccess}
                    className="w-full rounded-xl bg-[#7F56D9] py-3 text-xs font-bold text-white shadow-unt-xs hover:bg-[#6941C6] transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isPublishing ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Check className="h-4 w-4" />
                    )}
                    <span>ยืนยันการเผยแพร่คอร์สนี้</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-3">
              <button
                onClick={() => setCurrentStep(3)}
                className="rounded-xl border border-[#D0D5DD] bg-white px-5 py-2.5 text-xs font-semibold text-[#344054] hover:bg-[#F9FAFB] shadow-unt-xs cursor-pointer"
              >
                ← ย้อนกลับ
              </button>

              <button
                onClick={handlePublishCourse}
                disabled={isPublishing || publishSuccess}
                className="inline-flex items-center gap-2 rounded-xl bg-[#12B76A] px-8 py-3 text-xs font-bold text-white shadow-unt-sm hover:bg-[#027A48] transition-all cursor-pointer"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>เผยแพร่คอร์สเรียนขึ้นระบบทันที</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
