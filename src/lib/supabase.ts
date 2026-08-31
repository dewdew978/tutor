import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "https://vieuyzspuhvdjyznomfn.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || "sb_publishable_IiBwVUOMaBnMOTtNQKeAew_1mlxMTNZ";

// Browser Supabase Client with Cookie Sync for Next.js SSR
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);

// รายชื่ออีเมลที่มีสิทธิ์ผู้ดูแลระบบสูงสุด (Super Admin / Backoffice Access)
export const ADMIN_EMAILS = [
  "pawaritpansing@gmail.com",
  "thewhitedead.office@gmail.com",
];

// Helper ตรวจสอบสิทธิ์ผู้ดูแลระบบ (Admin) จาก app_metadata, user_metadata หรืออีเมลที่ได้รับอนุญาต
export const checkIsAdmin = (user: any): boolean => {
  if (!user) return false;
  
  const email = (user.email || "").toLowerCase().trim();
  const appRole = (user.app_metadata?.role || "").toLowerCase().trim();
  const userRole = (user.user_metadata?.role || "").toLowerCase().trim();
  const isAdminMeta = Boolean(user.user_metadata?.is_admin);

  // ตรวจสอบจาก role ใน metadata
  if (appRole === "admin" || userRole === "admin" || isAdminMeta) {
    return true;
  }

  // ตรวจสอบจากอีเมลผู้ดูแลระบบ (pawaritpansing)
  if (ADMIN_EMAILS.includes(email) || email.startsWith("pawaritpansing@") || email.startsWith("pawaritpansing")) {
    return true;
  }

  return false;
};

// Helper ตรวจสอบสถานะการเป็นติวเตอร์ (Instructor) หรือ Admin
export const checkIsInstructor = (user: any): boolean => {
  if (!user) return false;
  const appRole = (user.app_metadata?.role || "").toLowerCase().trim();
  const userRole = (user.user_metadata?.role || "").toLowerCase().trim();
  
  return (
    appRole === "instructor" ||
    userRole === "instructor" ||
    checkIsAdmin(user)
  );
};

