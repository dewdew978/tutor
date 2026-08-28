import { CheckCircle, Star, Users, BookOpen } from "lucide-react";
import { TutorProfile } from "@/lib/mock-data";

interface TutorCardProps {
  tutor: TutorProfile;
}

export function TutorCard({ tutor }: TutorCardProps) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-[#EAECF0] bg-white p-6 text-center shadow-unt-xs transition-all duration-300 hover:shadow-unt-lg hover:-translate-y-0.5">
      {/* Avatar with Verified Badge */}
      <div className="relative mb-4">
        <img
          src={tutor.avatar}
          alt={tutor.name}
          className="h-20 w-20 rounded-full object-cover ring-4 ring-[#F4EBFF]"
        />
        {tutor.isVerified && (
          <div className="absolute bottom-0 right-0 rounded-full bg-white p-0.5 shadow-unt-xs">
            <CheckCircle className="h-5 w-5 text-[#7F56D9] fill-[#7F56D9] text-white" />
          </div>
        )}
      </div>

      {/* Name & Headline */}
      <h4 className="text-base font-bold text-[#101828]">
        {tutor.name}
      </h4>
      <p className="mt-1 line-clamp-2 text-xs font-medium text-[#7F56D9]">
        {tutor.headline}
      </p>

      {/* Bio snippet */}
      <p className="mt-2 line-clamp-2 text-xs text-[#475467] leading-relaxed">
        {tutor.bio}
      </p>

      {/* Subjects Tags */}
      <div className="mt-4 flex flex-wrap justify-center gap-1.5">
        {tutor.subjects.map((sub: string, idx: number) => (
          <span
            key={idx}
            className="rounded-md bg-[#F9FAFB] px-2 py-0.5 text-[11px] font-medium text-[#344054] border border-[#EAECF0]"
          >
            {sub}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="mt-5 grid w-full grid-cols-3 divide-x divide-[#EAECF0] border-t border-[#EAECF0] pt-4 text-center text-xs">
        <div>
          <div className="flex items-center justify-center gap-1 font-bold text-[#101828]">
            <Star className="h-3.5 w-3.5 fill-[#FDB022] text-[#FDB022]" />
            <span>{tutor.rating.toFixed(2)}</span>
          </div>
          <span className="text-[10px] text-[#667085]">คะแนนรีวิว</span>
        </div>
        <div>
          <div className="flex items-center justify-center gap-1 font-bold text-[#101828]">
            <Users className="h-3.5 w-3.5 text-[#667085]" />
            <span>{tutor.totalStudents.toLocaleString()}</span>
          </div>
          <span className="text-[10px] text-[#667085]">ผู้เรียน</span>
        </div>
        <div>
          <div className="flex items-center justify-center gap-1 font-bold text-[#101828]">
            <BookOpen className="h-3.5 w-3.5 text-[#667085]" />
            <span>{tutor.totalCourses}</span>
          </div>
          <span className="text-[10px] text-[#667085]">คอร์สเรียน</span>
        </div>
      </div>
    </div>
  );
}
