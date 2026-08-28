-- ==============================================================================
-- P'MAX ACADEMY - SUPABASE POSTGRESQL COMPLETE DATABASE SCHEMA
-- Copy and paste this script into Supabase Dashboard > SQL Editor > Click "RUN"
-- ==============================================================================

-- 1. Create User Table
CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT PRIMARY KEY,
    "email" TEXT UNIQUE NOT NULL,
    "name" TEXT NOT NULL,
    "passwordHash" TEXT,
    "image" TEXT,
    "role" TEXT NOT NULL DEFAULT 'STUDENT',
    "bio" TEXT,
    "headline" TEXT,
    "phoneNumber" TEXT,
    "socialLinks" TEXT,
    "bankName" TEXT,
    "bankAccountNumber" TEXT,
    "bankAccountName" TEXT,
    "isVerifiedTutor" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create TutorApplication Table
CREATE TABLE IF NOT EXISTS "TutorApplication" (
    "id" TEXT PRIMARY KEY,
    "userId" TEXT UNIQUE NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "resumeUrl" TEXT,
    "introVideoUrl" TEXT,
    "idCardUrl" TEXT,
    "educationHistory" TEXT NOT NULL,
    "teachingExperience" TEXT NOT NULL,
    "subjectsToTeach" TEXT NOT NULL,
    "adminFeedback" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "TutorApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- 3. Create Category Table
CREATE TABLE IF NOT EXISTS "Category" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT UNIQUE NOT NULL,
    "icon" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 4. Create Course Table
CREATE TABLE IF NOT EXISTS "Course" (
    "id" TEXT PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT UNIQUE NOT NULL,
    "subtitle" TEXT,
    "description" TEXT NOT NULL,
    "coverImage" TEXT,
    "trailerVideoUrl" TEXT,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "salePrice" DOUBLE PRECISION,
    "level" TEXT NOT NULL DEFAULT 'ALL_LEVELS',
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "language" TEXT NOT NULL DEFAULT 'th',
    "whatYouWillLearn" TEXT,
    "requirements" TEXT,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "instructorId" TEXT NOT NULL,
    "categoryId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Course_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Course_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- 5. Create Chapter Table
CREATE TABLE IF NOT EXISTS "Chapter" (
    "id" TEXT PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "courseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Chapter_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- 6. Create Lesson Table
CREATE TABLE IF NOT EXISTS "Lesson" (
    "id" TEXT PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "videoUrl" TEXT,
    "videoProvider" TEXT DEFAULT 'HTML5',
    "videoDuration" INTEGER NOT NULL DEFAULT 0,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isFreePreview" BOOLEAN NOT NULL DEFAULT false,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "chapterId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Lesson_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- 7. Create Attachment Table
CREATE TABLE IF NOT EXISTS "Attachment" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "fileSize" INTEGER,
    "lessonId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Attachment_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- 8. Create Enrollment Table
CREATE TABLE IF NOT EXISTS "Enrollment" (
    "id" TEXT PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "amountPaid" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "currency" TEXT NOT NULL DEFAULT 'THB',
    "paymentMethod" TEXT NOT NULL DEFAULT 'PROMPTPAY',
    "paymentStatus" TEXT NOT NULL DEFAULT 'COMPLETED',
    "paymentSlipUrl" TEXT,
    "enrolledAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Enrollment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Enrollment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Enrollment_userId_courseId_key" UNIQUE ("userId", "courseId")
);

-- 9. Create LessonProgress Table
CREATE TABLE IF NOT EXISTS "LessonProgress" (
    "id" TEXT PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "lastPositionSec" INTEGER NOT NULL DEFAULT 0,
    "completedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "LessonProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "LessonProgress_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "LessonProgress_userId_lessonId_key" UNIQUE ("userId", "lessonId")
);

-- 10. Create Review Table
CREATE TABLE IF NOT EXISTS "Review" (
    "id" TEXT PRIMARY KEY,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "comment" TEXT,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Review_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Review_userId_courseId_key" UNIQUE ("userId", "courseId")
);

-- 11. Create Question Table
CREATE TABLE IF NOT EXISTS "Question" (
    "id" TEXT PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "lessonId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Question_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Question_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Question_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- 12. Create Answer Table
CREATE TABLE IF NOT EXISTS "Answer" (
    "id" TEXT PRIMARY KEY,
    "content" TEXT NOT NULL,
    "isByTutor" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Answer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- 13. Create Payout Table
CREATE TABLE IF NOT EXISTS "Payout" (
    "id" TEXT PRIMARY KEY,
    "instructorId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "paidAt" TIMESTAMP(3),
    "referenceNote" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Payout_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Indexes for high performance
CREATE INDEX IF NOT EXISTS "Course_instructorId_idx" ON "Course"("instructorId");
CREATE INDEX IF NOT EXISTS "Course_categoryId_idx" ON "Course"("categoryId");
CREATE INDEX IF NOT EXISTS "Chapter_courseId_idx" ON "Chapter"("courseId");
CREATE INDEX IF NOT EXISTS "Lesson_chapterId_idx" ON "Lesson"("chapterId");
CREATE INDEX IF NOT EXISTS "Attachment_lessonId_idx" ON "Attachment"("lessonId");
CREATE INDEX IF NOT EXISTS "Enrollment_userId_idx" ON "Enrollment"("userId");
CREATE INDEX IF NOT EXISTS "Enrollment_courseId_idx" ON "Enrollment"("courseId");
CREATE INDEX IF NOT EXISTS "LessonProgress_userId_idx" ON "LessonProgress"("userId");
CREATE INDEX IF NOT EXISTS "Question_courseId_idx" ON "Question"("courseId");
