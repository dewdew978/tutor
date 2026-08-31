"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { 
  FileText, 
  Download, 
  MessageSquare, 
  ArrowLeft, 
  Sparkles, 
  Send, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Edit3, 
  Check, 
  Search, 
  CheckCircle2, 
  Circle, 
  ThumbsUp, 
  ShieldCheck,
  Eye,
  Lock,
  LogIn,
  Loader2
} from "lucide-react";
import { VideoPlayer } from "@/components/VideoPlayer";
import { PdfViewerModal } from "@/components/PdfViewerModal";
import { getCourseBySlug, enrollStudentInCourse } from "@/lib/data-service";
import { CourseItem, LessonItem } from "@/lib/types";
import { supabase } from "@/lib/supabase";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function LearnClassroomPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const [course, setCourse] = useState<CourseItem | null>(null);
  const [activeLesson, setActiveLesson] = useState<LessonItem>({
    id: "default",
    title: "กำลังโหลดบทเรียน...",
    description: "",
    durationSeconds: 1200,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    isFreePreview: true,
  });
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"overview" | "resources" | "qa" | "notes">("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarSearch, setSidebarSearch] = useState("");
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [pdfModalTitle, setPdfModalTitle] = useState("ชีทสรุปสูตรและแบบฝึกหัด (PDF)");
  const [pdfModalUrl, setPdfModalUrl] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    getCourseBySlug(resolvedParams.slug).then((c) => {
      setCourse(c);
      if (c && c.chapters && c.chapters.length > 0 && c.chapters[0].lessons.length > 0) {
        setActiveLesson(c.chapters[0].lessons[0]);
        setCompletedLessonIds([c.chapters[0].lessons[0].id]);
      }
      setIsLoading(false);
    });
  }, [resolvedParams.slug]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setCurrentUser(user);
      setAuthLoading(false);
    });
  }, []);

  useEffect(() => {
    if (currentUser?.id && course?.id) {
      enrollStudentInCourse(
        currentUser.id,
        currentUser.email || "",
        currentUser.user_metadata?.full_name || "",
        course.id,
        course.slug,
        Number(course.salePrice || course.price || 0)
      );
    }
  }, [currentUser?.id, course?.id]);

  const allLessons: LessonItem[] = course ? course.chapters.flatMap((ch) => ch.lessons) : [];
  const studentName = currentUser?.user_metadata?.full_name || (currentUser?.email ? currentUser.email.split("@")[0] : "นักเรียนของพี่โต๋");

  // Student Personal Notes State
  const [notes, setNotes] = useState<{ id: string; timestamp: string; text: string; lessonTitle: string }[]>([]);
  const [newNoteInput, setNewNoteInput] = useState("");

  // Q&A State
  const [questions, setQuestions] = useState<any[]>([]);
  const [newQuestionText, setNewQuestionText] = useState("");

  const currentLessonIndex = allLessons.findIndex((l) => l.id === activeLesson.id);
  const prevLesson = currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;
  const nextLesson = currentLessonIndex < allLessons.length - 1 ? allLessons[currentLessonIndex + 1] : null;

  const toggleLessonComplete = (lessonId: string) => {
    setCompletedLessonIds((prev) =>
      prev.includes(lessonId) ? prev.filter((id) => id !== lessonId) : [...prev, lessonId]
    );
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteInput.trim()) return;

    setNotes([
      {
        id: `note-${Date.now()}`,
        timestamp: "04:30",
        lessonTitle: activeLesson.title,
        text: newNoteInput,
      },
      ...notes,
    ]);
    setNewNoteInput("");
  };

  const handlePostQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;
    setQuestions([
      {
        id: `q-${Date.now()}`,
        studentName: studentName,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
        time: "เมื่อสักครู่",
        lessonName: activeLesson.title,
        question: newQuestionText,
        likes: 0,
        reply: "พี่โต๋ได้รับคำถามแล้ว กำลังเตรียมพิมพ์ตอบกลับให้อย่างละเอียดครับ...",
        replyBy: "พี่โต๋ (ผู้สอน)",
      },
      ...questions,
    ]);
    setNewQuestionText("");
  };

  const progressPercentage = allLessons.length > 0 
    ? Math.round((completedLessonIds.length / allLessons.length) * 100)
    : 0;

  // Filter lessons for sidebar
  const filteredChapters = (course?.chapters || []).map((ch) => ({
    ...ch,
    lessons: ch.lessons.filter((l) =>
      l.title.toLowerCase().includes(sidebarSearch.toLowerCase())
    ),
  })).filter((ch) => ch.lessons.length > 0);

  // 1. Loading State
  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] text-[#101828]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-[#7F56D9]" />
          <p className="text-xs font-semibold text-[#667085]">กำลังเข้าสู่ห้องเรียน...</p>
        </div>
      </div>
    );
  }

  // 2. Authentication Required Guard
  if (!currentUser) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F9FAFB] text-[#101828]">
        {/* Simple topbar */}
        <header className="h-14 border-b border-[#EAECF0] bg-white px-4 sm:px-6 flex items-center justify-between">
          <Link
            href={`/courses/${resolvedParams.slug}`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#667085] hover:text-[#101828] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>กลับสู่หน้ารายละเอียดคอร์ส</span>
          </Link>
          <span className="text-xs font-bold text-[#7F56D9]">P&apos;Toh Online Classroom</span>
        </header>

        <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
          <div className="w-full max-w-md rounded-3xl border border-[#EAECF0] bg-white p-8 shadow-unt-xl text-center space-y-6 animate-in fade-in-50 duration-200">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F4EBFF] text-[#7F56D9] border border-[#E9D7FE] shadow-unt-xs">
              <Lock className="h-8 w-8" />
            </div>

            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F4EBFF] px-3 py-1 text-xs font-bold text-[#7F56D9] border border-[#E9D7FE]">
                <Sparkles className="h-3.5 w-3.5" />
                <span>สงวนสิทธิ์เฉพาะสมาชิก</span>
              </span>
              <h1 className="text-2xl font-extrabold text-[#101828] tracking-tight">
                กรุณาเข้าสู่ระบบก่อนเข้าเรียน
              </h1>
              <p className="text-xs text-[#667085] leading-relaxed max-w-xs mx-auto">
                คุณจำเป็นต้องเข้าสู่ระบบสมาชิกเพื่อเข้าห้องเรียน บันทึกประวัติการเรียน และดาวน์โหลดเอกสาร PDF ชีทสรุป
              </p>
            </div>

            {course && (
              <div className="rounded-2xl bg-[#F9FAFB] border border-[#EAECF0] p-3.5 flex items-center gap-3 text-left">
                <img
                  src={course.coverImage}
                  alt=""
                  className="h-12 w-20 rounded-xl object-cover border border-[#EAECF0] shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#101828] truncate">{course.title}</p>
                  <p className="text-[11px] text-[#667085] truncate">
                    {course.chapters?.length || 0} บทเรียน • {course.totalLessons} ตอน
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-3 pt-2">
              <Link
                href={`/login?redirect=/learn/${resolvedParams.slug}`}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#7F56D9] py-3 px-4 text-xs font-bold text-white shadow-unt-xs hover:bg-[#6941C6] focus:ring-4 focus:ring-[#F4EBFF] transition-all"
              >
                <LogIn className="h-4 w-4" />
                <span>เข้าสู่ระบบเพื่อเริ่มเรียน</span>
              </Link>

              <Link
                href={`/signup?redirect=/learn/${resolvedParams.slug}`}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-[#D0D5DD] bg-white py-3 px-4 text-xs font-bold text-[#344054] hover:bg-[#F9FAFB] shadow-unt-xs transition-all"
              >
                <span>ยังไม่มีบัญชี? สมัครสมาชิกใหม่</span>
              </Link>

              <Link
                href={`/courses/${resolvedParams.slug}`}
                className="block text-center text-xs font-semibold text-[#667085] hover:text-[#101828] pt-1"
              >
                กลับไปดูข้อมูลคอร์สเรียน
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-[#F9FAFB] text-[#101828] overflow-hidden font-sans">
      {/* ========================================================================= */}
      {/* CLASSROOM TOPBAR                                                          */}
      {/* ========================================================================= */}
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-[#EAECF0] bg-white px-4 sm:px-6 shadow-unt-xs z-30">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <Link
            href="/courses"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#D0D5DD] bg-white text-[#344054] hover:bg-[#F9FAFB] transition-colors shrink-0"
            title="กลับไปหน้ารายการคอร์ส"
          >
            <ArrowLeft className="h-4.5 w-4.5" />
          </Link>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-block rounded-md bg-[#F4EBFF] px-2 py-0.5 text-[10px] font-bold text-[#7F56D9] border border-[#E9D7FE]">
                ห้องเรียนออนไลน์
              </span>
              <h1 className="text-xs sm:text-sm font-bold text-[#101828] truncate">
                {course?.title || "กำลังโหลดคอร์สเรียน..."}
              </h1>
            </div>
            <p className="text-[11px] text-[#667085] truncate hidden md:block">
              {activeLesson.title}
            </p>
          </div>
        </div>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Toggle Sidebar Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#D0D5DD] bg-white px-3 py-1.5 text-xs font-bold text-[#344054] shadow-unt-xs hover:bg-[#F9FAFB] transition-colors"
          >
            <BookOpen className="h-4 w-4 text-[#7F56D9]" />
            <span className="hidden sm:inline">{sidebarOpen ? "ซ่อนสารบัญ" : "แสดงสารบัญ"}</span>
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* MAIN LEARNING STAGE & SPLIT LAYOUT                                        */}
      {/* ========================================================================= */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Side: Video Theater + Interaction Tabs */}
        <div className="flex-1 overflow-y-auto">
          {/* Video Player Box with Watermark */}
          <div className="relative w-full bg-black aspect-video max-h-[65vh] flex items-center justify-center overflow-hidden">
            <VideoPlayer
              key={activeLesson.videoUrl}
              src={activeLesson.videoUrl}
              title={activeLesson.title}
              watermarkText={`P'TOH DRM • ${currentUser?.email || "ENROLLED-STUDENT"}`}
              onEnded={() => {
                if (!completedLessonIds.includes(activeLesson.id)) {
                  setCompletedLessonIds((prev) => [...prev, activeLesson.id]);
                }
              }}
              nextLessonTitle={nextLesson?.title}
              onNextLesson={nextLesson ? () => setActiveLesson(nextLesson) : undefined}
            />
          </div>

          {/* Lesson Navigation & Completion Bar */}
          <div className="border-b border-[#EAECF0] bg-white px-4 sm:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-unt-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleLessonComplete(activeLesson.id)}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all shadow-unt-xs cursor-pointer ${
                  completedLessonIds.includes(activeLesson.id)
                    ? "bg-[#ECFDF3] text-[#027A48] border border-[#ABEFC6]"
                    : "bg-[#7F56D9] text-white hover:bg-[#6941C6]"
                }`}
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>
                  {completedLessonIds.includes(activeLesson.id) ? "เรียนจบตอนนี้แล้ว" : "ทำเครื่องหมายว่าเรียนจบแล้ว"}
                </span>
              </button>
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-2">
              <button
                disabled={!prevLesson}
                onClick={() => prevLesson && setActiveLesson(prevLesson)}
                className="inline-flex items-center gap-1 rounded-xl border border-[#D0D5DD] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#344054] hover:bg-[#F9FAFB] disabled:opacity-40 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>ตอนก่อนหน้า</span>
              </button>

              <button
                disabled={!nextLesson}
                onClick={() => nextLesson && setActiveLesson(nextLesson)}
                className="inline-flex items-center gap-1 rounded-xl border border-[#D0D5DD] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#344054] hover:bg-[#F9FAFB] disabled:opacity-40 transition-colors"
              >
                <span>ตอนถัดไป</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="border-b border-[#EAECF0] bg-white px-4 sm:px-8 pt-2">
            <div className="flex items-center gap-6 sm:gap-8 overflow-x-auto text-xs sm:text-sm font-semibold">
              <button
                onClick={() => setActiveTab("overview")}
                className={`pb-3.5 border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  activeTab === "overview"
                    ? "border-[#7F56D9] text-[#7F56D9] font-bold"
                    : "border-transparent text-[#667085] hover:text-[#101828]"
                }`}
              >
                <BookOpen className="h-4 w-4" />
                <span>สรุปเนื้อหาบทเรียน</span>
              </button>

              <button
                onClick={() => setActiveTab("resources")}
                className={`pb-3.5 border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  activeTab === "resources"
                    ? "border-[#7F56D9] text-[#7F56D9] font-bold"
                    : "border-transparent text-[#667085] hover:text-[#101828]"
                }`}
              >
                <FileText className="h-4 w-4" />
                <span>เอกสาร PDF</span>
              </button>

              <button
                onClick={() => setActiveTab("qa")}
                className={`pb-3.5 border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  activeTab === "qa"
                    ? "border-[#7F56D9] text-[#7F56D9] font-bold"
                    : "border-transparent text-[#667085] hover:text-[#101828]"
                }`}
              >
                <MessageSquare className="h-4 w-4" />
                <span>ถาม-ตอบกับพี่โต๋ ({questions.length})</span>
              </button>

              <button
                onClick={() => setActiveTab("notes")}
                className={`pb-3.5 border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  activeTab === "notes"
                    ? "border-[#7F56D9] text-[#7F56D9] font-bold"
                    : "border-transparent text-[#667085] hover:text-[#101828]"
                }`}
              >
                <Edit3 className="h-4 w-4" />
                <span>สมุดโน้ต ({notes.length})</span>
              </button>
            </div>
          </div>

          {/* Tab Content Panels */}
          <div className="p-4 sm:p-8 max-w-4xl">
            {/* TAB 1: OVERVIEW */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="rounded-2xl border border-[#EAECF0] bg-white p-6 shadow-unt-xs space-y-3">
                  <h3 className="text-base font-bold text-[#101828]">
                    ภาพรวมและเป้าหมายของบทนี้
                  </h3>
                  <p className="text-xs sm:text-sm text-[#475467] leading-relaxed">
                    {activeLesson.description || "เรียนรู้คอนเซปต์สำคัญและการวิเคราะห์โจทย์ประยุกต์ พร้อมตัวอย่างข้อสอบจริงย้อนหลัง 15 ปี"}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#E9D7FE] bg-[#F9F5FF] p-6 shadow-unt-xs space-y-3">
                  <h4 className="text-sm font-bold text-[#7F56D9] flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-[#7F56D9]" />
                    สรุปหัวใจสำคัญ & สูตรลัดที่ต้องจำ:
                  </h4>
                  <ul className="space-y-2 text-xs text-[#344054]">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-[#7F56D9] shrink-0 mt-0.5" />
                      <span><strong>ลิมิตของฟังก์ชัน 0/0:</strong> เมื่อแทนค่าแล้วได้ 0/0 ให้ใช้วิธีจัดรูปแยกตัวประกอบ หรือใช้กฎโลปิตาล (ดิฟบน ดิฟล่าง)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-[#7F56D9] shrink-0 mt-0.5" />
                      <span><strong>ความชันของเส้นโค้ง:</strong> ค่าของอนุพันธ์ ณ จุด x=a คือความชันของเส้นสัมผัสเส้นโค้งที่จุดนั้นเสมอ m = f&apos;(a)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-[#7F56D9] shrink-0 mt-0.5" />
                      <span><strong>จุดสูงสุด-ต่ำสุดสัมพัทธ์:</strong> หาจากจุดวิกฤต f&apos;(x) = 0 และทดสอบเครื่องหมายบนเส้นจำนวน</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* TAB 2: RESOURCES */}
            {activeTab === "resources" && (
              <div className="space-y-6">
                <div className="rounded-2xl bg-[#F9F5FF] border border-[#E9D7FE] p-4 sm:p-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7F56D9] text-white">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#101828]">
                        เอกสารประกอบการเรียนและชีทสรุปสูตร (PDF)
                      </h4>
                      <p className="text-[11px] text-[#667085]">
                        สามารถกดเปิดอ่านเอกสาร 4 สีคมชัดบนเว็บได้ทันที หรือดาวน์โหลดเก็บไว้ทบทวน
                      </p>
                    </div>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-[#7F56D9] border border-[#E9D7FE]">
                    PDF In-App Viewer
                  </span>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      id: "pdf-1",
                      title: "ชีทสรุปแก่นสำคัญ ลิมิตและความต่อเนื่อง (Limits & Continuity)",
                      desc: "ขนาดไฟล์ 3.4 MB • สรุปสูตรลิมิต 0/0 กฎของโลปิตาล และเทคนิคสังยุค 4 สี",
                      badge: "หลักสูตรหลัก",
                    },
                    {
                      id: "pdf-2",
                      title: "ตารางสูตรอนุพันธ์ 10 สูตรพื้นฐาน & การดิฟลูกโซ่ (Chain Rule)",
                      desc: "ขนาดไฟล์ 2.8 MB • ตารางเทียบสูตรดิฟผลคูณ-ผลหาร และอนุพันธ์ฟังก์ชันแฝง",
                      badge: "สูตรลัด",
                    },
                    {
                      id: "pdf-3",
                      title: "ตะลุยโจทย์ข้อสอบจริง A-Level คณิต 1 พร้อมเฉลยละเอียดทุกข้อ",
                      desc: "ขนาดไฟล์ 4.2 MB • ข้อสอบย้อนหลัง 10 ปี พร้อมแนวคิด Step-by-Step",
                      badge: "ข้อสอบจริง",
                    },
                  ].map((doc) => (
                    <div
                      key={doc.id}
                      className="rounded-2xl border border-[#EAECF0] bg-white p-4 sm:p-5 shadow-unt-xs hover:border-[#D0D5DD] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-start sm:items-center gap-3.5">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FEE4E2] text-[#D92D20] shrink-0">
                          <FileText className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-xs sm:text-sm font-bold text-[#101828]">
                              {doc.title}
                            </h4>
                            <span className="rounded-md bg-[#F4EBFF] px-2 py-0.5 text-[9px] font-bold text-[#7F56D9]">
                              {doc.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#667085] mt-0.5">{doc.desc}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => {
                            setPdfModalTitle(doc.title);
                            setPdfModalOpen(true);
                          }}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-[#F4EBFF] px-4 py-2 text-xs font-bold text-[#7F56D9] hover:bg-[#E9D7FE] transition-colors cursor-pointer"
                        >
                          <Eye className="h-4 w-4" />
                          <span>เปิดอ่านในเว็บ</span>
                        </button>

                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setPdfModalTitle(doc.title);
                            setPdfModalOpen(true);
                          }}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-[#D0D5DD] bg-white px-3 py-2 text-xs font-bold text-[#344054] hover:bg-[#F9FAFB] transition-colors"
                          title="ดาวน์โหลดไฟล์ PDF"
                        >
                          <Download className="h-3.5 w-3.5 text-[#667085]" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: Q&A */}
            {activeTab === "qa" && (
              <div className="space-y-6">
                <form onSubmit={handlePostQuestion} className="rounded-2xl border border-[#EAECF0] bg-white p-5 shadow-unt-xs space-y-3">
                  <h4 className="text-xs font-bold text-[#101828] flex items-center gap-1.5">
                    <MessageSquare className="h-4 w-4 text-[#7F56D9]" />
                    พิมพ์คำถามหรือจุดที่สงสัยในบทเรียนนี้
                  </h4>
                  <textarea
                    rows={3}
                    value={newQuestionText}
                    onChange={(e) => setNewQuestionText(e.target.value)}
                    placeholder="เช่น ในนาทีที่ 05:20 บรรทัดที่ 3 ที่มาของสูตรตรงนี้คิดอย่างไรครับพี่โต๋..."
                    className="w-full rounded-xl border border-[#D0D5DD] p-3 text-xs text-[#101828] placeholder:text-[#667085] shadow-unt-xs focus:border-[#7F56D9] focus:outline-none resize-none"
                  />
                  <div className="flex justify-between items-center pt-2 border-t border-[#EAECF0]">
                    <span className="text-[11px] text-[#667085]">
                      พี่โต๋จะเข้ามาตอบกลับคำถามด้วยตัวเอง 100%
                    </span>
                    <button
                      type="submit"
                      disabled={!newQuestionText.trim()}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#7F56D9] px-5 py-2 text-xs font-bold text-white shadow-unt-xs hover:bg-[#6941C6] disabled:opacity-50"
                    >
                      <Send className="h-3.5 w-3.5" />
                      ส่งคำถาม
                    </button>
                  </div>
                </form>

                <div className="space-y-4">
                  {questions.length > 0 ? (
                    questions.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-2xl border border-[#EAECF0] bg-white p-5 shadow-unt-xs space-y-3 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={item.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"}
                              alt=""
                              className="h-8 w-8 rounded-full object-cover border border-[#EAECF0]"
                            />
                            <div>
                              <span className="font-bold text-[#101828]">{item.studentName}</span>
                              <p className="text-[10px] text-[#667085]">{item.lessonName} • {item.time}</p>
                            </div>
                          </div>
                          <span className="text-[11px] text-[#667085] font-semibold flex items-center gap-1">
                            <ThumbsUp className="h-3.5 w-3.5 text-[#7F56D9]" /> {item.likes || 0} ถูกใจ
                          </span>
                        </div>

                        <p className="text-[#344054] leading-relaxed pl-10">
                          {item.question}
                        </p>

                        {item.reply && (
                          <div className="ml-10 rounded-xl bg-[#F9F5FF] border border-[#E9D7FE] p-4 space-y-2">
                            <div className="flex items-center gap-2 text-xs font-bold text-[#7F56D9]">
                              <img
                                src={course?.instructor?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600"}
                                alt=""
                                className="h-6 w-6 rounded-full object-cover ring-2 ring-[#7F56D9]"
                              />
                              <span>{item.replyBy}</span>
                              <span className="rounded-full bg-[#7F56D9] text-white px-2 py-0.2 text-[9px] font-bold">
                                ผู้สอน
                              </span>
                            </div>
                            <p className="text-[#344054] text-xs leading-relaxed">{item.reply}</p>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="rounded-2xl border border-dashed border-[#D0D5DD] p-8 text-center text-xs text-[#667085]">
                      ยังไม่มีคำถามในบทเรียนนี้ มีข้อสงสัยจุดไหนสามารถพิมพ์ถามพี่โต๋ได้เลยด้านบนครับ! 💬
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 5: NOTES */}
            {activeTab === "notes" && (
              <div className="space-y-6">
                <form onSubmit={handleAddNote} className="rounded-2xl border border-[#EAECF0] bg-white p-5 shadow-unt-xs space-y-3">
                  <h4 className="text-xs font-bold text-[#101828] flex items-center gap-1.5">
                    <Edit3 className="h-4 w-4 text-[#7F56D9]" />
                    บันทึกความเข้าใจส่วนตัว
                  </h4>
                  <textarea
                    rows={3}
                    value={newNoteInput}
                    onChange={(e) => setNewNoteInput(e.target.value)}
                    placeholder="พิมพ์โน้ตสรุป สูตรลัด หรือข้อสังเกตที่คุณค้นพบในบทเรียนนี้..."
                    className="w-full rounded-xl border border-[#D0D5DD] p-3 text-xs text-[#101828] placeholder:text-[#667085] shadow-unt-xs focus:border-[#7F56D9] focus:outline-none resize-none"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={!newNoteInput.trim()}
                      className="rounded-xl bg-[#7F56D9] px-5 py-2 text-xs font-bold text-white shadow-unt-xs hover:bg-[#6941C6] disabled:opacity-50"
                    >
                      บันทึกโน้ตนี้
                    </button>
                  </div>
                </form>

                <div className="space-y-3">
                  {notes.length > 0 ? (
                    notes.map((note) => (
                      <div
                        key={note.id}
                        className="rounded-2xl border border-[#EAECF0] bg-white p-4 shadow-unt-xs flex items-start justify-between gap-4 text-xs"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="rounded bg-[#F4EBFF] px-2 py-0.5 text-[11px] font-bold text-[#7F56D9] font-mono border border-[#E9D7FE]">
                              ⏱️ {note.timestamp}
                            </span>
                            <span className="text-[11px] text-[#667085]">{note.lessonTitle}</span>
                          </div>
                          <p className="text-[#344054] leading-relaxed pt-1">{note.text}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-2xl border border-dashed border-[#D0D5DD] p-8 text-center text-xs text-[#667085]">
                      ยังไม่มีโน้ตที่บันทึกไว้สำหรับบทเรียนนี้ 📝
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Curriculum Sidebar */}
        {sidebarOpen && (
          <aside className="w-80 sm:w-96 border-l border-[#EAECF0] bg-white flex flex-col shrink-0">
            <div className="p-4 border-b border-[#EAECF0] bg-[#F9FAFB]">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs sm:text-sm font-bold text-[#101828]">สารบัญบทเรียน</h3>
                <span className="text-xs font-bold text-[#7F56D9]">
                  {completedLessonIds.length}/{allLessons.length} เสร็จสิ้น ({progressPercentage}%)
                </span>
              </div>

              {/* Progress Bar */}
              <div className="h-2 w-full rounded-full bg-[#EAECF0] overflow-hidden mb-3">
                <div
                  className="h-full bg-gradient-to-r from-[#7F56D9] to-[#12B76A] rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#667085]" />
                <input
                  type="text"
                  placeholder="ค้นหาชื่อตอน..."
                  value={sidebarSearch}
                  onChange={(e) => setSidebarSearch(e.target.value)}
                  className="w-full rounded-xl border border-[#D0D5DD] bg-white py-1.5 pl-8 pr-3 text-xs text-[#101828] shadow-unt-xs focus:border-[#7F56D9] focus:outline-none"
                />
              </div>
            </div>

            {/* Chapters & Lessons Accordion List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-4">
              {filteredChapters.map((chapter) => (
                <div key={chapter.id} className="space-y-1.5">
                  <p className="px-2 text-[11px] font-bold text-[#667085] uppercase tracking-wider">
                    {chapter.title}
                  </p>
                  <div className="space-y-1">
                    {chapter.lessons.map((lesson) => {
                      const isActive = activeLesson.id === lesson.id;
                      const isCompleted = completedLessonIds.includes(lesson.id);

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => setActiveLesson(lesson)}
                          className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs text-left transition-all ${
                            isActive
                              ? "bg-[#F4EBFF] text-[#7F56D9] font-bold border border-[#E9D7FE] shadow-unt-xs"
                              : "hover:bg-[#F9FAFB] text-[#344054]"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            {isCompleted ? (
                              <CheckCircle2 className="h-4 w-4 text-[#12B76A] shrink-0" />
                            ) : (
                              <Circle className="h-4 w-4 text-[#D0D5DD] shrink-0" />
                            )}
                            <span className="truncate">{lesson.title}</span>
                          </div>
                          <span className="text-[10px] text-[#667085] font-mono shrink-0 ml-2">
                            {Math.floor(lesson.durationSeconds / 60)} นาที
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </aside>
        )}
      </div>

      {/* PDF Viewer Interactive Modal with DRM Watermark */}
      <PdfViewerModal
        isOpen={pdfModalOpen}
        onClose={() => setPdfModalOpen(false)}
        title={pdfModalTitle}
        pdfUrl={pdfModalUrl}
        studentName={studentName}
        studentEmail={currentUser?.email || "student@ptoh.edu"}
      />
    </div>
  );
}
