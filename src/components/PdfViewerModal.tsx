"use client";

import { useState, useEffect, useRef } from "react";
import { 
  X, 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  Maximize, 
  Minimize, 
  ShieldCheck, 
  Lock, 
  FileText, 
  Printer, 
  Search, 
  Sparkles,
  BookOpen
} from "lucide-react";

export interface PdfViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  pdfUrl?: string;
  studentName?: string;
  studentEmail?: string;
}

// Interactive PDF Slide Sheet Content Sample for P'Toh Tutor
const MATH_SHEET_PAGES = [
  {
    pageNumber: 1,
    title: "บทที่ 1: สรุปแก่นสำคัญ ลิมิตและความต่อเนื่อง (Limits & Continuity)",
    chapter: "แคลคูลัส ม.ปลาย & A-Level คณิต 1",
    content: (
      <div className="space-y-6 text-[#101828]">
        <div className="border-b-2 border-[#7F56D9] pb-3 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-[#7F56D9] uppercase tracking-wider">
              P&apos;TOH TUTOR • OFFICIAL STUDY MATERIAL
            </span>
            <h2 className="text-xl font-extrabold text-[#101828]">
              สรุปสูตรลิมิตและเทคนิค 0/0 พิชิตโจทย์ A-Level
            </h2>
          </div>
          <div className="text-right">
            <span className="rounded-md bg-[#F4EBFF] px-2 py-1 text-[10px] font-bold text-[#7F56D9]">
              หน้า 1 / 3
            </span>
          </div>
        </div>

        {/* Section 1 */}
        <div className="rounded-xl border border-[#EAECF0] bg-[#F9FAFB] p-4 space-y-2">
          <h3 className="text-sm font-bold text-[#7F56D9] flex items-center gap-1.5">
            <Sparkles className="h-4 w-4" />
            1. นิยามของลิมิตสองด้าน (Two-Sided Limits)
          </h3>
          <p className="text-xs text-[#344054] leading-relaxed">
            ฟังก์ชัน <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-[#EAECF0] text-[#7F56D9] font-bold">f(x)</code> จะมีลิมิตเมื่อ <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-[#EAECF0]">x → a</code> ก็ต่อเมื่อ <strong>ลิมิตซ้าย = ลิมิตขวา</strong>
          </p>
          <div className="bg-white p-3 rounded-lg border border-[#EAECF0] text-center font-mono text-xs font-bold text-[#101828]">
            lim x→a⁻ f(x) = lim x→a⁺ f(x) = L  ⟺  lim x→a f(x) = L
          </div>
        </div>

        {/* Section 2 */}
        <div className="rounded-xl border border-[#E9D7FE] bg-[#F9F5FF] p-4 space-y-2">
          <h3 className="text-sm font-bold text-[#6941C6]">
            2. เทคนิคการแก้โจทย์รูปแบบยังไม่กำหนด (Indeterminate Form: 0/0)
          </h3>
          <ul className="space-y-2 text-xs text-[#344054]">
            <li className="flex items-start gap-2">
              <span className="h-5 w-5 rounded-full bg-[#7F56D9] text-white flex items-center justify-center text-[10px] font-bold shrink-0">1</span>
              <span><strong>แยกตัวประกอบ (Factoring):</strong> ดึงตัวร่วม (x - a) แล้วตัดทอนก่อนแทนค่า</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="h-5 w-5 rounded-full bg-[#7F56D9] text-white flex items-center justify-center text-[10px] font-bold shrink-0">2</span>
              <span><strong>คูณสังยุค (Conjugate):</strong> สำหรับโจทย์ที่มีเครื่องหมายกรณฑ์ (√) ให้คูณด้วยพจน์สังยุคทั้งเศษและส่วน</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="h-5 w-5 rounded-full bg-[#7F56D9] text-white flex items-center justify-center text-[10px] font-bold shrink-0">3</span>
              <span><strong>กฎของโลปิตาล (L&apos;Hôpital&apos;s Rule):</strong> ดิฟเศษ และ ดิฟส่วน แยกกัน (ไม่ต้องใช้สูตรดิฟผลหาร)</span>
            </li>
          </ul>

          <div className="mt-3 bg-white p-3 rounded-lg border border-[#E9D7FE] text-xs font-mono text-center text-[#7F56D9] font-bold">
            lim x→a [ f(x) / g(x) ] = lim x→a [ f&apos;(x) / g&apos;(x) ]  (เมื่อ f(a)=0 และ g(a)=0)
          </div>
        </div>
      </div>
    )
  },
  {
    pageNumber: 2,
    title: "บทที่ 2: สูตรการหาอนุพันธ์พื้นฐาน 10 สูตร (Differentiation Rules)",
    chapter: "แคลคูลัส ม.ปลาย & A-Level คณิต 1",
    content: (
      <div className="space-y-6 text-[#101828]">
        <div className="border-b-2 border-[#7F56D9] pb-3 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-[#7F56D9] uppercase tracking-wider">
              P&apos;TOH TUTOR • OFFICIAL STUDY MATERIAL
            </span>
            <h2 className="text-xl font-extrabold text-[#101828]">
              ตารางสูตรอนุพันธ์และการดิฟลูกโซ่ (Chain Rule)
            </h2>
          </div>
          <div className="text-right">
            <span className="rounded-md bg-[#F4EBFF] px-2 py-1 text-[10px] font-bold text-[#7F56D9]">
              หน้า 2 / 3
            </span>
          </div>
        </div>

        {/* Formula Grid */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl border border-[#EAECF0] bg-[#F9FAFB] space-y-1">
            <span className="text-[10px] font-bold text-[#667085]">สูตรที่ 1: ดิฟค่าคงที่</span>
            <p className="font-mono font-bold text-[#101828]">d/dx (c) = 0</p>
          </div>
          <div className="p-3 rounded-xl border border-[#EAECF0] bg-[#F9FAFB] space-y-1">
            <span className="text-[10px] font-bold text-[#667085]">สูตรที่ 2: ดิฟเลขยกกำลัง</span>
            <p className="font-mono font-bold text-[#101828]">d/dx (xⁿ) = n · xⁿ⁻¹</p>
          </div>
          <div className="p-3 rounded-xl border border-[#EAECF0] bg-[#F9FAFB] space-y-1">
            <span className="text-[10px] font-bold text-[#667085]">สูตรที่ 3: ดิฟผลคูณ</span>
            <p className="font-mono font-bold text-[#101828]">(u·v)&apos; = u·v&apos; + v·u&apos;</p>
            <span className="text-[9px] text-[#667085]">(หน้าดิฟหลัง + หลังดิฟหน้า)</span>
          </div>
          <div className="p-3 rounded-xl border border-[#EAECF0] bg-[#F9FAFB] space-y-1">
            <span className="text-[10px] font-bold text-[#667085]">สูตรที่ 4: ดิฟผลหาร</span>
            <p className="font-mono font-bold text-[#101828]">(u/v)&apos; = (v·u&apos; - u·v&apos;) / v²</p>
            <span className="text-[9px] text-[#667085]">(ล่างดิฟบน - บนดิฟล่าง / ล่าง²)</span>
          </div>
        </div>

        {/* Chain Rule Box */}
        <div className="rounded-xl border border-[#D0D5DD] bg-white p-4 space-y-2 shadow-unt-xs">
          <h3 className="text-sm font-bold text-[#101828] flex items-center gap-1.5">
            <Lock className="h-4 w-4 text-[#7F56D9]" />
            สูตรกฎลูกโซ่ (Chain Rule for Composite Function)
          </h3>
          <p className="text-xs text-[#475467] leading-relaxed">
            เมื่อ <code className="font-mono text-[#7F56D9] font-bold">y = f(u)</code> และ <code className="font-mono text-[#7F56D9] font-bold">u = g(x)</code>:
          </p>
          <div className="bg-[#F9F5FF] p-3 rounded-lg border border-[#E9D7FE] font-mono text-center text-xs font-bold text-[#6941C6]">
            dy/dx = (dy/du) · (du/dx)   หรือ   d/dx [ uⁿ ] = n · uⁿ⁻¹ · (du/dx)
          </div>
        </div>
      </div>
    )
  },
  {
    pageNumber: 3,
    title: "บทที่ 3: ข้อสอบจริง A-Level พร้อมเฉลยละเอียดแบบ Step-by-Step",
    chapter: "แคลคูลัส ม.ปลาย & A-Level คณิต 1",
    content: (
      <div className="space-y-6 text-[#101828]">
        <div className="border-b-2 border-[#7F56D9] pb-3 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-[#7F56D9] uppercase tracking-wider">
              P&apos;TOH TUTOR • OFFICIAL STUDY MATERIAL
            </span>
            <h2 className="text-xl font-extrabold text-[#101828]">
              ตัวอย่างข้อสอบ A-Level คณิต 1 (โจทย์ประยุกต์ค่าสูงสุด-ต่ำสุด)
            </h2>
          </div>
          <div className="text-right">
            <span className="rounded-md bg-[#F4EBFF] px-2 py-1 text-[10px] font-bold text-[#7F56D9]">
              หน้า 3 / 3
            </span>
          </div>
        </div>

        {/* Question Item */}
        <div className="rounded-xl border border-[#EAECF0] bg-white p-5 space-y-3 shadow-unt-xs">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded bg-[#FEF3F2] text-[#D92D20] text-[10px] font-bold border border-[#FECDCA]">
              ข้อสอบคณิต 1 วิชาสามัญ
            </span>
            <span className="text-[10px] font-mono text-[#667085]">คะแนนเต็ม 5 คะแนน</span>
          </div>

          <p className="text-xs text-[#101828] font-semibold leading-relaxed">
            กำหนดให้ฟังก์ชัน <code className="font-mono text-[#7F56D9]">f(x) = 2x³ - 3x² - 12x + 5</code> จงหาจุดสูงสุดสัมพัทธ์ และจุดต่ำสุดสัมพัทธ์ของฟังก์ชันนี้
          </p>

          {/* Solution Walkthrough */}
          <div className="pt-2 border-t border-[#EAECF0] space-y-2 text-xs">
            <p className="font-bold text-[#027A48]">💡 แนวคิดและวิธีทำโดยพี่โต๋:</p>
            <div className="space-y-1 font-mono text-[11px] text-[#344054] bg-[#F9FAFB] p-3 rounded-lg border border-[#EAECF0]">
              <p><strong>ขั้นที่ 1:</strong> หาอนุพันธ์อันดับ 1 → f&apos;(x) = 6x² - 6x - 12</p>
              <p><strong>ขั้นที่ 2:</strong> หาจุดวิกฤตโดยให้ f&apos;(x) = 0 → 6(x² - x - 2) = 0</p>
              <p><strong>ขั้นที่ 3:</strong> แยกตัวประกอบ → 6(x - 2)(x + 1) = 0 ได้ x = -1, 2</p>
              <p><strong>ขั้นที่ 4:</strong> ทดสอบอนุพันธ์อันดับ 2 → f&apos;&apos;(x) = 12x - 6</p>
              <p className="text-[#027A48] font-bold pt-1">
                ✓ x = -1 ให้ f&apos;&apos;(-1) = -18 &lt; 0 → เกิดจุดสูงสุดสัมพัทธ์ (-1, 12)<br/>
                ✓ x = 2 ให้ f&apos;&apos;(2) = 18 &gt; 0 → เกิดจุดต่ำสุดสัมพัทธ์ (2, -15)
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
];

export function PdfViewerModal({
  isOpen,
  onClose,
  title,
  pdfUrl,
  studentName = "นักเรียนของพี่โต๋",
  studentEmail = "student@ptoh.edu"
}: PdfViewerModalProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Smart Google Drive Embed Converter
  const getEmbeddableDriveUrl = (url?: string): string | null => {
    if (!url) return null;
    const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/file/d/${match[1]}/preview`;
    }
    if (url.includes("drive.google.com")) {
      return url;
    }
    return null;
  };

  const driveEmbedUrl = getEmbeddableDriveUrl(pdfUrl);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" || e.key === "PageUp") {
        setCurrentPage((p) => Math.max(1, p - 1));
      }
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        setCurrentPage((p) => Math.min(MATH_SHEET_PAGES.length, p + 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentSheet = MATH_SHEET_PAGES[currentPage - 1];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-2 sm:p-4 select-none animate-in fade-in duration-200"
      onContextMenu={(e) => e.preventDefault()} // Block right-click to protect document
    >
      <div 
        ref={containerRef}
        className={`w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-unt-2xl flex flex-col transition-all duration-300 ${
          isFullscreen ? "h-full max-w-full rounded-none" : "h-[90vh]"
        }`}
      >
        {/* PDF Viewer Header Toolbar */}
        <div className="h-16 bg-[#101828] text-white px-4 sm:px-6 flex items-center justify-between border-b border-[#344054] shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#7F56D9] text-white shrink-0">
              <FileText className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-xs sm:text-sm font-bold text-white truncate max-w-sm sm:max-w-md">
                {title || "เอกสารชีทสรุปสูตรฉบับพกพา"}
              </h3>
              <span className="text-[10px] text-[#98A2B3] flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-[#12B76A]" />
                P&apos;Toh DRM Protected Document
              </span>
            </div>
          </div>

          {/* Controls: Pagination, Zoom, Fullscreen, Close */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Page Navigation */}
            <div className="flex items-center gap-1 bg-[#1D2939] px-2 py-1 rounded-xl border border-[#344054] text-xs">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1 rounded text-white/80 hover:text-white disabled:opacity-30 cursor-pointer"
                title="หน้าก่อนหน้า (←)"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <span className="font-mono text-[11px] font-bold px-2">
                {currentPage} / {MATH_SHEET_PAGES.length}
              </span>

              <button
                onClick={() => setCurrentPage((p) => Math.min(MATH_SHEET_PAGES.length, p + 1))}
                disabled={currentPage === MATH_SHEET_PAGES.length}
                className="p-1 rounded text-white/80 hover:text-white disabled:opacity-30 cursor-pointer"
                title="หน้าถัดไป (→)"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Zoom In / Out */}
            <div className="hidden sm:flex items-center gap-1 bg-[#1D2939] px-2 py-1 rounded-xl border border-[#344054]">
              <button
                onClick={() => setZoomLevel((z) => Math.max(75, z - 15))}
                className="p-1 text-white/80 hover:text-white cursor-pointer"
                title="ย่อขนาด"
              >
                <ZoomOut className="h-3.5 w-3.5" />
              </button>
              <span className="text-[10px] font-mono font-bold text-[#D0D5DD] w-10 text-center">
                {zoomLevel}%
              </span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(150, z + 15))}
                className="p-1 text-white/80 hover:text-white cursor-pointer"
                title="ขยายขนาด"
              >
                <ZoomIn className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Toggle Fullscreen */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-[#1D2939] transition-colors cursor-pointer"
              title="เต็มจอ"
            >
              {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#98A2B3] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="ปิด (Esc)"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Main Document Body (with Diagonal Anti-Piracy Watermark) */}
        <div className="flex-1 bg-[#475467]/10 p-4 sm:p-8 overflow-y-auto flex items-center justify-center">
          <div 
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: "top center" }}
            className="relative w-full max-w-3xl min-h-[600px] bg-white rounded-2xl p-8 sm:p-12 shadow-unt-xl border border-[#EAECF0] transition-transform duration-200 overflow-hidden"
          >

            {/* Active Content: Google Drive Embed OR Curated Slide Content */}
            {driveEmbedUrl ? (
              <div className="relative z-10 w-full h-[65vh] min-h-[500px]">
                <iframe
                  src={driveEmbedUrl}
                  className="w-full h-full rounded-xl border border-[#EAECF0]"
                  allow="autoplay"
                />
              </div>
            ) : (
              <div className="relative z-10">
                {currentSheet.content}
              </div>
            )}

            {/* Document Bottom Footer */}
            <div className="relative z-10 mt-12 pt-4 border-t border-[#EAECF0] flex items-center justify-between text-[10px] text-[#98A2B3] font-mono">
              <span>P&apos;Toh Tutor • เอกสารประกอบการเรียน</span>
              <span className="font-bold text-[#7F56D9]">P&apos;Toh Online LMS</span>
            </div>
          </div>
        </div>

        {/* Bottom Thumbnail Bar */}
        <div className="h-14 bg-white border-t border-[#EAECF0] px-4 flex items-center justify-between shrink-0 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-[#667085]">สารบัญหน้า:</span>
            {MATH_SHEET_PAGES.map((p) => (
              <button
                key={p.pageNumber}
                onClick={() => setCurrentPage(p.pageNumber)}
                className={`px-3 py-1 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                  currentPage === p.pageNumber
                    ? "bg-[#7F56D9] text-white shadow-unt-xs"
                    : "bg-[#F2F4F7] text-[#344054] hover:bg-[#EAECF0]"
                }`}
              >
                หน้า {p.pageNumber}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-[11px] text-[#667085]">
            <BookOpen className="h-4 w-4 text-[#7F56D9]" />
            <span className="hidden sm:inline">เอกสาร 4 สีคมชัดความละเอียดสูง</span>
          </div>
        </div>
      </div>
    </div>
  );
}
