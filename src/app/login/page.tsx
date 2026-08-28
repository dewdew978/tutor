"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  GraduationCap, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  Sparkles,
  ArrowLeft,
  AlertCircle
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          setErrorMessage("อีเมลหรือรหัสผ่านไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง");
        } else if (error.message.includes("Email not confirmed")) {
          setErrorMessage("กรุณายืนยันอีเมลของคุณในกล่องจดหมายก่อนเข้าสู่ระบบ");
        } else {
          setErrorMessage(error.message);
        }
        setIsLoading(false);
        return;
      }

      setSuccessMessage("เข้าสู่ระบบสำเร็จ กำลังพาเข้าสู่ห้องเรียน...");
      setTimeout(() => {
        router.push("/courses");
      }, 500);
    } catch (err: any) {
      setErrorMessage(err.message || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: typeof window !== "undefined" ? `${window.location.origin}/courses` : undefined,
        },
      });
      if (error) throw error;
    } catch (err: any) {
      setErrorMessage(err.message || "เกิดข้อผิดพลาดในการเชื่อมต่อ Google");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white text-[#101828]">
      {/* Left Column: Login Form */}
      <div className="flex-1 flex flex-col justify-between p-6 sm:p-10 lg:p-14 max-w-xl mx-auto w-full">
        {/* Top Header & Logo */}
        <div>
          <div className="flex items-center justify-between mb-8 sm:mb-12">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#7F56D9] text-white shadow-unt-xs group-hover:bg-[#6941C6] transition-colors">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="text-lg font-extrabold text-[#101828] tracking-tight">
                P&apos;Toh Tutor
              </span>
            </Link>

            <Link
              href="/"
              className="text-xs font-semibold text-[#667085] hover:text-[#7F56D9] flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              กลับหน้าหลัก
            </Link>
          </div>

          <div className="space-y-2 mb-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#101828] tracking-tight">
              ยินดีต้อนรับกลับสู่ห้องเรียน 👋
            </h1>
            <p className="text-xs sm:text-sm text-[#667085]">
              เข้าสู่ระบบเพื่อดูบทเรียนวิดีโอ ดาวน์โหลดชีทสรุป และเรียนต่อได้ทันที
            </p>
          </div>

          {/* Google Login Button */}
          <div className="mb-6">
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-2.5 rounded-lg border border-[#D0D5DD] bg-white py-2.5 px-4 text-xs font-semibold text-[#344054] shadow-unt-xs hover:bg-[#F9FAFB] focus:outline-none focus:ring-4 focus:ring-[#F4EBFF] transition-all cursor-pointer"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>เข้าสู่ระบบด้วย Google</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center mb-6">
            <div className="w-full border-t border-[#EAECF0]" />
            <span className="absolute bg-white px-3 text-xs text-[#98A2B3] font-medium">
              หรือเข้าสู่ระบบด้วยอีเมล
            </span>
          </div>

          {/* Email & Password Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {errorMessage && (
              <div className="rounded-lg bg-[#FEF3F2] border border-[#FECDCA] p-3 text-xs text-[#B42318] flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="rounded-lg bg-[#ECFDF3] border border-[#ABEFC6] p-3 text-xs text-[#027A48] flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#344054] mb-1.5">
                อีเมล (Email) *
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#667085]" />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-[#D0D5DD] bg-white py-2.5 pl-10 pr-4 text-xs text-[#101828] placeholder:text-[#667085] shadow-unt-xs focus:border-[#7F56D9] focus:outline-none focus:ring-4 focus:ring-[#F4EBFF]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-[#344054]">
                  รหัสผ่าน (Password) *
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-semibold text-[#7F56D9] hover:underline"
                >
                  ลืมรหัสผ่าน?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#667085]" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-[#D0D5DD] bg-white py-2.5 pl-10 pr-10 text-xs text-[#101828] placeholder:text-[#667085] shadow-unt-xs focus:border-[#7F56D9] focus:outline-none focus:ring-4 focus:ring-[#F4EBFF]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#667085] hover:text-[#101828]"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-[#475467]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-[#D0D5DD] text-[#7F56D9] focus:ring-[#7F56D9] accent-[#7F56D9]"
                />
                <span>จดจำการเข้าสู่ระบบในเครื่องนี้</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-[#7F56D9] py-3 text-xs font-bold text-white shadow-unt-xs hover:bg-[#6941C6] focus:outline-none focus:ring-4 focus:ring-[#F4EBFF] disabled:opacity-60 transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer"
            >
              {isLoading ? (
                <span>กำลังเข้าสู่ระบบ...</span>
              ) : (
                <>
                  <span>เข้าสู่ระบบ</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer Signup Link */}
          <div className="mt-8 text-center text-xs text-[#475467]">
            <span>ยังไม่มีบัญชีผู้เรียนใช่ไหม? </span>
            <Link href="/signup" className="font-bold text-[#7F56D9] hover:underline">
              สมัครสมาชิกฟรี
            </Link>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 text-center text-[11px] text-[#98A2B3]">
          © {new Date().getFullYear()} P&apos;Toh Tutor. สงวนลิขสิทธิ์ทุกประการ
        </div>
      </div>

      {/* Right Column: Hero Visual & Testimonial (Desktop Only) */}
      <div className="hidden lg:flex flex-1 relative bg-gradient-to-br from-[#1D2939] via-[#101828] to-[#0C111D] p-12 text-white flex-col justify-between overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#7F56D9]/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-[#6941C6]/30 blur-3xl" />

        {/* Top Feature Tag */}
        <div className="relative z-10 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-[#E9D7FE] border border-white/15 backdrop-blur-xs">
            <Sparkles className="h-3.5 w-3.5 text-[#FDB022]" />
            สถาบันกวดวิชาคณิตศาสตร์ & ฟิสิกส์ ม.ปลาย
          </span>
          <span className="text-xs text-[#98A2B3]">P&apos;Toh Online LMS</span>
        </div>

        {/* Middle Testimonial Box */}
        <div className="relative z-10 max-w-lg space-y-6">
          <div className="flex text-[#FDB022]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-[#FDB022]" />
            ))}
          </div>

          <blockquote className="text-xl font-medium text-white leading-relaxed">
            &ldquo;คณิต 1 A-Level ได้ 92/100 เพราะเรียนกับพี่โต๋เลยครับ เทคนิคลัดและโจทย์ดักจุดพลาดช่วยประหยัดเวลาทำข้อสอบได้เยอะมากจริงๆ ครับ&rdquo;
          </blockquote>

          <div className="flex items-center gap-3 pt-2">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
              alt="น้องกานต์"
              className="h-11 w-11 rounded-full object-cover ring-2 ring-[#7F56D9]"
            />
            <div>
              <div className="flex items-center gap-1.5 font-bold text-white text-sm">
                <span>น้องกานต์ — ศิษย์เก่าเตรียมอุดมฯ</span>
                <CheckCircle2 className="h-4 w-4 text-[#12B76A]" />
              </div>
              <p className="text-xs text-[#D0D5DD]">ปัจจุบัน: สอบติดคณะแพทยศาสตร์</p>
            </div>
          </div>
        </div>

        {/* Bottom Trust Metrics Strip */}
        <div className="relative z-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-6 text-center text-xs">
          <div>
            <p className="text-xl font-extrabold text-[#E9D7FE]">15,400+</p>
            <span className="text-[11px] text-[#98A2B3]">นักเรียนที่เรียนจบ</span>
          </div>
          <div>
            <p className="text-xl font-extrabold text-[#75E0A7]">100%</p>
            <span className="text-[11px] text-[#98A2B3]">พี่โต๋ตอบเอง</span>
          </div>
          <div>
            <p className="text-xl font-extrabold text-[#E9D7FE]">ตลอดชีพ</p>
            <span className="text-[11px] text-[#98A2B3]">สิทธิ์ดูซ้ำไม่จำกัด</span>
          </div>
        </div>
      </div>
    </div>
  );
}
