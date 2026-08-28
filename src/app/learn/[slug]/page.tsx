"use client";

import { use, useState } from "react";
import Link from "next/link";
import { 
  Play, 
  CheckCircle, 
  Circle, 
  FileText, 
  Download, 
  MessageSquare, 
  ArrowLeft, 
  Sparkles,
  Send,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Edit3,
  Check,
  Search,
  CheckCircle2,
  ThumbsUp
} from "lucide-react";
import { VideoPlayer } from "@/components/VideoPlayer";
import { MOCK_COURSES, LessonItem } from "@/lib/mock-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function LearnClassroomPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const course = MOCK_COURSES.find((c) => c.slug === resolvedParams.slug) || MOCK_COURSES[0];

  const allLessons: LessonItem[] = course.chapters.flatMap((ch) => ch.lessons);
  const [activeLesson, setActiveLesson] = useState<LessonItem>(allLessons[0] || {
    id: "default",
    title: "บทเรียนแรก",
    description: "",
    durationSeconds: 1200,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    isFreePreview: true,
  });

  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([allLessons[0]?.id || ""]);
  const [activeTab, setActiveTab] = useState<"overview" | "resources" | "qa" | "notes">("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarSearch, setSidebarSearch] = useState("");

  // Student Personal Notes State
  const [notes, setNotes] = useState<{ id: string; timestamp: string; text: string; lessonTitle: string }[]>([
    {
      id: "note-1",
      timestamp: "04:15",
      lessonTitle: "1.1 ภาพรวมแคลคูลัสและการหาลิมิตพื้นฐาน",
      text: "ถ้าเจอรูป 0/0 ให้ลองแยกตัวประกอบ หรือคูณด้วยสังยุค (Conjugate) ดูก่อนเสมอ",
    },
  ]);
  const [newNoteInput, setNewNoteInput] = useState("");

  // Q&A State
  const [questions, setQuestions] = useState([
    {
      id: "q1",
      studentName: "น้องกานต์ (เตรียมอุดมฯ)",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
      time: "2 ชั่วโมงที่แล้ว",
      lessonName: "1.1 ภาพรวมแคลคูลัส",
      question: "ตรงกฎโลปิตาล ถ้าดิฟแล้วยังได้ 0/0 อยู่ สามารถดิฟรอบที่ 2 ต่อได้เลยไหมครับพี่โต๋?",
      likes: 8,
      reply: "ดิฟต่อได้เลยครับน้องกานต์! ตราบใดที่ยังอยู่ในรูป indeterminate form (0/0 หรือ inf/inf) สามารถทำซ้ำได้เรื่อยๆ เลยครับ อย่าลืมเช็คเงื่อนไขก่อนดิฟทุกครั้งนะ",
      replyBy: "พี่โต๋ (ผู้สอน)",
    },
    {
      id: "q2",
      studentName: "น้องเต๋า (สวนกุหลาบ)",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150",
      time: "1 วันที่แล้ว",
      lessonName: "1.2 กฎของโลปิตาล",
      question: "พี่โต๋ครับ ข้อ 4 ในชีท โจทย์กำหนด f(x) ต่อเนื่อง เราต้องเช็คลิมิตซ้ายเท่ากับลิมิตขวาด้วยใช่ไหมครับ?",
      likes: 4,
      reply: "ถูกต้องครับน้องเต๋า ความต่อเนื่องต้องครบ 3 เงื่อนไข: 1. หาค่า f(a) ได้ 2. ลิมิตซ้าย=ขวา 3. ลิมิตเท่ากับค่า f(a) ครับ",
      replyBy: "พี่โต๋ (ผู้สอน)",
    },
  ]);
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
        studentName: "คุณ (นักเรียน)",
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
  const filteredChapters = course.chapters.map((ch) => ({
    ...ch,
    lessons: ch.lessons.filter((l) =>
      l.title.toLowerCase().includes(sidebarSearch.toLowerCase())
    ),
  })).filter((ch) => ch.lessons.length > 0);

  return (
    <div className="flex h-screen flex-col bg-[#F9FAFB] text-[#101828] overflow-hidden font-sans">
      {/* ========================================================================= */}
      {/* CLASSROOM TOP NAVBAR (Untitled UI Clean White App Header)                 */}
      {/* ========================================================================= */}
      <header className="flex h-16 items-center justify-between border-b border-[#EAECF0] bg-white px-4 sm:px-6 shrink-0 z-20">
        <div className="flex items-center gap-4 min-w-0">
          <Link
            href={`/courses/${course.slug}`}
            className="flex items-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-3 py-1.5 text-xs font-semibold text-[#344054] shadow-unt-xs hover:bg-[#F9FAFB] transition-colors shrink-0"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">รายละเอียดคอร์ส</span>
          </Link>

          <div className="h-5 w-px bg-[#EAECF0] hidden sm:block shrink-0" />

          {/* Title & Chapter Breadcrumb */}
          <div className="min-w-0 truncate">
            <span className="text-[11px] font-semibold text-[#7F56D9] hidden md:inline-block">
              {course.category} • {course.instructor.name}
            </span>
            <h1 className="text-xs sm:text-sm font-bold text-[#101828] truncate">
              {course.title}
            </h1>
          </div>
        </div>

        {/* Center/Right Controls: Progress & Sidebar Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Progress Tracker Pill */}
          <div className="hidden sm:flex items-center gap-2.5 rounded-full bg-[#F9F5FF] px-3.5 py-1 text-xs font-semibold text-[#7F56D9] border border-[#E9D7FE]">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#12B76A]" />
            <span>เรียนแล้ว {completedLessonIds.length}/{allLessons.length} ตอน</span>
            <span className="rounded-full bg-[#7F56D9] px-2 py-0.5 text-[10px] text-white">
              {progressPercentage}%
            </span>
          </div>

          {/* Sidebar Toggle Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="rounded-lg border border-[#D0D5DD] bg-white p-2 text-[#475467] hover:bg-[#F9FAFB] shadow-unt-xs transition-colors"
            title="เปิด/ปิด แถบสารบัญบทเรียน"
          >
            {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* MAIN VIEWPORT: BESPOKE VIDEO PLAYER + WORKSPACE + PLAYLIST SIDEBAR        */}
      {/* ========================================================================= */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Side: Video Viewport & Content Tabs */}
        <div className="flex flex-1 flex-col overflow-y-auto bg-[#F9FAFB]">
          {/* Cinema-Grade Video Player Box with Custom VideoPlayer Component */}
          <div className="bg-[#0C111D] p-3 sm:p-6 flex items-center justify-center shrink-0 border-b border-[#1D2939]">
            <VideoPlayer
              key={activeLesson.videoUrl}
              src={activeLesson.videoUrl}
              title={activeLesson.title}
              watermarkText={`P'Toh Tutor • รหัสนักเรียน: 10482`}
              onEnded={() => {
                if (!completedLessonIds.includes(activeLesson.id)) {
                  setCompletedLessonIds((prev) => [...prev, activeLesson.id]);
                }
              }}
              nextLessonTitle={nextLesson?.title}
              onNextLesson={nextLesson ? () => setActiveLesson(nextLesson) : undefined}
            />
          </div>

          {/* Lesson Header Banner & Complete Button */}
          <div className="border-b border-[#EAECF0] bg-white px-4 py-5 sm:px-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#F4EBFF] px-2.5 py-0.5 text-[11px] font-bold text-[#7F56D9] border border-[#E9D7FE]">
                    <Sparkles className="h-3 w-3" />
                    กำลังเรียนอยู่
                  </span>
                  <span className="text-xs text-[#667085]">
                    ความยาว {Math.floor(activeLesson.durationSeconds / 60)} นาที
                  </span>
                </div>
                <h2 className="text-lg sm:text-2xl font-extrabold text-[#101828]">
                  {activeLesson.title}
                </h2>
              </div>

              {/* Action Buttons: Prev, Complete Toggle, Next */}
              <div className="flex flex-wrap items-center gap-2.5">
                {prevLesson && (
                  <button
                    onClick={() => setActiveLesson(prevLesson)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#D0D5DD] bg-white px-3.5 py-2 text-xs font-semibold text-[#344054] shadow-unt-xs hover:bg-[#F9FAFB] transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>บทก่อนหน้า</span>
                  </button>
                )}

                <button
                  onClick={() => toggleLessonComplete(activeLesson.id)}
                  className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all shadow-unt-xs ${
                    completedLessonIds.includes(activeLesson.id)
                      ? "bg-[#ECFDF3] text-[#027A48] border border-[#ABEFC6] hover:bg-[#D1FADF]"
                      : "bg-[#7F56D9] text-white hover:bg-[#6941C6] focus:outline-none focus:ring-4 focus:ring-[#F4EBFF]"
                  }`}
                >
                  {completedLessonIds.includes(activeLesson.id) ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-[#12B76A]" />
                      เรียนจบแล้ว (สำเร็จ)
                    </>
                  ) : (
                    <>
                      <Circle className="h-4 w-4" />
                      ทำเครื่องหมายว่าเรียนจบแล้ว
                    </>
                  )}
                </button>

                {nextLesson && (
                  <button
                    onClick={() => setActiveLesson(nextLesson)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#D0D5DD] bg-white px-3.5 py-2 text-xs font-semibold text-[#344054] shadow-unt-xs hover:bg-[#F9FAFB] transition-colors"
                  >
                    <span>บทถัดไป</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Navigation Workspace Tabs */}
            <div className="flex items-center gap-8 mt-6 border-b border-[#EAECF0] text-xs font-semibold overflow-x-auto">
              <button
                onClick={() => setActiveTab("overview")}
                className={`pb-3.5 border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
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
                className={`pb-3.5 border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
                  activeTab === "resources"
                    ? "border-[#7F56D9] text-[#7F56D9] font-bold"
                    : "border-transparent text-[#667085] hover:text-[#101828]"
                }`}
              >
                <FileText className="h-4 w-4" />
                <span>เอกสารดาวน์โหลด (PDF)</span>
              </button>

              <button
                onClick={() => setActiveTab("qa")}
                className={`pb-3.5 border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
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
                className={`pb-3.5 border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
                  activeTab === "notes"
                    ? "border-[#7F56D9] text-[#7F56D9] font-bold"
                    : "border-transparent text-[#667085] hover:text-[#101828]"
                }`}
              >
                <Edit3 className="h-4 w-4" />
                <span>สมุดโน้ตส่วนตัว ({notes.length})</span>
              </button>
            </div>
          </div>

          {/* Tab Content Panels */}
          <div className="p-4 sm:p-8 max-w-4xl">
            {/* TAB 1: LESSON OVERVIEW & TIMESTAMPS */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="rounded-2xl border border-[#EAECF0] bg-white p-6 shadow-unt-xs space-y-3">
                  <h3 className="text-base font-bold text-[#101828]">
                    ภาพรวมและเป้าหมายของบทนี้
                  </h3>
                  <p className="text-xs sm:text-sm text-[#475467] leading-relaxed">
                    {activeLesson.description || "เรียนรู้คอนเซปต์สำคัญและการวิเคราะห์โจทย์ประยุกต์ พร้อมตัวอย่างข้อสอบจริง"}
                  </p>
                </div>

                {/* Key Formula Highlights */}
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

            {/* TAB 2: COURSE FILES & PDF ATTACHMENTS */}
            {activeTab === "resources" && (
              <div className="space-y-4">
                <div className="rounded-2xl border border-[#EAECF0] bg-white p-5 shadow-unt-xs flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FEE4E2] text-[#D92D20]">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#101828]">
                        ชีทสรุปสูตรและแบบฝึกหัดบทที่ 1 (PDF 4 สี)
                      </h4>
                      <p className="text-xs text-[#667085] mt-0.5">ขนาดไฟล์ 3.4 MB • พร้อมเฉลยละเอียดและโจทย์ A-Level</p>
                    </div>
                  </div>

                  <a
                    href="#"
                    download
                    className="inline-flex items-center gap-2 rounded-lg bg-[#7F56D9] px-4 py-2.5 text-xs font-bold text-white shadow-unt-xs hover:bg-[#6941C6] transition-all"
                  >
                    <Download className="h-4 w-4" />
                    ดาวน์โหลดชีท
                  </a>
                </div>

                <div className="rounded-2xl border border-[#EAECF0] bg-white p-5 shadow-unt-xs flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FEF0C7] text-[#B54708]">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#101828]">
                        โจทย์เสริมทบทวนเตรียมสอบ A-Level ชุดที่ 1
                      </h4>
                      <p className="text-xs text-[#667085] mt-0.5">ขนาดไฟล์ 1.8 MB • รวม 20 ข้อเด็ดพร้อมเฉลย</p>
                    </div>
                  </div>

                  <a
                    href="#"
                    download
                    className="inline-flex items-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-4 py-2.5 text-xs font-bold text-[#344054] shadow-unt-xs hover:bg-[#F9FAFB] transition-all"
                  >
                    <Download className="h-4 w-4" />
                    ดาวน์โหลดโจทย์
                  </a>
                </div>
              </div>
            )}

            {/* TAB 3: Q&A DISCUSSION WITH P'TOH */}
            {activeTab === "qa" && (
              <div className="space-y-6">
                {/* Form to submit question */}
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
                    className="w-full rounded-xl border border-[#D0D5DD] p-3 text-xs text-[#101828] placeholder:text-[#667085] shadow-unt-xs focus:border-[#7F56D9] focus:outline-none focus:ring-4 focus:ring-[#F4EBFF] resize-none"
                  />
                  <div className="flex justify-between items-center pt-2 border-t border-[#EAECF0]">
                    <span className="text-[11px] text-[#667085]">
                      พี่โต๋จะเข้ามาตอบกลับคำถามด้วยตัวเองภายใน 24 ชม.
                    </span>
                    <button
                      type="submit"
                      disabled={!newQuestionText.trim()}
                      className="inline-flex items-center gap-2 rounded-lg bg-[#7F56D9] px-5 py-2 text-xs font-bold text-white shadow-unt-xs hover:bg-[#6941C6] disabled:opacity-50 transition-all"
                    >
                      <Send className="h-3.5 w-3.5" />
                      ส่งคำถาม
                    </button>
                  </div>
                </form>

                {/* Q&A Thread List */}
                <div className="space-y-4">
                  {questions.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-[#EAECF0] bg-white p-5 shadow-unt-xs space-y-3 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={item.avatar}
                            alt=""
                            className="h-8 w-8 rounded-full object-cover border border-[#EAECF0]"
                          />
                          <div>
                            <span className="font-bold text-[#101828]">{item.studentName}</span>
                            <p className="text-[10px] text-[#667085]">{item.lessonName} • {item.time}</p>
                          </div>
                        </div>
                        <span className="text-[11px] text-[#667085] font-semibold flex items-center gap-1">
                          <ThumbsUp className="h-3.5 w-3.5 text-[#7F56D9]" /> {item.likes} ถูกใจ
                        </span>
                      </div>

                      <p className="text-[#344054] leading-relaxed pl-10">
                        {item.question}
                      </p>

                      {/* Verified Tutor Reply Box */}
                      {item.reply && (
                        <div className="ml-10 rounded-xl bg-[#F9F5FF] border border-[#E9D7FE] p-4 space-y-2">
                          <div className="flex items-center gap-2 text-xs font-bold text-[#7F56D9]">
                            <img
                              src={course.instructor.avatar}
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
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: TIMESTAMPTED PERSONAL NOTES */}
            {activeTab === "notes" && (
              <div className="space-y-6">
                <form onSubmit={handleAddNote} className="rounded-2xl border border-[#EAECF0] bg-white p-5 shadow-unt-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-[#101828] flex items-center gap-1.5">
                      <Edit3 className="h-4 w-4 text-[#7F56D9]" />
                      บันทึกความเข้าใจส่วนตัว
                    </h4>
                    <span className="text-[11px] font-semibold text-[#7F56D9] bg-[#F4EBFF] px-2 py-0.5 rounded-md border border-[#E9D7FE]">
                      บันทึกสูตรและข้อสังเกต ⏱️
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    value={newNoteInput}
                    onChange={(e) => setNewNoteInput(e.target.value)}
                    placeholder="พิมพ์โน้ตสรุป สูตรลัด หรือข้อสังเกตที่คุณค้นพบในบทเรียนนี้..."
                    className="w-full rounded-xl border border-[#D0D5DD] p-3 text-xs text-[#101828] placeholder:text-[#667085] shadow-unt-xs focus:border-[#7F56D9] focus:outline-none focus:ring-4 focus:ring-[#F4EBFF] resize-none"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={!newNoteInput.trim()}
                      className="rounded-lg bg-[#7F56D9] px-5 py-2 text-xs font-bold text-white shadow-unt-xs hover:bg-[#6941C6] disabled:opacity-50"
                    >
                      บันทึกโน้ตนี้
                    </button>
                  </div>
                </form>

                {/* Notes List */}
                <div className="space-y-3">
                  {notes.map((note) => (
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
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT SIDEBAR: CURRICULUM PLAYLIST (Untitled UI Design)                   */}
        {/* ========================================================================= */}
        {sidebarOpen && (
          <aside className="w-80 sm:w-96 border-l border-[#EAECF0] bg-white flex flex-col shrink-0 shadow-unt-sm z-10">
            {/* Sidebar Header */}
            <div className="p-4 border-b border-[#EAECF0] bg-[#F9FAFB]">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-[#101828]">สารบัญบทเรียน</h3>
                <span className="text-xs font-semibold text-[#7F56D9]">
                  {completedLessonIds.length}/{allLessons.length} เสร็จสิ้น
                </span>
              </div>

              {/* Progress Bar */}
              <div className="h-1.5 w-full rounded-full bg-[#EAECF0] overflow-hidden mb-3">
                <div
                  className="h-full bg-[#7F56D9] rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>

              {/* Search Lesson Filter */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#667085]" />
                <input
                  type="text"
                  placeholder="ค้นหาชื่อตอน หรือสูตร..."
                  value={sidebarSearch}
                  onChange={(e) => setSidebarSearch(e.target.value)}
                  className="w-full rounded-lg border border-[#D0D5DD] bg-white py-1.5 pl-8 pr-3 text-xs text-[#101828] placeholder:text-[#667085] shadow-unt-xs focus:border-[#7F56D9] focus:outline-none"
                />
              </div>
            </div>

            {/* Chapters & Lessons Accordion List */}
            <div className="flex-1 overflow-y-auto divide-y divide-[#EAECF0]">
              {filteredChapters.map((chapter) => (
                <div key={chapter.id} className="py-2">
                  <div className="px-4 py-2 text-[11px] font-bold text-[#667085] uppercase tracking-wider bg-[#F9FAFB]/60">
                    {chapter.title}
                  </div>

                  <div className="space-y-0.5 mt-1">
                    {chapter.lessons.map((lesson) => {
                      const isActive = activeLesson.id === lesson.id;
                      const isCompleted = completedLessonIds.includes(lesson.id);

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => setActiveLesson(lesson)}
                          className={`w-full text-left flex items-start gap-3 px-4 py-3 text-xs transition-colors ${
                            isActive
                              ? "bg-[#F9F5FF] text-[#7F56D9] font-bold border-l-4 border-[#7F56D9]"
                              : "text-[#344054] hover:bg-[#F9FAFB]"
                          }`}
                        >
                          <div className="mt-0.5 shrink-0">
                            {isCompleted ? (
                              <CheckCircle className="h-4 w-4 text-[#12B76A] fill-[#12B76A]/20" />
                            ) : isActive ? (
                              <Play className="h-4 w-4 text-[#7F56D9] fill-[#7F56D9]" />
                            ) : (
                              <Circle className="h-4 w-4 text-[#D0D5DD]" />
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <p className={`truncate text-xs ${isActive ? "font-bold text-[#7F56D9]" : "font-medium"}`}>
                              {lesson.title}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5 text-[10px] text-[#667085]">
                              <span>{Math.floor(lesson.durationSeconds / 60)} นาที</span>
                              {lesson.isFreePreview && (
                                <span className="rounded bg-[#ECFDF3] px-1.5 text-[#027A48] font-semibold border border-[#ABEFC6]">
                                  ดูฟรี
                                </span>
                              )}
                            </div>
                          </div>
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
    </div>
  );
}
