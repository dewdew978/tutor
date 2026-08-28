"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Mail, 
  ArrowLeft, 
  CheckCircle2, 
  Send,
  KeyRound,
  AlertCircle
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setErrorMessage("");

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: typeof window !== "undefined" ? `${window.location.origin}/login?reset=true` : undefined,
      });

      if (error) {
        setErrorMessage(error.message || "เกิดข้อผิดพลาดในการส่งลิงก์รีเซ็ตรหัสผ่าน");
        setIsLoading(false);
        return;
      }

      setIsSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || "เกิดข้อผิดพลาดในการส่งลิงก์");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] p-6 sm:p-10 text-[#101828]">
      <div className="w-full max-w-lg rounded-2xl border border-[#EAECF0] bg-white p-8 sm:p-10 shadow-unt-xl text-center space-y-6">
        {/* Top Icon */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F4EBFF] text-[#7F56D9] border border-[#E9D7FE] shadow-unt-xs">
          <KeyRound className="h-7 w-7" />
        </div>

        {/* Header Title */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#101828] tracking-tight">
            ลืมรหัสผ่านใช่ไหม?
          </h1>
          <p className="text-sm text-[#667085] leading-relaxed">
            ไม่ต้องกังวลครับ กรอกอีเมลที่ใช้ลงทะเบียน เราจะส่งลิงก์สำหรับตั้งรหัสผ่านใหม่ไปให้
          </p>
        </div>

        {errorMessage && (
          <div className="rounded-xl bg-[#FEF3F2] border border-[#FECDCA] p-3.5 text-sm text-[#B42318] flex items-center gap-2.5 text-left">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {isSubmitted ? (
          <div className="rounded-2xl bg-[#ECFDF3] border border-[#ABEFC6] p-6 space-y-3.5 text-sm text-left">
            <div className="flex items-center gap-2 font-bold text-[#027A48]">
              <CheckCircle2 className="h-5 w-5 shrink-0" />
              <span>ส่งลิงก์รีเซ็ตรหัสผ่านเรียบร้อยแล้ว!</span>
            </div>
            <p className="text-[#344054] leading-relaxed">
              ระบบได้ส่งคำแนะนำในการตั้งรหัสผ่านใหม่ไปยัง <strong>{email}</strong> แล้ว กรุณาตรวจสอบกล่องจดหมายของคุณ (หรือในโฟลเดอร์ Junk/Spam)
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="text-xs sm:text-sm font-bold text-[#7F56D9] hover:underline pt-1 cursor-pointer"
            >
              ส่งอีกครั้งหากไม่ได้รับอีเมล
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-sm font-semibold text-[#344054] mb-1.5">
                อีเมลที่ใช้ลงทะเบียน *
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-[#667085]" />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-[#D0D5DD] bg-white py-3 pl-11 pr-4 text-sm text-[#101828] placeholder:text-[#667085] shadow-unt-xs focus:border-[#7F56D9] focus:outline-none focus:ring-4 focus:ring-[#F4EBFF]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-[#7F56D9] py-3.5 px-5 text-sm sm:text-base font-bold text-white shadow-unt-xs hover:bg-[#6941C6] focus:outline-none focus:ring-4 focus:ring-[#F4EBFF] disabled:opacity-60 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <span>กำลังส่งลิงก์...</span>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>ส่งลิงก์รีเซ็ตรหัสผ่าน</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* Back to Login Link */}
        <div className="border-t border-[#EAECF0] pt-5">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#667085] hover:text-[#7F56D9] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>กลับไปหน้าเข้าสู่ระบบ</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
