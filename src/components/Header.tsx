"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { 
  GraduationCap, 
  Search, 
  Menu, 
  X, 
  ArrowRight,
  MessageCircle,
  ChevronDown,
  ShieldCheck,
  Sparkles,
  BookOpen,
  HelpCircle,
  Award,
  Calculator,
  Zap,
  Target,
  PlayCircle,
  Compass
} from "lucide-react";
import { DropdownMenuSimple } from "./DropdownMenuSimple";
import { supabase, checkIsAdmin } from "@/lib/supabase";

export function Header() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  const categoryRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  // Close popovers on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setCategoryDropdownOpen(false);
      }
      if (aboutRef.current && !aboutRef.current.contains(event.target as Node)) {
        setAboutDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    let isMounted = true;
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!isMounted) return;
      setUser(user);
      setIsAdmin(checkIsAdmin(user));
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return;
      const u = session?.user ?? null;
      setUser(u);
      setIsAdmin(checkIsAdmin(u));
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/courses?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/courses");
    }
    setMobileMenuOpen(false);
  };

  const displayName = user?.user_metadata?.full_name || (user?.email ? user.email.split("@")[0] : null);
  const initial = displayName ? displayName.charAt(0).toUpperCase() : "U";

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#EAECF0]">
      {/* 100% Full-Width Announcement Bar */}
      {showAnnouncement && (
        <div className="w-full bg-gradient-to-r from-[#53389E] via-[#6941C6] to-[#7F56D9] px-4 sm:px-8 py-2 text-center text-xs sm:text-sm font-medium text-white relative transition-all shadow-unt-xs">
          <div className="w-full flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-bold text-white border border-white/30 backdrop-blur-xs">
              🔥 โปรโมชั่นเปิดเทอม
            </span>
            <span>สมัครเรียนทุกคอร์ส เข้าเรียนได้ตลอดชีพ พร้อมดาวน์โหลดชีทสรุป PDF ฟรีครบทุกบท</span>
            <Link href="/courses" className="inline-flex items-center gap-1 font-bold text-[#E9D7FE] hover:text-white underline underline-offset-4 shrink-0 transition-colors">
              เลือกดูคอร์ส <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <button
            onClick={() => setShowAnnouncement(false)}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-1 text-[#E9D7FE] hover:text-white rounded-md transition-colors"
            aria-label="Close announcement"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* 100% Full-Width Main Navbar */}
      <div className="w-full h-18 sm:h-20 px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 flex items-center justify-between gap-4">
        {/* Left Side: Brand Logo + Categorized Nav */}
        <div className="flex items-center gap-6 xl:gap-8 shrink-0">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-[#7F56D9] text-white shadow-unt-xs group-hover:bg-[#6941C6] transition-all group-hover:scale-105">
              <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-extrabold text-[#101828] tracking-tight">
                  P&apos;Toh Tutor
                </span>
              </div>
              <p className="hidden sm:block text-[11px] text-[#667085] font-medium leading-none mt-0.5">
                สถาบันกวดวิชาออนไลน์ ม.ปลาย
              </p>
            </div>
          </Link>

          {/* Desktop Categorized Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs xl:text-sm font-semibold text-[#475467]">
            {/* Category 1: หมวดหมู่วิชา Dropdown (Flyout Mega-Menu) */}
            <div ref={categoryRef} className="relative">
              <button
                onClick={() => {
                  setCategoryDropdownOpen(!categoryDropdownOpen);
                  setAboutDropdownOpen(false);
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors ${
                  categoryDropdownOpen
                    ? "bg-[#F4EBFF] text-[#7F56D9]"
                    : "hover:bg-[#F9FAFB] hover:text-[#101828]"
                }`}
              >
                <Compass className="h-4 w-4 text-[#7F56D9]" />
                <span>หมวดหมู่วิชา</span>
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${categoryDropdownOpen ? "rotate-180 text-[#7F56D9]" : ""}`} />
              </button>

              {/* Flyout Mega Menu */}
              {categoryDropdownOpen && (
                <div className="absolute left-0 top-full mt-2 w-[580px] rounded-2xl border border-[#EAECF0] bg-white p-4 shadow-unt-xl grid grid-cols-2 gap-3 z-50 animate-in fade-in-0 zoom-in-95 duration-150">
                  {/* Col 1: คณิตศาสตร์ ม.ปลาย */}
                  <div className="space-y-1.5 p-2 rounded-xl bg-[#F9FAFB]/80 border border-[#F2F4F7]">
                    <div className="flex items-center gap-2 px-2 py-1 text-xs font-bold text-[#7F56D9]">
                      <Calculator className="h-4 w-4" />
                      <span>คณิตศาสตร์ ม.ปลาย</span>
                    </div>
                    <Link
                      href="/courses?category=math-m4"
                      onClick={() => setCategoryDropdownOpen(false)}
                      className="block px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#344054] hover:bg-white hover:text-[#7F56D9] hover:shadow-unt-xs transition-all"
                    >
                      คณิตศาสตร์ ม.4 (เซต, ตรรกศาสตร์, จำนวนจริง)
                    </Link>
                    <Link
                      href="/courses?category=math-m5"
                      onClick={() => setCategoryDropdownOpen(false)}
                      className="block px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#344054] hover:bg-white hover:text-[#7F56D9] hover:shadow-unt-xs transition-all"
                    >
                      คณิตศาสตร์ ม.5 (ตรีโกณ, เวกเตอร์, Expo-Log)
                    </Link>
                    <Link
                      href="/courses?category=math-m6"
                      onClick={() => setCategoryDropdownOpen(false)}
                      className="block px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#344054] hover:bg-white hover:text-[#7F56D9] hover:shadow-unt-xs transition-all"
                    >
                      คณิตศาสตร์ ม.6 (แคลคูลัส, สถิติ, ลำดับ)
                    </Link>
                  </div>

                  {/* Col 2: ฟิสิกส์ & ตะลุยโจทย์ TCAS */}
                  <div className="space-y-3">
                    <div className="space-y-1.5 p-2 rounded-xl bg-[#F9FAFB]/80 border border-[#F2F4F7]">
                      <div className="flex items-center gap-2 px-2 py-1 text-xs font-bold text-[#175CD3]">
                        <Zap className="h-4 w-4" />
                        <span>ฟิสิกส์ & TPAT3</span>
                      </div>
                      <Link
                        href="/courses?category=physics"
                        onClick={() => setCategoryDropdownOpen(false)}
                        className="block px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#344054] hover:bg-white hover:text-[#175CD3] hover:shadow-unt-xs transition-all"
                      >
                        ฟิสิกส์ ม.ปลาย & ความถนัดวิศวะ TPAT3
                      </Link>
                    </div>

                    <div className="space-y-1.5 p-2 rounded-xl bg-[#F9FAFB]/80 border border-[#F2F4F7]">
                      <div className="flex items-center gap-2 px-2 py-1 text-xs font-bold text-[#027A48]">
                        <Target className="h-4 w-4" />
                        <span>เตรียมสอบเข้ามหาวิทยาลัย</span>
                      </div>
                      <Link
                        href="/courses?category=tcas"
                        onClick={() => setCategoryDropdownOpen(false)}
                        className="block px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#344054] hover:bg-white hover:text-[#027A48] hover:shadow-unt-xs transition-all"
                      >
                        ตะลุยโจทย์ A-Level คณิต 1 & ฟิสิกส์ย้อนหลัง 15 ปี
                      </Link>
                    </div>
                  </div>

                  {/* Bottom Strip in Dropdown */}
                  <div className="col-span-2 pt-2 border-t border-[#EAECF0] flex items-center justify-between text-xs">
                    <span className="text-[#667085]">เรียนซ้ำได้ไม่จำกัด พร้อมดาวน์โหลดชีท PDF ฟรี</span>
                    <Link
                      href="/courses"
                      onClick={() => setCategoryDropdownOpen(false)}
                      className="font-bold text-[#7F56D9] hover:underline flex items-center gap-1"
                    >
                      ดูคอร์สทั้งหมด ({8}) <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Direct Link: คอร์สทั้งหมด */}
            <Link
              href="/courses"
              className="px-3 py-2 rounded-xl hover:bg-[#F9FAFB] hover:text-[#101828] transition-colors"
            >
              คอร์สเรียนทั้งหมด
            </Link>

            {/* Category 2: เกี่ยวกับ & ผลงาน Dropdown */}
            <div ref={aboutRef} className="relative">
              <button
                onClick={() => {
                  setAboutDropdownOpen(!aboutDropdownOpen);
                  setCategoryDropdownOpen(false);
                }}
                className={`inline-flex items-center gap-1 px-3 py-2 rounded-xl transition-colors ${
                  aboutDropdownOpen
                    ? "bg-[#F4EBFF] text-[#7F56D9]"
                    : "hover:bg-[#F9FAFB] hover:text-[#101828]"
                }`}
              >
                <span>เกี่ยวกับ & ผลงาน</span>
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${aboutDropdownOpen ? "rotate-180 text-[#7F56D9]" : ""}`} />
              </button>

              {aboutDropdownOpen && (
                <div className="absolute left-0 top-full mt-2 w-64 rounded-2xl border border-[#EAECF0] bg-white p-2 shadow-unt-xl z-50 animate-in fade-in-0 zoom-in-95 duration-150 space-y-1 text-xs">
                  <Link
                    href="/#about-tutor"
                    onClick={() => setAboutDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[#344054] hover:bg-[#F9FAFB] hover:text-[#7F56D9] transition-colors"
                  >
                    <Award className="h-4 w-4 text-[#7F56D9]" />
                    <div>
                      <p className="font-bold">ประวัติพี่โต๋</p>
                      <p className="text-[10px] text-[#667085]">เกียรตินิยมอันดับ 1 ประสบการณ์ 10+ ปี</p>
                    </div>
                  </Link>
                  <Link
                    href="/#testimonials"
                    onClick={() => setAboutDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[#344054] hover:bg-[#F9FAFB] hover:text-[#7F56D9] transition-colors"
                  >
                    <Sparkles className="h-4 w-4 text-[#FDB022]" />
                    <div>
                      <p className="font-bold">รีวิวนักเรียนสอบติด</p>
                      <p className="text-[10px] text-[#667085]">แพทย์ • วิศวะ • บัญชี จุฬาฯ</p>
                    </div>
                  </Link>
                  <Link
                    href="/learn/math-calculus-mastery"
                    onClick={() => setAboutDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[#344054] hover:bg-[#F9FAFB] hover:text-[#7F56D9] transition-colors"
                  >
                    <PlayCircle className="h-4 w-4 text-[#12B76A]" />
                    <div>
                      <p className="font-bold">ทดลองเรียนฟรี</p>
                      <p className="text-[10px] text-[#667085]">เปิดดูวิดีโอตัวอย่างโดยไม่มีค่าใช้จ่าย</p>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Direct Link: FAQs */}
            <Link
              href="/#faqs"
              className="px-3 py-2 rounded-xl hover:bg-[#F9FAFB] hover:text-[#101828] transition-colors"
            >
              FAQs
            </Link>

            {/* Admin Badge Link (Only for authorized Admin) */}
            {isAdmin && (
              <Link
                href="/instructor"
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#F4EBFF] px-3 py-1.5 text-xs font-bold text-[#7F56D9] border border-[#E9D7FE] hover:bg-[#E9D7FE] transition-colors shadow-unt-xs"
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>แดชบอร์ดหลังบ้าน (Admin)</span>
              </Link>
            )}
          </nav>
        </div>

        {/* Center: Global Search Bar (Full-Width Responsive Expanding) */}
        <div className="hidden md:flex items-center flex-1 max-w-xs lg:max-w-sm xl:max-w-md mx-2 xl:mx-4">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#667085]" />
            <input
              type="text"
              placeholder="ค้นหาคอร์สหรือบทเรียน เช่น แคลคูลัส, A-Level..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-[#D0D5DD] bg-[#F9FAFB] hover:bg-white focus:bg-white py-2.5 pl-10 pr-12 text-xs sm:text-sm text-[#101828] placeholder:text-[#667085] shadow-unt-xs focus:border-[#7F56D9] focus:outline-none focus:ring-4 focus:ring-[#F4EBFF] transition-all"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-white border border-[#D0D5DD] px-2 py-0.5 text-[10px] font-bold text-[#667085] hover:text-[#7F56D9] hover:border-[#7F56D9] transition-colors shadow-unt-xs"
            >
              ค้นหา
            </button>
          </form>
        </div>

        {/* Right Side: CTA Actions & User Auth */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* LINE Button */}
          <a
            href="https://line.me"
            target="_blank"
            rel="noreferrer"
            className="hidden xl:inline-flex items-center gap-1.5 text-xs font-bold text-[#027A48] bg-[#ECFDF3] border border-[#ABEFC6] px-3.5 py-2.5 rounded-xl hover:bg-[#D1FADF] transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            <span>ปรึกษาพี่โต๋</span>
          </a>

          {/* User Account or Guest Auth CTAs */}
          {user ? (
            <DropdownMenuSimple
              user={user}
              isAdmin={isAdmin}
              trigger={
                <button className="inline-flex items-center gap-2 rounded-xl border border-[#D0D5DD] bg-white px-3.5 py-2 text-xs sm:text-sm font-semibold text-[#344054] shadow-unt-xs hover:bg-[#F9FAFB] focus:outline-none focus:ring-4 focus:ring-[#F4EBFF] transition-all cursor-pointer">
                  <div className={`h-6 w-6 rounded-full flex items-center justify-center font-bold text-xs ${
                    isAdmin
                      ? "bg-[#7F56D9] text-white"
                      : "bg-[#ECFDF3] text-[#027A48]"
                  }`}>
                    {initial}
                  </div>
                  <span className="max-w-[110px] truncate font-medium">
                    {displayName}
                  </span>
                  {isAdmin && (
                    <span className="rounded bg-[#F4EBFF] px-1.5 py-0.5 text-[9px] font-bold text-[#7F56D9] border border-[#E9D7FE]">
                      Admin
                    </span>
                  )}
                  <ChevronDown className="h-3.5 w-3.5 text-[#667085]" />
                </button>
              }
            />
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-[#344054] hover:text-[#7F56D9] hover:bg-[#F9FAFB] transition-colors"
              >
                เข้าสู่ระบบ
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center justify-center rounded-xl bg-[#7F56D9] px-4.5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-unt-xs hover:bg-[#6941C6] focus:outline-none focus:ring-4 focus:ring-[#F4EBFF] transition-all"
              >
                สมัครเรียน
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden rounded-xl p-2.5 text-[#475467] hover:bg-[#F2F4F7] focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* 100% Full-Width Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full border-b border-[#EAECF0] bg-white px-5 pt-4 pb-6 space-y-4 shadow-unt-lg animate-in slide-in-from-top duration-150 max-h-[85vh] overflow-y-auto">
          {/* Mobile Search Input */}
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#667085]" />
            <input
              type="text"
              placeholder="ค้นหาคอร์สหรือบทเรียน..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-[#D0D5DD] bg-white py-2.5 pl-10 pr-4 text-xs text-[#101828] placeholder:text-[#667085] shadow-unt-xs focus:border-[#7F56D9] focus:outline-none"
            />
          </form>

          {/* User Profile Card if logged in */}
          {user && (
            <div className="p-3.5 rounded-2xl bg-[#F9FAFB] border border-[#EAECF0] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className={`h-9 w-9 rounded-full flex items-center justify-center font-bold text-sm ${
                  isAdmin ? "bg-[#7F56D9] text-white" : "bg-[#ECFDF3] text-[#027A48]"
                }`}>
                  {initial}
                </div>
                <div>
                  <p className="text-xs font-bold text-[#101828]">{displayName}</p>
                  <p className="text-[10px] text-[#667085] font-mono">{user.email}</p>
                </div>
              </div>
              {isAdmin ? (
                <span className="rounded-full bg-[#7F56D9] px-2.5 py-0.5 text-[10px] font-bold text-white shadow-unt-xs">
                  Admin
                </span>
              ) : (
                <span className="rounded-full bg-[#ECFDF3] px-2.5 py-0.5 text-[10px] font-bold text-[#027A48] border border-[#ABEFC6]">
                  Student
                </span>
              )}
            </div>
          )}

          {/* Categorized Mobile Navigation Links */}
          <div className="space-y-3 pt-1">
            {/* หมวดหมู่คอร์สเรียน */}
            <div className="space-y-1">
              <p className="text-[11px] font-bold text-[#98A2B3] uppercase tracking-wider px-2">
                หมวดหมู่วิชาหลัก
              </p>
              <Link
                href="/courses?category=math-m4"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 py-2 px-3 rounded-xl text-xs font-semibold text-[#344054] hover:bg-[#F4EBFF] hover:text-[#7F56D9]"
              >
                <Calculator className="h-4 w-4 text-[#7F56D9]" />
                <span>คณิตศาสตร์ ม.4 (เซต, ตรรกศาสตร์, จำนวนจริง)</span>
              </Link>
              <Link
                href="/courses?category=math-m5"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 py-2 px-3 rounded-xl text-xs font-semibold text-[#344054] hover:bg-[#F4EBFF] hover:text-[#7F56D9]"
              >
                <Calculator className="h-4 w-4 text-[#7F56D9]" />
                <span>คณิตศาสตร์ ม.5 (ตรีโกณ, เวกเตอร์, Expo-Log)</span>
              </Link>
              <Link
                href="/courses?category=math-m6"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 py-2 px-3 rounded-xl text-xs font-semibold text-[#344054] hover:bg-[#F4EBFF] hover:text-[#7F56D9]"
              >
                <Calculator className="h-4 w-4 text-[#7F56D9]" />
                <span>คณิตศาสตร์ ม.6 (แคลคูลัส, สถิติ, ลำดับ)</span>
              </Link>
              <Link
                href="/courses?category=physics"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 py-2 px-3 rounded-xl text-xs font-semibold text-[#344054] hover:bg-[#EFF8FF] hover:text-[#175CD3]"
              >
                <Zap className="h-4 w-4 text-[#175CD3]" />
                <span>ฟิสิกส์ ม.ปลาย & TPAT3 ความถนัดวิศวะ</span>
              </Link>
              <Link
                href="/courses?category=tcas"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 py-2 px-3 rounded-xl text-xs font-semibold text-[#344054] hover:bg-[#ECFDF3] hover:text-[#027A48]"
              >
                <Target className="h-4 w-4 text-[#027A48]" />
                <span>ตะลุยโจทย์ A-Level คณิต 1 & ฟิสิกส์</span>
              </Link>
              <Link
                href="/courses"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 py-2 px-3 rounded-xl text-xs font-bold text-[#7F56D9] bg-[#F9F5FF] border border-[#E9D7FE]"
              >
                <BookOpen className="h-4 w-4 text-[#7F56D9]" />
                <span>ดูคอร์สเรียนทั้งหมด (All Courses)</span>
              </Link>
            </div>

            {/* หมวดหมู่เกี่ยวกับ & สถาบัน */}
            <div className="space-y-1 pt-2 border-t border-[#EAECF0]">
              <p className="text-[11px] font-bold text-[#98A2B3] uppercase tracking-wider px-2">
                เกี่ยวกับ & บริการ
              </p>
              <Link
                href="/#about-tutor"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 py-2 px-3 rounded-xl text-xs font-semibold text-[#344054] hover:bg-[#F9FAFB] hover:text-[#7F56D9]"
              >
                <Award className="h-4 w-4 text-[#667085]" />
                <span>เกี่ยวกับพี่โต๋ (ประวัติ & ผลงาน)</span>
              </Link>
              <Link
                href="/#testimonials"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 py-2 px-3 rounded-xl text-xs font-semibold text-[#344054] hover:bg-[#F9FAFB] hover:text-[#7F56D9]"
              >
                <Sparkles className="h-4 w-4 text-[#667085]" />
                <span>รีวิวผลงานนักเรียนสอบติด</span>
              </Link>
              <Link
                href="/#faqs"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 py-2 px-3 rounded-xl text-xs font-semibold text-[#344054] hover:bg-[#F9FAFB] hover:text-[#7F56D9]"
              >
                <HelpCircle className="h-4 w-4 text-[#667085]" />
                <span>คำถามที่พบบ่อย (FAQs)</span>
              </Link>
            </div>

            {/* Admin Exclusive Link on Mobile */}
            {isAdmin && (
              <div className="pt-2 border-t border-[#EAECF0]">
                <Link
                  href="/instructor"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 py-3 px-3.5 rounded-2xl font-bold text-xs text-[#7F56D9] bg-[#F4EBFF] border border-[#E9D7FE] shadow-unt-xs"
                >
                  <ShieldCheck className="h-4.5 w-4.5" />
                  <span>แดชบอร์ดจัดการระบบหลังบ้าน (Admin)</span>
                </Link>
              </div>
            )}
          </div>

          {/* Auth Action Buttons for Mobile */}
          {!user ? (
            <div className="pt-3 border-t border-[#EAECF0] grid grid-cols-2 gap-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2.5 text-xs font-bold text-[#344054] bg-[#F9FAFB] rounded-xl border border-[#D0D5DD]"
              >
                เข้าสู่ระบบ
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2.5 text-xs font-bold text-white bg-[#7F56D9] rounded-xl shadow-unt-xs"
              >
                สมัครสมาชิกฟรี
              </Link>
            </div>
          ) : (
            <div className="pt-3 border-t border-[#EAECF0] flex justify-between items-center">
              <Link
                href="/my-courses"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold text-[#7F56D9] hover:underline"
              >
                ดูคอร์สของฉัน →
              </Link>
              <button
                onClick={async () => {
                  await supabase.auth.signOut();
                  setUser(null);
                  setIsAdmin(false);
                  setMobileMenuOpen(false);
                  router.push("/login");
                }}
                className="text-xs font-bold text-[#F04438] hover:underline"
              >
                ออกจากระบบ
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}


