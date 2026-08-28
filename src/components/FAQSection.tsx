"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Minus, HelpCircle, MessageCircle, ArrowRight } from "lucide-react";
import { MAIN_TUTOR } from "@/lib/mock-data";

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export const DEFAULT_FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "คอร์สเรียนมีวันหมดอายุไหม? สามารถดูซ้ำได้กี่รอบ?",
    answer: "ไม่มีวันหมดอายุครับ! เมื่อสมัครเรียนแล้ว น้องๆ สามารถเข้าเรียนทบทวนได้ตลอดชีพ (Lifetime Access) ดูซ้ำกี่รอบก็ได้ ไม่จำกัดชั่วโมงและไม่จำกัดจำนวนครั้ง ดูทบทวนก่อนสอบได้ตลอดเวลาครับ",
  },
  {
    id: "faq-2",
    question: "หากเรียนแล้วมีจุดที่ไม่เข้าใจ สามารถถามพี่แม็กได้อย่างไร?",
    answer: "ใต้ทุกคลิปวิดีโอบทเรียนจะมีระบบกระดานถาม-ตอบ (Q&A) น้องๆ สามารถพิมพ์ข้อสงสัยหรือจุดที่ติดขัดได้ทันที พี่แม็กจะได้รับการแจ้งเตือนและเข้ามาพิมพ์อธิบายคำตอบด้วยตัวเอง 100% ภายใน 24 ชั่วโมงครับ",
  },
  {
    id: "faq-3",
    question: "เอกสารประกอบการเรียนและชีทสรุปเป็นรูปแบบไหน?",
    answer: "ทุกคอร์สจะมีไฟล์เอกสารประกอบการเรียนและชีทสรุปสูตร 4 สี (PDF) คุณภาพสูงให้ดาวน์โหลดฟรีใต้บทเรียน สามารถนำไปเปิดเขียนบน iPad / GoodNotes หรือสั่งพิมพ์ออกมาเป็นเล่มชีทเพื่อจดตามได้ทันทีครับ",
  },
  {
    id: "faq-4",
    question: "สามารถดูบทเรียนผ่านอุปกรณ์ไหนได้บ้าง?",
    answer: "รองรับทุกอุปกรณ์ครับ ทั้งคอมพิวเตอร์ (Windows, Mac), iPad, แท็บเล็ต Android, และสมาร์ตโฟน วิดีโอจะปรับความคมชัดอัตโนมัติตามความเร็วเน็ต (สูงสุด Full HD 1080p) พร้อมฟังก์ชันปรับความเร็วเสียง 0.75x - 2.0x",
  },
  {
    id: "faq-5",
    question: "ช่องทางการชำระเงินมีอะไรบ้าง และเริ่มเรียนได้เมื่อไหร่?",
    answer: "รองรับการสแกนจ่ายผ่าน PromptPay QR Code, โอนเงินผ่าน Mobile Banking ทุกธนาคาร และบัตรเครดิต/เดบิต เมื่อทำรายการเรียบร้อย ระบบจะเปิดสิทธิ์เข้าห้องเรียนให้อัตโนมัติทันที เข้าเรียนได้ตลอด 24 ชั่วโมงครับ",
  },
  {
    id: "faq-6",
    question: "ไม่แน่ใจว่าพื้นฐานตัวเองเหมาะกับคอร์สไหน ควรเริ่มอย่างไรดี?",
    answer: "น้องๆ หรือผู้ปกครองสามารถทัก LINE Official มาปรึกษาพี่แม็กได้โดยตรงเลยครับ พี่แม็กจะช่วยประเมินพื้นฐานและจัดตารางแผนการเรียนที่เหมาะสมกับเป้าหมายการสอบเข้ามหาวิทยาลัยให้ฟรี ไม่มีค่าใช้จ่ายครับ",
  },
];

interface FAQSectionProps {
  items?: FAQItem[];
  title?: string;
  subtitle?: string;
}

export function FAQSection({
  items = DEFAULT_FAQS,
  title = "คำถามที่พบบ่อย (FAQs)",
  subtitle = "รวมทุกข้อสงสัยเกี่ยวกับการเรียน การดูวิดีโอ เอกสารประกอบ และการถาม-ตอบกับพี่แม็ก",
}: FAQSectionProps) {
  // First item open by default
  const [openIds, setOpenIds] = useState<string[]>([items[0]?.id || ""]);

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="faqs" className="py-16 sm:py-24 bg-white border-t border-[#EAECF0]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section Header (Untitled UI Style) */}
        <div className="text-center space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#F4EBFF] px-3.5 py-1 text-xs font-semibold text-[#7F56D9]">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>คำถามที่พบบ่อย</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#101828] tracking-tight">
            {title}
          </h2>

          <p className="text-sm sm:text-base text-[#475467] max-w-xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Accordion FAQ List */}
        <div className="divide-y divide-[#EAECF0] border-y border-[#EAECF0]">
          {items.map((item) => {
            const isOpen = openIds.includes(item.id);

            return (
              <div key={item.id} className="py-6 transition-colors">
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full flex items-start justify-between gap-4 text-left group focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-bold text-[#101828] group-hover:text-[#7F56D9] transition-colors leading-snug">
                    {item.question}
                  </span>

                  <span className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full border border-[#D0D5DD] text-[#7F56D9] group-hover:border-[#7F56D9] transition-colors">
                    {isOpen ? (
                      <Minus className="h-3.5 w-3.5" />
                    ) : (
                      <Plus className="h-3.5 w-3.5" />
                    )}
                  </span>
                </button>

                {isOpen && (
                  <div className="mt-3.5 pr-10 text-xs sm:text-sm text-[#475467] leading-relaxed animate-in fade-in duration-200">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Support CTA Card (Untitled UI Signature) */}
        <div className="mt-12 rounded-2xl border border-[#EAECF0] bg-[#F9FAFB] p-6 sm:p-8 text-center space-y-4 shadow-unt-xs">
          <div className="flex justify-center -space-x-2">
            <img
              src={MAIN_TUTOR.avatar}
              alt=""
              className="h-10 w-10 rounded-full object-cover ring-2 ring-white"
            />
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7F56D9] text-white ring-2 ring-white font-bold text-xs">
              LINE
            </div>
          </div>

          <div>
            <h4 className="text-base font-bold text-[#101828]">
              ยังมีข้อสงสัยอื่นๆ เพิ่มเติม?
            </h4>
            <p className="text-xs text-[#475467] mt-1 max-w-sm mx-auto">
              ทัก LINE มาคุยกับพี่แม็กและทีมงานวิชาการได้ตลอดเวลา เราพร้อมให้คำปรึกษาทุกคำถาม
            </p>
          </div>

          <div>
            <a
              href="https://line.me"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#12B76A] px-5 py-2.5 text-xs font-bold text-white shadow-unt-xs hover:bg-[#0E9355] transition-all"
            >
              <MessageCircle className="h-4 w-4" />
              แอด LINE สอบถามพี่แม็ก
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
