"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Search, 
  BookOpen, 
  Sparkles, 
  ArrowLeft, 
  SlidersHorizontal, 
  ChevronDown, 
  Check, 
  Star, 
  Clock, 
  Users, 
  GraduationCap,
  HelpCircle,
  MessageCircle,
  Video
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CourseCard } from "@/components/CourseCard";
import { FAQSection } from "@/components/FAQSection";
import { CATEGORIES, MOCK_COURSES, MAIN_TUTOR } from "@/lib/mock-data";

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"popular" | "rating" | "price-asc" | "price-desc">("popular");

  // Filter and Sort Courses
  const filteredAndSortedCourses = useMemo(() => {
    let result = MOCK_COURSES.filter((course) => {
      const matchesCategory = selectedCategory === "all" || course.categorySlug === selectedCategory;
      const matchesSearch = 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    // Sorting
    result = [...result].sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "price-asc") return (a.salePrice || a.price) - (b.salePrice || b.price);
      if (sortBy === "price-desc") return (b.salePrice || b.price) - (a.salePrice || a.price);
      return b.studentCount - a.studentCount; // default: popular
    });

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB] text-[#101828]">
      <Header />

      <main className="flex-1">
        {/* HERO BANNER SECTION (Untitled UI Clean White Header) */}
        <section className="bg-white border-b border-[#EAECF0] py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-3">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-xs text-[#667085] mb-2">
                <Link href="/" className="hover:text-[#7F56D9] transition-colors">
                  หน้าหลัก
                </Link>
                <span>/</span>
                <span className="text-[#7F56D9] font-semibold">คอร์สเรียนทั้งหมด</span>
              </nav>

              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#F4EBFF] px-3.5 py-1 text-xs font-semibold text-[#7F56D9] border border-[#E9D7FE]">
                <BookOpen className="h-3.5 w-3.5" />
                <span>คลังคอร์สเรียนวิชาการ ม.ปลาย โดย พี่แม็ก จุฬาฯ</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#101828]">
                คอร์สเรียนทั้งหมด ({MOCK_COURSES.length} คอร์ส)
              </h1>

              <p className="text-sm sm:text-base text-[#475467] leading-relaxed">
                เลือกคอร์สเรียนที่ตรงกับระดับชั้นของคุณ ปูพื้นฐานลึกซึ้ง ตะลุยโจทย์ A-Level จริง พร้อมเอกสาร PDF โหลดฟรีตลอดชีพ
              </p>
            </div>
          </div>
        </section>

        {/* SEARCH, CATEGORIES & SORTING TOOLBAR */}
        <section className="sticky top-18 z-30 bg-white/95 backdrop-blur-md border-b border-[#EAECF0] py-3.5 shadow-unt-xs">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Category Segmented Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedCategory === cat.slug
                        ? "bg-[#7F56D9] text-white shadow-unt-xs"
                        : "bg-white text-[#344054] border border-[#D0D5DD] hover:bg-[#F9FAFB] shadow-unt-xs"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Search & Sort Row */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                {/* Search Box */}
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#667085]" />
                  <input
                    type="text"
                    placeholder="ค้นหาชื่อคอร์ส หรือบทเรียน..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-lg border border-[#D0D5DD] bg-white py-1.5 pl-8.5 pr-3 text-xs text-[#101828] placeholder:text-[#667085] shadow-unt-xs focus:border-[#7F56D9] focus:outline-none focus:ring-4 focus:ring-[#F4EBFF]"
                  />
                </div>

                {/* Sort Dropdown */}
                <div className="relative shrink-0">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="rounded-lg border border-[#D0D5DD] bg-white py-1.5 px-3 text-xs font-semibold text-[#344054] shadow-unt-xs focus:border-[#7F56D9] focus:outline-none cursor-pointer"
                  >
                    <option value="popular">🔥 ยอดนิยมที่สุด</option>
                    <option value="rating">⭐ คะแนนรีวิวสูงสุด</option>
                    <option value="price-asc">💵 ราคา: ต่ำไปสูง</option>
                    <option value="price-desc">💎 ราคา: สูงไปต่ำ</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COURSES GRID SECTION */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-semibold text-[#667085]">
                พบ <strong className="text-[#7F56D9]">{filteredAndSortedCourses.length}</strong> คอร์สที่ตรงตามเงื่อนไข
              </span>
              {selectedCategory !== "all" && (
                <button
                  onClick={() => setSelectedCategory("all")}
                  className="text-xs font-bold text-[#7F56D9] hover:underline"
                >
                  ล้างตัวกรองหมวดหมู่
                </button>
              )}
            </div>

            {filteredAndSortedCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-[#D0D5DD] bg-white p-14 text-center">
                <BookOpen className="mx-auto h-10 w-10 text-[#98A2B3] mb-3" />
                <h3 className="text-base font-bold text-[#101828]">ไม่พบคอร์สที่ตรงกับคำค้นหา</h3>
                <p className="text-xs text-[#667085] mt-1">ลองเปลี่ยนคำค้นหา หรือเลือกหมวดหมู่อื่นดูครับ</p>
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSearchQuery("");
                  }}
                  className="mt-4 rounded-lg bg-[#7F56D9] px-4 py-2 text-xs font-semibold text-white shadow-unt-xs hover:bg-[#6941C6]"
                >
                  ล้างตัวกรองทั้งหมด
                </button>
              </div>
            )}
          </div>
        </section>

        {/* LINE COURSE ADVISORY BANNER */}
        <section className="pb-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-[#EAECF0] bg-white p-8 shadow-unt-xs flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#ECFDF3] text-[#027A48] shrink-0">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#101828]">
                    ไม่แน่ใจว่าพื้นฐานตัวเองเหมาะกับคอร์สไหน?
                  </h3>
                  <p className="text-xs text-[#475467] mt-0.5">
                    ทัก LINE ส่งเกรดหรือข้อสอบล่าสุดมาให้พี่แม็กช่วยวางแผนการเรียนให้ตรงเป้าหมายได้ฟรี
                  </p>
                </div>
              </div>

              <a
                href="https://line.me"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[#12B76A] px-5 py-2.5 text-xs font-bold text-white shadow-unt-xs hover:bg-[#0E9355] transition-all shrink-0"
              >
                <MessageCircle className="h-4 w-4" />
                แอด LINE ปรึกษาฟรี
              </a>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <FAQSection />
      </main>

      <Footer />
    </div>
  );
}
