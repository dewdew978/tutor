import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vieuyzspuhvdjyznomfn.supabase.co";
const supabaseAnonKey = "sb_publishable_IiBwVUOMaBnMOTtNQKeAew_1mlxMTNZ";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const tableNames = [
  "User",
  "Course",
  "Category",
  "Chapter",
  "Lesson",
  "Attachment",
  "Enrollment",
  "LessonProgress",
  "Review",
  "Question",
  "Answer",
  "Payout",
  "TutorApplication"
];

async function checkTables() {
  console.log("🔍 กำลังตรวจสอบตารางบน Supabase Project: vieuyzspuhvdjyznomfn ...\n");
  
  let existingCount = 0;
  let missingCount = 0;

  for (const table of tableNames) {
    const { data, error } = await supabase.from(table).select("*").limit(1);
    
    if (error) {
      if (error.code === "PGRST205" || error.message.includes("Could not find the table") || error.code === "42P01") {
        console.log(`❌ ไม่พบตาราง: "${table}" (ยังไม่ได้รัน SQL หรือยังไม่ถูกสร้าง)`);
        missingCount++;
      } else {
        console.log(`⚠️ ตาราง "${table}": มีข้อความแจ้งเตือน (${error.message})`);
      }
    } else {
      console.log(`✅ พบตาราง: "${table}" เรียบร้อยแล้ว (จำนวนข้อมูลตัวอย่าง: ${data.length} แถว)`);
      existingCount++;
    }
  }

  console.log("\n==========================================");
  console.log(`📊 สรุปผลการตรวจสอบ: พบตารางแล้ว ${existingCount}/${tableNames.length} ตาราง`);
  if (missingCount > 0) {
    console.log(`👉 มี ${missingCount} ตารางที่ยังไม่ได้กด Run ใน Supabase SQL Editor`);
  } else {
    console.log("🎉 ยอดเยี่ยม! ทุกตารางถูกสร้างและเชื่อมต่อสมบูรณ์แบบ 100%");
  }
  console.log("==========================================");
}

checkTables();
