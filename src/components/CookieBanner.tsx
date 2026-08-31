"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Cookie, 
  Settings2, 
  Check, 
  X, 
  ChevronRight, 
  Info, 
  Lock 
} from "lucide-react";

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

const COOKIE_CONSENT_KEY = "tutorhub_cookie_consent";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always required
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    // Check if consent has already been given
    const consent = getCookieConsent();
    if (!consent) {
      // Delay slightly for smooth page entry
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const getCookieConsent = (): CookiePreferences | null => {
    if (typeof window === "undefined") return null;
    try {
      const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (stored) return JSON.parse(stored);
      
      // Also check standard browser cookies
      const match = document.cookie.match(new RegExp(`(^|;\\s*)${COOKIE_CONSENT_KEY}=([^;]*)`));
      if (match && match[2]) {
        return JSON.parse(decodeURIComponent(match[2]));
      }
    } catch {
      return null;
    }
    return null;
  };

  const saveCookieConsent = (pref: CookiePreferences) => {
    try {
      const valStr = JSON.stringify(pref);
      // Save in localStorage
      localStorage.setItem(COOKIE_CONSENT_KEY, valStr);
      
      // Save as 1-year persistent cookie
      const expires = new Date();
      expires.setFullYear(expires.getFullYear() + 1);
      document.cookie = `${COOKIE_CONSENT_KEY}=${encodeURIComponent(
        valStr
      )}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
    } catch (e) {
      console.error("Failed to save cookie consent", e);
    }
    setIsVisible(false);
    setShowSettingsModal(false);
  };

  const handleAcceptAll = () => {
    const fullPref: CookiePreferences = {
      essential: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(fullPref);
    saveCookieConsent(fullPref);
  };

  const handleAcceptEssentialOnly = () => {
    const essentialOnly: CookiePreferences = {
      essential: true,
      analytics: false,
      marketing: false,
    };
    setPreferences(essentialOnly);
    saveCookieConsent(essentialOnly);
  };

  const handleSavePreferences = () => {
    saveCookieConsent(preferences);
  };

  if (!isVisible && !showSettingsModal) return null;

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. COMPACT COOKIE BANNER (BOTTOM POPUP)                                   */}
      {/* ========================================================================= */}
      {isVisible && !showSettingsModal && (
        <aside
          role="dialog"
          aria-label="การยินยอมการใช้คุกกี้"
          className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-4xl animate-in fade-in slide-in-from-bottom-5 duration-300 sm:bottom-6"
        >
          <div className="relative overflow-hidden rounded-2xl border border-[#EAECF0] bg-white/95 p-5 shadow-unt-2xl backdrop-blur-md sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              {/* Left Info */}
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F4EBFF] text-[#7F56D9] shadow-unt-xs">
                  <Cookie className="h-6 w-6" />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-[#101828]">
                      เราให้ความสำคัญกับความเป็นส่วนตัวของคุณ (PDPA)
                    </h3>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#ECFDF3] px-2 py-0.5 text-[10px] font-bold text-[#027A48] border border-[#ABEFC6]">
                      <ShieldCheck className="h-3 w-3" />
                      ปลอดภัย 100%
                    </span>
                  </div>
                  <p className="text-xs text-[#475467] leading-relaxed max-w-2xl">
                    เว็บไซต์นี้ใช้คุกกี้เพื่อเพิ่มประสิทธิภาพการใช้งาน จดจำสถานะการเรียนรู้ และนำเสนอเนื้อหาที่เหมาะสมกับคุณ 
                    คุณสามารถศึกษารายละเอียดเพิ่มเติมได้ที่{" "}
                    <Link
                      href="/privacy"
                      className="font-semibold text-[#7F56D9] underline hover:text-[#53389E]"
                    >
                      นโยบายความเป็นส่วนตัว
                    </Link>
                  </p>
                </div>
              </div>

              {/* Right Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowSettingsModal(true)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-[#D0D5DD] bg-white px-3.5 py-2 text-xs font-semibold text-[#344054] shadow-unt-xs hover:bg-[#F9FAFB] transition-all"
                >
                  <Settings2 className="h-3.5 w-3.5 text-[#667085]" />
                  ตั้งค่าคุกกี้
                </button>

                <button
                  type="button"
                  onClick={handleAcceptEssentialOnly}
                  className="inline-flex items-center justify-center rounded-xl border border-[#D0D5DD] bg-white px-3.5 py-2 text-xs font-semibold text-[#344054] shadow-unt-xs hover:bg-[#F9FAFB] transition-all"
                >
                  เฉพาะที่จำเป็น
                </button>

                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#7F56D9] px-4 py-2 text-xs font-bold text-white shadow-unt-sm hover:bg-[#6941C6] focus:outline-none focus:ring-4 focus:ring-[#F4EBFF] transition-all"
                >
                  <Check className="h-3.5 w-3.5" />
                  ยอมรับทั้งหมด
                </button>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* ========================================================================= */}
      {/* 2. ADVANCED COOKIE PREFERENCES MODAL                                      */}
      {/* ========================================================================= */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl rounded-2xl border border-[#EAECF0] bg-white shadow-unt-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#EAECF0] px-6 py-4.5 bg-[#F9FAFB]">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F4EBFF] text-[#7F56D9]">
                  <Cookie className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#101828]">
                    ศูนย์ตั้งค่าความเป็นส่วนตัว & คุกกี้
                  </h2>
                  <p className="text-[11px] text-[#667085]">
                    เลือกจัดการคุกกี้แต่ละประเภทตามความต้องการของคุณ
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowSettingsModal(false)}
                className="rounded-lg p-1.5 text-[#98A2B3] hover:bg-white hover:text-[#344054] transition-all"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body: Cookie Categories */}
            <div className="max-h-[60vh] overflow-y-auto p-6 space-y-4 text-xs text-[#475467]">
              <p className="leading-relaxed">
                เมื่อท่านเข้าชมเว็บไซต์ของเรา ข้อมูลบางอย่างอาจถูกจัดเก็บในรูปของคุกกี้ 
                ท่านสามารถเลือกเปิดหรือปิดการทำงานของคุกกี้แต่ละประเภทได้ ยกเว้นคุกกี้ที่จำเป็นต่อการทำงานพื้นฐานของระบบ
              </p>

              {/* 1. Strictly Necessary Cookies */}
              <div className="rounded-xl border border-[#EAECF0] bg-[#F9FAFB] p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-[#7F56D9]" />
                    <span className="font-bold text-[#101828]">คุกกี้ที่จำเป็นอย่างยิ่ง (Strictly Necessary)</span>
                  </div>
                  <span className="rounded-full bg-[#ECFDF3] px-2.5 py-0.5 text-[10px] font-bold text-[#027A48] border border-[#ABEFC6]">
                    เปิดใช้งานตลอดเวลา
                  </span>
                </div>
                <p className="text-[11px] text-[#667085] leading-relaxed">
                  จำเป็นสำหรับการทำงานของระบบ เช่น การเข้าสู่ระบบ (Session), ความปลอดภัย, และการจำสถานะการเล่นวิดีโอ ไม่สามารถปิดได้
                </p>
              </div>

              {/* 2. Analytics Cookies */}
              <div className="rounded-xl border border-[#EAECF0] p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-[#475467]" />
                    <span className="font-bold text-[#101828]">คุกกี้เพื่อการวิเคราะห์และประสิทธิภาพ (Analytics)</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) =>
                        setPreferences((prev) => ({ ...prev, analytics: e.target.checked }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-10 h-5.5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4.5 after:w-4.5 after:transition-all peer-checked:bg-[#7F56D9]"></div>
                  </label>
                </div>
                <p className="text-[11px] text-[#667085] leading-relaxed">
                  ช่วยให้เราเข้าใจพฤติกรรมการใช้งาน เช่น จำนวนผู้เข้าชม คอร์สที่นิยม เพื่อนำมาพัฒนาเนื้อหาและระบบให้ดียิ่งขึ้น
                </p>
              </div>

              {/* 3. Marketing Cookies */}
              <div className="rounded-xl border border-[#EAECF0] p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-[#475467]" />
                    <span className="font-bold text-[#101828]">คุกกี้เพื่อการตลาดและการสื่อสาร (Marketing)</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) =>
                        setPreferences((prev) => ({ ...prev, marketing: e.target.checked }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-10 h-5.5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4.5 after:w-4.5 after:transition-all peer-checked:bg-[#7F56D9]"></div>
                  </label>
                </div>
                <p className="text-[11px] text-[#667085] leading-relaxed">
                  ใช้เพื่อแนะนำโปรโมชั่นและข่าวสารคอร์สเรียนใหม่ที่ตรงกับความสนใจของคุณผ่านช่องทางต่างๆ
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#EAECF0] px-6 py-4 bg-[#F9FAFB]">
              <Link
                href="/privacy"
                className="text-[11px] font-semibold text-[#7F56D9] hover:underline"
              >
                อ่านนโยบายความเป็นส่วนตัวฉบับเต็ม →
              </Link>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="flex-1 sm:flex-none rounded-xl border border-[#D0D5DD] bg-white px-4 py-2 text-xs font-semibold text-[#344054] shadow-unt-xs hover:bg-[#F9FAFB] transition-all"
                >
                  ยอมรับทั้งหมด
                </button>
                <button
                  type="button"
                  onClick={handleSavePreferences}
                  className="flex-1 sm:flex-none rounded-xl bg-[#7F56D9] px-4.5 py-2 text-xs font-bold text-white shadow-unt-sm hover:bg-[#6941C6] transition-all"
                >
                  บันทึกการตั้งค่า
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
