"use client";

import Link from "next/link";
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  FileText, 
  Users, 
  CheckCircle2, 
  ArrowLeft,
  Mail,
  MessageCircle,
  Clock,
  Sparkles
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB] text-[#101828]">
      <Header />

      <main className="flex-1 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb & Header Banner */}
          <div className="mb-10 space-y-4">
            <nav className="flex items-center gap-2 text-xs text-[#667085]">
              <Link href="/" className="hover:text-[#7F56D9] transition-colors">
                หน้าหลัก
              </Link>
              <span>/</span>
              <span className="text-[#7F56D9] font-semibold">นโยบายความเป็นส่วนตัว</span>
            </nav>

            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#ECFDF3] px-3.5 py-1 text-xs font-semibold text-[#027A48] border border-[#ABEFC6]">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>คุ้มครองข้อมูลส่วนบุคคลตาม พ.ร.บ. PDPA พ.ศ. 2562</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#101828]">
              นโยบายความเป็นส่วนตัว (Privacy Policy)
            </h1>

            <div className="flex items-center gap-2 text-xs text-[#667085]">
              <Clock className="h-3.5 w-3.5" />
              <span>ปรับปรุงล่าสุดเมื่อ: 29 สิงหาคม 2026</span>
            </div>
          </div>

          {/* Policy Document Content (Untitled UI Clean White Card) */}
          <div className="rounded-2xl border border-[#EAECF0] bg-white p-6 sm:p-10 shadow-unt-xs space-y-8 text-xs sm:text-sm text-[#475467] leading-relaxed">
            {/* Introduction */}
            <div className="space-y-3">
              <p>
                <strong>P&apos;Toh Tutor</strong> (&ldquo;สถาบัน&rdquo; หรือ &ldquo;เรา&rdquo;) ให้ความสำคัญสูงสุดต่อการคุ้มครองข้อมูลส่วนบุคคลของนักเรียน ผู้ปกครอง และผู้เข้าใช้งานเว็บไซต์ทุกท่าน นโยบายความเป็นส่วนตัวฉบับนี้จัดทำขึ้นเพื่อชี้แจงรายละเอียดเกี่ยวกับการเก็บรวบรวม ใช้ และเปิดเผยข้อมูลส่วนบุคคล ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA)
              </p>
            </div>

            {/* 1. Data Collected */}
            <div className="space-y-3 border-t border-[#EAECF0] pt-6">
              <h2 className="text-base sm:text-lg font-bold text-[#101828] flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#F4EBFF] text-xs font-bold text-[#7F56D9]">
                  1
                </span>
                ข้อมูลส่วนบุคคลที่เราเก็บรวบรวม
              </h2>
              <p>เราจะเก็บรวบรวมข้อมูลส่วนบุคคลเท่าที่จำเป็นต่อการให้บริการคอร์สเรียนและการจัดการทางการศึกษา ได้แก่:</p>
              <ul className="list-disc list-inside space-y-2 pl-2 text-[#344054]">
                <li><strong>ข้อมูลยืนยันตัวตน:</strong> ชื่อ-นามสกุล, ชื่อเล่น, ระดับชั้นการศึกษา, โรงเรียน</li>
                <li><strong>ข้อมูลการติดต่อ:</strong> ที่อยู่อีเมล, เบอร์โทรศัพท์, บัญชี LINE ID</li>
                <li><strong>ข้อมูลการใช้งานระบบ:</strong> ประวัติการเข้าชมบทเรียนวิดีโอ, เปอร์เซ็นต์ความก้าวหน้าในการเรียน, บันทึกการทำแบบฝึกหัด, ประวัติการส่งคำถาม Q&A</li>
                <li><strong>ข้อมูลการทำธุรกรรม:</strong> หลักฐานการชำระเงิน (สลิปโอนเงิน / PromptPay), วันที่และเวลาที่สั่งซื้อ (เราไม่มีการเก็บข้อมูลหมายเลขบัตรเครดิต โดยประมวลผลผ่าน Payment Gateway ที่ได้รับมาตรฐานความปลอดภัยระดับสากล)</li>
              </ul>
            </div>

            {/* 2. Purposes of Processing */}
            <div className="space-y-3 border-t border-[#EAECF0] pt-6">
              <h2 className="text-base sm:text-lg font-bold text-[#101828] flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#F4EBFF] text-xs font-bold text-[#7F56D9]">
                  2
                </span>
                วัตถุประสงค์ในการเก็บรวบรวมและใช้ข้อมูล
              </h2>
              <ul className="space-y-2.5 text-[#344054]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#7F56D9] shrink-0 mt-0.5" />
                  <span>เพื่อเปิดสิทธิ์การเข้าใช้งานห้องเรียนวิดีโอและดาวน์โหลดเอกสาร PDF ตลอดชีพ</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#7F56D9] shrink-0 mt-0.5" />
                  <span>เพื่อการสื่อสาร ตอบคำถามข้อสงสัยในบทเรียน และให้คำปรึกษาทางวิชาการโดยพี่โต๋</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#7F56D9] shrink-0 mt-0.5" />
                  <span>เพื่อตรวจสอบการชำระเงินและออกหลักฐานยืนยันการลงทะเบียน</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#7F56D9] shrink-0 mt-0.5" />
                  <span>เพื่อรักษาความปลอดภัยของระบบ และป้องกันการละเมิดลิขสิทธิ์บทเรียน (Anti-Piracy Tracking)</span>
                </li>
              </ul>
            </div>

            {/* 3. Data Protection & Security */}
            <div className="space-y-3 border-t border-[#EAECF0] pt-6">
              <h2 className="text-base sm:text-lg font-bold text-[#101828] flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#F4EBFF] text-xs font-bold text-[#7F56D9]">
                  3
                </span>
                มาตรการรักษาความปลอดภัยของข้อมูล
              </h2>
              <p>
                เราใช้มาตรการทางเทคนิคและการบริหารจัดการที่ได้มาตรฐาน เพื่อปกป้องข้อมูลส่วนบุคคลของคุณจากการสูญหาย เข้าถึง ทำลาย หรือเปิดเผยโดยไม่ได้รับอนุญาต:
              </p>
              <div className="rounded-xl border border-[#EAECF0] bg-[#F9FAFB] p-4 space-y-2 text-xs">
                <p><strong>• การเข้ารหัสข้อมูล:</strong> ข้อมูลทั้งหมดถูกส่งผ่านโปรโตคอล HTTPS ด้วยการเข้ารหัส SSL/TLS ระดับ 256-bit</p>
                <p><strong>• การจำกัดการเข้าถึง:</strong> มีเพียงพี่โต๋และทีมงานที่ได้รับมอบหมายเท่านั้นที่สามารถเข้าถึงข้อมูลเพื่อการบริการ</p>
              </div>
            </div>

            {/* 4. Rights of Data Subjects */}
            <div className="space-y-3 border-t border-[#EAECF0] pt-6">
              <h2 className="text-base sm:text-lg font-bold text-[#101828] flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#F4EBFF] text-xs font-bold text-[#7F56D9]">
                  4
                </span>
                สิทธิของเจ้าของข้อมูลส่วนบุคคล (PDPA Rights)
              </h2>
              <p>ภายใต้กฎหมายคุ้มครองข้อมูลส่วนบุคคล คุณมีสิทธิดังต่อไปนี้:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="rounded-lg border border-[#EAECF0] p-3 bg-white">
                  <strong>• สิทธิในการเข้าถึงและขอรับสำเนา:</strong> ขอตรวจสอบข้อมูลส่วนบุคคลของคุณที่เราเก็บไว้
                </div>
                <div className="rounded-lg border border-[#EAECF0] p-3 bg-white">
                  <strong>• สิทธิในการขอแก้ไขข้อมูล:</strong> แจ้งปรับปรุงข้อมูลให้ถูกต้องและเป็นปัจจุบัน
                </div>
                <div className="rounded-lg border border-[#EAECF0] p-3 bg-white">
                  <strong>• สิทธิในการขอลบหรือทำลาย:</strong> ขอลบข้อมูลเมื่อหมดความจำเป็นในการใช้งาน
                </div>
                <div className="rounded-lg border border-[#EAECF0] p-3 bg-white">
                  <strong>• สิทธิในการเพิกถอนความยินยอม:</strong> ยกเลิกการรับข่าวสารโปรโมชั่นได้ทุกเมื่อ
                </div>
              </div>
            </div>

            {/* 5. Contact Information */}
            <div className="space-y-4 border-t border-[#EAECF0] pt-6">
              <h2 className="text-base sm:text-lg font-bold text-[#101828] flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#F4EBFF] text-xs font-bold text-[#7F56D9]">
                  5
                </span>
                ช่องทางการติดต่อเจ้าหน้าที่คุ้มครองข้อมูล
              </h2>
              <p>
                หากคุณมีข้อสงสัยเกี่ยวกับนโยบายความเป็นส่วนตัว หรือต้องการใช้สิทธิตามกฎหมาย PDPA สามารถติดต่อเราได้ที่:
              </p>
              <div className="rounded-xl border border-[#E9D7FE] bg-[#F9F5FF] p-5 space-y-2 text-xs">
                <p className="font-bold text-[#7F56D9] text-sm">สถาบันกวดวิชา P&apos;Toh Tutor</p>
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#7F56D9]" />
                  <span>อีเมล: support@ptoh-tutor.com</span>
                </p>
                <p className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-[#12B76A]" />
                  <span>LINE Official: @ptohtutor</span>
                </p>
              </div>
            </div>
          </div>

          {/* Back to Home Button */}
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-5 py-2.5 text-xs font-semibold text-[#344054] shadow-unt-xs hover:bg-[#F9FAFB] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              กลับสู่หน้าหลัก
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
