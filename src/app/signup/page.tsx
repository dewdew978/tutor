"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  GraduationCap, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  ArrowLeft,
  AlertCircle,
  Check
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Calculate Password Strength
  const passwordStrength = useMemo(() => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password) || /[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    return score;
  }, [password]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptTerms) {
      setErrorMessage("กรุณายอมรับเงื่อนไขการใช้บริการและนโยบายความเป็นส่วนตัว");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: fullName.trim(),
            phone: phone.trim(),
            role: "student",
          },
          emailRedirectTo: typeof window !== "undefined" ? `${window.location.origin}/courses` : undefined,
        },
      });

      if (error) {
        setErrorMessage(error.message || "เกิดข้อผิดพลาดในการสมัครสมาชิก");
        setIsLoading(false);
        return;
      }

      if (data.session) {
        setSuccessMessage("สมัครสมาชิกสำเร็จ! กำลังเข้าสู่ระบบ...");
        setTimeout(() => router.push("/courses"), 800);
      } else {
        setSuccessMessage("สมัครสมาชิกสำเร็จ! กรุณาตรวจสอบอีเมลของคุณเพื่อยืนยันบัญชีเข้าเรียน");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "เกิดข้อผิดพลาดในการสมัครสมาชิก");
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
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
      {/* Left Column: Sign Up Form */}
      <div className="flex-1 flex flex-col justify-between p-6 sm:p-10 lg:p-14 max-w-xl mx-auto w-full">
        {/* Top Header & Logo */}
        <div>
          <div className="flex items-center justify-between mb-8 sm:mb-10">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#7F56D9] text-white shadow-unt-xs group-hover:bg-[#6941C6] transition-colors">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="text-lg font-extrabold text-[#101828] tracking-tight">
                P&apos;Max Academy
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

          <div className="space-y-2 mb-6">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#F4EBFF] px-3 py-0.5 text-xs font-semibold text-[#7F56D9] border border-[#E9D7FE]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>สร้างบัญชีผู้เรียนฟรีใน 1 นาที</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#101828] tracking-tight">
              เริ่มต้นติวเข้มและสอบติดกับพี่แม็ก 🎓
            </h1>
            <p className="text-xs sm:text-sm text-[#667085]">
              สมัครสมาชิกครั้งเดียว เข้าเรียนบทเรียนฟรีและสั่งซื้อคอร์สเรียนได้ตลอดชีพ
            </p>
          </div>

          {/* Google Register Button */}
          <div className="mb-5">
            <button
              type="button"
              onClick={handleGoogleSignup}
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
              <span>สมัครสมาชิกด้วย Google</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center mb-5">
            <div className="w-full border-t border-[#EAECF0]" />
            <span className="absolute bg-white px-3 text-xs text-[#98A2B3] font-medium">
              หรือกรอกข้อมูลสมัครสมาชิก
            </span>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSignup} className="space-y-3.5">
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
              <label className="block text-xs font-semibold text-[#344054] mb-1">
                ชื่อ-นามสกุล หรือชื่อเล่น *
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#667085]" />
                <input
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="เช่น น้องกานต์ รัตนกิจ"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-lg border border-[#D0D5DD] bg-white py-2 pl-10 pr-4 text-xs text-[#101828] placeholder:text-[#667085] shadow-unt-xs focus:border-[#7F56D9] focus:outline-none focus:ring-4 focus:ring-[#F4EBFF]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#344054] mb-1">
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
                    className="w-full rounded-lg border border-[#D0D5DD] bg-white py-2 pl-10 pr-4 text-xs text-[#101828] placeholder:text-[#667085] shadow-unt-xs focus:border-[#7F56D9] focus:outline-none focus:ring-4 focus:ring-[#F4EBFF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#344054] mb-1">
                  เบอร์โทรศัพท์ / LINE ID
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#667085]" />
                  <input
                    type="tel"
                    autoComplete="tel"
                    placeholder="08X-XXX-XXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-lg border border-[#D0D5DD] bg-white py-2 pl-10 pr-4 text-xs text-[#101828] placeholder:text-[#667085] shadow-unt-xs focus:border-[#7F56D9] focus:outline-none focus:ring-4 focus:ring-[#F4EBFF]"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#344054] mb-1">
                สร้างรหัสผ่าน (Password) *
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#667085]" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  placeholder="ความยาวอย่างน้อย 8 ตัวอักษร"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-[#D0D5DD] bg-white py-2 pl-10 pr-10 text-xs text-[#101828] placeholder:text-[#667085] shadow-unt-xs focus:border-[#7F56D9] focus:outline-none focus:ring-4 focus:ring-[#F4EBFF]"
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

              {/* Password Strength Indicator */}
              {password && (
                <div className="mt-2 space-y-1">
                  <div className="grid grid-cols-3 gap-1 h-1">
                    <div
                      className={`h-full rounded-full ${
                        passwordStrength >= 1 ? "bg-[#F04438]" : "bg-[#EAECF0]"
                      }`}
                    />
                    <div
                      className={`h-full rounded-full ${
                        passwordStrength >= 2 ? "bg-[#FDB022]" : "bg-[#EAECF0]"
                      }`}
                    />
                    <div
                      className={`h-full rounded-full ${
                        passwordStrength >= 3 ? "bg-[#12B76A]" : "bg-[#EAECF0]"
                      }`}
                    />
                  </div>
                  <span className="text-[10px] text-[#667085]">
                    {passwordStrength === 1 && "รหัสผ่าน: ระดับเริ่มต้น"}
                    {passwordStrength === 2 && "รหัสผ่าน: ปานกลาง"}
                    {passwordStrength === 3 && "รหัสผ่าน: แข็งแรงมาก 🔒"}
                  </span>
                </div>
              )}
            </div>

            {/* Accept Terms Checkbox */}
            <div className="pt-1">
              <label className="flex items-start gap-2 cursor-pointer select-none text-xs text-[#475467]">
                <input
                  type="checkbox"
                  required
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-[#D0D5DD] text-[#7F56D9] focus:ring-[#7F56D9] accent-[#7F56D9]"
                />
                <span>
                  ฉันยอมรับ{" "}
                  <Link href="/terms" target="_blank" className="font-bold text-[#7F56D9] hover:underline">
                    เงื่อนไขการใช้บริการ
                  </Link>{" "}
                  และ{" "}
                  <Link href="/privacy" target="_blank" className="font-bold text-[#7F56D9] hover:underline">
                    นโยบายความเป็นส่วนตัว
                  </Link>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-[#7F56D9] py-3 text-xs font-bold text-white shadow-unt-xs hover:bg-[#6941C6] focus:outline-none focus:ring-4 focus:ring-[#F4EBFF] disabled:opacity-60 transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer"
            >
              {isLoading ? (
                <span>กำลังสร้างบัญชี...</span>
              ) : (
                <>
                  <span>สร้างบัญชีและเริ่มเรียน</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer Login Link */}
          <div className="mt-6 text-center text-xs text-[#475467]">
            <span>มีบัญชีผู้เรียนอยู่แล้ว? </span>
            <Link href="/login" className="font-bold text-[#7F56D9] hover:underline">
              เข้าสู่ระบบที่นี่
            </Link>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 text-center text-[11px] text-[#98A2B3]">
          © {new Date().getFullYear()} P&apos;Max Academy. สงวนลิขสิทธิ์ทุกประการ
        </div>
      </div>

      {/* Right Column: Hero Visual & Included Perks (Desktop Only) */}
      <div className="hidden lg:flex flex-1 relative bg-gradient-to-br from-[#53389E] via-[#6941C6] to-[#7F56D9] p-12 text-white flex-col justify-between overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

        {/* Top Tag */}
        <div className="relative z-10 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white border border-white/30 backdrop-blur-xs">
            <GraduationCap className="h-3.5 w-3.5" />
            สิทธิประโยชน์ของนักเรียน P&apos;Max
          </span>
          <span className="text-xs text-[#E9D7FE]">Lifetime Access</span>
        </div>

        {/* Included Perks Checklist Cards */}
        <div className="relative z-10 max-w-lg space-y-4">
          <h3 className="text-2xl font-extrabold tracking-tight text-white">
            สิ่งที่นักเรียนทุกคนจะได้รับทันทีที่สมัครสมาชิก:
          </h3>

          <div className="space-y-3 pt-2">
            <div className="rounded-xl bg-white/10 border border-white/15 p-4 backdrop-blur-xs flex items-start gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#12B76A] text-white shrink-0">
                <Check className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">ทดลองเรียนบทเรียนฟรี (Free Preview)</h4>
                <p className="text-[11px] text-[#E9D7FE] mt-0.5">เปิดดูคลิปปูพื้นฐานและข้อสอบจริงได้ทันทีโดยไม่ต้องเสียค่าใช้จ่าย</p>
              </div>
            </div>

            <div className="rounded-xl bg-white/10 border border-white/15 p-4 backdrop-blur-xs flex items-start gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#12B76A] text-white shrink-0">
                <Check className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">ดาวน์โหลดชีทสรุปสูตร PDF 4 สี</h4>
                <p className="text-[11px] text-[#E9D7FE] mt-0.5">เอกสารประกอบการเรียนพร้อมแบบฝึกหัดเฉลยละเอียดครบทุกบท</p>
              </div>
            </div>

            <div className="rounded-xl bg-white/10 border border-white/15 p-4 backdrop-blur-xs flex items-start gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#12B76A] text-white shrink-0">
                <Check className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">ถาม-ตอบ Q&A กับพี่แม็กโดยตรง</h4>
                <p className="text-[11px] text-[#E9D7FE] mt-0.5">สงสัยโจทย์ข้อไหนพิมพ์ถามใต้คลิป พี่แม็กเข้ามาตอบให้อย่างละเอียด 100%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trust Badge */}
        <div className="relative z-10 flex items-center justify-between border-t border-white/20 pt-6 text-xs text-[#E9D7FE]">
          <span>⭐ คะแนนความพึงพอใจเฉลี่ย 4.98/5.0</span>
          <span>🔒 ปลอดภัยตามมาตรฐาน PDPA</span>
        </div>
      </div>
    </div>
  );
}
