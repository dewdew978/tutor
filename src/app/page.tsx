"use client";

import Link from "next/link";
import { 
  Sparkles, 
  Search, 
  Play, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  MessageSquare, 
  Star,
  Users,
  GraduationCap,
  PlayCircle,
  BookOpen,
  Award,
  MessageCircle,
  Check
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CourseCard } from "@/components/CourseCard";
import { FAQSection } from "@/components/FAQSection";
import { MOCK_COURSES, MAIN_TUTOR, STUDENT_REVIEWS } from "@/lib/mock-data";

export default function HomePage() {
  const featuredCourses = MOCK_COURSES.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#101828]">
      <Header />

      <main className="flex-1">
        {/* ========================================================================= */}
        {/* SINGLE TUTOR HERO SECTION (Untitled UI Style)                             */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden pt-14 pb-20 md:pt-20 md:pb-28 bg-gradient-to-b from-[#F9FAFB] to-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Copy & Value Proposition */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">


                {/* Main Headline */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#101828] leading-[1.15]">
                  เรียนคณิต & ฟิสิกส์ <br />
                  สู่คะแนน <span className="bg-gradient-to-r from-[#7F56D9] to-[#6941C6] bg-clip-text text-transparent">A-Level เต็มร้อย</span>
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-lg text-[#475467] max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  ปูพื้นฐานจากความเข้าใจลึกซึ้ง ลุยโจทย์ข้อสอบแข่งขันจริงย้อนหลังกว่า 15 ปี ไม่เน้นท่องจำ พร้อมเอกสารสรุป PDF และระบบถาม-ตอบกับพี่โต๋โดยตรง
                </p>

                {/* Dual CTA Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
                  <Link
                    href="/courses"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#7F56D9] px-7 py-3.5 text-base font-bold text-white shadow-unt-xs hover:bg-[#6941C6] focus:outline-none focus:ring-4 focus:ring-[#F4EBFF] transition-all"
                  >
                    ดูคอร์สเรียนทั้งหมด ({MOCK_COURSES.length} คอร์ส)
                    <ArrowRight className="h-4.5 w-4.5" />
                  </Link>

                  <Link
                    href="/learn/math-calculus-mastery"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-[#D0D5DD] bg-white px-6 py-3.5 text-base font-bold text-[#344054] shadow-unt-xs hover:bg-[#F9FAFB] focus:outline-none focus:ring-4 focus:ring-[#F2F4F7] transition-all"
                  >
                    <PlayCircle className="h-5 w-5 text-[#7F56D9]" />
                    ทดลองเข้าห้องเรียนฟรี
                  </Link>
                </div>

                {/* Trust Points */}
                <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-[#475467]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4.5 w-4.5 text-[#12B76A]" />
                    <span>เกียรตินิยมอันดับ 1</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4.5 w-4.5 text-[#12B76A]" />
                    <span>สอบติดแพทย์-วิศวะ 1,000+ คน</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4.5 w-4.5 text-[#12B76A]" />
                    <span>เข้าเรียนได้ตลอดชีพ ไม่มีหมดอายุ</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Tutor Featured Card (Untitled UI Style) */}
              <div className="lg:col-span-5">
                <div className="relative mx-auto max-w-md rounded-2xl border border-[#D0D5DD] bg-white p-4 shadow-unt-2xl sm:p-5">
                  <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-[#F2F4F7] mb-4">
                    <img
                      src={MAIN_TUTOR.avatar}
                      alt={MAIN_TUTOR.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101828] via-transparent to-transparent opacity-80" />

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#E9D7FE] mb-1">
                        <Award className="h-4 w-4 text-[#FDB022]" />
                        <span>เหรียญเงิน โอลิมปิกวิชาการคณิตศาสตร์</span>
                      </div>
                      <h3 className="text-xl font-bold">{MAIN_TUTOR.name}</h3>
                      <p className="text-xs text-[#D0D5DD] line-clamp-1">{MAIN_TUTOR.headline}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 divide-x divide-[#EAECF0] text-center text-xs pt-1">
                    <div>
                      <p className="font-extrabold text-[#101828] text-base">10+ ปี</p>
                      <span className="text-[10px] text-[#667085]">ประสบการณ์สอน</span>
                    </div>
                    <div>
                      <p className="font-extrabold text-[#7F56D9] text-base">15,400+</p>
                      <span className="text-[10px] text-[#667085]">นักเรียนที่เรียนจบ</span>
                    </div>
                    <div>
                      <p className="font-extrabold text-[#101828] text-base">4.98 ⭐</p>
                      <span className="text-[10px] text-[#667085]">คะแนนรีวิวเฉลี่ย</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* FEATURED COURSES SHOWCASE (3 Top Flagship Courses)                        */}
        {/* ========================================================================= */}
        <section className="pt-16 pb-20 bg-[#F9FAFB] border-t border-[#EAECF0]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-[#F4EBFF] px-3 py-1 text-xs font-semibold text-[#7F56D9] mb-2">
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>คอร์สแนะนำยอดนิยม</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#101828]">
                  คอร์สเรียนยอดฮิตประจำเทอมนี้
                </h2>
                <p className="text-sm text-[#475467] mt-1">
                  คอร์สที่นักเรียนเลือกเรียนมากที่สุด ปูพื้นฐานและตะลุยโจทย์เข้มข้น
                </p>
              </div>

              <Link
                href="/courses"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#7F56D9] hover:text-[#53389E] hover:underline"
              >
                ดูคอร์สเรียนทั้งหมด ({MOCK_COURSES.length} คอร์ส) <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Course Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>

            {/* Bottom View All Link Button */}
            <div className="mt-10 text-center">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-6 py-3 text-xs font-bold text-[#344054] shadow-unt-xs hover:bg-[#F9FAFB] hover:text-[#101828] transition-all"
              >
                ดูคอร์สทั้งหมดตามระดับชั้น (ม.4, ม.5, ม.6, A-Level)
                <ArrowRight className="h-3.5 w-3.5 text-[#7F56D9]" />
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* ABOUT P'TOH SECTION                                                       */}
        {/* ========================================================================= */}
        <section id="about-tutor" className="py-16 sm:py-24 bg-white border-y border-[#EAECF0]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-[#F4EBFF] px-3 py-1 text-xs font-semibold text-[#7F56D9]">
                  <GraduationCap className="h-3.5 w-3.5" />
                  <span>เกี่ยวกับผู้สอน</span>
                </div>
                <h2 className="text-3xl font-extrabold text-[#101828] tracking-tight">
                  ทำไมต้องเรียนกับ <br />
                  พี่โต๋ (P&apos;Toh)?
                </h2>
                <p className="text-sm text-[#475467] leading-relaxed">
                  {MAIN_TUTOR.bio}
                </p>

                <div className="space-y-2.5 pt-2 text-xs text-[#344054]">
                  {MAIN_TUTOR.education.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-[#7F56D9] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-[#EAECF0] bg-[#F9FAFB] p-6 shadow-unt-xs">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4EBFF] text-[#7F56D9] mb-4">
                    <Zap className="h-5 w-5" />
                  </div>
                  <h4 className="text-sm font-bold text-[#101828] mb-1">Concept ชัดเจน ไม่ต้องท่องจำ</h4>
                  <p className="text-xs text-[#475467] leading-relaxed">
                    อธิบายที่มาของทุกสูตรและทฤษฎีบท ช่วยให้มองภาพออกและเชื่อมโยงสู่โจทย์ประยุกต์ยากๆ ได้อย่างเป็นธรรมชาติ
                  </p>
                </div>

                <div className="rounded-2xl border border-[#EAECF0] bg-[#F9FAFB] p-6 shadow-unt-xs">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4EBFF] text-[#7F56D9] mb-4">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <h4 className="text-sm font-bold text-[#101828] mb-1">เทคนิคลัด & ตัดช้อยส์ตรงจุด</h4>
                  <p className="text-xs text-[#475467] leading-relaxed">
                    สูตรลัดที่ผ่านการพิสูจน์แล้วว่าใช้ได้จริงในห้องสอบ A-Level ช่วยลดเวลาคิดเลขจาก 5 นาทีเหลือเพียง 1 นาที
                  </p>
                </div>

                <div className="rounded-2xl border border-[#EAECF0] bg-[#F9FAFB] p-6 shadow-unt-xs">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4EBFF] text-[#7F56D9] mb-4">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <h4 className="text-sm font-bold text-[#101828] mb-1">พี่โต๋ตอบคำถามเอง 100%</h4>
                  <p className="text-xs text-[#475467] leading-relaxed">
                    ระบบถาม-ตอบใต้คลิปวิดีโอ สงสัยตรงไหนพิมพ์ถามได้ตลอด พี่โต๋เข้ามาพิมพ์อธิบายให้เข้าใจอย่างละเอียด
                  </p>
                </div>

                <div className="rounded-2xl border border-[#EAECF0] bg-[#F9FAFB] p-6 shadow-unt-xs">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4EBFF] text-[#7F56D9] mb-4">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <h4 className="text-sm font-bold text-[#101828] mb-1">ชีทสรุปสูตรฉบับพกพา (PDF)</h4>
                  <p className="text-xs text-[#475467] leading-relaxed">
                    เอกสารประกอบการเรียน 4 สีกราฟิกสวยงาม สรุปเนื้อหาและสูตรสำคัญทุกบท ดาวน์โหลดพิมพ์อ่านได้ตลอดชีพ
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* TESTIMONIALS (STUDENT SUCCESS) SECTION                                    */}
        {/* ========================================================================= */}
        <section id="testimonials" className="py-16 sm:py-24 bg-[#F9FAFB]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#ECFDF3] px-3 py-1 text-xs font-semibold text-[#027A48]">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>รีวิวจากศิษย์เก่าสอบติด</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#101828] tracking-tight">
                ความสำเร็จของนักเรียนคือกำลังใจที่ดีที่สุดของพี่โต๋
              </h2>
              <p className="text-sm sm:text-base text-[#475467]">
                รวมความประทับใจจากรุ่นพี่เตรียมอุดมฯ สวนกุหลาบ สาธิตฯ ที่สอบติดคณะในฝัน
              </p>
            </div>

            {/* Testimonial Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {STUDENT_REVIEWS.map((review) => (
                <div
                  key={review.id}
                  className="rounded-2xl border border-[#EAECF0] bg-white p-6 shadow-unt-xs flex flex-col justify-between space-y-4 hover:shadow-unt-md transition-shadow"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-1 text-[#FDB022]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-[#FDB022]" />
                      ))}
                    </div>

                    <div className="inline-block rounded bg-[#F4EBFF] px-2 py-0.5 text-[11px] font-bold text-[#7F56D9]">
                      {review.score}
                    </div>

                    <p className="text-xs sm:text-sm text-[#475467] leading-relaxed italic">
                      &ldquo;{review.comment}&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-[#F2F4F7]">
                    <img
                      src={review.avatar}
                      alt={review.studentName}
                      className="h-10 w-10 rounded-full object-cover ring-2 ring-[#F4EBFF]"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-[#101828]">{review.studentName}</h4>
                      <p className="text-[11px] text-[#7F56D9] font-medium">{review.faculty}</p>
                      <p className="text-[10px] text-[#667085]">{review.school}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* LINE CONSULTATION CTA BANNER                                              */}
        {/* ========================================================================= */}
        <section className="py-12 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-gradient-to-r from-[#1D2939] to-[#101828] p-8 sm:p-12 text-white shadow-unt-xl flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="space-y-3 text-center lg:text-left max-w-xl">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-[#E9D7FE] border border-white/15">
                  💬 ปรึกษาแผนการเรียนฟรี
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  ยังไม่แน่ใจว่าจะเริ่มเรียนบทไหนก่อนดี?
                </h3>
                <p className="text-xs sm:text-sm text-[#D0D5DD] leading-relaxed">
                  ทัก LINE มาคุยกับพี่โต๋และทีมงานเพื่อประเมินพื้นฐานและวางแผนการเรียนให้ตรงเป้าหมายของคุณได้ฟรี
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                <a
                  href="https://line.me"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#12B76A] px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-unt-md hover:bg-[#0E9355] transition-all"
                >
                  <MessageCircle className="h-4 w-4" />
                  แอด LINE ปรึกษาฟรี
                </a>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-6 py-3 text-xs sm:text-sm font-semibold text-white hover:bg-white/20 transition-all"
                >
                  เลือกดูคอร์สเรียน
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* FREQUENTLY ASKED QUESTIONS (FAQ SECTION)                                  */}
        {/* ========================================================================= */}
        <FAQSection />
      </main>

      <Footer />
    </div>
  );
}
