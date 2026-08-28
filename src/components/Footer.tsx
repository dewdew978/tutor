import Link from "next/link";
import { GraduationCap, MessageCircle, Video, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-[#EAECF0]">
      {/* Newsletter Subscribe Section */}
      <div className="border-b border-[#EAECF0] bg-[#F9FAFB] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-1.5 text-center lg:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-[#101828]">
                รับสรุปสูตรฟรี & แนวข้อสอบ A-Level ส่งตรงถึงอีเมล
              </h3>
              <p className="text-sm sm:text-base text-[#475467]">
                รับเทคนิคการทำโจทย์และสิทธิพิเศษสำหรับนักเรียนของพี่โต๋
              </p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="flex w-full max-w-md items-center gap-3">
              <input
                type="email"
                placeholder="กรอกอีเมลของคุณ..."
                className="w-full rounded-xl border border-[#D0D5DD] bg-white px-4 py-3 text-sm text-[#101828] placeholder:text-[#667085] shadow-unt-xs focus:border-[#7F56D9] focus:outline-none focus:ring-4 focus:ring-[#F4EBFF]"
              />
              <button
                type="submit"
                className="shrink-0 rounded-xl bg-[#7F56D9] px-5 py-3 text-sm sm:text-base font-bold text-white shadow-unt-xs hover:bg-[#6941C6] focus:outline-none focus:ring-4 focus:ring-[#F4EBFF] transition-all cursor-pointer"
              >
                รับสรุปสูตรฟรี
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7F56D9] text-white shadow-unt-xs">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="text-xl font-extrabold text-[#101828] tracking-tight">
                P&apos;Toh Tutor
              </span>
            </Link>
            <p className="text-sm sm:text-base text-[#475467] max-w-md leading-relaxed">
              สถาบันกวดวิชาคณิตศาสตร์และฟิสิกส์ ม.ปลาย สู่การสอบเข้ามหาวิทยาลัยชั้นนำ สอนโดย พี่โต๋ เกียรตินิยมอันดับ 1
            </p>
            <div className="flex items-center gap-5 pt-3 text-[#667085]">
              <a href="https://line.me" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-[#12B76A] transition-colors text-sm font-semibold" title="LINE">
                <MessageCircle className="h-5 w-5 text-[#12B76A]" /> LINE Official
              </a>
              <a href="#" className="flex items-center gap-1.5 hover:text-[#7F56D9] transition-colors text-sm font-semibold" title="YouTube">
                <Video className="h-5 w-5 text-[#7F56D9]" /> YouTube Channel
              </a>
              <a href="#" className="flex items-center gap-1.5 hover:text-[#7F56D9] transition-colors text-sm font-semibold" title="Community">
                <Globe className="h-5 w-5 text-[#7F56D9]" /> Facebook Group
              </a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="text-xs font-bold text-[#344054] tracking-wider uppercase mb-4">
              คอร์สเรียนตามระดับชั้น
            </h4>
            <ul className="space-y-3 text-sm sm:text-base font-medium text-[#475467]">
              <li><Link href="/courses" className="hover:text-[#7F56D9]">คณิตศาสตร์ ม.4</Link></li>
              <li><Link href="/courses" className="hover:text-[#7F56D9]">คณิตศาสตร์ ม.5</Link></li>
              <li><Link href="/courses" className="hover:text-[#7F56D9]">คณิตศาสตร์ ม.6</Link></li>
              <li><Link href="/courses" className="hover:text-[#7F56D9]">ตะลุยโจทย์ A-Level คณิต 1</Link></li>
              <li><Link href="/courses" className="hover:text-[#7F56D9]">ฟิสิกส์ ม.ปลาย & TPAT3</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="text-xs font-bold text-[#344054] tracking-wider uppercase mb-4">
              เมนู & การช่วยเหลือ
            </h4>
            <ul className="space-y-3 text-sm sm:text-base font-medium text-[#475467]">
              <li><Link href="/#about-tutor" className="hover:text-[#7F56D9]">ประวัติและผลงานพี่โต๋</Link></li>
              <li><Link href="/#testimonials" className="hover:text-[#7F56D9]">รีวิวจากรุ่นพี่สอบติด</Link></li>
              <li><Link href="/learn/math-calculus-mastery" className="hover:text-[#7F56D9]">ทดลองเรียนฟรี</Link></li>
              <li><Link href="/instructor" className="hover:text-[#7F56D9]">ระบบจัดการคอร์สหลังบ้าน</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Sub-Bar */}
        <div className="mt-14 border-t border-[#EAECF0] pt-8 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-[#667085] gap-4">
          <p>© {new Date().getFullYear()} P&apos;Toh Tutor. สงวนลิขสิทธิ์ทุกประการ</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-[#7F56D9] transition-colors">นโยบายความเป็นส่วนตัว</Link>
            <Link href="/terms" className="hover:text-[#7F56D9] transition-colors">เงื่อนไขการใช้บริการ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
