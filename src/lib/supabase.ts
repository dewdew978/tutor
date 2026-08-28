import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "https://vieuyzspuhvdjyznomfn.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || "sb_publishable_IiBwVUOMaBnMOTtNQKeAew_1mlxMTNZ";

// Direct Supabase Client (เช่นเดียวกับโปรเจกต์ ExamHub)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// Helper ตรวจสอบสิทธิ์ผู้ดูแลระบบ (Admin) จาก app_metadata หรืออีเมล
export const checkIsAdmin = (user: any) => {
  if (!user) return false;
  return user.app_metadata?.role === "admin" || user.email === "thewhitedead.office@gmail.com";
};

// Helper ตรวจสอบสถานะการเป็นติวเตอร์ (Instructor)
export const checkIsInstructor = (user: any) => {
  if (!user) return false;
  return user.app_metadata?.role === "instructor" || checkIsAdmin(user);
};
