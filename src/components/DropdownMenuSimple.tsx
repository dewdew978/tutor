"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import Link from "next/link";
import { 
  ChevronDown, 
  User, 
  Settings, 
  LogOut, 
  BookOpen, 
  HelpCircle, 
  Sparkles,
  Check
} from "lucide-react";

export interface DropdownMenuItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: ReactNode;
  badge?: string;
  shortcut?: string;
  disabled?: boolean;
  destructive?: boolean;
  dividerAbove?: boolean;
}

interface DropdownMenuSimpleProps {
  trigger?: ReactNode;
  label?: string;
  items?: DropdownMenuItem[];
  align?: "left" | "right";
  className?: string;
}

export const DEFAULT_DROPDOWN_ITEMS: DropdownMenuItem[] = [
  {
    id: "courses",
    label: "คอร์สเรียนของฉัน",
    href: "/learn/math-calculus-mastery",
    icon: <BookOpen className="h-4 w-4 text-[#667085]" />,
    badge: "เรียนต่อ",
  },
  {
    id: "login",
    label: "เข้าสู่ระบบ (Log in)",
    href: "/login",
    icon: <User className="h-4 w-4 text-[#667085]" />,
  },
  {
    id: "signup",
    label: "สมัครสมาชิกใหม่",
    href: "/signup",
    icon: <Sparkles className="h-4 w-4 text-[#7F56D9]" />,
    badge: "ฟรี",
  },
  {
    id: "faqs",
    label: "คำถามที่พบบ่อย (FAQs)",
    href: "/#faqs",
    icon: <HelpCircle className="h-4 w-4 text-[#667085]" />,
  },
  {
    id: "settings",
    label: "ระบบจัดการหลังบ้าน",
    href: "/instructor",
    icon: <Settings className="h-4 w-4 text-[#667085]" />,
  },
  {
    id: "logout",
    label: "ออกจากระบบ",
    href: "/login",
    icon: <LogOut className="h-4 w-4 text-[#F04438]" />,
    destructive: true,
    dividerAbove: true,
  },
];

export function DropdownMenuSimple({
  trigger,
  label = "เมนูผู้ใช้งาน",
  items = DEFAULT_DROPDOWN_ITEMS,
  align = "right",
  className = "",
}: DropdownMenuSimpleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div ref={dropdownRef} className={`relative inline-block text-left ${className}`}>
      {/* Trigger Button */}
      {trigger ? (
        <div onClick={() => setIsOpen(!isOpen)} role="button" tabIndex={0}>
          {trigger}
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-3.5 py-2 text-xs font-semibold text-[#344054] shadow-unt-xs hover:bg-[#F9FAFB] focus:border-[#7F56D9] focus:outline-none focus:ring-4 focus:ring-[#F4EBFF] transition-all"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <span>{label}</span>
          <ChevronDown
            className={`h-4 w-4 text-[#667085] transition-transform duration-200 ${
              isOpen ? "rotate-180 text-[#7F56D9]" : ""
            }`}
          />
        </button>
      )}

      {/* Dropdown Menu Popover (Untitled UI Signature Popover) */}
      {isOpen && (
        <div
          className={`absolute z-50 mt-2 w-64 rounded-xl border border-[#EAECF0] bg-white p-1.5 shadow-unt-lg animate-in fade-in-0 zoom-in-95 duration-150 ${
            align === "right" ? "right-0" : "left-0"
          }`}
          role="menu"
        >
          {items.map((item) => (
            <div key={item.id}>
              {item.dividerAbove && (
                <div className="my-1 border-t border-[#EAECF0]" role="separator" />
              )}

              {item.href ? (
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                    item.destructive
                      ? "text-[#F04438] hover:bg-[#FEF3F2]"
                      : "text-[#344054] hover:bg-[#F9FAFB] hover:text-[#101828]"
                  } ${item.disabled ? "opacity-50 pointer-events-none" : ""}`}
                  role="menuitem"
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className="rounded-md bg-[#F4EBFF] px-1.5 py-0.5 text-[10px] font-bold text-[#7F56D9] border border-[#E9D7FE]">
                      {item.badge}
                    </span>
                  )}
                  {item.shortcut && (
                    <kbd className="text-[10px] text-[#98A2B3] font-mono">{item.shortcut}</kbd>
                  )}
                </Link>
              ) : (
                <button
                  onClick={() => {
                    item.onClick?.();
                    setIsOpen(false);
                  }}
                  disabled={item.disabled}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-medium transition-colors ${
                    item.destructive
                      ? "text-[#F04438] hover:bg-[#FEF3F2]"
                      : "text-[#344054] hover:bg-[#F9FAFB] hover:text-[#101828]"
                  } ${item.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                  role="menuitem"
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className="rounded-md bg-[#F4EBFF] px-1.5 py-0.5 text-[10px] font-bold text-[#7F56D9] border border-[#E9D7FE]">
                      {item.badge}
                    </span>
                  )}
                  {item.shortcut && (
                    <kbd className="text-[10px] text-[#98A2B3] font-mono">{item.shortcut}</kbd>
                  )}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
