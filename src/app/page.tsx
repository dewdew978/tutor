"use client";

import Link from "next/link";
import { 
  Sparkles, 
  ArrowRight, 
  PlayCircle,
  BookOpen,
  Award,
  MessageCircle,
  CheckCircle2
} from "lucide-react";
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CourseCard } from "@/components/CourseCard";
import { FAQSection } from "@/components/FAQSection";
import { getPublishedCourses, getMainTutor } from "@/lib/data-service";
import { CourseItem, TutorProfile } from "@/lib/types";

export default function HomePage() {
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [tutor, setTutor] = useState<TutorProfile | null>(null);

  useEffect(() => {
    getPublishedCourses().then(setCourses);
    getMainTutor().then(setTutor);
  }, []);

  const featuredCourses = courses.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#101828]">
      <Header />

      <main className="flex-1">
        {/* ========================================================================= */}
        {/* HERO SECTION                                                              */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 bg-gradient-to-b from-[#F9F5FF] via-white to-white">
          <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Headline & Value Proposition */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">

                {/* Main Headline */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#101828] leading-[1.12]">
                  เรียนคณิต & ฟิสิกส์ ม.ปลาย <br />
                  สู่คะแนน <span className="bg-gradient-to-r from-[#7F56D9] via-[#6941C6] to-[#53389E] bg-clip-text text-transparent">A-Level เต็มร้อย</span>
                </h1>

                {/* Subtitle */}
                <p className="text-sm sm:text-base lg:text-lg text-[#475467] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                  แพลตฟอร์มการเรียนรู้ออนไลน์สอนจาก Concept ลึกซึ้ง ลุยข้อสอบจริง 15 ปี ด้วยวิดีโอคุณภาพสูงและเอกสารสรุปสูตรครบถ้วน
                </p>

                {/* Dual CTA Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
                  <Link
                    href="/courses"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#7F56D9] px-7 py-3.5 text-sm sm:text-base font-bold text-white shadow-unt-sm hover:bg-[#6941C6] focus:outline-none focus:ring-4 focus:ring-[#F4EBFF] transition-all"
                  >
                    ดูคอร์สเรียนทั้งหมด ({courses.length || 3} หลักสูตร)
                    <ArrowRight className="h-4.5 w-4.5" />
                  </Link>

                  <Link
                    href="/learn/math-calculus-mastery"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-[#D0D5DD] bg-white px-6 py-3.5 text-sm sm:text-base font-bold text-[#344054] shadow-unt-xs hover:bg-[#F9FAFB] focus:outline-none focus:ring-4 focus:ring-[#F2F4F7] transition-all"
                  >
                    <PlayCircle className="h-5 w-5 text-[#7F56D9]" />
                    ทดลองเข้าห้องเรียนฟรี
                  </Link>
                </div>

                {/* Trust Points */}
                <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs sm:text-sm text-[#475467] font-medium">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-[#12B76A]" />
                    <span>เกียรตินิยมอันดับ 1 ดูแล 100%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-[#12B76A]" />
                    <span>สอบติดแพทย์-วิศวะ 1,000+ คน</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-[#12B76A]" />
                    <span>เข้าเรียนได้ตลอดชีพ พร้อม PDF สรุปสูตร</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Tutor Featured Card */}
              <div className="lg:col-span-5">
                <div className="relative mx-auto max-w-md rounded-3xl border border-[#D0D5DD] bg-white p-5 shadow-unt-2xl">
                  <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#F2F4F7] mb-4">
                    <img
                      src={tutor?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600"}
                      alt={tutor?.name || "พี่โต๋"}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101828] via-transparent to-transparent opacity-85" />

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#E9D7FE] mb-1">
                        <Award className="h-4 w-4 text-[#FDB022]" />
                        <span>เหรียญรางวัล โอลิมปิกวิชาการคณิตศาสตร์</span>
                      </div>
                      <h3 className="text-xl font-bold">{tutor?.name || "พี่โต๋ (P'Toh)"}</h3>
                      <p className="text-xs text-[#D0D5DD] line-clamp-1">{tutor?.headline || "เกียรตินิยมอันดับ 1"}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 divide-x divide-[#EAECF0] text-center text-xs pt-1">
                    <div>
                      <p className="font-extrabold text-[#101828] text-base">10+ ปี</p>
                      <span className="text-[10px] text-[#667085]">ประสบการณ์สอน</span>
                    </div>
                    <div>
                      <p className="font-extrabold text-[#7F56D9] text-base">{courses.length} คอร์ส</p>
                      <span className="text-[10px] text-[#667085]">เปิดสอนออนไลน์</span>
                    </div>
                    <div>
                      <p className="font-extrabold text-[#101828] text-base">{tutor?.rating || 5.0} ⭐</p>
                      <span className="text-[10px] text-[#667085]">คะแนนความพึงพอใจ</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* FEATURED COURSES SHOWCASE                                                 */}
        {/* ========================================================================= */}
        <section className="pt-16 pb-20 bg-[#F9FAFB] border-t border-[#EAECF0]">
          <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-[#F4EBFF] px-3 py-1 text-xs font-semibold text-[#7F56D9] mb-2">
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>คอร์สแนะนำยอดนิยม</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101828]">
                  คอร์สเรียนยอดฮิตประจำเทอมนี้
                </h2>
                <p className="text-xs sm:text-sm text-[#475467] mt-1">
                  คอร์สที่นักเรียนเลือกเรียนมากที่สุด ปูพื้นฐานแน่นและตะลุยข้อสอบจริงย้อนหลัง
                </p>
              </div>

              <Link
                href="/courses"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#7F56D9] hover:text-[#53389E] hover:underline"
              >
                ดูคอร์สเรียนทั้งหมด ({courses.length || 3} หลักสูตร) <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Course Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 rounded-xl border border-[#D0D5DD] bg-white px-6 py-3 text-xs font-bold text-[#344054] shadow-unt-xs hover:bg-[#F9FAFB] hover:text-[#101828] transition-all"
              >
                ดูคอร์สทั้งหมดตามระดับชั้น (ม.4, ม.5, ม.6, A-Level)
                <ArrowRight className="h-3.5 w-3.5 text-[#7F56D9]" />
              </Link>
            </div>
          </div>
        </section>



        {/* ========================================================================= */}
        {/* LINE CONSULTATION CTA BANNER                                              */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="rounded-3xl bg-gradient-to-r from-[#1D2939] via-[#101828] to-[#0C111D] p-8 sm:p-14 text-white shadow-unt-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="space-y-4 text-center lg:text-left max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-[#E9D7FE] border border-white/15">
                  💬 ปรึกษาแผนการเรียนฟรีกับพี่โต๋
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
                  ยังไม่แน่ใจว่าจะเริ่มเรียนบทไหนก่อนดี?
                </h3>
                <p className="text-xs sm:text-sm text-[#D0D5DD] leading-relaxed">
                  ทัก LINE มาคุยกับพี่โต๋และทีมวิชาการเพื่อประเมินพื้นฐานและวางแผนการเรียนให้ตรงเป้าหมายของคุณได้ฟรี
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
                <a
                  href="https://line.me"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#12B76A] px-7 py-3.5 text-xs sm:text-sm font-bold text-white shadow-unt-md hover:bg-[#0E9355] transition-all"
                >
                  <MessageCircle className="h-4.5 w-4.5" />
                  แอด LINE ปรึกษาฟรี
                </a>
                <Link
                  href="/courses"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 border border-white/20 px-7 py-3.5 text-xs sm:text-sm font-semibold text-white hover:bg-white/20 transition-all"
                >
                  เลือกดูคอร์สเรียน
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* FAQS SECTION                                                              */}
        {/* ========================================================================= */}
        <FAQSection />
      </main>

      <Footer />
    </div>
  );
}

