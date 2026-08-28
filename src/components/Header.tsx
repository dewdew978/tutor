"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  GraduationCap, 
  Search, 
  Menu, 
  X, 
  ArrowRight,
  MessageCircle,
  ChevronDown
} from "lucide-react";
import { DropdownMenuSimple } from "./DropdownMenuSimple";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#EAECF0]">
      {/* Announcement Bar */}
      <div className="bg-[#F9F5FF] border-b border-[#E9D7FE] px-4 py-2 text-center text-xs font-medium text-[#6941C6]">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold text-[#7F56D9] shadow-unt-xs border border-[#E9D7FE]">
            🔥 โปรโมชั่นเปิดเทอม
          </span>
          <span className="truncate">สมัครเรียนทุกคอร์ส เข้าเรียนได้ตลอดชีพ พร้อมดาวน์โหลดชีทสรุป PDF ฟรี</span>
          <Link href="/courses" className="inline-flex items-center gap-1 font-bold text-[#7F56D9] hover:text-[#53389E] underline underline-offset-2">
            ดูคอร์ส <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Nav */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#7F56D9] text-white shadow-unt-xs group-hover:bg-[#6941C6] transition-colors">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <span className="text-lg font-extrabold text-[#101828] tracking-tight">
                P&apos;Toh Tutor
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-semibold text-[#7F56D9] ml-1.5 px-1.5 py-0.5 rounded bg-[#F9F5FF] border border-[#E9D7FE]">
                Math & Physics
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-[#475467]">
            <Link href="/courses" className="hover:text-[#7F56D9] transition-colors">
              คอร์สเรียนทั้งหมด
            </Link>
            <Link href="/#about-tutor" className="hover:text-[#7F56D9] transition-colors">
              เกี่ยวกับพี่โต๋
            </Link>
            <Link href="/#testimonials" className="hover:text-[#7F56D9] transition-colors">
              รีวิวผลงานนักเรียน
            </Link>
            <Link href="/#faqs" className="hover:text-[#7F56D9] transition-colors">
              คำถามที่พบบ่อย (FAQs)
            </Link>
            <Link href="/instructor" className="hover:text-[#7F56D9] transition-colors text-xs text-[#667085]">
              ระบบจัดการหลังบ้าน
            </Link>
          </nav>
        </div>

        {/* Global Search Bar */}
        <div className="hidden lg:flex items-center flex-1 max-w-xs mx-6">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#667085]" />
            <input
              type="text"
              placeholder="ค้นหาคอร์สหรือบทเรียน..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-[#D0D5DD] bg-white py-2 pl-10 pr-4 text-xs text-[#101828] placeholder:text-[#667085] shadow-unt-xs focus:border-[#7F56D9] focus:outline-none focus:ring-4 focus:ring-[#F4EBFF]"
            />
          </div>
        </div>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3">
          <a
            href="https://line.me"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#027A48] bg-[#ECFDF3] border border-[#ABEFC6] px-3 py-2 rounded-lg hover:bg-[#D1FADF] transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            ปรึกษาพี่โต๋ (LINE)
          </a>

          {/* Untitled UI Dropdown Menu */}
          <div className="hidden sm:block">
            <DropdownMenuSimple
              trigger={
                <button className="inline-flex items-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-3 py-2 text-xs font-semibold text-[#344054] shadow-unt-xs hover:bg-[#F9FAFB] focus:outline-none focus:ring-4 focus:ring-[#F4EBFF] transition-all cursor-pointer">
                  <div className="h-5 w-5 rounded-full bg-[#F4EBFF] text-[#7F56D9] flex items-center justify-center font-bold text-[10px]">
                    ต
                  </div>
                  <span>บัญชีของฉัน</span>
                  <ChevronDown className="h-3.5 w-3.5 text-[#667085]" />
                </button>
              }
            />
          </div>

          <Link
            href="/courses"
            className="inline-flex items-center justify-center rounded-lg bg-[#7F56D9] px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-unt-xs hover:bg-[#6941C6] focus:outline-none focus:ring-4 focus:ring-[#F4EBFF] transition-all"
          >
            เลือกดูคอร์ส
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden rounded-lg p-2 text-[#475467] hover:bg-[#F2F4F7]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#EAECF0] bg-white px-4 pt-3 pb-6 space-y-3">
          <Link
            href="/courses"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-[#344054] hover:text-[#7F56D9]"
          >
            คอร์สเรียนทั้งหมด
          </Link>
          <Link
            href="/#about-tutor"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-[#344054] hover:text-[#7F56D9]"
          >
            เกี่ยวกับพี่โต๋ (ประวัติ & ผลงาน)
          </Link>
          <Link
            href="/#testimonials"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-[#344054] hover:text-[#7F56D9]"
          >
            รีวิวผลงานนักเรียนสอบติด
          </Link>
          <Link
            href="/#faqs"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-[#344054] hover:text-[#7F56D9]"
          >
            คำถามที่พบบ่อย (FAQs)
          </Link>
          <Link
            href="/instructor"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-[#667085]"
          >
            ระบบจัดการหลังบ้านติวเตอร์
          </Link>
        </div>
      )}
    </header>
  );
}
