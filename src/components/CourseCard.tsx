import Link from "next/link";
import { Star, Clock, BookOpen, CheckCircle, ArrowRight, Play } from "lucide-react";
import { CourseItem } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";

interface CourseCardProps {
  course: CourseItem;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#EAECF0] bg-white shadow-unt-xs transition-all duration-300 hover:shadow-unt-lg hover:-translate-y-0.5">
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-[#F2F4F7]">
        <img
          src={course.coverImage}
          alt={course.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/95 backdrop-blur-sm px-2.5 py-0.5 text-xs font-semibold text-[#344054] shadow-unt-xs border border-[#EAECF0]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7F56D9]" />
            {course.category}
          </span>
          {course.isFeatured && (
            <span className="inline-flex items-center rounded-full bg-[#FEF0C7] px-2.5 py-0.5 text-xs font-semibold text-[#B54708] border border-[#FEDF89]">
              ยอดฮิต 🔥
            </span>
          )}
        </div>

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-[#101828]/25 opacity-0 backdrop-blur-[1px] transition-opacity duration-300 group-hover:opacity-100">
          <span className="inline-flex items-center gap-2 rounded-lg bg-white px-3.5 py-2 text-xs font-bold text-[#101828] shadow-unt-md">
            <Play className="h-3.5 w-3.5 fill-[#7F56D9] text-[#7F56D9]" />
            ดูตัวอย่าง & รายละเอียด
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Tutor row */}
        <div className="mb-3 flex items-center gap-2">
          <img
            src={course.instructor.avatar}
            alt={course.instructor.name}
            className="h-6 w-6 rounded-full object-cover border border-[#EAECF0]"
          />
          <span className="text-xs font-medium text-[#475467]">{course.instructor.name}</span>
          {course.instructor.isVerified && (
            <CheckCircle className="h-3.5 w-3.5 text-[#7F56D9] fill-[#7F56D9] text-white" />
          )}
        </div>

        {/* Title */}
        <h3 className="line-clamp-2 text-base font-bold text-[#101828] group-hover:text-[#7F56D9] transition-colors">
          <Link href={`/courses/${course.slug}`}>
            <span className="absolute inset-0" />
            {course.title}
          </Link>
        </h3>

        {/* Subtitle */}
        <p className="mt-1.5 line-clamp-2 text-xs text-[#475467] leading-relaxed">
          {course.subtitle}
        </p>

        {/* Specs / Duration / Lessons */}
        <div className="mt-4 flex items-center justify-between border-t border-[#F2F4F7] pt-3 text-xs text-[#667085]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-[#98A2B3]" />
              {course.totalDurationHours} ชม.
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5 text-[#98A2B3]" />
              {course.totalLessons} บทเรียน
            </span>
          </div>

          <div className="flex items-center gap-1 font-bold text-[#344054]">
            <Star className="h-3.5 w-3.5 fill-[#FDB022] text-[#FDB022]" />
            <span>{course.rating.toFixed(1)}</span>
            <span className="text-[#98A2B3] font-normal text-[11px]">({course.reviewCount})</span>
          </div>
        </div>

        {/* Price & CTA link */}
        <div className="mt-4 flex items-baseline justify-between border-t border-[#F2F4F7] pt-3">
          <div className="flex items-baseline gap-2">
            {course.salePrice ? (
              <>
                <span className="text-lg font-extrabold text-[#7F56D9]">
                  {formatPrice(course.salePrice)}
                </span>
                <span className="text-xs text-[#98A2B3] line-through">
                  {formatPrice(course.price)}
                </span>
              </>
            ) : (
              <span className="text-lg font-extrabold text-[#101828]">
                {course.price === 0 ? "เรียนฟรี" : formatPrice(course.price)}
              </span>
            )}
          </div>

          <span className="inline-flex items-center gap-1 text-xs font-bold text-[#7F56D9] group-hover:translate-x-0.5 transition-transform">
            ดูบทเรียน <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}
