# 🎓 TutorHub - Multi-Tutor Video Course Platform (LMS)

แพลตฟอร์มคอร์สเรียนวิดีโอออนไลน์ พร้อมระบบติวเตอร์หลายคน (Multi-Tutor Marketplace) พัฒนาด้วย **Next.js (App Router) + Tailwind CSS + Prisma ORM**

---

## 🚀 ฟีเจอร์หลักของระบบ (Key Features)

1. **ระบบติวเตอร์หลายคน (Multi-Tutor Architecture)**
   - ตรวจสอบประวัติและวุฒิการศึกษา (Verified Instructor Badge)
   - หน้าสมัครเป็นติวเตอร์ ([/become-tutor](http://localhost:3000/become-tutor))
   - แดชบอร์ดสำหรับติวเตอร์จัดการคอร์ส สถิติยอดขาย และรายได้ ([/instructor](http://localhost:3000/instructor))

2. **ระบบคอร์สเรียนวิดีโอ (Video LMS Platform)**
   - แยกหมวดหมู่บทเรียนหลัก (Chapters) และบทเรียนย่อย (Lessons)
   - ระบบทดลองดูคลิปฟรีก่อนซื้อ (Free Preview Video)
   - หน้าดูรายละเอียดคอร์ส ([/courses/[slug]](http://localhost:3000/courses/math-calculus-mastery))
   - หน้าห้องเรียนวิดีโอแบบอินเตอร์แอคทีฟ ([/learn/[slug]](http://localhost:3000/learn/math-calculus-mastery))

3. **ฟังก์ชันห้องเรียนออนไลน์ (Interactive Classroom)**
   - ตัวเล่นวิดีโอลื่นไหล พร้อมแถบสารบัญบทเรียน Playlist
   - ระบบบันทึกความก้าวหน้าการเรียน (Progress Tracking & Checkmarks)
   - แนบเอกสารชีทสรุป PDF ให้ดาวน์โหลดรายบทเรียน
   - ระบบถาม-ตอบ (Q&A Thread) ติวเตอร์ตอบคำถามใต้คลิปได้โดยตรง

---

## 🗄️ โครงสร้างฐานข้อมูล (Database Schema)

ไฟล์ Schema อยู่ที่ [`prisma/schema.prisma`](file:///C:/Users/thewh/Downloads/tutor/prisma/schema.prisma) ประกอบด้วย 10 ตารางหลัก:

| ตาราง (Model) | รายละเอียด |
| :--- | :--- |
| **`User`** | บัญชีผู้ใช้งาน (Role: `STUDENT`, `INSTRUCTOR`, `ADMIN`) ข้อมูลติดต่อ และบัญชีธนาคารสำหรับรับเงิน |
| **`TutorApplication`**| ข้อมูลการสมัครเป็นติวเตอร์ ประวัติการศึกษา และคลิปตัวอย่างการสอน |
| **`Category`** | หมวดหมู่วิชา (คณิตศาสตร์, ฟิสิกส์, อังกฤษ, เขียนโปรแกรม & AI ฯลฯ) |
| **`Course`** | ข้อมูลคอร์สเรียน ราคา ราคาโปรโมชั่น ระดับความยาก ครูผู้สอน และผลลัพธ์ที่จะได้รับ |
| **`Chapter`** | บทเรียนหลัก (เช่น บทที่ 1, บทที่ 2) |
| **`Lesson`** | คลิปวิดีโอย่อย ความยาว ลิงก์วิดีโอ (Cloudflare/Mux/Vimeo) และสถานะดูฟรี |
| **`Attachment`** | ไฟล์เอกสาร PDF ชีทสรุป แบบฝึกหัด |
| **`Enrollment`** | ประวัติการซื้อคอร์สของนักเรียน และช่องทางชำระเงิน |
| **`LessonProgress`**| บันทึกวินาทีที่ดูค้างไว้ และสถานะการเรียนจบ |
| **`Question` & `Answer`**| กระดานถาม-ตอบระหว่างนักเรียนกับติวเตอร์ในแต่ละบทเรียน |
| **`Payout`** | ประวัติการคำนวณส่วนแบ่งรายได้และโอนเงินให้ติวเตอร์ |

---

## 🛠️ วิธีการรันโปรเจกต์ (Getting Started)

### 1. รันเซิร์ฟเวอร์สำหรับทดสอบในเครื่อง (Local Dev)
```bash
npm run dev
```
เปิดบราวเซอร์ไปที่ [http://localhost:3000](http://localhost:3000)

### 2. การเชื่อมต่อกับฐานข้อมูล Supabase / PostgreSQL (เมื่อขึ้น Production)
1. เปิดไฟล์ `.env` และเปลี่ยน `DATABASE_URL`:
   ```env
   DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
   ```
2. แก้ไขไฟล์ `prisma/schema.prisma` ในบรรทัด `datasource db`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
3. สั่งซิงค์ฐานข้อมูล:
   ```bash
   npx prisma db push
   ```

---

## 🎥 แนะนำการจัดการวิดีโอ & การชำระเงิน (Production Services)

- **Video Streaming**: แนะนำเชื่อมต่อกับ **Cloudflare Stream** หรือ **Mux** เพื่อสร้างลิงก์ HLS (.m3u8) ป้องกันการดาวน์โหลดคลิป และปรับความชัดตามความเร็วเน็ตอัตโนมัติ
- **Payment & ตรวจสลิป**: แนะนำเชื่อมต่อกับ **SlipOK API** สำหรับตรวจสลิปโอนเงิน PromptPay อัตโนมัติ หรือ **Stripe / Omise** สำหรับรับบัตรเครดิต
