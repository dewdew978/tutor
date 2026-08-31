"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  BookOpen, 
  Play, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Search, 
  Filter, 
  Sparkles, 
  FileText, 
  Download, 
  Flame, 
  Calendar, 
  GraduationCap, 
  ChevronRight, 
  ShieldCheck, 
  MessageSquare,
  Lock,
  Loader2,
  LogIn,
  TrendingUp
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import { getStudentEnrolledCourses } from "@/lib/data-service";
import { CourseItem } from "@/lib/types";

interface EnrolledCourseProgress {
  course: CourseItem;
  progressPercent: number;
  completedLessons: number;
  totalLessons: number;
  lastLessonTitle: string;
  lastLessonId: string;
  lastWatchedDate: string;
  totalStudyHours: number;
}

export default function MyCoursesPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<"ALL" | "IN_PROGRESS" | "COMPLETED">("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Student Enrolled Courses Data
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourseProgress[]>([]);

  // Check Supabase Auth & Fetch Real Enrolled Courses
  useEffect(() => {
    let isMounted = true;
    async function loadUserAndEnrollments() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!isMounted) return;
        setUser(user);
        if (user) {
          const courses = await getStudentEnrolledCourses(user.id);
          if (isMounted) setEnrolledCourses(courses);
        } else {
          if (isMounted) setEnrolledCourses([]);
        }
      } catch (e) {
        console.error("Auth / Enrollment error:", e);
      } finally {
        if (isMounted) setAuthLoading(false);
      }
    }
    loadUserAndEnrollments();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!isMounted) return;
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        const courses = await getStudentEnrolledCourses(currentUser.id);
        if (isMounted) setEnrolledCourses(courses);
      } else {
        if (isMounted) setEnrolledCourses([]);
      }
      setAuthLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Filtered Courses
  const filteredCourses = enrolledCourses.filter((item) => {
    const matchesSearch = item.course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.course.category.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (activeFilter === "IN_PROGRESS") return item.progressPercent < 100;
    if (activeFilter === "COMPLETED") return item.progressPercent === 100;
    return true;
  });

  // Calculate Overall Statistics
  const totalCoursesCount = enrolledCourses.length;
  const completedCount = enrolledCourses.filter((c) => c.progressPercent === 100).length;
  const inProgressCount = enrolledCourses.filter((c) => c.progressPercent < 100).length;
  const totalHours = enrolledCourses.reduce((acc, c) => acc + c.totalStudyHours, 0);
  const avgProgress = Math.round(
    enrolledCourses.reduce((acc, c) => acc + c.progressPercent, 0) / (totalCoursesCount || 1)
  );

  const studentDisplayName = user?.user_metadata?.full_name || 
                             (user?.email ? user.email.split("@")[0] : "นักเรียนของพี่โต๋");

  // 1. Loading Authentication State
  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F9FAFB] text-[#101828]">
        <Header />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-[#7F56D9]" />
            <p className="text-xs font-semibold text-[#667085]">กำลังตรวจสอบสิทธิ์การเข้าใช้งาน...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // 2. Authentication Required Guard
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F9FAFB] text-[#101828]">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4 sm:p-6 py-20">
          <div className="w-full max-w-md rounded-3xl border border-[#EAECF0] bg-white p-8 shadow-unt-xl text-center space-y-6 animate-in fade-in-50 duration-200">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F4EBFF] text-[#7F56D9] border border-[#E9D7FE] shadow-unt-xs">
              <Lock className="h-8 w-8" />
            </div>

            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F4EBFF] px-3 py-1 text-xs font-bold text-[#7F56D9] border border-[#E9D7FE]">
                <Sparkles className="h-3.5 w-3.5" />
                <span>สำหรับสมาชิก</span>
              </span>
              <h1 className="text-2xl font-extrabold text-[#101828] tracking-tight">
                กรุณาเข้าสู่ระบบ
              </h1>
              <p className="text-xs text-[#667085] leading-relaxed max-w-xs mx-auto">
                เข้าสู่ระบบเพื่อดูคอร์สเรียนทั้งหมดที่คุณได้ลงทะเบียนไว้ บันทึกความก้าวหน้า และดาวน์โหลดชีทสรุป
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <Link
                href="/login?redirect=/my-courses"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#7F56D9] py-3 px-4 text-xs font-bold text-white shadow-unt-xs hover:bg-[#6941C6] focus:ring-4 focus:ring-[#F4EBFF] transition-all"
              >
                <LogIn className="h-4 w-4" />
                <span>เข้าสู่ระบบ (Log in)</span>
              </Link>

              <Link
                href="/signup?redirect=/my-courses"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-[#D0D5DD] bg-white py-3 px-4 text-xs font-bold text-[#344054] hover:bg-[#F9FAFB] shadow-unt-xs transition-all"
              >
                <span>สมัครสมาชิกใหม่</span>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB] text-[#101828]">
      <Header />

      <main className="flex-1 pb-20">
        {/* Top Hero Banner */}
        <section className="bg-gradient-to-b from-white via-[#F9F5FF]/40 to-[#F9FAFB] border-b border-[#EAECF0] pt-10 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#F4EBFF] px-3.5 py-1 text-xs font-bold text-[#7F56D9] border border-[#E9D7FE]">
                  <GraduationCap className="h-3.5 w-3.5" />
                  <span>Student Learning Dashboard</span>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#101828] tracking-tight">
                  คอร์สเรียนของฉัน ({studentDisplayName}) 🎓
                </h1>
                <p className="text-xs sm:text-sm text-[#475467] max-w-2xl leading-relaxed">
                  ยินดีต้อนรับกลับสู่ห้องเรียนครับ! เข้าเรียนต่อเนื่อง ดูสรุปความก้าวหน้า และดาวน์โหลดเอกสารประกอบการเรียน
                </p>
              </div>

              {/* Quick Resume CTA Button */}
              {enrolledCourses.length > 0 && (
                <div className="shrink-0">
                  <Link
                    href={`/learn/${enrolledCourses[0].course.slug}`}
                    className="inline-flex items-center gap-2 rounded-2xl bg-[#7F56D9] px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-unt-md hover:bg-[#6941C6] hover:shadow-unt-lg transition-all"
                  >
                    <Play className="h-4 w-4 fill-white" />
                    <span>เรียนต่อบทล่าสุดทันที</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              )}
            </div>

            {/* Student Stats Summary Bar */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-8 border-t border-[#EAECF0]">
              <div className="rounded-2xl bg-white p-4 sm:p-5 border border-[#EAECF0] shadow-unt-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#667085]">คอร์สที่ลงทะเบียน</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F4EBFF] text-[#7F56D9]">
                    <BookOpen className="h-4 w-4" />
                  </div>
                </div>
                <p className="text-xl sm:text-2xl font-extrabold text-[#101828] mt-2">{totalCoursesCount} คอร์ส</p>
                <span className="text-[11px] text-[#027A48] font-medium block mt-0.5">เข้าเรียนได้ตลอดชีพ</span>
              </div>

              <div className="rounded-2xl bg-white p-4 sm:p-5 border border-[#EAECF0] shadow-unt-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#667085]">ชั่วโมงที่เรียนแล้ว</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#ECFDF3] text-[#027A48]">
                    <Clock className="h-4 w-4" />
                  </div>
                </div>
                <p className="text-xl sm:text-2xl font-extrabold text-[#101828] mt-2">{totalHours} ชม.</p>
                <span className="text-[11px] text-[#667085] font-medium block mt-0.5">รวมทุกบทเรียนที่รับชม</span>
              </div>

              <div className="rounded-2xl bg-white p-4 sm:p-5 border border-[#EAECF0] shadow-unt-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#667085]">ความก้าวหน้าเฉลี่ย</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FEF0C7] text-[#B54708]">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                </div>
                <p className="text-xl sm:text-2xl font-extrabold text-[#101828] mt-2">{avgProgress}%</p>
                <span className="text-[11px] text-[#7F56D9] font-medium block mt-0.5">กำลังเรียน {inProgressCount} คอร์ส</span>
              </div>

              <div className="rounded-2xl bg-white p-4 sm:p-5 border border-[#EAECF0] shadow-unt-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#667085]">คอร์สที่เรียนจบแล้ว</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#ECFDF3] text-[#027A48]">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                </div>
                <p className="text-xl sm:text-2xl font-extrabold text-[#101828] mt-2">{completedCount} คอร์ส</p>
                <span className="text-[11px] text-[#027A48] font-medium block mt-0.5">สำเร็จหลักสูตร 100%</span>
              </div>
            </div>
          </div>
        </section>

        {/* Course List Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          {/* Controls Bar: Filters & Search */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#F2F4F7] border border-[#EAECF0] w-fit">
              <button
                onClick={() => setActiveFilter("ALL")}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === "ALL"
                    ? "bg-white text-[#7F56D9] shadow-unt-xs"
                    : "text-[#667085] hover:text-[#101828]"
                }`}
              >
                ทั้งหมด ({totalCoursesCount})
              </button>
              <button
                onClick={() => setActiveFilter("IN_PROGRESS")}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === "IN_PROGRESS"
                    ? "bg-white text-[#7F56D9] shadow-unt-xs"
                    : "text-[#667085] hover:text-[#101828]"
                }`}
              >
                กำลังเรียนอยู่ ({inProgressCount})
              </button>
              <button
                onClick={() => setActiveFilter("COMPLETED")}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === "COMPLETED"
                    ? "bg-white text-[#7F56D9] shadow-unt-xs"
                    : "text-[#667085] hover:text-[#101828]"
                }`}
              >
                เรียนจบแล้ว ({completedCount})
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#667085]" />
              <input
                type="text"
                placeholder="ค้นหาชื่อคอร์สของฉัน..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-[#D0D5DD] bg-white py-2 pl-10 pr-4 text-xs text-[#101828] shadow-unt-xs focus:border-[#7F56D9] focus:outline-none"
              />
            </div>
          </div>

          {/* Enrolled Courses Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((item) => {
                const { course, progressPercent, completedLessons, totalLessons, lastLessonTitle, lastWatchedDate } = item;
                const isCompleted = progressPercent === 100;

                return (
                  <div
                    key={course.id}
                    className="group rounded-3xl border border-[#EAECF0] bg-white overflow-hidden shadow-unt-xs hover:shadow-unt-lg hover:border-[#D0D5DD] transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Top: Thumbnail & Category Badge */}
                    <div>
                      <div className="relative aspect-video w-full overflow-hidden bg-[#F2F4F7]">
                        <img
                          src={course.coverImage}
                          alt={course.title}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="rounded-full bg-white/95 backdrop-blur-sm px-3 py-1 text-[11px] font-bold text-[#7F56D9] shadow-unt-xs">
                            {course.category}
                          </span>
                        </div>
                      </div>

                      {/* Course Meta Info */}
                      <div className="p-5 sm:p-6 space-y-4">
                        <div>
                          <h3 className="text-base sm:text-lg font-bold text-[#101828] group-hover:text-[#7F56D9] transition-colors line-clamp-2">
                            {course.title}
                          </h3>
                          <p className="text-xs text-[#667085] mt-1 line-clamp-1">
                            {course.subtitle}
                          </p>
                        </div>

                        {/* Progress Bar & Stats */}
                        <div className="space-y-2 pt-2 border-t border-[#EAECF0]">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-[#344054]">
                              ความก้าวหน้าการเรียน
                            </span>
                            <span className="font-bold text-[#7F56D9]">
                              {progressPercent}%
                            </span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-[#EAECF0]">
                            <div
                              className="h-full rounded-full bg-[#7F56D9] transition-all duration-500"
                              style={{ width: `${progressPercent}%` }}
                            />
                          </div>
                          <div className="flex items-center justify-between text-[11px] text-[#667085] pt-0.5">
                            <span>เรียนจบแล้ว {completedLessons}/{totalLessons} บท</span>
                            {isCompleted && (
                              <span className="inline-flex items-center gap-1 font-bold text-[#027A48]">
                                <CheckCircle2 className="h-3 w-3" /> จบหลักสูตรแล้ว
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Last Watched & Action */}
                        <div className="rounded-xl bg-[#F9FAFB] p-3 text-xs space-y-1">
                          <span className="text-[10px] text-[#667085] block">
                            บทเรียนล่าสุด:
                          </span>
                          <p className="font-semibold text-[#344054] line-clamp-1">
                            {lastLessonTitle}
                          </p>
                          <span className="text-[10px] text-[#98A2B3] flex items-center gap-1">
                            <Clock className="h-3 w-3" /> ดูล่าสุด: {lastWatchedDate}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action CTA */}
                    <div className="p-5 sm:p-6 pt-0 space-y-2">
                      <Link
                        href={`/learn/${course.slug}`}
                        className={`w-full inline-flex items-center justify-center gap-2 rounded-xl py-3 text-xs sm:text-sm font-bold transition-all shadow-unt-xs ${
                          isCompleted
                            ? "bg-[#F4EBFF] text-[#7F56D9] hover:bg-[#E9D7FE]"
                            : "bg-[#7F56D9] text-white hover:bg-[#6941C6] hover:shadow-unt-sm"
                        }`}
                      >
                        <Play className="h-3.5 w-3.5 fill-current" />
                        <span>{isCompleted ? "ทบทวนบทเรียนซ้ำ" : "เข้าห้องเรียนต่อ"}</span>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div className="rounded-3xl border border-[#EAECF0] bg-white p-12 text-center space-y-4 shadow-unt-xs">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F4EBFF] text-[#7F56D9] mx-auto">
                <BookOpen className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold text-[#101828]">
                {totalCoursesCount === 0 ? "คุณยังไม่ได้ลงทะเบียนเรียนคอร์สใดๆ" : "ไม่พบคอร์สเรียนที่ค้นหา"}
              </h3>
              <p className="text-xs text-[#667085] max-w-sm mx-auto">
                {totalCoursesCount === 0
                  ? "เลือกสมัครคอร์สเรียนคณิตศาสตร์และฟิสิกส์ ม.ปลาย กับพี่โต๋ เพื่อเริ่มเรียนได้ทันทีครับ"
                  : "ไม่มีคอร์สเรียนที่ตรงกับคำค้นหาหรือตัวกรองของคุณ"}
              </p>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 rounded-xl bg-[#7F56D9] px-6 py-2.5 text-xs font-bold text-white shadow-unt-xs hover:bg-[#6941C6]"
              >
                <span>เลือกดูคอร์สเรียนทั้งหมด</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}

          {/* Quick Help Box with P'Toh */}
          <div className="mt-12 rounded-3xl bg-gradient-to-r from-[#53389E] via-[#6941C6] to-[#7F56D9] p-6 sm:p-8 text-white shadow-unt-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white border border-white/30 backdrop-blur-xs">
                <Sparkles className="h-3.5 w-3.5" />
                <span>สอบถามโจทย์กับพี่โต๋โดยตรง</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                ติดขัดตรงไหน หรือมีข้อสงสัยในบทเรียน?
              </h2>
              <p className="text-xs sm:text-sm text-[#E9D7FE] max-w-xl">
                นักเรียนสามารถโพสต์คำถามในแท็บ Q&A ใต้วิดีโอแต่ละคลิป หรือส่งข้อความปรึกษาผ่าน LINE Official ได้ตลอดเวลาครับ
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href="https://line.me"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-white px-5 py-3 text-xs font-bold text-[#6941C6] shadow-unt-sm hover:bg-[#F9FAFB] transition-all"
              >
                ทัก LINE ปรึกษาพี่โต๋
              </a>
              <Link
                href="/courses"
                className="rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 px-5 py-3 text-xs font-bold text-white transition-all"
              >
                สมัครคอร์สเพิ่ม
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
