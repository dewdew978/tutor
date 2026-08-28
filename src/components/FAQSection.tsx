"use client";

import { useState } from "react";
import { Plus, Minus, HelpCircle, MessageCircle, ArrowRight } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const ACADEMY_FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "สมัครเรียนแล้วสามารถดูคอร์สได้นานแค่ไหน มีวันหมดอายุหรือไม่?",
    answer: "ทุกคอร์สของพี่โต๋เป็นแบบ Lifetime Access สมัครครั้งเดียวเข้าเรียนได้ตลอดชีพ ไม่มีวันหมดอายุ น้องๆ สามารถเปิดดูซ้ำเพื่อทบทวนบทเรียนได้กี่รอบก็ได้จนกว่าจะสอบติดครับ",
  },
  {
    id: "faq-2",
    question: "หากเรียนแล้วมีจุดที่ไม่เข้าใจ สามารถถามพี่โต๋ได้อย่างไร?",
    answer: "ใต้ทุกคลิปวิดีโอบทเรียนจะมีระบบกระดานถาม-ตอบ (Q&A) น้องๆ สามารถพิมพ์ข้อสงสัยหรือจุดที่ติดขัดได้ทันที พี่โต๋จะได้รับการแจ้งเตือนและเข้ามาพิมพ์อธิบายคำตอบด้วยตัวเอง 100% ภายใน 24 ชั่วโมงครับ",
  },
  {
    id: "faq-3",
    question: "จะได้รับเอกสารและชีทสรุปสูตรประกอบการเรียนอย่างไร?",
    answer: "เมื่อสมัครคอร์สแล้ว น้องๆ สามารถดาวน์โหลดชีทสรุป 4 สีแบบ PDF ได้ทันทีในหน้าห้องเรียนของแต่ละบท สามารถเปิดเขียนจดโน้ตใน iPad / Tablet หรือสั่งพิมพ์เป็นเล่มชีทออกมาอ่านได้เลยครับ",
  },
  {
    id: "faq-4",
    question: "สามารถดูวิดีโอบนอุปกรณ์ใดได้บ้าง และปรับความเร็วเสียงได้ไหม?",
    answer: "ระบบรองรับการเข้าเรียนผ่านทุกอุปกรณ์ ทั้งคอมพิวเตอร์ (Windows/Mac), iPad, แท็บเล็ต และสมาร์ตโฟน มีฟังก์ชันปรับความเร็วเสียงได้ตั้งแต่ 0.75x ถึง 2.0x และระบบจะบันทึกเวลาที่ดูค้างไว้ให้อัตโนมัติ",
  },
  {
    id: "faq-5",
    question: "มีช่องทางการชำระเงินใดบ้าง และเริ่มเรียนได้ทันทีเลยไหม?",
    answer: "ระบบรองรับทั้ง PromptPay QR Code, โอนเงินผ่านธนาคาร และบัตรเครดิต/เดบิต เมื่อยืนยันการชำระเงินแล้ว ระบบจะปลดล็อกห้องเรียนให้เข้าเรียนได้ทันทีตลอด 24 ชั่วโมงครับ",
  },
  {
    id: "faq-6",
    question: "ไม่แน่ใจว่าพื้นฐานตัวเองเหมาะกับคอร์สไหน ควรเลือกอย่างไรดี?",
    answer: "น้องๆ หรือผู้ปกครองสามารถทัก LINE Official มาปรึกษาพี่โต๋ได้โดยตรงเลยครับ พี่โต๋จะช่วยประเมินพื้นฐานและจัดตารางแผนการเรียนที่เหมาะสมกับเป้าหมายการสอบเข้ามหาวิทยาลัยให้ฟรี ไม่มีค่าใช้จ่ายครับ",
  },
];

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  faqs?: FAQItem[];
}

export function FAQSection({
  title = "คำถามที่พบบ่อย (FAQs)",
  subtitle = "รวมทุกข้อสงสัยเกี่ยวกับการเรียน การดูวิดีโอ เอกสารประกอบ และการถาม-ตอบกับพี่โต๋",
  faqs = ACADEMY_FAQS,
}: FAQSectionProps) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faqs" className="py-16 sm:py-24 bg-white border-t border-[#EAECF0]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header (Untitled UI Style) */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#F4EBFF] px-4 py-1.5 text-xs sm:text-sm font-semibold text-[#7F56D9]">
            <HelpCircle className="h-4 w-4" />
            <span>คำถามที่พบบ่อย</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#101828]">
            {title}
          </h2>

          <p className="text-base sm:text-lg text-[#475467] leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Accordion List */}
        <div className="max-w-4xl mx-auto divide-y divide-[#EAECF0]">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div key={faq.id} className="py-6 sm:py-7">
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-start justify-between gap-4 text-left group cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-[#101828] group-hover:text-[#7F56D9] transition-colors leading-snug">
                    {faq.question}
                  </span>

                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#D0D5DD] text-[#667085] group-hover:border-[#7F56D9] group-hover:text-[#7F56D9] transition-colors mt-0.5">
                    {isOpen ? (
                      <Minus className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </span>
                </button>

                {isOpen && (
                  <div className="mt-4 text-sm sm:text-base text-[#475467] leading-relaxed animate-in fade-in-50 duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support CTA Box (Untitled UI Signature Box) */}
        <div className="mt-16 max-w-4xl mx-auto rounded-3xl bg-[#F9FAFB] border border-[#EAECF0] p-8 sm:p-10 text-center space-y-5 shadow-unt-xs">
          <div className="flex justify-center -space-x-2">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
              alt="พี่โต๋"
              className="h-12 w-12 rounded-full object-cover ring-4 ring-white"
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-bold text-[#101828]">ยังมีคำถามหรือข้อสงสัยเพิ่มเติม?</h3>
            <p className="text-sm sm:text-base text-[#667085] max-w-lg mx-auto leading-relaxed">
              ทัก LINE มาคุยกับพี่โต๋และทีมงานวิชาการได้ตลอดเวลา เราพร้อมให้คำปรึกษาทุกคำถาม
            </p>
          </div>

          <div className="pt-2">
            <a
              href="https://line.me"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 rounded-xl bg-[#12B76A] px-6 py-3 text-sm sm:text-base font-bold text-white shadow-unt-xs hover:bg-[#0E9355] transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              แอด LINE สอบถามพี่โต๋
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
