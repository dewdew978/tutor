"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  CheckCircle2, 
  DollarSign, 
  Users, 
  ShieldCheck, 
  ArrowLeft, 
  Send 
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function BecomeTutorPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    headline: "",
    subjects: "",
    experience: "",
    introVideo: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB] text-[#101828]">
      <Header />

      <main className="flex-1 py-12 lg:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#667085] hover:text-[#7F56D9] transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              กลับสู่หน้าหลัก
            </Link>
          </div>

          {/* Header Banner */}
          <div className="text-center space-y-3 mb-10">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#F4EBFF] px-3.5 py-1 text-xs font-semibold text-[#7F56D9]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>ร่วมเป็นหนึ่งในผู้สอนของ TutorHub</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#101828]">
              สมัครเป็นติวเตอร์บนแพลตฟอร์ม
            </h1>
            <p className="text-sm text-[#475467] max-w-xl mx-auto">
              สร้างคอร์สวิดีโอคุณภาพของคุณเอง เข้าถึงผู้เรียนหลายหมื่นคน และรับส่วนแบ่งรายได้สูงสุด 80%
            </p>
          </div>

          {/* Perks Grid (Untitled UI Style) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <div className="rounded-2xl border border-[#EAECF0] bg-white p-5 text-center shadow-unt-xs">
              <div className="mx-auto mb-2.5 flex h-10 w-10 items-center justify-center rounded-xl bg-[#ECFDF3] text-[#027A48]">
                <DollarSign className="h-5 w-5" />
              </div>
              <h4 className="text-sm font-bold text-[#101828]">รับส่วนแบ่ง 80%</h4>
              <p className="text-xs text-[#667085] mt-1">โอนตรงเข้าบัญชีธนาคารทุกสิ้นเดือน รวดเร็วและโปร่งใส</p>
            </div>

            <div className="rounded-2xl border border-[#EAECF0] bg-white p-5 text-center shadow-unt-xs">
              <div className="mx-auto mb-2.5 flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4EBFF] text-[#7F56D9]">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h4 className="text-sm font-bold text-[#101828]">ระบบป้องกันดูดคลิป</h4>
              <p className="text-xs text-[#667085] mt-1">สตรีมมิ่งผ่าน Cloudflare HLS มั่นใจในลิขสิทธิ์</p>
            </div>

            <div className="rounded-2xl border border-[#EAECF0] bg-white p-5 text-center shadow-unt-xs">
              <div className="mx-auto mb-2.5 flex h-10 w-10 items-center justify-center rounded-xl bg-[#EFF8FF] text-[#175CD3]">
                <Users className="h-5 w-5" />
              </div>
              <h4 className="text-sm font-bold text-[#101828]">ฐานผู้เรียนพร้อมซื้อ</h4>
              <p className="text-xs text-[#667085] mt-1">การตลาดและการโปรโมตคอร์สผ่านช่องทางหลัก</p>
            </div>
          </div>

          {/* Form or Success View */}
          {submitted ? (
            <div className="rounded-2xl border border-[#ABEFC6] bg-[#ECFDF3] p-8 text-center shadow-unt-sm space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#12B76A] text-white shadow-unt-md">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-[#101828]">
                ส่งใบสมัครเรียบร้อยแล้ว!
              </h3>
              <p className="text-xs sm:text-sm text-[#344054] max-w-md mx-auto">
                ทีมงานได้รับข้อมูลของคุณแล้ว โดยจะทำการตรวจสอบประวัติและติดต่อกลับผ่านอีเมล <strong className="text-[#027A48]">{formData.email || "ที่คุณระบุ"}</strong> ภายใน 1-2 วันทำการ
              </p>
              <div className="pt-3">
                <Link
                  href="/"
                  className="inline-flex rounded-lg bg-[#027A48] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#05603A] transition-colors"
                >
                  กลับสู่หน้าแรก
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-2xl border border-[#EAECF0] bg-white p-6 sm:p-8 shadow-unt-sm space-y-6">
              <div className="border-b border-[#EAECF0] pb-4">
                <h3 className="text-base font-bold text-[#101828]">
                  กรอกข้อมูลสำหรับการสมัครเป็นติวเตอร์
                </h3>
                <p className="text-xs text-[#667085] mt-0.5">
                  ข้อมูลทั้งหมดจะถูกเก็บเป็นความลับและใช้เพื่อการยืนยันตัวตนเท่านั้น
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-[#344054] mb-1.5">
                    ชื่อ-นามสกุล / ชื่อที่ใช้สอน *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น พี่ปอนด์ จุฬาฯ, ครูเอมี่"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-lg border border-[#D0D5DD] bg-white px-3.5 py-2 text-xs text-[#101828] shadow-unt-xs focus:border-[#7F56D9] focus:outline-none focus:ring-4 focus:ring-[#F4EBFF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#344054] mb-1.5">
                    อีเมลสำหรับติดต่อ *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="tutor@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-lg border border-[#D0D5DD] bg-white px-3.5 py-2 text-xs text-[#101828] shadow-unt-xs focus:border-[#7F56D9] focus:outline-none focus:ring-4 focus:ring-[#F4EBFF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#344054] mb-1.5">
                    เบอร์โทรศัพท์ติดต่อ *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="08x-xxx-xxxx"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-lg border border-[#D0D5DD] bg-white px-3.5 py-2 text-xs text-[#101828] shadow-unt-xs focus:border-[#7F56D9] focus:outline-none focus:ring-4 focus:ring-[#F4EBFF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#344054] mb-1.5">
                    วิชาที่ต้องการสอน *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น คณิตศาสตร์ ม.ปลาย, IELTS, Next.js"
                    value={formData.subjects}
                    onChange={(e) => setFormData({ ...formData, subjects: e.target.value })}
                    className="w-full rounded-lg border border-[#D0D5DD] bg-white px-3.5 py-2 text-xs text-[#101828] shadow-unt-xs focus:border-[#7F56D9] focus:outline-none focus:ring-4 focus:ring-[#F4EBFF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#344054] mb-1.5">
                  ประวัติการศึกษา & เกียรติประวัติ (Headline) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="เช่น เกียรตินิยมอันดับ 1 วิศวะ จุฬาฯ, ปริญญาเอก อักษรฯ จุฬาฯ, IELTS 8.5"
                  value={formData.headline}
                  onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                  className="w-full rounded-lg border border-[#D0D5DD] bg-white px-3.5 py-2 text-xs text-[#101828] shadow-unt-xs focus:border-[#7F56D9] focus:outline-none focus:ring-4 focus:ring-[#F4EBFF]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#344054] mb-1.5">
                  ประสบการณ์การสอนและสไตล์การถ่ายทอด *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="อธิบายประสบการณ์สอน สถาบันที่เคยสอน หรือเทคนิคการสอน..."
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full rounded-lg border border-[#D0D5DD] bg-white px-3.5 py-2 text-xs text-[#101828] shadow-unt-xs focus:border-[#7F56D9] focus:outline-none focus:ring-4 focus:ring-[#F4EBFF]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#344054] mb-1.5">
                  ลิงก์คลิปวิดีโอตัวอย่างการสอน (YouTube / Google Drive) *
                </label>
                <input
                  type="url"
                  placeholder="https://youtu.be/..."
                  value={formData.introVideo}
                  onChange={(e) => setFormData({ ...formData, introVideo: e.target.value })}
                  className="w-full rounded-lg border border-[#D0D5DD] bg-white px-3.5 py-2 text-xs text-[#101828] shadow-unt-xs focus:border-[#7F56D9] focus:outline-none focus:ring-4 focus:ring-[#F4EBFF]"
                />
                <p className="text-[11px] text-[#667085] mt-1">คลิปสอนสั้นๆ 3-5 นาที เพื่อให้ทีมงานประเมินคุณภาพการสอน</p>
              </div>

              <div className="pt-4 border-t border-[#EAECF0] flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#7F56D9] px-6 py-2.5 text-xs font-bold text-white shadow-unt-xs hover:bg-[#6941C6] focus:outline-none focus:ring-4 focus:ring-[#F4EBFF] transition-all"
                >
                  <Send className="h-4 w-4" />
                  ส่งใบสมัครเป็นติวเตอร์
                </button>
              </div>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
