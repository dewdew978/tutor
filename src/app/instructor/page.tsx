"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  Send,
  ShieldCheck,
  ShieldAlert,
  Lock,
  LogOut,
  LogIn,
  Loader2,
  AlertTriangle,
  LayoutDashboard,
  CreditCard,
  UserCheck,
  Settings,
  Globe,
  Menu,
  X,
  GraduationCap,
  Sparkles,
  ChevronRight,
  Edit3,
  Trash2,
  Power,
  Ban,
  Archive,
  AlertCircle
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { 
  getAllAdminCourses, 
  getInstructorOrders, 
  getInstructorQuestions, 
  getTutorApplications,
  updateCourseStatus,
  deleteCourse
} from "@/lib/data-service";
import { CourseItem } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { supabase, checkIsAdmin } from "@/lib/supabase";

export default function InstructorDashboardPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Sidebar & Navigation State
  const [activeTab, setActiveTab] = useState<"overview" | "courses" | "orders" | "qa" | "tutors" | "security" | "settings">("overview");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Courses State
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [isCreatingCourse, setIsCreatingCourse] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [courseStatusFilter, setCourseStatusFilter] = useState<"ALL" | "PUBLISHED" | "CLOSED" | "DRAFT">("ALL");
  const [statusLoadingCourseId, setStatusLoadingCourseId] = useState<string | null>(null);
  const [confirmModal, setConfirmModal] = useState<{
    open: boolean;
    course: CourseItem | null;
    action: "CLOSE" | "PUBLISH" | "DELETE";
    title: string;
    message: string;
  }>({
    open: false,
    course: null,
    action: "CLOSE",
    title: "",
    message: "",
  });

  // Orders Data
  const [orders, setOrders] = useState<any[]>([]);

  // Q&A Messages
  const [qaMessages, setQaMessages] = useState<any[]>([]);

  // Tutor Applications
  const [tutorApplications, setTutorApplications] = useState<any[]>([]);

  useEffect(() => {
    getAllAdminCourses().then(setCourses);
    getInstructorOrders().then(setOrders);
    getInstructorQuestions().then(setQaMessages);
    getTutorApplications().then(setTutorApplications);
  }, []);

  const handleToggleCourseStatus = async (
    course: CourseItem,
    targetStatus: "PUBLISHED" | "CLOSED" | "ARCHIVED" | "DRAFT"
  ) => {
    setStatusLoadingCourseId(course.id);
    const res = await updateCourseStatus(course.id, targetStatus);
    if (res.success) {
      setCourses((prev) =>
        prev.map((c) => (c.id === course.id ? { ...c, status: targetStatus } : c))
      );
    } else {
      alert("เกิดข้อผิดพลาดในการเปลี่ยนสถานะคอร์ส กรุณาลองใหม่อีกครั้ง");
    }
    setStatusLoadingCourseId(null);
    setConfirmModal({ open: false, course: null, action: "CLOSE", title: "", message: "" });
  };

  const handleDeleteCourse = async (courseId: string) => {
    setStatusLoadingCourseId(courseId);
    const res = await deleteCourse(courseId);
    if (res.success) {
      setCourses((prev) => prev.filter((c) => c.id !== courseId));
    } else {
      alert("เกิดข้อผิดพลาดในการลบคอร์ส");
    }
    setStatusLoadingCourseId(null);
    setConfirmModal({ open: false, course: null, action: "DELETE", title: "", message: "" });
  };

  const filteredCourses = courses.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (courseStatusFilter === "PUBLISHED") return c.status === "PUBLISHED" || !c.status;
    if (courseStatusFilter === "CLOSED") return c.status === "CLOSED" || c.status === "ARCHIVED";
    if (courseStatusFilter === "DRAFT") return c.status === "DRAFT";
    return true;
  });

  // New Course Form State
  const [newTitle, setNewTitle] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newCategory, setNewCategory] = useState("คณิตศาสตร์ ม.6");
  const [newSubtitle, setNewSubtitle] = useState("");

  const [replyText, setReplyText] = useState("");
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);

  // Check Authentication & Admin Permissions
  useEffect(() => {
    let isMounted = true;

    async function checkAuth() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!isMounted) return;

        setCurrentUser(user);
        const adminStatus = checkIsAdmin(user);
        setIsAdmin(adminStatus);
      } catch (err) {
        console.error("Auth check failed:", err);
      } finally {
        if (isMounted) setAuthLoading(false);
      }
    }

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return;
      const user = session?.user ?? null;
      setCurrentUser(user);
      setIsAdmin(checkIsAdmin(user));
      setAuthLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
    setIsAdmin(false);
    router.push("/login");
  };

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

    const newCourseItem: CourseItem = {
      id: `course-${Date.now()}`,
      title: newTitle,
      slug: `custom-${Date.now()}`,
      subtitle: newSubtitle || "คอร์สเรียนเข้มข้น จัดทำโดยพี่โต๋",
      description: "รายละเอียดคอร์สเรียนออนไลน์",
      coverImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800",
      trailerVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      price: parseFloat(newPrice) || 2500,
      salePrice: undefined,
      level: "ม.ปลาย",
      status: "PUBLISHED",
      category: newCategory,
      categorySlug: "math-m6",
      instructor: {
        id: "tutor-ptoh",
        name: "พี่โต๋ (P'Toh)",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
        headline: "เกียรตินิยมอันดับ 1",
        bio: "ติวเตอร์คณิตศาสตร์และฟิสิกส์ ม.ปลาย",
        rating: 5.0,
        totalStudents: 0,
        totalCourses: 0,
        isVerified: true,
        subjects: ["คณิตศาสตร์ ม.ปลาย"],
        education: ["เกียรตินิยมอันดับ 1"],
        achievements: ["เหรียญรางวัล โอลิมปิกวิชาการ"],
      },
      totalDurationHours: 18.5,
      totalLessons: 0,
      studentCount: 0,
      reviewCount: 0,
      rating: 5.0,
      isFeatured: false,
      whatYouWillLearn: [],
      requirements: [],
      chapters: [],
    };

    setCourses([newCourseItem, ...courses]);
    setIsCreatingCourse(false);
    setNewTitle("");
    setNewPrice("");
    setNewSubtitle("");
  };

  // 1. Loading Authentication State
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] text-[#101828]">
        <div className="flex flex-col items-center gap-4 text-center max-w-sm p-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F4EBFF] text-[#7F56D9]">
            <Loader2 className="h-7 w-7 animate-spin" />
          </div>
          <h3 className="text-lg font-bold text-[#101828]">กำลังตรวจสอบสิทธิ์การเข้าใช้งานระบบ...</h3>
          <p className="text-xs text-[#667085]">
            ระบบกำลังตรวจสอบสิทธิ์ความปลอดภัยของแอดมิน กรุณารอสักครู่
          </p>
        </div>
      </div>
    );
  }

  // 2. Not Logged In State
  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] p-6 text-[#101828]">
        <div className="w-full max-w-md rounded-3xl border border-[#EAECF0] bg-white p-8 shadow-unt-xl text-center space-y-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FEF3F2] text-[#F04438] border border-[#FECDCA]">
            <Lock className="h-8 w-8" />
          </div>

          <div className="space-y-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#FEF3F2] px-3 py-1 text-xs font-bold text-[#B42318] border border-[#FECDCA]">
              🔒 Admin Access Restricted
            </span>
            <h1 className="text-2xl font-extrabold text-[#101828] tracking-tight">
              ระบบจำกัดสิทธิ์เฉพาะผู้ดูแลระบบ
            </h1>
            <p className="text-xs text-[#667085] leading-relaxed">
              หน้านี้เป็นระบบจัดการหลังบ้าน (Backoffice) เฉพาะผู้ดูแลระบบที่ได้รับอนุญาตเท่านั้น กรุณาเข้าสู่ระบบด้วยบัญชีแอดมินของคุณ
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <Link
              href="/login?redirect=/instructor"
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#7F56D9] py-3 px-4 text-xs font-bold text-white shadow-unt-xs hover:bg-[#6941C6] focus:outline-none focus:ring-4 focus:ring-[#F4EBFF] transition-all"
            >
              <LogIn className="h-4 w-4" />
              เข้าสู่ระบบด้วยบัญชี Admin
            </Link>

            <Link
              href="/"
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-[#D0D5DD] bg-white py-3 px-4 text-xs font-semibold text-[#344054] hover:bg-[#F9FAFB] transition-all"
            >
              <ArrowLeft className="h-4 w-4" />
              กลับสู่หน้าร้านหลัก
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. Logged In But Not Admin (403 Forbidden)
  if (currentUser && !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] p-6 text-[#101828]">
        <div className="w-full max-w-lg rounded-3xl border border-[#FECDCA] bg-white p-8 shadow-unt-xl text-center space-y-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FEF3F2] text-[#F04438] border border-[#FECDCA]">
            <ShieldAlert className="h-8 w-8" />
          </div>

          <div className="space-y-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#FEF3F2] px-3 py-1 text-xs font-bold text-[#B42318] border border-[#FECDCA]">
              ⛔ 403 Access Denied
            </span>
            <h1 className="text-2xl font-extrabold text-[#101828] tracking-tight">
              ไม่มีสิทธิ์เข้าถึงระบบจัดการหลังบ้าน
            </h1>
            <p className="text-xs text-[#667085] leading-relaxed">
              บัญชีปัจจุบันของคุณไม่มีสิทธิ์ผู้ดูแลระบบ (Admin) ระบบนี้อนุญาตให้เฉพาะบัญชีแอดมินที่ได้รับสิทธิ์เท่านั้นเข้าใช้งาน
            </p>
          </div>

          {/* Current User Info Box */}
          <div className="rounded-xl bg-[#F9FAFB] border border-[#EAECF0] p-3.5 text-xs text-left space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[#667085]">บัญชีที่เข้าสู่ระบบ:</span>
              <span className="font-bold text-[#101828] font-mono">{currentUser.email}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#667085]">สถานะสิทธิ์ (Role):</span>
              <span className="font-bold text-[#B54708] bg-[#FEF0C7] px-2 py-0.5 rounded text-[10px]">
                {currentUser.user_metadata?.role || "STUDENT (นักเรียน)"}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleSignOut}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#F04438] py-2.5 px-4 text-xs font-bold text-white shadow-unt-xs hover:bg-[#D92D20] transition-all cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              ออกจากระบบเพื่อสลับบัญชี
            </button>

            <Link
              href="/courses"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-[#D0D5DD] bg-white py-2.5 px-4 text-xs font-semibold text-[#344054] hover:bg-[#F9FAFB] transition-all"
            >
              ไปที่คอร์สเรียนของฉัน
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 4. Authorized Admin View With Left Sidebar Layout
  return (
    <div className="min-h-screen flex bg-[#F9FAFB] text-[#101828]">
      {/* Mobile Drawer Overlay */}
      {mobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar Container */}
      <aside className={`
        fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-[#101828] text-white flex flex-col justify-between border-r border-[#1D2939] shadow-unt-xl lg:shadow-none transition-transform duration-300 ease-in-out
        ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        {/* Sidebar Header */}
        <div className="p-5 border-b border-[#1D2939]">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#7F56D9] text-white shadow-unt-xs group-hover:scale-105 transition-transform">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-extrabold text-white tracking-tight">
                    P&apos;Toh Admin
                  </span>
                </div>
                <span className="text-[10px] text-[#98A2B3] font-medium block">
                  Backoffice Suite v2.4
                </span>
              </div>
            </Link>

            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-[#98A2B3] hover:text-white hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Active Status Badge */}
          <div className="mt-4 flex items-center justify-between rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#12B76A] animate-pulse" />
              <span className="text-xs font-semibold text-[#E9D7FE]">Super Admin Online</span>
            </div>
            <span className="rounded bg-[#7F56D9] px-1.5 py-0.5 text-[9px] font-bold text-white">
              Full Access
            </span>
          </div>
        </div>

        {/* Sidebar Navigation Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div className="space-y-1">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#667085]">
              เมนูจัดการระบบหลัก
            </p>

            <button
              onClick={() => { setActiveTab("overview"); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === "overview"
                  ? "bg-[#7F56D9] text-white shadow-unt-xs"
                  : "text-[#D0D5DD] hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard className="h-4.5 w-4.5 shrink-0" />
                <span>ภาพรวม & สถิติ</span>
              </div>
              {activeTab === "overview" && <ChevronRight className="h-3.5 w-3.5" />}
            </button>

            <button
              onClick={() => { setActiveTab("courses"); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === "courses"
                  ? "bg-[#7F56D9] text-white shadow-unt-xs"
                  : "text-[#D0D5DD] hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <BookOpen className="h-4.5 w-4.5 shrink-0" />
                <span>จัดการคอร์สเรียน</span>
              </div>
              <span className={`px-2 py-0.5 text-[10px] rounded-full font-bold ${
                activeTab === "courses" ? "bg-white/20 text-white" : "bg-white/10 text-[#98A2B3]"
              }`}>
                {courses.length}
              </span>
            </button>

            <button
              onClick={() => { setActiveTab("orders"); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === "orders"
                  ? "bg-[#7F56D9] text-white shadow-unt-xs"
                  : "text-[#D0D5DD] hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <CreditCard className="h-4.5 w-4.5 shrink-0" />
                <span>คำสั่งซื้อ & ผู้เรียน</span>
              </div>
              <span className={`px-2 py-0.5 text-[10px] rounded-full font-bold ${
                activeTab === "orders" ? "bg-white/20 text-white" : "bg-white/10 text-[#98A2B3]"
              }`}>
                {orders.length}
              </span>
            </button>

            <button
              onClick={() => { setActiveTab("qa"); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === "qa"
                  ? "bg-[#7F56D9] text-white shadow-unt-xs"
                  : "text-[#D0D5DD] hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="h-4.5 w-4.5 shrink-0" />
                <span>ถาม-ตอบ Q&A</span>
              </div>
              {qaMessages.filter(m => m.status === "PENDING").length > 0 && (
                <span className="px-2 py-0.5 text-[10px] rounded-full font-bold bg-[#F04438] text-white animate-pulse">
                  {qaMessages.filter(m => m.status === "PENDING").length} ใหม่
                </span>
              )}
            </button>
          </div>

          <div className="space-y-1">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#667085]">
              สิทธิ์และความปลอดภัย
            </p>

            <button
              onClick={() => { setActiveTab("security"); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === "security"
                  ? "bg-[#7F56D9] text-white shadow-unt-xs"
                  : "text-[#D0D5DD] hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-4.5 w-4.5 shrink-0 text-[#12B76A]" />
                <span>สิทธิ์ผู้ดูแลระบบ (Admin)</span>
              </div>
              <span className="text-[10px] font-mono text-[#12B76A] bg-[#12B76A]/10 px-2 py-0.5 rounded">
                Verified
              </span>
            </button>

            <button
              onClick={() => { setActiveTab("tutors"); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === "tutors"
                  ? "bg-[#7F56D9] text-white shadow-unt-xs"
                  : "text-[#D0D5DD] hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <UserCheck className="h-4.5 w-4.5 shrink-0" />
                <span>ใบสมัครติวเตอร์</span>
              </div>
              <span className="text-[10px] text-[#98A2B3] bg-white/10 px-2 py-0.5 rounded">
                {tutorApplications.length}
              </span>
            </button>

            <button
              onClick={() => { setActiveTab("settings"); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === "settings"
                  ? "bg-[#7F56D9] text-white shadow-unt-xs"
                  : "text-[#D0D5DD] hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Settings className="h-4.5 w-4.5 shrink-0" />
                <span>ตั้งค่าระบบแพลตฟอร์ม</span>
              </div>
            </button>
          </div>
        </div>

        {/* Sidebar Bottom User & Storefront Link */}
        <div className="p-4 border-t border-[#1D2939] space-y-3 bg-[#0C111D]">
          <Link
            href="/"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-[#E9D7FE] bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
          >
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>เปิดดูหน้าร้าน (Storefront)</span>
            </div>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>

          {/* Admin User Card */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="h-9 w-9 rounded-xl bg-[#7F56D9] text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-unt-xs">
                P
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">
                  {currentUser.user_metadata?.full_name || "Pawarit Pansing"}
                </p>
                <p className="text-[10px] text-[#98A2B3] font-mono truncate">
                  {currentUser.email}
                </p>
              </div>
            </div>

            <button
              onClick={handleSignOut}
              title="ออกจากระบบ"
              className="p-2 rounded-xl text-[#98A2B3] hover:text-[#F04438] hover:bg-white/5 transition-colors cursor-pointer"
            >
              <LogOut className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* MAIN CONTENT AREA (ON THE RIGHT)                                         */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar Inside Main Content */}
        <header className="sticky top-0 z-30 h-16 sm:h-18 bg-white/95 backdrop-blur-md border-b border-[#EAECF0] px-4 sm:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-[#344054] hover:bg-[#F2F4F7] focus:outline-none"
              aria-label="Open Sidebar"
            >
              <Menu className="h-6 w-6" />
            </button>

            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#667085]">
                <span>P&apos;Toh Backoffice</span>
                <span>/</span>
                <span className="text-[#7F56D9] font-bold capitalize">
                  {activeTab === "overview" && "ภาพรวมและรายได้"}
                  {activeTab === "courses" && "จัดการคอร์สเรียน"}
                  {activeTab === "orders" && "คำสั่งซื้อและนักเรียน"}
                  {activeTab === "qa" && "กระดานถาม-ตอบ Q&A"}
                  {activeTab === "tutors" && "ใบสมัครติวเตอร์"}
                  {activeTab === "security" && "กำหนดสิทธิ์แอดมิน"}
                  {activeTab === "settings" && "ตั้งค่าระบบ"}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-extrabold text-[#101828] tracking-tight">
                {activeTab === "overview" && "ภาพรวมระบบ & สถิติรายได้"}
                {activeTab === "courses" && "คอร์สเรียนทั้งหมดของพี่โต๋"}
                {activeTab === "orders" && "รายการสั่งซื้อและยอดลงทะเบียน"}
                {activeTab === "qa" && "กล่องข้อความคำถามจากนักเรียน"}
                {activeTab === "tutors" && "ตรวจสอบใบสมัครขอเป็นติวเตอร์"}
                {activeTab === "security" && "ความปลอดภัยและการกำหนดสิทธิ์ (Admin Access)"}
                {activeTab === "settings" && "ตั้งค่าแพลตฟอร์ม & การเชื่อมต่อ"}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/instructor/courses/new"
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#7F56D9] px-3.5 sm:px-4 py-2 text-xs font-bold text-white shadow-unt-xs hover:bg-[#6941C6] focus:outline-none focus:ring-4 focus:ring-[#F4EBFF] transition-all"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">สร้างคอร์สใหม่</span>
              <span className="sm:hidden">สร้าง</span>
            </Link>
          </div>
        </header>

        {/* Dynamic Tab Body */}
        <main className="flex-1 p-4 sm:p-8 space-y-6">
          {activeTab === "overview" && (
            <div className="space-y-6 animate-in fade-in-50 duration-200">
              <div className="rounded-3xl bg-gradient-to-r from-[#53389E] via-[#6941C6] to-[#7F56D9] p-6 sm:p-8 text-white shadow-unt-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white border border-white/30 backdrop-blur-xs">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>ระบบจัดการหลังบ้าน P&apos;Toh LMS</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    ยินดีต้อนรับ, แอดมิน {currentUser.email?.split("@")[0]}
                  </h1>
                  <p className="text-xs sm:text-sm text-[#E9D7FE] max-w-xl">
                    ระบบพร้อมใช้งาน สิทธิ์การจัดการเต็มรูปแบบ (Full Super Admin Access) บันทึกข้อมูลและรายงานแบบ Real-time
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveTab("courses")}
                    className="rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-[#6941C6] shadow-unt-sm hover:bg-[#F9FAFB] transition-all"
                  >
                    จัดการคอร์ส ({courses.length})
                  </button>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className="rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 px-4 py-2.5 text-xs font-bold text-white transition-all"
                  >
                    ดูยอดเงินสั่งซื้อ
                  </button>
                </div>
              </div>

              {/* Dynamic Stats Cards */}
              {(() => {
                const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.amount) || 0), 0);
                const totalStudentCount = orders.length;
                const pendingQaCount = qaMessages.filter((m) => m.status === "PENDING").length;
                const answeredQaCount = qaMessages.filter((m) => m.status === "ANSWERED").length;
                const qaAnswerRate = qaMessages.length > 0 ? Math.round((answeredQaCount / qaMessages.length) * 100) : 100;
                const totalCourseReviews = courses.reduce((acc, c) => acc + (c.reviewCount || 0), 0);
                const averageRating = courses.length > 0
                  ? (courses.reduce((acc, c) => acc + (c.rating || 5.0), 0) / courses.length).toFixed(2)
                  : "5.00";

                return (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                    {/* 1. รายได้รวม */}
                    <div className="rounded-2xl border border-[#EAECF0] bg-white p-5 shadow-unt-xs hover:shadow-unt-sm transition-all">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#667085]">รายได้รวมทั้งหมด</span>
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#ECFDF3] text-[#027A48]">
                          <DollarSign className="h-5 w-5" />
                        </div>
                      </div>
                      <p className="text-2xl font-extrabold text-[#101828] mt-2">{formatPrice(totalRevenue)}</p>
                      <div className="mt-2 flex items-center gap-1 text-[11px] font-bold text-[#027A48]">
                        <TrendingUp className="h-3.5 w-3.5" />
                        <span>จากคำสั่งซื้อจริง {orders.length} รายการ</span>
                      </div>
                    </div>

                    {/* 2. นักเรียนที่ลงทะเบียน */}
                    <div className="rounded-2xl border border-[#EAECF0] bg-white p-5 shadow-unt-xs hover:shadow-unt-sm transition-all">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#667085]">นักเรียนที่ลงทะเบียน</span>
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F4EBFF] text-[#7F56D9]">
                          <Users className="h-5 w-5" />
                        </div>
                      </div>
                      <p className="text-2xl font-extrabold text-[#101828] mt-2">{totalStudentCount.toLocaleString()} คน</p>
                      <span className="mt-2 block text-[11px] text-[#7F56D9] font-medium">บันทึกข้อมูลผู้เรียนจริงในระบบ</span>
                    </div>

                    {/* 3. คะแนนรีวิวเฉลี่ย */}
                    <div className="rounded-2xl border border-[#EAECF0] bg-white p-5 shadow-unt-xs hover:shadow-unt-sm transition-all">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#667085]">คะแนนรีวิวเฉลี่ย</span>
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FEF0C7] text-[#B54708]">
                          <Star className="h-5 w-5 fill-[#FDB022] text-[#FDB022]" />
                        </div>
                      </div>
                      <p className="text-2xl font-extrabold text-[#101828] mt-2">{averageRating} / 5.0</p>
                      <span className="mt-2 block text-[11px] text-[#667085]">จาก {totalCourseReviews} รีวิวนักเรียน</span>
                    </div>

                    {/* 4. คำถามรอการตอบ */}
                    <div className="rounded-2xl border border-[#EAECF0] bg-white p-5 shadow-unt-xs hover:shadow-unt-sm transition-all">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#667085]">คำถามรอการตอบ</span>
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EFF8FF] text-[#175CD3]">
                          <MessageSquare className="h-5 w-5" />
                        </div>
                      </div>
                      <p className="text-2xl font-extrabold text-[#101828] mt-2">
                        {pendingQaCount} ข้อ
                      </p>
                      <span className="mt-2 block text-[11px] text-[#027A48] font-medium">
                        ตอบแล้ว {qaAnswerRate}% ({answeredQaCount}/{qaMessages.length || 0})
                      </span>
                    </div>
                  </div>
                );
              })()}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="rounded-2xl border border-[#EAECF0] bg-white p-5 shadow-unt-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-[#EAECF0] pb-3">
                    <h3 className="text-sm font-bold text-[#101828]">รายการสั่งซื้อล่าสุด</h3>
                    <button
                      onClick={() => setActiveTab("orders")}
                      className="text-xs font-bold text-[#7F56D9] hover:underline"
                    >
                      ดูทั้งหมด →
                    </button>
                  </div>
                  <div className="space-y-3">
                    {orders.slice(0, 3).map((order) => (
                      <div key={order.id} className="flex items-center justify-between text-xs p-2 rounded-xl hover:bg-[#F9FAFB]">
                        <div className="flex items-center gap-2.5">
                          <img src={order.avatar} alt="" className="h-8 w-8 rounded-full object-cover border" />
                          <div>
                            <p className="font-bold text-[#101828]">{order.studentName}</p>
                            <p className="text-[10px] text-[#667085]">{order.courseTitle}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-[#101828]">{formatPrice(order.amount)}</p>
                          <span className="text-[10px] text-[#027A48] font-semibold">{order.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-[#EAECF0] bg-white p-5 shadow-unt-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-[#EAECF0] pb-3">
                    <h3 className="text-sm font-bold text-[#101828]">คำถามล่าสุดจากนักเรียน</h3>
                    <button
                      onClick={() => setActiveTab("qa")}
                      className="text-xs font-bold text-[#7F56D9] hover:underline"
                    >
                      ดูกล่องคำถาม →
                    </button>
                  </div>
                  <div className="space-y-3">
                    {qaMessages.map((qa) => (
                      <div key={qa.id} className="p-3 rounded-xl bg-[#F9FAFB] border border-[#EAECF0] space-y-1 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#101828]">{qa.studentName} ({qa.courseTitle})</span>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                            qa.status === "ANSWERED" ? "bg-[#ECFDF3] text-[#027A48]" : "bg-[#FEF0C7] text-[#B54708]"
                          }`}>
                            {qa.status === "ANSWERED" ? "ตอบแล้ว" : "รอคำตอบ"}
                          </span>
                        </div>
                        <p className="text-[#475467] line-clamp-1">{qa.question}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "courses" && (
            <div className="space-y-6 animate-in fade-in-50 duration-200">
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

              <div className="rounded-2xl border border-[#EAECF0] bg-white overflow-hidden shadow-unt-xs">
                <div className="p-5 border-b border-[#EAECF0] space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-base font-bold text-[#101828]">รายการคอร์สเรียนทั้งหมด ({courses.length})</h3>
                      <p className="text-xs text-[#667085]">จัดการสถานะเปิด/ปิดรับสมัคร ยกเลิกคอร์ส แก้ไขราคา และอัปโหลดไฟล์เอกสาร</p>
                    </div>

                    <div className="flex items-center gap-3">
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
                      <Link
                        href="/instructor/courses/new"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#7F56D9] px-3.5 py-1.5 text-xs font-bold text-white shadow-unt-xs hover:bg-[#6941C6] shrink-0"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        <span>สร้างคอร์ส</span>
                      </Link>
                    </div>
                  </div>

                  {/* Course Status Filter Tabs */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 border-t border-[#EAECF0] pt-3">
                    <button
                      onClick={() => setCourseStatusFilter("ALL")}
                      className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                        courseStatusFilter === "ALL"
                          ? "bg-[#7F56D9] text-white shadow-unt-xs"
                          : "bg-[#F9FAFB] text-[#344054] hover:bg-[#F2F4F7]"
                      }`}
                    >
                      ทั้งหมด ({courses.length})
                    </button>
                    <button
                      onClick={() => setCourseStatusFilter("PUBLISHED")}
                      className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all flex items-center gap-1.5 ${
                        courseStatusFilter === "PUBLISHED"
                          ? "bg-[#027A48] text-white shadow-unt-xs"
                          : "bg-[#ECFDF3] text-[#027A48] hover:bg-[#D1FADF]"
                      }`}
                    >
                      <span className="h-2 w-2 rounded-full bg-[#12B76A]" />
                      เปิดรับสมัคร ({courses.filter((c) => c.status === "PUBLISHED" || !c.status).length})
                    </button>
                    <button
                      onClick={() => setCourseStatusFilter("CLOSED")}
                      className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all flex items-center gap-1.5 ${
                        courseStatusFilter === "CLOSED"
                          ? "bg-[#B42318] text-white shadow-unt-xs"
                          : "bg-[#FEF3F2] text-[#B42318] hover:bg-[#FEE4E2]"
                      }`}
                    >
                      <span className="h-2 w-2 rounded-full bg-[#F04438]" />
                      ปิดรับสมัคร/ปิดคอร์ส ({courses.filter((c) => c.status === "CLOSED" || c.status === "ARCHIVED").length})
                    </button>
                    <button
                      onClick={() => setCourseStatusFilter("DRAFT")}
                      className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all flex items-center gap-1.5 ${
                        courseStatusFilter === "DRAFT"
                          ? "bg-[#B54708] text-white shadow-unt-xs"
                          : "bg-[#FEF0C7] text-[#B54708] hover:bg-[#FEDF89]"
                      }`}
                    >
                      <span className="h-2 w-2 rounded-full bg-[#F79009]" />
                      ฉบับร่าง ({courses.filter((c) => c.status === "DRAFT").length})
                    </button>
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
                        <th className="py-3 px-4 font-semibold">สถานะคอร์ส</th>
                        <th className="py-3 px-4 font-semibold text-right">การจัดการ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EAECF0]">
                      {filteredCourses.length > 0 ? (
                        filteredCourses.map((course) => {
                          const isPublished = course.status === "PUBLISHED" || !course.status;
                          const isClosed = course.status === "CLOSED" || course.status === "ARCHIVED";
                          const isDraft = course.status === "DRAFT";
                          const isUpdating = statusLoadingCourseId === course.id;

                          return (
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
                                      {course.chapters?.length || 0} บทเรียน • {course.totalLessons} ตอน
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
                                {course.studentCount?.toLocaleString() || 0} คน
                              </td>
                              <td className="py-3.5 px-4">
                                {isPublished && (
                                  <span className="inline-flex items-center gap-1 rounded-full bg-[#ECFDF3] px-2.5 py-0.5 text-[10px] font-bold text-[#027A48] border border-[#ABEFC6]">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#12B76A]" />
                                    เปิดรับสมัคร
                                  </span>
                                )}
                                {isClosed && (
                                  <span className="inline-flex items-center gap-1 rounded-full bg-[#FEF3F2] px-2.5 py-0.5 text-[10px] font-bold text-[#B42318] border border-[#FECDCA]">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#F04438]" />
                                    ปิดรับสมัครแล้ว
                                  </span>
                                )}
                                {isDraft && (
                                  <span className="inline-flex items-center gap-1 rounded-full bg-[#FEF0C7] px-2.5 py-0.5 text-[10px] font-bold text-[#B54708] border border-[#FEDF89]">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#F79009]" />
                                    ฉบับร่าง
                                  </span>
                                )}
                              </td>
                              <td className="py-3.5 px-4 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  {/* Quick Toggle Status Button */}
                                  {isPublished ? (
                                    <button
                                      onClick={() =>
                                        setConfirmModal({
                                          open: true,
                                          course,
                                          action: "CLOSE",
                                          title: "ยืนยันการปิดรับสมัครคอร์สเรียน",
                                          message: `คุณต้องการปิดรับสมัครคอร์ส "${course.title}" ใช่หรือไม่? ระบบจะซ่อนคอร์สจากหน้าร้านและหยุดรับนักเรียนใหม่ (นักเรียนเดิมยังเข้าเรียนได้ปกติ)`,
                                        })
                                      }
                                      disabled={isUpdating}
                                      className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold text-[#B42318] bg-[#FEF3F2] hover:bg-[#FEE4E2] border border-[#FECDCA] transition-colors disabled:opacity-50"
                                      title="ปิดรับสมัครคอร์สนี้"
                                    >
                                      <Power className="h-3 w-3" />
                                      <span>ปิดคอร์ส</span>
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => handleToggleCourseStatus(course, "PUBLISHED")}
                                      disabled={isUpdating}
                                      className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold text-[#027A48] bg-[#ECFDF3] hover:bg-[#D1FADF] border border-[#ABEFC6] transition-colors disabled:opacity-50"
                                      title="เปิดรับสมัครคอร์สนี้"
                                    >
                                      <CheckCircle2 className="h-3 w-3" />
                                      <span>เปิดสอน</span>
                                    </button>
                                  )}

                                  {/* Edit Course */}
                                  <Link
                                    href={`/instructor/courses/${course.slug}/edit`}
                                    className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold text-[#7F56D9] bg-[#F4EBFF] hover:bg-[#E9D7FE] transition-colors"
                                    title="แก้ไขข้อมูลคอร์ส & บทเรียน"
                                  >
                                    <Edit3 className="h-3.5 w-3.5" />
                                    <span>แก้ไข</span>
                                  </Link>

                                  {/* Preview Storefront */}
                                  <Link
                                    href={`/courses/${course.slug}`}
                                    className="rounded-lg p-1.5 text-[#667085] hover:bg-[#F2F4F7] hover:text-[#7F56D9]"
                                    title="ดูหน้ารายละเอียดคอร์ส"
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Link>

                                  {/* Delete Course */}
                                  <button
                                    onClick={() =>
                                      setConfirmModal({
                                        open: true,
                                        course,
                                        action: "DELETE",
                                        title: "ยืนยันการลบคอร์สเรียนถาวร",
                                        message: `คุณแน่ใจหรือไม่ว่าต้องการลบคอร์ส "${course.title}" ออกจากระบบ? การกระทำนี้ไม่สามารถย้อนกลับได้`,
                                      })
                                    }
                                    disabled={isUpdating}
                                    className="rounded-lg p-1.5 text-[#667085] hover:bg-[#FEF3F2] hover:text-[#F04438] transition-colors disabled:opacity-50"
                                    title="ลบคอร์สเรียนนี้"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-[#667085]">
                            ไม่พบคอร์สเรียนในหมวดหมู่นี้
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="rounded-2xl border border-[#EAECF0] bg-white overflow-hidden shadow-unt-xs animate-in fade-in-50 duration-200">
              <div className="p-5 border-b border-[#EAECF0]">
                <h3 className="text-base font-bold text-[#101828]">รายการสั่งซื้อและผู้เรียนล่าสุด</h3>
                <p className="text-xs text-[#667085]">ข้อมูลการชำระเงินและสิทธิ์เข้าห้องเรียนของนักเรียน</p>
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

          {activeTab === "qa" && (
            <div className="space-y-4 animate-in fade-in-50 duration-200">
              <div className="rounded-2xl border border-[#EAECF0] bg-white p-5 shadow-unt-xs">
                <h3 className="text-base font-bold text-[#101828]">กระดานคำถามจากนักเรียน</h3>
                <p className="text-xs text-[#667085]">ตอบข้อสงสัยของนักเรียนในแต่ละบทเรียนวิดีโอ</p>
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

          {activeTab === "tutors" && (
            <div className="rounded-2xl border border-[#EAECF0] bg-white overflow-hidden shadow-unt-xs animate-in fade-in-50 duration-200">
              <div className="p-5 border-b border-[#EAECF0]">
                <h3 className="text-base font-bold text-[#101828]">ใบสมัครขอเป็นติวเตอร์บนแพลตฟอร์ม</h3>
                <p className="text-xs text-[#667085]">ตรวจสอบประวัติ วิดีโอตัวอย่างสอน และอนุมัติสิทธิ์ผู้สอน</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F9FAFB] text-[#667085] border-b border-[#EAECF0]">
                    <tr>
                      <th className="py-3 px-4 font-semibold">รหัสสมัคร</th>
                      <th className="py-3 px-4 font-semibold">ชื่อติวเตอร์</th>
                      <th className="py-3 px-4 font-semibold">วิชาที่ขอสอน</th>
                      <th className="py-3 px-4 font-semibold">ประวัติการศึกษา</th>
                      <th className="py-3 px-4 font-semibold">วันที่สมัคร</th>
                      <th className="py-3 px-4 font-semibold">สถานะ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAECF0]">
                    {tutorApplications.map((app) => (
                      <tr key={app.id} className="hover:bg-[#F9FAFB] transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-[#7F56D9]">
                          {app.id}
                        </td>
                        <td className="py-3.5 px-4">
                          <div>
                            <p className="font-bold text-[#101828]">{app.name}</p>
                            <span className="text-[10px] text-[#667085]">{app.email}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-[#344054] font-medium">
                          {app.subject}
                        </td>
                        <td className="py-3.5 px-4 text-[#667085]">
                          {app.education}
                        </td>
                        <td className="py-3.5 px-4 text-[#667085]">
                          {app.date}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                            app.status === "APPROVED"
                              ? "bg-[#ECFDF3] text-[#027A48] border border-[#ABEFC6]"
                              : "bg-[#FEF0C7] text-[#B54708] border border-[#FEDF89]"
                          }`}>
                            {app.status === "APPROVED" ? "อนุมัติแล้ว" : "รอตรวจสอบ"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6 animate-in fade-in-50 duration-200">
              <div className="rounded-2xl border border-[#EAECF0] bg-white p-6 shadow-unt-xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#EAECF0] pb-4">
                  <div>
                    <h3 className="text-base font-bold text-[#101828] flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-[#12B76A]" />
                      <span>รายชื่อผู้ดูแลระบบที่มีสิทธิ์เข้าถึงหลังบ้าน (Super Admins)</span>
                    </h3>
                    <p className="text-xs text-[#667085] mt-1">
                      ระบบความปลอดภัยจำกัดสิทธิ์เฉพาะบัญชีแอดมินที่ผ่านการอนุมัติเท่านั้น
                    </p>
                  </div>
                  <span className="rounded-full bg-[#ECFDF3] px-3 py-1 text-xs font-bold text-[#027A48] border border-[#ABEFC6]">
                    🔒 RBAC Protected
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-[#F9FAFB] border border-[#EAECF0] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-[#7F56D9] text-white font-bold flex items-center justify-center text-sm">
                        P
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-[#101828]">pawaritpansing@gmail.com</p>
                          <span className="rounded-full bg-[#7F56D9] px-2 py-0.5 text-[9px] font-bold text-white">
                            Primary Super Admin
                          </span>
                        </div>
                        <p className="text-xs text-[#667085]">
                          สิทธิ์สูงสุด: จัดการคอร์ส, รายได้, สิทธิ์ผู้ใช้, ฐานข้อมูล และการตั้งค่าระบบ 100%
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#12B76A]">● กำลังใช้งาน (Active)</span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F9FAFB] border border-[#EAECF0] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-[#344054] text-white font-bold flex items-center justify-center text-sm">
                        T
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-[#101828]">thewhitedead.office@gmail.com</p>
                          <span className="rounded-full bg-[#344054] px-2 py-0.5 text-[9px] font-bold text-white">
                            Co-Admin
                          </span>
                        </div>
                        <p className="text-xs text-[#667085]">สิทธิ์การดูแลระบบสำรอง</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#667085]">สำรอง</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="rounded-2xl border border-[#EAECF0] bg-white p-6 shadow-unt-xs space-y-6 animate-in fade-in-50 duration-200">
              <div className="border-b border-[#EAECF0] pb-4">
                <h3 className="text-base font-bold text-[#101828]">ตั้งค่าระบบและแพลตฟอร์ม</h3>
                <p className="text-xs text-[#667085] mt-0.5">การเชื่อมต่อ Supabase, ช่องทางการรับเงิน และการสตรีมวิดีโอ</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                <div className="p-4 rounded-xl bg-[#F9FAFB] border border-[#EAECF0] space-y-2">
                  <span className="font-bold text-[#101828]">⚡ Supabase Database Connection</span>
                  <p className="text-[#667085]">สถานะการเชื่อมต่อฐานข้อมูล PostgreSQL พร้อม RLS Security</p>
                  <span className="inline-block px-2 py-1 rounded bg-[#ECFDF3] text-[#027A48] font-bold text-[10px]">
                    Connected & Healthy (200 OK)
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#F9FAFB] border border-[#EAECF0] space-y-2">
                  <span className="font-bold text-[#101828]">💳 ระบบรับชำระเงิน (PromptPay & Credit Card)</span>
                  <p className="text-[#667085]">รับเงินโอนตรงเข้าบัญชีติวเตอร์ ตรวจสลิปอัตโนมัติ</p>
                  <span className="inline-block px-2 py-1 rounded bg-[#ECFDF3] text-[#027A48] font-bold text-[10px]">
                    PromptPay QR Enabled
                  </span>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ========================================================================= */}
      {/* ADMIN CONFIRMATION MODAL FOR CLOSE/DELETE COURSE                          */}
      {/* ========================================================================= */}
      {confirmModal.open && confirmModal.course && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-unt-2xl border border-[#EAECF0] space-y-4">
            <div className="flex items-center gap-3">
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                confirmModal.action === "DELETE" 
                  ? "bg-[#FEF3F2] text-[#F04438] border border-[#FECDCA]"
                  : "bg-[#FEF8F2] text-[#B54708] border border-[#FEDF89]"
              }`}>
                {confirmModal.action === "DELETE" ? (
                  <Trash2 className="h-5 w-5" />
                ) : (
                  <Power className="h-5 w-5" />
                )}
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#101828]">
                  {confirmModal.title}
                </h3>
                <p className="text-[11px] text-[#667085]">
                  การดำเนินการนี้มีผลต่อการแสดงผลหน้าร้านทันที
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-[#F9FAFB] p-3 text-xs text-[#344054] space-y-1">
              <p className="font-bold text-[#101828] line-clamp-1">{confirmModal.course.title}</p>
              <p className="text-[11px] text-[#667085] leading-relaxed">{confirmModal.message}</p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#EAECF0]">
              <button
                type="button"
                onClick={() => setConfirmModal({ open: false, course: null, action: "CLOSE", title: "", message: "" })}
                disabled={Boolean(statusLoadingCourseId)}
                className="rounded-xl border border-[#D0D5DD] bg-white px-4 py-2 text-xs font-semibold text-[#344054] hover:bg-[#F9FAFB] shadow-unt-xs"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={() => {
                  if (confirmModal.action === "DELETE") {
                    handleDeleteCourse(confirmModal.course!.id);
                  } else if (confirmModal.action === "CLOSE") {
                    handleToggleCourseStatus(confirmModal.course!, "CLOSED");
                  } else {
                    handleToggleCourseStatus(confirmModal.course!, "PUBLISHED");
                  }
                }}
                disabled={Boolean(statusLoadingCourseId)}
                className={`rounded-xl px-4 py-2 text-xs font-bold text-white shadow-unt-xs transition-all flex items-center gap-1.5 ${
                  confirmModal.action === "DELETE"
                    ? "bg-[#D92D20] hover:bg-[#B42318]"
                    : "bg-[#7F56D9] hover:bg-[#6941C6]"
                }`}
              >
                {statusLoadingCourseId && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                <span>
                  {confirmModal.action === "DELETE" ? "ยืนยันลบคอร์สถาวร" : "ยืนยันการเปลี่ยนสถานะ"}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
