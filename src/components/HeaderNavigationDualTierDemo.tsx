"use client";

import { Bell01, Settings01, Zap } from "@untitledui/icons";
import { NavButton } from "@/components/application/app-navigation/base-components/nav-button";
import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { Button } from "@/components/base/buttons/button";
import { DropdownAvatar } from "@/components/base/dropdown/dropdown-avatar";

const subItems = [
    { label: "Overview", href: "/dashboard/overview" },
    { label: "Notifications", href: "/dashboard/notifications" },
    { label: "Analytics", href: "/dashboard/analytics" },
    { label: "Saved reports", href: "/dashboard/saved-reports" },
    { label: "Scheduled reports", href: "/dashboard/scheduled-reports" },
    { label: "User reports", href: "/dashboard/user-reports" },
];

const items = [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
    { label: "Dashboard", href: "/instructor", items: subItems },
    { label: "Classroom", href: "/learn/math-calculus-mastery" },
    { label: "FAQs", href: "/#faqs" },
];

export const HeaderNavigationDualTierDemo = () => (
    <HeaderNavigationBase
        activeUrl="/instructor"
        items={items}
        actions={
            <>
                <Button iconLeading={Zap} color="secondary" size="sm">
                    Upgrade now
                </Button>
                <div className="flex gap-0.5">
                    <NavButton icon={Settings01} label="Settings" href="/instructor" tooltipPlacement="bottom" />
                    <div className="relative">
                        <NavButton icon={Bell01} label="Notifications" href="/instructor" tooltipPlacement="bottom" />
                        <div className="absolute -top-0.25 -right-0.25 flex size-3.5 items-center justify-center rounded-full bg-fg-error-primary text-[10px] font-bold text-white">
                            2
                        </div>
                    </div>
                </div>
                <DropdownAvatar />
            </>
        }
    />
);
