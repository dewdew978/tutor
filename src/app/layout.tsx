import type { Metadata } from "next";
import { Prompt, Geist_Mono } from "next/font/google";
import "./globals.css";

const prompt = Prompt({
  variable: "--font-prompt",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TutorHub - แพลตฟอร์มคอร์สเรียนออนไลน์ & รวมติวเตอร์ชั้นนำ",
  description: "เรียนรู้อย่างไร้ขีดจำกัดกับติวเตอร์มืออาชีพ คอร์สเรียนวิดีโอคุณภาพสูง พร้อมเอกสารสรุปและระบบถาม-ตอบ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${prompt.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
