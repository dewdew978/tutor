import Link from "next/link";
import { GraduationCap, MessageCircle, Video, Globe, ShieldCheck, Lock, CheckCircle2, Sparkles, Building2, Zap, Server } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0C111D] text-white border-t border-[#1D2939]">
      {/* Newsletter & Resource Section */}
      <div className="border-b border-[#1D2939] bg-[#101828] py-14">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center lg:text-left">
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                รับสรุปสูตรฟรี & ข้อสอบจำลอง A-Level วิเคราะห์เจาะลึก
              </h3>
              <p className="text-xs sm:text-sm text-[#98A2B3] max-w-xl">
                อัปเดตแนวข้อสอบจริง เทคนิคการตัดช้อยส์ และบทวิเคราะห์สถิติคณิตศาสตร์ & ฟิสิกส์ ม.ปลาย สู่คะแนนเต็ม 100
              </p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="flex w-full max-w-md items-center gap-2.5">
              <input
                type="email"
                placeholder="กรอกอีเมลของคุณเพื่อรับชีทสรุป..."
                className="w-full rounded-xl border border-[#344054] bg-[#1D2939] px-4 py-3 text-xs sm:text-sm text-white placeholder:text-[#667085] shadow-unt-xs focus:border-[#7F56D9] focus:outline-none focus:ring-4 focus:ring-[#7F56D9]/20 transition-all"
              />
              <button
                type="submit"
                className="shrink-0 rounded-xl bg-[#7F56D9] px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-unt-xs hover:bg-[#6941C6] focus:outline-none focus:ring-4 focus:ring-[#7F56D9]/30 transition-all cursor-pointer"
              >
                รับสรุปสูตรฟรี
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="w-full px-4 py-16 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand & About */}
          <div className="space-y-4 lg:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#7F56D9] text-white shadow-unt-xs">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <span className="text-xl font-extrabold text-white tracking-tight">
                  P&apos;Toh Tutor
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-[#98A2B3] max-w-sm leading-relaxed">
              แพลตฟอร์มการเรียนรู้ออนไลน์สำหรับนักเรียน ม.ปลาย สอนโดยพี่โต๋ เกียรตินิยมอันดับ 1 ดูแลคุณภาพการเรียนรู้และระบบการเรียนการสอนอย่างใกล้ชิด
            </p>

            {/* Social & Contact */}
            <div className="flex items-center gap-4 pt-2 text-[#98A2B3] text-xs font-semibold">
              <a href="https://line.me" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-[#12B76A] transition-colors" title="LINE">
                <MessageCircle className="h-4 w-4 text-[#12B76A]" /> LINE Official
              </a>
              <a href="#" className="flex items-center gap-1.5 hover:text-white transition-colors" title="YouTube">
                <Video className="h-4 w-4 text-[#F04438]" /> YouTube
              </a>
              <a href="#" className="flex items-center gap-1.5 hover:text-white transition-colors" title="Community">
                <Globe className="h-4 w-4 text-[#7F56D9]" /> Facebook Group
              </a>
            </div>

            {/* System Health Monitor */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 rounded-xl bg-[#1D2939] px-3 py-1.5 border border-[#344054] text-xs">
                <span className="h-2 w-2 rounded-full bg-[#12B76A] animate-pulse" />
                <span className="font-semibold text-[#D0D5DD]">All Systems Operational</span>
                <span className="text-[10px] text-[#98A2B3] font-mono">99.99% SLA Uptime</span>
              </div>
            </div>
          </div>

          {/* Col 2: คอร์สเรียน */}
          <div>
            <h4 className="text-xs font-bold text-white tracking-wider uppercase mb-4">
              คอร์สเรียนหลักสูตรเข้มข้น
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm font-medium text-[#98A2B3]">
              <li><Link href="/courses?category=math-m4" className="hover:text-white transition-colors">คณิตศาสตร์ ม.4 (เทอม 1-2)</Link></li>
              <li><Link href="/courses?category=math-m5" className="hover:text-white transition-colors">คณิตศาสตร์ ม.5 (ตรีโกณ & เวกเตอร์)</Link></li>
              <li><Link href="/courses?category=math-m6" className="hover:text-white transition-colors">คณิตศาสตร์ ม.6 (แคลคูลัส & สถิติ)</Link></li>
              <li><Link href="/courses?category=tcas" className="hover:text-white transition-colors">ตะลุยโจทย์ A-Level คณิต 1</Link></li>
              <li><Link href="/courses?category=physics" className="hover:text-white transition-colors">ฟิสิกส์ ม.ปลาย & TPAT3 วิศวะ</Link></li>
            </ul>
          </div>

          {/* Col 3: ฟีเจอร์และการเรียนรู้ */}
          <div>
            <h4 className="text-xs font-bold text-white tracking-wider uppercase mb-4">
              บริการและการเรียนรู้
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm font-medium text-[#98A2B3]">
              <li><Link href="/learn/math-calculus-mastery" className="hover:text-white transition-colors">ทดลองเข้าห้องเรียนฟรี</Link></li>
              <li><Link href="/courses" className="hover:text-white transition-colors">ระบบถาม-ตอบกับผู้สอนโดยตรง</Link></li>
              <li><Link href="/instructor" className="hover:text-white transition-colors">ระบบจัดการคอร์สสำหรับแอดมิน</Link></li>
            </ul>
          </div>

          {/* Col 4: ความปลอดภัย & Compliance */}
          <div>
            <h4 className="text-xs font-bold text-white tracking-wider uppercase mb-4">
              ความปลอดภัย & มาตรฐาน
            </h4>
            <div className="space-y-3 text-xs text-[#98A2B3]">
              <div className="flex items-center gap-2 text-[#D0D5DD]">
                <ShieldCheck className="h-4 w-4 text-[#12B76A]" />
                <span>PDPA Compliant (คุ้มครองข้อมูล)</span>
              </div>
              <div className="flex items-center gap-2 text-[#D0D5DD]">
                <Lock className="h-4 w-4 text-[#7F56D9]" />
                <span>256-Bit SSL Data Encryption</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sub-Bar */}
        <div className="mt-14 border-t border-[#1D2939] pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#667085] gap-4">
          <p>© {new Date().getFullYear()} P&apos;Toh Tutor. All rights reserved. สงวนลิขสิทธิ์ทุกประการ</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">นโยบายความเป็นส่วนตัว (Privacy Policy)</Link>
            <Link href="/terms" className="hover:text-white transition-colors">เงื่อนไขการให้บริการ (Terms of Service)</Link>
            <span className="text-[#344054]">|</span>
            <span className="text-[#98A2B3]">Cloud-native on Next.js & Supabase</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

