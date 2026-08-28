"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  DollarSign, 
  Users, 
  BookOpen, 
  Star, 
  Plus, 
  ArrowLeft, 
  Video, 
  Eye,
  TrendingUp,
  Search,
  CheckCircle2,
  Calendar,
  Download,
  Filter,
  MessageSquare,
  Send
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MOCK_COURSES } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";

export default function InstructorDashboardPage() {
  const [courses, setCourses] = useState(MOCK_COURSES);
  const [activeTab, setActiveTab] = useState<"courses" | "orders" | "qa">("courses");
  const [isCreatingCourse, setIsCreatingCourse] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // New Course Form State
  const [newTitle, setNewTitle] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newCategory, setNewCategory] = useState("คณิตศาสตร์ ม.6");
  const [newSubtitle, setNewSubtitle] = useState("");

  // Mock Orders Data
  const [orders, setOrders] = useState([
    {
      id: "ORD-9281",
      studentName: "น้องแพรวา รัตนกิจ",
      studentEmail: "praewa@gmail.com",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
      courseTitle: "พิชิตแคลคูลัสและฟังก์ชัน ม.ปลาย",
      amount: 2490,
      paymentMethod: "PromptPay QR",
      date: "วันนี้, 14:20 น.",
      status: "COMPLETED",
    },
    {
      id: "ORD-9280",
      studentName: "น้องภูริ วงศ์สวัสดิ์",
      studentEmail: "phuri.w@outlook.com",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150",
      courseTitle: "ตะลุยโจทย์ A-Level คณิต 1",
      amount: 2990,
      paymentMethod: "บัตรเครดิต",
      date: "เมื่อวานนี้, 19:45 น.",
      status: "COMPLETED",
    },
    {
      id: "ORD-9279",
      studentName: "น้องมิ้นต์ ปัญญาวงศ์",
      studentEmail: "mint.p@gmail.com",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150",
      courseTitle: "ฟิสิกส์ ม.ปลาย: ไฟฟ้า & แม่เหล็ก",
      amount: 2690,
      paymentMethod: "PromptPay QR",
      date: "27 ส.ค. 2026",
      status: "COMPLETED",
    },
  ]);

  // Mock Q&A Messages
  const [qaMessages, setQaMessages] = useState([
    {
      id: "qa-1",
      studentName: "น้องกานต์",
      courseTitle: "พิชิตแคลคูลัสและฟังก์ชัน ม.ปลาย",
      lessonTitle: "1.2 กฎของโลปิตาล",
      question: "ตรงกฎโลปิตาล ถ้าดิฟแล้วยังได้ 0/0 อยู่ สามารถดิฟรอบที่ 2 ต่อได้เลยไหมครับพี่โต๋?",
      status: "ANSWERED",
      reply: "ดิฟต่อได้เลยครับน้องกานต์! ตราบใดที่ยังอยู่ในรูป indeterminate form (0/0 หรือ inf/inf) สามารถทำซ้ำได้เรื่อยๆ เลยครับ",
    },
    {
      id: "qa-2",
      studentName: "น้องเต๋า",
      courseTitle: "ฟิสิกส์ ม.ปลาย: ไฟฟ้า & แม่เหล็ก",
      lessonTitle: "2.1 กฎของโอห์มและการต่อวงจร",
      question: "พี่โต๋ครับ วงจรข้อ 5 ในชีท ตรงความต้านทาน R3 ทำไมถึงลัดวงจรตัดทิ้งได้เหรอครับ?",
      status: "PENDING",
      reply: "",
    },
  ]);

  const [replyText, setReplyText] = useState("");
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);

  const handleSendReply = (qaId: string) => {
    if (!replyText.trim()) return;
    setQaMessages(
      qaMessages.map((m) =>
        m.id === qaId ? { ...m, reply: replyText, status: "ANSWERED" } : m
      )
    );
    setReplyText("");
    setActiveReplyId(null);
  };

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const newCourseItem = {
      ...MOCK_COURSES[0],
      id: `course-${Date.now()}`,
      title: newTitle,
      slug: `custom-${Date.now()}`,
      subtitle: newSubtitle || "คอร์สเรียนเข้มข้น จัดทำโดยพี่โต๋",
      price: parseFloat(newPrice) || 2500,
      salePrice: undefined,
      category: newCategory,
      studentCount: 0,
      reviewCount: 0,
      rating: 5.0,
      chapters: [],
    };

    setCourses([newCourseItem, ...courses]);
    setIsCreatingCourse(false);
    setNewTitle("");
    setNewPrice("");
    setNewSubtitle("");
  };

  const filteredCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB] text-[#101828]">
      <Header />

      <main className="flex-1 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Header Bar (Untitled UI Style) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAECF0] pb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Link
                  href="/"
                  className="text-xs text-[#667085] hover:text-[#7F56D9] flex items-center gap-1 font-medium"
                >
                  <ArrowLeft className="h-3 w-3" /> หน้าร้าน / หน้าแรก
                </Link>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#101828]">
                แดชบอร์ดจัดการระบบ (P&apos;Toh Backoffice)
              </h1>
              <p className="text-xs text-[#667085] mt-0.5">
                ติดตามรายได้ ยอดลงทะเบียนของนักเรียน และตอบคำถาม Q&A
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsCreatingCourse(true)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#7F56D9] px-4 py-2.5 text-xs font-bold text-white shadow-unt-xs hover:bg-[#6941C6] focus:outline-none focus:ring-4 focus:ring-[#F4EBFF] transition-all"
              >
                <Plus className="h-4 w-4" />
                สร้างคอร์สใหม่
              </button>
            </div>
          </div>

          {/* Metric Stats Cards (Untitled UI Signature 4-Card Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="rounded-2xl border border-[#EAECF0] bg-white p-5 shadow-unt-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#667085]">รายได้รวมเดือนนี้</span>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ECFDF3] text-[#027A48]">
                  <DollarSign className="h-4 w-4" />
                </div>
              </div>
              <p className="text-2xl font-extrabold text-[#101828] mt-2">
                ฿168,400
              </p>
              <div className="mt-2 flex items-center gap-1 text-[11px] font-bold text-[#027A48]">
                <TrendingUp className="h-3.5 w-3.5" />
                <span>+18.2% จากเดือนที่แล้ว</span>
              </div>
            </div>

            <div className="rounded-2xl border border-[#EAECF0] bg-white p-5 shadow-unt-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#667085]">นักเรียนที่ลงทะเบียน</span>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F4EBFF] text-[#7F56D9]">
                  <Users className="h-4 w-4" />
                </div>
              </div>
              <p className="text-2xl font-extrabold text-[#101828] mt-2">
                15,400 คน
              </p>
              <span className="mt-2 block text-[11px] text-[#7F56D9] font-medium">+68 คนในสัปดาห์นี้</span>
            </div>

            <div className="rounded-2xl border border-[#EAECF0] bg-white p-5 shadow-unt-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#667085]">คะแนนรีวิวเฉลี่ย</span>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FEF0C7] text-[#B54708]">
                  <Star className="h-4 w-4 fill-[#FDB022] text-[#FDB022]" />
                </div>
              </div>
              <p className="text-2xl font-extrabold text-[#101828] mt-2">
                4.98 / 5.0
              </p>
              <span className="mt-2 block text-[11px] text-[#667085]">จาก 680 รีวิว</span>
            </div>

            <div className="rounded-2xl border border-[#EAECF0] bg-white p-5 shadow-unt-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#667085]">คำถาม Q&A รอการตอบ</span>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EFF8FF] text-[#175CD3]">
                  <MessageSquare className="h-4 w-4" />
                </div>
              </div>
              <p className="text-2xl font-extrabold text-[#101828] mt-2">
                {qaMessages.filter((m) => m.status === "PENDING").length} ข้อ
              </p>
              <span className="mt-2 block text-[11px] text-[#027A48] font-medium">ตอบกลับแล้ว 98%</span>
            </div>
          </div>

          {/* Sub Navigation Segmented Tabs (Untitled UI Underline Tabs) */}
          <div className="flex items-center gap-6 border-b border-[#EAECF0] text-xs font-semibold">
            <button
              onClick={() => setActiveTab("courses")}
              className={`pb-3 border-b-2 transition-colors ${
                activeTab === "courses"
                  ? "border-[#7F56D9] text-[#7F56D9] font-bold"
                  : "border-transparent text-[#667085] hover:text-[#101828]"
              }`}
            >
              📚 คอร์สเรียนทั้งหมด ({courses.length})
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`pb-3 border-b-2 transition-colors ${
                activeTab === "orders"
                  ? "border-[#7F56D9] text-[#7F56D9] font-bold"
                  : "border-transparent text-[#667085] hover:text-[#101828]"
              }`}
            >
              💳 รายการสั่งซื้อล่าสุด ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab("qa")}
              className={`pb-3 border-b-2 transition-colors ${
                activeTab === "qa"
                  ? "border-[#7F56D9] text-[#7F56D9] font-bold"
                  : "border-transparent text-[#667085] hover:text-[#101828]"
              }`}
            >
              💬 กระดานคำถาม Q&A ({qaMessages.length})
            </button>
          </div>

          {/* Create Course Modal */}
          {isCreatingCourse && (
            <div className="rounded-2xl border border-[#D0D5DD] bg-white p-6 shadow-unt-lg space-y-4">
              <div className="flex items-center justify-between border-b border-[#EAECF0] pb-3">
                <h3 className="text-base font-bold text-[#101828]">✨ เพิ่มคอร์สเรียนใหม่ของพี่โต๋</h3>
                <button
                  onClick={() => setIsCreatingCourse(false)}
                  className="text-xs text-[#667085] hover:text-[#101828]"
                >
                  ปิด ✕
                </button>
              </div>

              <form onSubmit={handleCreateCourse} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#344054] mb-1">
                      ชื่อคอร์สเรียน *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="เช่น สรุปเข้มฟิสิกส์ A-Level บทคลื่นและเสียง"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full rounded-lg border border-[#D0D5DD] bg-white px-3.5 py-2 text-xs text-[#101828] shadow-unt-xs focus:border-[#7F56D9] focus:outline-none focus:ring-4 focus:ring-[#F4EBFF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#344054] mb-1">
                      หมวดหมู่ / ระดับชั้น *
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full rounded-lg border border-[#D0D5DD] bg-white px-3.5 py-2 text-xs text-[#101828] shadow-unt-xs focus:border-[#7F56D9] focus:outline-none"
                    >
                      <option value="คณิตศาสตร์ ม.4">คณิตศาสตร์ ม.4</option>
                      <option value="คณิตศาสตร์ ม.5">คณิตศาสตร์ ม.5</option>
                      <option value="คณิตศาสตร์ ม.6">คณิตศาสตร์ ม.6</option>
                      <option value="ตะลุยโจทย์ A-Level / TCAS">ตะลุยโจทย์ A-Level / TCAS</option>
                      <option value="ฟิสิกส์ & TPAT3">ฟิสิกส์ & TPAT3</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#344054] mb-1">
                      ราคาคอร์ส (บาท) *
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="2900"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      className="w-full rounded-lg border border-[#D0D5DD] bg-white px-3.5 py-2 text-xs text-[#101828] shadow-unt-xs focus:border-[#7F56D9] focus:outline-none focus:ring-4 focus:ring-[#F4EBFF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#344054] mb-1">
                      คำโปรยสั้นๆ (Subtitle)
                    </label>
                    <input
                      type="text"
                      placeholder="เช่น ปูพื้นฐานแน่น ลุยโจทย์ข้อสอบจริง 10 ปี"
                      value={newSubtitle}
                      onChange={(e) => setNewSubtitle(e.target.value)}
                      className="w-full rounded-lg border border-[#D0D5DD] bg-white px-3.5 py-2 text-xs text-[#101828] shadow-unt-xs focus:border-[#7F56D9] focus:outline-none focus:ring-4 focus:ring-[#F4EBFF]"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-[#EAECF0]">
                  <button
                    type="button"
                    onClick={() => setIsCreatingCourse(false)}
                    className="rounded-lg border border-[#D0D5DD] bg-white px-4 py-2 text-xs font-semibold text-[#344054] hover:bg-[#F9FAFB] shadow-unt-xs"
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-[#7F56D9] px-5 py-2 text-xs font-bold text-white shadow-unt-xs hover:bg-[#6941C6]"
                  >
                    บันทึกคอร์สเรียน
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 1: COURSES MANAGEMENT TABLE */}
          {activeTab === "courses" && (
            <div className="rounded-2xl border border-[#EAECF0] bg-white overflow-hidden shadow-unt-xs">
              <div className="p-5 border-b border-[#EAECF0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-[#101828]">คอร์สเรียนของพี่โต๋ทั้งหมด</h3>
                  <p className="text-xs text-[#667085]">จัดการบทเรียน แก้ไขราคา และอัปโหลดไฟล์เอกสาร</p>
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#667085]" />
                  <input
                    type="text"
                    placeholder="ค้นหาชื่อคอร์ส..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-lg border border-[#D0D5DD] bg-white py-1.5 pl-9 pr-3 text-xs text-[#101828] shadow-unt-xs focus:border-[#7F56D9] focus:outline-none"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F9FAFB] text-[#667085] border-b border-[#EAECF0]">
                    <tr>
                      <th className="py-3 px-4 font-semibold">ชื่อคอร์ส</th>
                      <th className="py-3 px-4 font-semibold">หมวดหมู่</th>
                      <th className="py-3 px-4 font-semibold">ราคา</th>
                      <th className="py-3 px-4 font-semibold">ผู้เรียน</th>
                      <th className="py-3 px-4 font-semibold">สถานะ</th>
                      <th className="py-3 px-4 font-semibold text-right">การจัดการ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAECF0]">
                    {filteredCourses.map((course) => (
                      <tr key={course.id} className="hover:bg-[#F9FAFB] transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={course.coverImage}
                              alt=""
                              className="h-10 w-16 rounded-lg object-cover border border-[#EAECF0]"
                            />
                            <div>
                              <p className="font-bold text-[#101828] line-clamp-1">
                                {course.title}
                              </p>
                              <span className="text-[11px] text-[#667085]">
                                {course.chapters.length} บทเรียน • {course.totalLessons} ตอน
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-[#475467]">
                          {course.category}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-[#101828]">
                          {formatPrice(course.salePrice || course.price)}
                        </td>
                        <td className="py-3.5 px-4 text-[#475467] font-semibold">
                          {course.studentCount.toLocaleString()} คน
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#ECFDF3] px-2.5 py-0.5 text-[10px] font-bold text-[#027A48] border border-[#ABEFC6]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#12B76A]" />
                            เปิดสอนแล้ว
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/courses/${course.slug}`}
                              className="rounded-lg p-1.5 text-[#667085] hover:bg-[#F2F4F7] hover:text-[#7F56D9]"
                              title="ดูหน้ารายละเอียดคอร์ส"
                            >
                              <Eye className="h-4 w-4" />
                            </Link>
                            <Link
                              href={`/learn/${course.slug}`}
                              className="rounded-lg p-1.5 text-[#667085] hover:bg-[#F2F4F7] hover:text-[#7F56D9]"
                              title="เปิดห้องเรียน"
                            >
                              <Video className="h-4 w-4" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: ORDERS & STUDENTS TABLE */}
          {activeTab === "orders" && (
            <div className="rounded-2xl border border-[#EAECF0] bg-white overflow-hidden shadow-unt-xs">
              <div className="p-5 border-b border-[#EAECF0]">
                <h3 className="text-base font-bold text-[#101828]">รายการสั่งซื้อและผู้เรียนล่าสุด</h3>
                <p className="text-xs text-[#667085]">ข้อมูลการชำระเงินและสิทธิ์เข้าห้องเรียน</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F9FAFB] text-[#667085] border-b border-[#EAECF0]">
                    <tr>
                      <th className="py-3 px-4 font-semibold">รหัสสั่งซื้อ</th>
                      <th className="py-3 px-4 font-semibold">นักเรียน</th>
                      <th className="py-3 px-4 font-semibold">คอร์สที่สมัคร</th>
                      <th className="py-3 px-4 font-semibold">ยอดเงิน</th>
                      <th className="py-3 px-4 font-semibold">ช่องทาง</th>
                      <th className="py-3 px-4 font-semibold">สถานะ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAECF0]">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-[#F9FAFB] transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-[#7F56D9]">
                          {order.id}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={order.avatar}
                              alt=""
                              className="h-7 w-7 rounded-full object-cover border border-[#EAECF0]"
                            />
                            <div>
                              <p className="font-bold text-[#101828]">{order.studentName}</p>
                              <span className="text-[10px] text-[#667085]">{order.studentEmail}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-[#344054] font-medium">
                          {order.courseTitle}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-[#101828]">
                          {formatPrice(order.amount)}
                        </td>
                        <td className="py-3.5 px-4 text-[#667085]">
                          {order.paymentMethod}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#ECFDF3] px-2 py-0.5 text-[10px] font-bold text-[#027A48] border border-[#ABEFC6]">
                            <CheckCircle2 className="h-3 w-3" /> ชำระแล้ว
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: Q&A INBOX */}
          {activeTab === "qa" && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-[#EAECF0] bg-white p-5 shadow-unt-xs">
                <h3 className="text-base font-bold text-[#101828]">กระดานคำถามจากนักเรียน</h3>
                <p className="text-xs text-[#667085]">ตอบข้อสงสัยของนักเรียนในแต่ละบทเรียน</p>
              </div>

              <div className="space-y-4">
                {qaMessages.map((qa) => (
                  <div
                    key={qa.id}
                    className="rounded-2xl border border-[#EAECF0] bg-white p-5 shadow-unt-xs space-y-3 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#101828]">{qa.studentName}</span>
                        <span className="text-[#667085]">• {qa.courseTitle} ({qa.lessonTitle})</span>
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          qa.status === "ANSWERED"
                            ? "bg-[#ECFDF3] text-[#027A48] border border-[#ABEFC6]"
                            : "bg-[#FEF0C7] text-[#B54708] border border-[#FEDF89]"
                        }`}
                      >
                        {qa.status === "ANSWERED" ? "ตอบแล้ว" : "รอคำตอบ"}
                      </span>
                    </div>

                    <p className="text-[#344054] bg-[#F9FAFB] p-3 rounded-lg border border-[#EAECF0]">
                      {qa.question}
                    </p>

                    {qa.reply && (
                      <div className="rounded-lg bg-[#F4EBFF] border border-[#E9D7FE] p-3 space-y-1">
                        <span className="font-bold text-[#7F56D9] text-[11px]">
                          คำตอบจากพี่โต๋:
                        </span>
                        <p className="text-[#344054]">{qa.reply}</p>
                      </div>
                    )}

                    {/* Reply Input */}
                    {activeReplyId === qa.id ? (
                      <div className="space-y-2 pt-2">
                        <textarea
                          rows={3}
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="พิมพ์คำตอบเพื่อส่งให้นักเรียน..."
                          className="w-full rounded-lg border border-[#D0D5DD] p-2.5 text-xs text-[#101828] focus:border-[#7F56D9] focus:outline-none"
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setActiveReplyId(null)}
                            className="rounded-lg border border-[#D0D5DD] px-3 py-1.5 text-xs font-semibold text-[#344054]"
                          >
                            ยกเลิก
                          </button>
                          <button
                            onClick={() => handleSendReply(qa.id)}
                            className="rounded-lg bg-[#7F56D9] px-4 py-1.5 text-xs font-bold text-white"
                          >
                            ส่งคำตอบ
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setActiveReplyId(qa.id);
                          setReplyText(qa.reply || "");
                        }}
                        className="text-xs font-bold text-[#7F56D9] hover:underline"
                      >
                        {qa.reply ? "แก้ไขคำตอบ" : "พิมพ์ตอบคำถามนี้ →"}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
