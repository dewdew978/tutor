"use client";

import Link from "next/link";
import { 
  FileCheck, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowLeft,
  Mail,
  MessageCircle,
  Clock,
  AlertTriangle,
  Scale
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function TermsOfServicePage() {
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
              <span className="text-[#7F56D9] font-semibold">เงื่อนไขการใช้บริการ</span>
            </nav>

            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#F4EBFF] px-3.5 py-1 text-xs font-semibold text-[#7F56D9] border border-[#E9D7FE]">
              <Scale className="h-3.5 w-3.5" />
              <span>ข้อกำหนดและเงื่อนไขการใช้บริการคอร์สเรียนออนไลน์</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#101828]">
              เงื่อนไขและข้อตกลงการใช้บริการ (Terms of Service)
            </h1>

            <div className="flex items-center gap-2 text-xs text-[#667085]">
              <Clock className="h-3.5 w-3.5" />
              <span>ปรับปรุงล่าสุดเมื่อ: 29 สิงหาคม 2026</span>
            </div>
          </div>

          {/* Terms Document Content (Untitled UI Clean White Card) */}
          <div className="rounded-2xl border border-[#EAECF0] bg-white p-6 sm:p-10 shadow-unt-xs space-y-8 text-xs sm:text-sm text-[#475467] leading-relaxed">
            {/* Introduction */}
            <div className="space-y-3">
              <p>
                ยินดีต้อนรับสู่ <strong>P&apos;Max Academy</strong> ขอความกรุณาอ่านข้อกำหนดและเงื่อนไขการใช้บริการฉบับนี้อย่างละเอียด การที่ท่านสมัครสมาชิก ลงทะเบียนเข้าเรียน หรือเข้าใช้งานส่วนใดส่วนหนึ่งของเว็บไซต์ ถือว่าท่านได้ยอมรับและตกลงที่จะปฏิบัติตามข้อกำหนดเหล่านี้อย่างครบถ้วน
              </p>
            </div>

            {/* 1. Account & Security */}
            <div className="space-y-3 border-t border-[#EAECF0] pt-6">
              <h2 className="text-base sm:text-lg font-bold text-[#101828] flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#F4EBFF] text-xs font-bold text-[#7F56D9]">
                  1
                </span>
                การสมัครสมาชิกและบัญชีผู้ใช้งาน
              </h2>
              <ul className="list-disc list-inside space-y-2 pl-2 text-[#344054]">
                <li>ผู้ใช้งานต้องให้ข้อมูลที่เป็นจริง ถูกต้อง และเป็นปัจจุบันในการสมัครสมาชิก</li>
                <li>ผู้ใช้งานมีหน้าที่รักษาความลับของชื่อผู้ใช้และรหัสผ่าน และต้องรับผิดชอบต่อทุกกิจกรรมที่เกิดขึ้นภายใต้บัญชีของตนเอง</li>
                <li><strong>สิทธิ์การใช้งานเป็นสิทธิ์เฉพาะบุคคล (Single-User License):</strong> ไม่อนุญาตให้แบ่งปันรหัสผ่าน หารบัญชี หรือให้ผู้อื่นเข้าใช้งานบัญชีร่วมกันโดยเด็ดขาด</li>
              </ul>
            </div>

            {/* 2. Intellectual Property & Copyright */}
            <div className="space-y-3 border-t border-[#EAECF0] pt-6">
              <h2 className="text-base sm:text-lg font-bold text-[#101828] flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#F4EBFF] text-xs font-bold text-[#7F56D9]">
                  2
                </span>
                ทรัพย์สินทางปัญญาและลิขสิทธิ์ (Copyright Protection)
              </h2>
              <p>
                สื่อการสอนทั้งหมด ซึ่งรวมถึงวิดีโอบทเรียน เอกสารประกอบการเรียน ชีทสรุปสูตร PDF แบบฝึกหัด และระบบข้อสอบ ถือเป็นลิขสิทธิ์และทรัพย์สินทางปัญญาของ <strong>พี่แม็ก จุฬาฯ</strong> และ <strong>P&apos;Max Academy</strong> แต่เพียงผู้เดียว
              </p>

              {/* Warning Box */}
              <div className="rounded-xl border border-[#FECDCA] bg-[#FEF3F2] p-4 space-y-2 text-xs text-[#B42318]">
                <div className="flex items-center gap-2 font-bold text-[#D92D20]">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  <span>ข้อห้ามที่สำคัญและมีบทลงโทษตามกฎหมาย:</span>
                </div>
                <ul className="list-disc list-inside space-y-1 pl-1">
                  <li>ห้ามบันทึกหน้าจอ (Screen Recording), ดาวน์โหลด หรือดูดไฟล์วิดีโอออกจากระบบ</li>
                  <li>ห้ามทำซ้ำ ดัดแปลง จำหน่าย จ่ายแจก หรือเผยแพร่ต่อสาธารณะไม่ว่าในรูปแบบใด</li>
                  <li>ระบบมีมาตรการแสดงรหัสนักเรียน (Digital Watermark) ซ่อนและลอยบนวิดีโอ เพื่อตรวจสอบต้นทางกรณีเกิดการละเมิดลิขสิทธิ์</li>
                </ul>
              </div>
            </div>

            {/* 3. Lifetime Access Policy */}
            <div className="space-y-3 border-t border-[#EAECF0] pt-6">
              <h2 className="text-base sm:text-lg font-bold text-[#101828] flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#F4EBFF] text-xs font-bold text-[#7F56D9]">
                  3
                </span>
                สิทธิ์การเข้าเรียนตลอดชีพ (Lifetime Access)
              </h2>
              <p>
                เมื่อชำระค่าลงทะเบียนสำเร็จ นักเรียนจะได้รับสิทธิ์เข้าชมบทเรียนและดาวน์โหลดชีท PDF ได้อย่างไม่จำกัดระยะเวลา ตราบเท่าที่สถาบันยังคงเปิดให้บริการแพลตฟอร์มออนไลน์ โดยไม่มีค่าบริการรายเดือนหรือค่าต่ออายุเพิ่มเติม
              </p>
            </div>

            {/* 4. Payment & Refund Policy */}
            <div className="space-y-3 border-t border-[#EAECF0] pt-6">
              <h2 className="text-base sm:text-lg font-bold text-[#101828] flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#F4EBFF] text-xs font-bold text-[#7F56D9]">
                  4
                </span>
                การชำระเงินและนโยบายการคืนเงิน (Digital Content Policy)
              </h2>
              <ul className="list-disc list-inside space-y-2 pl-2 text-[#344054]">
                <li>การสั่งซื้อคอร์สเรียนถือเป็นการซื้อเนื้อหาดิจิทัล (Digital Goods) ซึ่งระบบจะทำการปลดล็อกสิทธิ์การเข้าชมวิดีโอและดาวน์โหลดไฟล์ชีท PDF ให้ทันทีหลังจากยืนยันการชำระเงิน</li>
                <li>เนื่องจากเนื้อหาดิจิทัลสามารถเข้าถึงและดาวน์โหลดได้ทันที สถาบันขอสงวนสิทธิ์ไม่รับคืนเงินหลังจากที่ผู้เรียนได้เข้าสู่ห้องเรียนหรือดาวน์โหลดเอกสารแล้ว เว้นแต่กรณีเกิดข้อผิดพลาดทางเทคนิคจากระบบของสถาบันที่ทำให้ไม่สามารถเข้าเรียนได้</li>
              </ul>
            </div>

            {/* 5. Account Suspension */}
            <div className="space-y-3 border-t border-[#EAECF0] pt-6">
              <h2 className="text-base sm:text-lg font-bold text-[#101828] flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#F4EBFF] text-xs font-bold text-[#7F56D9]">
                  5
                </span>
                การระงับการให้บริการและยกเลิกบัญชี
              </h2>
              <p>
                สถาบันขอสงวนสิทธิ์ในการระงับหรือยกเลิกบัญชีผู้ใช้งานทันทีโดยไม่ต้องแจ้งให้ทราบล่วงหน้า และไม่มีการคืนเงินค่าลงทะเบียน หากพบว่ามีการกระทำดังต่อไปนี้:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-[#344054]">
                <li>การแชร์หรือปล่อยให้ผู้อื่นเข้าใช้งานบัญชีพร้อมกันจากหลายสถานที่ผิดปกติ</li>
                <li>การพยายามเจาะระบบ ส่งคำสั่งโจมตี หรือดึงข้อมูลออกจากเซิร์ฟเวอร์โดยไม่ได้รับอนุญาต</li>
                <li>การใช้ถ้อยคำหยาบคาย ข่มขู่ หรือก่อกวนในกระดานถาม-ตอบ Q&A</li>
              </ul>
            </div>

            {/* 6. Governing Law */}
            <div className="space-y-3 border-t border-[#EAECF0] pt-6">
              <h2 className="text-base sm:text-lg font-bold text-[#101828] flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#F4EBFF] text-xs font-bold text-[#7F56D9]">
                  6
                </span>
                กฎหมายที่ใช้บังคับและการระงับข้อพิพาท
              </h2>
              <p>
                ข้อกำหนดและเงื่อนไขนี้อยู่ภายใต้การบังคับใช้และตีความตามกฎหมายแห่งราชอาณาจักรไทย ข้อพิพาทใดๆ ที่เกิดขึ้นจากการใช้บริการจะอยู่ภายใต้เขตอำนาจศาลไทยแต่เพียงผู้เดียว
              </p>
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
