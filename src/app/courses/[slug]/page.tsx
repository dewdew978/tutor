"use client";

import { use, useState } from "react";
import Link from "next/link";
import { 
  Star, 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  PlayCircle, 
  Lock, 
  ChevronDown, 
  ChevronUp,
  ArrowLeft,
  Sparkles,
  Users,
  ShieldCheck,
  Check,
  Download,
  Share2,
  FileText,
  MessageCircle,
  HelpCircle,
  Play
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FAQSection } from "@/components/FAQSection";
import { MOCK_COURSES, STUDENT_REVIEWS } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function CourseDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const course = MOCK_COURSES.find((c) => c.slug === resolvedParams.slug) || MOCK_COURSES[0];
  const [openChapterId, setOpenChapterId] = useState<string>(course.chapters[0]?.id || "");
  const [previewVideoUrl, setPreviewVideoUrl] = useState<string | null>(null);
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);

  const toggleChapter = (id: string) => {
    setOpenChapterId((prev) => (prev === id ? "" : id));
  };

  const discountPercent = course.salePrice
    ? Math.round(((course.price - course.salePrice) / course.price) * 100)
    : 0;

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#101828]">
      <Header />

      <main className="flex-1">
        {/* BREADCRUMB & COURSE HERO HEADER (Untitled UI Dark Navy Banner) */}
        <section className="bg-[#101828] text-white py-10 lg:py-14 border-b border-[#1D2939]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-2 text-xs text-[#98A2B3] mb-6">
              <Link href="/" className="hover:text-white transition-colors">
                หน้าหลัก
              </Link>
              <span>/</span>
              <Link href="/#courses-catalog" className="hover:text-white transition-colors">
                คอร์สเรียนทั้งหมด
              </Link>
              <span>/</span>
              <span className="text-[#E9D7FE] font-medium truncate max-w-xs sm:max-w-md">
                {course.title}
              </span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left Details */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#7F56D9] px-3 py-0.5 text-xs font-bold text-white shadow-unt-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    {course.category}
                  </span>
                  <span className="rounded-full bg-[#1D2939] px-3 py-0.5 text-xs font-medium text-[#D0D5DD] border border-[#344054]">
                    ระดับ: {course.level}
                  </span>
                  {course.isFeatured && (
                    <span className="rounded-full bg-[#FEF0C7] px-2.5 py-0.5 text-xs font-bold text-[#B54708]">
                      คอร์สยอดนิยม 🔥
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                  {course.title}
                </h1>

                <p className="text-sm sm:text-base text-[#D0D5DD] leading-relaxed">
                  {course.subtitle}
                </p>

                {/* Rating & Stats Strip */}
                <div className="flex flex-wrap items-center gap-5 text-xs pt-2 text-[#D0D5DD] border-t border-[#1D2939]">
                  <div className="flex items-center gap-1.5 font-bold text-[#FDB022]">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-[#FDB022]" />
                      ))}
                    </div>
                    <span>{course.rating.toFixed(2)}</span>
                    <span className="text-[#98A2B3] font-normal">({course.reviewCount} รีวิว)</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-[#98A2B3]" />
                    <span>{course.studentCount.toLocaleString()} นักเรียนที่ลงทะเบียน</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-[#98A2B3]" />
                    <span>ความยาวรวม {course.totalDurationHours} ชม. ({course.totalLessons} บทเรียน)</span>
                  </div>
                </div>

                {/* Instructor mini card */}
                <div className="flex items-center gap-3 pt-3">
                  <img
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    className="h-11 w-11 rounded-full object-cover ring-2 ring-[#7F56D9]"
                  />
                  <div>
                    <div className="flex items-center gap-1.5 text-sm font-bold text-white">
                      <span>สอนโดย {course.instructor.name}</span>
                      <CheckCircle2 className="h-4 w-4 text-[#7F56D9] fill-[#7F56D9] text-[#101828]" />
                    </div>
                    <p className="text-xs text-[#98A2B3]">{course.instructor.headline}</p>
                  </div>
                </div>
              </div>

              {/* Right Floating Purchase Box (Sticky Card) */}
              <div className="lg:col-span-4">
                <div className="rounded-2xl border border-[#344054] bg-[#1D2939] p-6 shadow-unt-2xl text-white space-y-5 sticky top-24">
                  {/* Trailer Thumbnail with Play Button */}
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-[#101828] border border-[#344054]">
                    <img
                      src={course.coverImage}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                    <button
                      onClick={() => setPreviewVideoUrl(course.trailerVideoUrl)}
                      className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/20 transition-colors group"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#7F56D9] shadow-unt-lg group-hover:scale-110 transition-transform">
                        <PlayCircle className="h-7 w-7 text-[#7F56D9]" />
                      </div>
                    </button>
                    <span className="absolute bottom-2 right-2 rounded bg-black/75 px-2 py-0.5 text-[10px] font-semibold text-white">
                      ดูคลิปแนะนำคอร์ส
                    </span>
                  </div>

                  {/* Price info with discount badge */}
                  <div className="space-y-1">
                    <div className="flex items-baseline gap-2.5">
                      <span className="text-3xl font-extrabold text-[#E9D7FE]">
                        {course.salePrice ? formatPrice(course.salePrice) : formatPrice(course.price)}
                      </span>
                      {course.salePrice && (
                        <span className="text-sm text-[#98A2B3] line-through">
                          {formatPrice(course.price)}
                        </span>
                      )}
                      {discountPercent > 0 && (
                        <span className="rounded-md bg-[#ECFDF3] px-2 py-0.5 text-xs font-bold text-[#027A48] border border-[#ABEFC6]">
                          ลด {discountPercent}%
                        </span>
                      )}
                    </div>
                    {course.salePrice && (
                      <p className="text-xs text-[#75E0A7] font-semibold">
                        ประหยัด {formatPrice(course.price - course.salePrice)} (ราคาพิเศษเปิดเทอม)
                      </p>
                    )}
                  </div>

                  {/* Enrollment Buttons */}
                  <div className="space-y-2.5">
                    <button
                      onClick={() => setEnrollModalOpen(true)}
                      className="w-full text-center rounded-lg bg-[#7F56D9] py-3.5 text-sm font-bold text-white shadow-unt-xs hover:bg-[#6941C6] focus:outline-none focus:ring-4 focus:ring-[#F4EBFF] transition-all"
                    >
                      สมัครเรียนคอร์สนี้ (เข้าเรียนทันที)
                    </button>

                    <button
                      onClick={() => setPreviewVideoUrl(course.chapters[0]?.lessons[0]?.videoUrl || course.trailerVideoUrl)}
                      className="w-full text-center rounded-lg border border-[#475467] bg-[#101828]/50 py-2.5 text-xs font-semibold text-[#D0D5DD] hover:bg-[#101828] transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Play className="h-3.5 w-3.5 text-[#7F56D9]" />
                      ทดลองดูคลิปบทเรียนฟรี
                    </button>
                  </div>

                  {/* Course Features List */}
                  <div className="space-y-2.5 pt-3 border-t border-[#344054] text-xs text-[#D0D5DD]">
                    <div className="flex items-center gap-2.5">
                      <Check className="h-4 w-4 text-[#75E0A7] shrink-0" />
                      <span>วิดีโอบทเรียน {course.totalLessons} ตอน ({course.totalDurationHours} ชม.)</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Check className="h-4 w-4 text-[#75E0A7] shrink-0" />
                      <span>เอกสารประกอบการเรียน & ชีทสรุป PDF 4 สี</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Check className="h-4 w-4 text-[#75E0A7] shrink-0" />
                      <span>เข้าเรียนได้ตลอดชีพ ไม่มีวันหมดอายุ</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Check className="h-4 w-4 text-[#75E0A7] shrink-0" />
                      <span>ถามข้อสงสัยกับพี่โต๋ได้โดยตรงใต้คลิป</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* COURSE DETAILS CONTENT                                                    */}
        {/* ========================================================================= */}
        <section className="py-14 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-8 space-y-12">
                {/* What You Will Learn (Untitled UI Card) */}
                <div className="rounded-2xl border border-[#EAECF0] bg-[#F9FAFB] p-6 sm:p-8 shadow-unt-xs">
                  <h3 className="text-lg font-bold text-[#101828] mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-[#7F56D9]" />
                    สิ่งที่คุณจะได้รับจากคอร์สนี้
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {course.whatYouWillLearn.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-[#344054]">
                        <CheckCircle2 className="h-4 w-4 text-[#7F56D9] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Course Description */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-[#101828]">รายละเอียดคอร์สเรียน</h3>
                  <p className="text-xs sm:text-sm text-[#475467] leading-relaxed">
                    {course.description}
                  </p>
                </div>

                {/* Course Curriculum Accordion */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-[#101828]">
                        เนื้อหาและโครงสร้างบทเรียน
                      </h3>
                      <p className="text-xs text-[#667085] mt-0.5">
                        {course.chapters.length} บทเรียนหลัก • {course.totalLessons} ตอน • รวม {course.totalDurationHours} ชั่วโมง
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {course.chapters.map((chapter, cIdx) => (
                      <div
                        key={chapter.id}
                        className="rounded-xl border border-[#EAECF0] bg-white overflow-hidden shadow-unt-xs"
                      >
                        {/* Chapter Header */}
                        <button
                          onClick={() => toggleChapter(chapter.id)}
                          className="w-full flex items-center justify-between p-4 bg-[#F9FAFB] hover:bg-[#F2F4F7] transition-colors text-left"
                        >
                          <div className="flex items-center gap-3">
                            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#F4EBFF] text-xs font-bold text-[#7F56D9] border border-[#E9D7FE]">
                              {cIdx + 1}
                            </span>
                            <span className="text-sm font-bold text-[#101828]">
                              {chapter.title}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 text-xs text-[#667085]">
                            <span>{chapter.lessons.length} บทเรียน</span>
                            {openChapterId === chapter.id ? (
                              <ChevronUp className="h-4 w-4 text-[#98A2B3]" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-[#98A2B3]" />
                            )}
                          </div>
                        </button>

                        {/* Chapter Lessons */}
                        {openChapterId === chapter.id && (
                          <div className="divide-y divide-[#EAECF0]">
                            {chapter.lessons.map((lesson) => (
                              <div
                                key={lesson.id}
                                className="flex items-center justify-between p-3.5 pl-6 hover:bg-[#F9FAFB] transition-colors"
                              >
                                <div className="flex items-center gap-3">
                                  {lesson.isFreePreview ? (
                                    <button
                                      onClick={() => setPreviewVideoUrl(lesson.videoUrl)}
                                      className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4EBFF] text-[#7F56D9] hover:scale-110 transition-transform"
                                      title="กดเพื่อทดลองดูคลิปนี้ฟรี"
                                    >
                                      <PlayCircle className="h-4 w-4" />
                                    </button>
                                  ) : (
                                    <Lock className="h-4 w-4 text-[#98A2B3]" />
                                  )}

                                  <div>
                                    <p className="text-xs font-medium text-[#101828]">
                                      {lesson.title}
                                    </p>
                                    <p className="text-[11px] text-[#667085]">{lesson.description}</p>
                                  </div>
                                </div>

                                <div className="flex items-center gap-3 text-xs">
                                  {lesson.isFreePreview && (
                                    <span className="rounded-full bg-[#ECFDF3] px-2 py-0.5 text-[10px] font-bold text-[#027A48] border border-[#ABEFC6]">
                                      ดูฟรี
                                    </span>
                                  )}
                                  <span className="text-[#667085]">
                                    {Math.floor(lesson.durationSeconds / 60)} นาที
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* About Instructor */}
                <div className="rounded-2xl border border-[#EAECF0] bg-white p-6 sm:p-8 shadow-unt-xs space-y-4">
                  <h3 className="text-lg font-bold text-[#101828]">
                    เกี่ยวกับพี่โต๋ (ผู้สอน)
                  </h3>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <img
                      src={course.instructor.avatar}
                      alt={course.instructor.name}
                      className="h-16 w-16 rounded-full object-cover ring-4 ring-[#F4EBFF]"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-bold text-[#101828]">
                          {course.instructor.name}
                        </h4>
                        <CheckCircle2 className="h-4 w-4 text-[#7F56D9] fill-[#7F56D9] text-white" />
                      </div>
                      <p className="text-xs text-[#7F56D9] font-semibold">
                        {course.instructor.headline}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-[#667085] pt-1">
                        <span>⭐ {course.instructor.rating.toFixed(2)} คะแนนรีวิว</span>
                        <span>👥 {course.instructor.totalStudents.toLocaleString()} นักเรียน</span>
                        <span>📚 {course.instructor.totalCourses} คอร์ส</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#475467] leading-relaxed pt-2 border-t border-[#EAECF0]">
                    {course.instructor.bio}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <FAQSection />

        {/* Video Preview Modal */}
        {previewVideoUrl && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#101828]/80 p-4 backdrop-blur-sm">
            <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-black shadow-unt-2xl">
              <div className="flex items-center justify-between p-4 bg-[#1D2939] text-white">
                <span className="text-xs font-bold">🎬 ตัวอย่างบทเรียน (Free Preview)</span>
                <button
                  onClick={() => setPreviewVideoUrl(null)}
                  className="rounded-lg bg-[#344054] px-3 py-1 text-xs text-white hover:bg-[#475467]"
                >
                  ปิด ✕
                </button>
              </div>
              <div className="aspect-video w-full bg-black">
                <video
                  key={previewVideoUrl}
                  controls
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-contain"
                >
                  <source src={previewVideoUrl} type="video/mp4" />
                  <p className="text-xs text-white p-4">บราวเซอร์ของคุณไม่รองรับการเล่นวิดีโอนี้</p>
                </video>
              </div>
            </div>
          </div>
        )}

        {/* Quick Checkout Modal (Untitled UI Style) */}
        {enrollModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#101828]/60 p-4 backdrop-blur-sm">
            <div className="relative w-full max-w-lg rounded-2xl border border-[#EAECF0] bg-white p-6 sm:p-8 shadow-unt-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-[#EAECF0] pb-3">
                <div>
                  <h3 className="text-base font-bold text-[#101828]">สมัครเรียนคอร์สนี้</h3>
                  <p className="text-xs text-[#667085]">{course.title}</p>
                </div>
                <button
                  onClick={() => setEnrollModalOpen(false)}
                  className="text-xs text-[#667085] hover:text-[#101828]"
                >
                  ✕
                </button>
              </div>

              <div className="rounded-xl bg-[#F9FAFB] p-4 border border-[#EAECF0] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#667085]">ยอดชำระสุทธิ:</span>
                  <p className="text-2xl font-extrabold text-[#7F56D9]">
                    {course.salePrice ? formatPrice(course.salePrice) : formatPrice(course.price)}
                  </p>
                </div>
                <span className="rounded-full bg-[#ECFDF3] px-2.5 py-0.5 text-xs font-bold text-[#027A48] border border-[#ABEFC6]">
                  สิทธิ์เรียนตลอดชีพ
                </span>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-semibold text-[#344054]">
                  เลือกช่องทางการชำระเงิน
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border-2 border-[#7F56D9] bg-[#F4EBFF]/40 p-3 text-center cursor-pointer">
                    <p className="text-xs font-bold text-[#7F56D9]">PromptPay QR</p>
                    <span className="text-[10px] text-[#667085]">เปิดห้องเรียนทันที</span>
                  </div>
                  <div className="rounded-xl border border-[#D0D5DD] p-3 text-center hover:bg-[#F9FAFB] cursor-pointer">
                    <p className="text-xs font-bold text-[#344054]">บัตรเครดิต / เดบิต</p>
                    <span className="text-[10px] text-[#667085]">Visa, Mastercard</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  onClick={() => setEnrollModalOpen(false)}
                  className="flex-1 rounded-lg border border-[#D0D5DD] bg-white py-2.5 text-xs font-semibold text-[#344054] hover:bg-[#F9FAFB]"
                >
                  ยกเลิก
                </button>
                <Link
                  href={`/learn/${course.slug}`}
                  className="flex-1 rounded-lg bg-[#7F56D9] py-2.5 text-xs font-bold text-white text-center hover:bg-[#6941C6] shadow-unt-xs"
                >
                  ยืนยันเข้าห้องเรียน →
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
