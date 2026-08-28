export interface Tutor {
  id: string;
  name: string;
  avatar: string;
  headline: string;
  bio: string;
  rating: number;
  totalStudents: number;
  totalCourses: number;
  isVerified: boolean;
  subjects: string[];
  education: string[];
  achievements: string[];
}

export interface AttachmentItem {
  id: string;
  title: string;
  fileSize: string;
  fileType: string;
  downloadUrl: string;
}

export interface LessonItem {
  id: string;
  title: string;
  description: string;
  durationSeconds: number;
  videoUrl: string;
  isFreePreview: boolean;
  attachments?: AttachmentItem[];
}

export interface ChapterItem {
  id: string;
  title: string;
  description?: string;
  lessons: LessonItem[];
}

export interface CourseItem {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  coverImage: string;
  trailerVideoUrl: string;
  price: number;
  salePrice?: number;
  level: "ม.ต้น (ม.1-3)" | "ม.ปลาย (ม.4-6)" | "เตรียมสอบเข้า (TCAS/A-Level)" | "ทุกระดับ";
  category: string;
  categorySlug: string;
  instructor: Tutor;
  totalDurationHours: number;
  totalLessons: number;
  rating: number;
  reviewCount: number;
  studentCount: number;
  isFeatured?: boolean;
  whatYouWillLearn: string[];
  requirements: string[];
  chapters: ChapterItem[];
}

export interface StudentReview {
  id: string;
  studentName: string;
  school: string;
  faculty: string;
  score: string;
  comment: string;
  avatar: string;
}

// ข้อมูลติวเตอร์คนเดียว (Single Tutor Profile)
export const MAIN_TUTOR: Tutor = {
  id: "tutor-main",
  name: "พี่แม็ก จุฬาฯ (P'Max)",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
  headline: "เกียรตินิยมอันดับ 1 วิศวะ จุฬาฯ • ผู้เชี่ยวชาญคณิตศาสตร์ & ฟิสิกส์ ม.ปลาย",
  bio: "ประสบการณ์สอนกวดวิชากว่า 10 ปี เน้นสอนจากความเข้าใจใน Concept ลึกซึ้ง ลุยโจทย์ข้อสอบแข่งขันและ A-Level จริงย้อนหลังกว่า 15 ปี ไม่เน้นการท่องจำสูตรแบบนกแก้วนกขุนทอง ส่งนักเรียนสอบติดคณะแพทย์ วิศวะ บัญชี จุฬาฯ-ศิริราช-รามาฯ มาแล้วกว่าพันคน",
  rating: 4.98,
  totalStudents: 15400,
  totalCourses: 8,
  isVerified: true,
  subjects: ["คณิตศาสตร์ ม.ปลาย", "A-Level Math 1", "ฟิสิกส์ ม.ปลาย", "TPAT3 ความถนัดวิศวะ"],
  education: [
    "ปริญญาตรี เกียรตินิยมอันดับ 1 คณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
    "เหรียญเงิน โอลิมปิกวิชาการคณิตศาสตร์ (สอวน. & สสวท.)",
    "คะแนนสอบเข้ามหาวิทยาลัย คณิตศาสตร์ 100 เต็ม และ ฟิสิกส์ 96 เต็ม",
  ],
  achievements: [
    "ติวเตอร์ยอดนิยมอันดับ 1 ด้านคณิตศาสตร์ & ฟิสิกส์",
    "ผู้เขียนหนังสือสรุปสูตรคณิตศาสตร์ ม.ปลาย Best Seller",
    "ดูแลและตอบคำถามนักเรียนด้วยตัวเองทุกคน 100%",
  ],
};

export const CATEGORIES = [
  { id: "all", name: "คอร์สทั้งหมด", slug: "all" },
  { id: "math-m4", name: "คณิตศาสตร์ ม.4", slug: "math-m4" },
  { id: "math-m5", name: "คณิตศาสตร์ ม.5", slug: "math-m5" },
  { id: "math-m6", name: "คณิตศาสตร์ ม.6", slug: "math-m6" },
  { id: "tcas", name: "ตะลุยโจทย์ A-Level / TCAS", slug: "tcas" },
  { id: "physics", name: "ฟิสิกส์ & TPAT3", slug: "physics" },
];

export const STUDENT_REVIEWS: StudentReview[] = [
  {
    id: "rev-1",
    studentName: "น้องแพรวา",
    school: "โรงเรียนเตรียมอุดมศึกษา",
    faculty: "สอบติด แพทยศาสตร์ จุฬาฯ",
    score: "A-Level คณิต 1 ได้ 94 คะแนน",
    comment: "พี่แม็กสอนแคลคูลัสและตรีโกณฯ ได้เห็นภาพมาก จากที่เคยเกลียดคณิต พอเข้าใจที่มาของสูตรก็ทำโจทย์ประยุกต์ได้หมดเลยค่ะ ขอบคุณพี่แม็กมากๆ ค่ะ",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: "rev-2",
    studentName: "น้องภูริ",
    school: "โรงเรียนสวนกุหลาบวิทยาลัย",
    faculty: "สอบติด วิศวกรรมศาสตร์ จุฬาฯ",
    score: "A-Level ฟิสิกส์ 92 / คณิต 88",
    comment: "คอร์สตะลุยโจทย์ช่วยดักทางข้อสอบได้เป๊ะมากครับ เทคนิคโลปิตาลกับการวิเคราะห์แรงในฟิสิกส์ช่วยประหยัดเวลาทำข้อสอบไปได้เยอะมาก",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: "rev-3",
    studentName: "น้องมิ้นต์",
    school: "โรงเรียนสาธิต มศว ปทุมวัน",
    faculty: "สอบติด บัญชี-บริหาร จุฬาฯ",
    score: "A-Level คณิต 1 ได้ 86 คะแนน",
    comment: "ชอบที่มีระบบถาม-ตอบใต้คลิปมากค่ะ เวลาทำการบ้านแล้วติดตรงไหน พี่แม็กเข้ามาพิมพ์อธิบายเองตลอด อบอุ่นเหมือนมีติวเตอร์ส่วนตัวเลย",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200",
  },
];

export const MOCK_COURSES: CourseItem[] = [
  {
    id: "course-1",
    title: "พิชิตแคลคูลัสและฟังก์ชัน ม.ปลาย สู่คะแนน A-Level เต็มร้อย",
    slug: "math-calculus-mastery",
    subtitle: "ปูพื้นฐานอนุพันธ์ อินทิเกรต ลุยโจทย์ข้อสอบจริงย้อนหลัง 10 ปี แบบเจาะลึก",
    description: "คอร์สแคลคูลัสที่สมบูรณ์แบบที่สุดสำหรับนักเรียน ม.ปลาย ที่ต้องการสอบเข้าคณะแพทย์, วิศวะ, หรือบัญชี โดยรวบรวมเทคนิคการจำสูตรอย่างเข้าใจ การวิเคราะห์โจทย์ประยุกต์ และแนวคิดแบบทีละสเต็ป พร้อมไฟล์ชีทสรุปสูตรฉบับพกพา",
    coverImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800",
    trailerVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    price: 3500,
    salePrice: 2490,
    level: "ม.ปลาย (ม.4-6)",
    category: "คณิตศาสตร์ ม.6",
    categorySlug: "math-m6",
    instructor: MAIN_TUTOR,
    totalDurationHours: 18.5,
    totalLessons: 24,
    rating: 4.98,
    reviewCount: 420,
    studentCount: 3850,
    isFeatured: true,
    whatYouWillLearn: [
      "เข้าใจแก่นแท้ของลิมิต ความต่อเนื่อง และการหาอนุพันธ์อย่างลึกซึ้ง",
      "เทคนิคการประยุกต์ใช้อนุพันธ์หาค่าสูงสุด-ต่ำสุดสัมพัทธ์ในโจทย์ข้อสอบจริง",
      "การอินทิเกรตแบบไม่จำกัดเขตและจำกัดเขต รวมถึงการหาพื้นที่ใต้กราฟ",
      "ตะลุยข้อสอบคณิต 1 วิชาสามัญ & A-Level ย้อนหลังพร้อมเฉลยละเอียดทุกข้อ",
    ],
    requirements: [
      "มีความรู้พื้นฐานคณิตศาสตร์ ม.4-5 (ฟังก์ชันและพหุนาม)",
      "อุปกรณ์สำหรับดูคลิปวิดีโอ (คอมพิวเตอร์, iPad หรือมือถือ)",
    ],
    chapters: [
      {
        id: "ch-1",
        title: "บทที่ 1: ลิมิตและความต่อเนื่องของฟังก์ชัน",
        lessons: [
          {
            id: "les-1-1",
            title: "1.1 ภาพรวมแคลคูลัสและการหาลิมิตพื้นฐาน",
            description: "เรียนรู้แนวคิดของลิมิตทั้งสองด้านและเทคนิคการจัดรูป 0/0",
            durationSeconds: 1560,
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            isFreePreview: true,
            attachments: [
              {
                id: "att-1",
                title: "สรุปสูตรลิมิตและชีทเรียน ตอนที่ 1 (PDF)",
                fileSize: "3.2 MB",
                fileType: "pdf",
                downloadUrl: "#",
              },
            ],
          },
          {
            id: "les-1-2",
            title: "1.2 กฎของโลปิตาล (L'Hôpital's Rule) สูตรลัดพิชิตโจทย์ยาก",
            description: "เทคนิคการดิฟเศษดิฟส่วนเพื่อหาลิมิตแบบติดจรวด",
            durationSeconds: 1840,
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            isFreePreview: true,
          },
          {
            id: "les-1-3",
            title: "1.3 ความต่อเนื่องบนช่วงและข้อสอบวิเคราะห์กราฟ",
            description: "วิธีเช็คความต่อเนื่อง 3 เงื่อนไขและโจทย์กราฟหลอก",
            durationSeconds: 2100,
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            isFreePreview: false,
          },
        ],
      },
      {
        id: "ch-2",
        title: "บทที่ 2: อนุพันธ์ของฟังก์ชัน (Differentiation)",
        lessons: [
          {
            id: "les-2-1",
            title: "2.1 นิยามอนุพันธ์และสูตรการดิฟพื้นฐาน 10 สูตร",
            description: "ปูพื้นฐานการใช้อนุพันธ์และพิสูจน์ที่มาของแต่ละสูตร",
            durationSeconds: 2400,
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            isFreePreview: false,
          },
          {
            id: "les-2-2",
            title: "2.2 กฎลูกโซ่ (Chain Rule) และฟังก์ชันแฝง",
            description: "เทคนิคการดิฟฟังก์ชันซ้อนฟังก์ชันแบบไม่พลาด",
            durationSeconds: 2700,
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            isFreePreview: false,
          },
        ],
      },
    ],
  },
  {
    id: "course-2",
    title: "ตะลุยโจทย์ A-Level คณิต 1 เจาะลึกข้อสอบจริง 10 ปีย้อนหลัง",
    slug: "alevel-math1-ultimate",
    subtitle: "รวมเทคนิคลัด เก็งข้อสอบตรงจุด พร้อมเฉลยละเอียดแบบ Step-by-Step",
    description: "คอร์สติวเข้มโค้งสุดท้ายสำหรับสอบเข้า กสพท. แพทย์ ทันตะ เภสัช และวิศวะ รวมโจทย์คณิต 1 ครบทุกบท พร้อมแนวคิดวิเคราะห์จุดหลอกที่คนมักพลาดบ่อยที่สุด",
    coverImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
    trailerVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    price: 4200,
    salePrice: 2990,
    level: "เตรียมสอบเข้า (TCAS/A-Level)",
    category: "ตะลุยโจทย์ A-Level / TCAS",
    categorySlug: "tcas",
    instructor: MAIN_TUTOR,
    totalDurationHours: 32.0,
    totalLessons: 40,
    rating: 4.99,
    reviewCount: 680,
    studentCount: 5200,
    isFeatured: true,
    whatYouWillLearn: [
      "เทคนิคการบริหารเวลาในห้องสอบ 90 นาทีกับ 30 ข้อ",
      "การคัดเลือกข้อที่ควรทำก่อน-หลัง เพื่อการันตี 70+ คะแนน",
      "สูตรลัดและวิธีตัดช้อยส์ที่ใช้ได้จริงในห้องสอบ",
    ],
    requirements: ["เรียนจบเนื้อหาคณิตศาสตร์ ม.ปลาย ครบทุกบทแล้ว"],
    chapters: [],
  },
  {
    id: "course-3",
    title: "ฟิสิกส์ ม.ปลาย: ไฟฟ้า แม่เหล็ก และฟิสิกส์ยุคใหม่ สู่ TPAT3 / A-Level",
    slug: "physics-electricity-modern",
    subtitle: "รวมสูตร สรุปคอนเซปต์ และตะลุยโจทย์ A-Level ฟิสิกส์ ครบทุกข้อสงสัย",
    description: "คอร์สเจาะลึกฟิสิกส์กลุ่มไฟฟ้ากระแสตรง กระแสสลับ แม่เหล็กไฟฟ้า และฟิสิกส์อะตอม นิวเคลียร์ อธิบายด้วยภาพ 3D และตัวอย่างการทดลองเสมือนจริง",
    coverImage: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=800",
    trailerVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    price: 3800,
    salePrice: 2690,
    level: "ม.ปลาย (ม.4-6)",
    category: "ฟิสิกส์ & TPAT3",
    categorySlug: "physics",
    instructor: MAIN_TUTOR,
    totalDurationHours: 24.0,
    totalLessons: 30,
    rating: 4.95,
    reviewCount: 310,
    studentCount: 2900,
    isFeatured: true,
    whatYouWillLearn: [
      "กฎของโอห์มและการต่อวงจรไฟฟ้าแบบซับซ้อน (Kirchhoff's Laws)",
      "สนามแม่เหล็ก แรงแม่เหล็ก และการเหนี่ยวนำแม่เหล็กไฟฟ้า (Faraday's Law)",
      "โครงสร้างอะตอม ปรากฏการณ์โฟโตอิเล็กทริก และกัมมันตภาพรังสี",
    ],
    requirements: ["พื้นฐานฟิสิกส์และคณิตศาสตร์ ม.4"],
    chapters: [],
  },
  {
    id: "course-4",
    title: "คณิตศาสตร์ ม.4 เทอม 1: เซต ตรรกศาสตร์ และจำนวนจริง",
    slug: "math-m4-term1",
    subtitle: "ปูพื้นฐานคณิตศาสตร์ ม.ปลาย ให้แน่นเป๊ะ เกรด 4 ทุกสนาม",
    description: "เริ่มต้นก้าวแรกของ ม.ปลาย อย่างมั่นใจ ด้วยการปูพื้นฐานตรรกศาสตร์ การแก้อสมการ และทฤษฎีจำนวนจริง แบบเข้าใจถึงแก่นแท้",
    coverImage: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800",
    trailerVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    price: 2900,
    salePrice: 1990,
    level: "ม.ปลาย (ม.4-6)",
    category: "คณิตศาสตร์ ม.4",
    categorySlug: "math-m4",
    instructor: MAIN_TUTOR,
    totalDurationHours: 16.0,
    totalLessons: 20,
    rating: 4.97,
    reviewCount: 240,
    studentCount: 3400,
    isFeatured: false,
    whatYouWillLearn: [
      "การดำเนินการของเซต แผนภาพเวนน์-ออยเลอร์ และโจทย์ซับซ้อน",
      "การหาค่าความจริงของประพจน์ และสมมูล-สัจนิรันดร์",
      "การแก้อสมการพหุนาม และค่าสัมบูรณ์แบบไม่ติดหล่ม",
    ],
    requirements: ["ความรู้คณิตศาสตร์ ม.3"],
    chapters: [],
  },
];
