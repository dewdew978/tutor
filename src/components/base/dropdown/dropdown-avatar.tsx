"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, LogOut01, Moon01, Plus, Settings01, User01 } from "@untitledui/icons";
import type { Selection } from "react-aria-components";
import { SubmenuTrigger } from "react-aria-components";
import { Avatar } from "@/components/base/avatar/avatar";
import { Dropdown } from "@/components/base/dropdown/dropdown";

export const DropdownAvatar = () => {
    const [selectedAccount, setSelectedAccount] = useState<Selection>(new Set(["olivia"]));
    const [selectedTheme, setSelectedTheme] = useState<Selection>(new Set(["light-mode"]));

    return (
        <Dropdown.Root>
            <button className="rounded-full focus:outline-none focus:ring-2 focus:ring-brand-primary cursor-pointer">
                <Avatar
                    size="sm"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
                    alt="User profile"
                    status="online"
                />
            </button>

            <Dropdown.Popover className="w-60 rounded-b-xl bg-secondary_alt">
                <Dropdown.Menu className="rounded-b-xl bg-primary ring-1 ring-secondary">
                    <Dropdown.Item icon={User01} addon="⌘K->P">
                        ข้อมูลส่วนตัว
                    </Dropdown.Item>
                    <Dropdown.Item icon={Settings01} addon="⌘S">
                        ตั้งค่าบัญชี
                    </Dropdown.Item>
                    <Dropdown.Section selectionMode="single" selectedKeys={selectedTheme} onSelectionChange={setSelectedTheme}>
                        <Dropdown.Item id="dark-mode" icon={Moon01} selectionIndicator="toggle">
                            โหมดกลางคืน (Dark mode)
                        </Dropdown.Item>
                    </Dropdown.Section>
                    <SubmenuTrigger>
                        <Dropdown.Item icon={HelpCircle}>ศูนย์ช่วยเหลือ (Support)</Dropdown.Item>

                        <Dropdown.Popover placement="right top" offset={-6}>
                            <Dropdown.Menu>
                                <Dropdown.Item>คู่มือการเรียน</Dropdown.Item>
                                <Dropdown.Item>ติดต่อพี่แม็ก (LINE)</Dropdown.Item>
                                <Dropdown.Item>ส่งข้อเสนอแนะ</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown.Popover>
                    </SubmenuTrigger>

                    <Dropdown.Separator />

                    <Dropdown.Item icon={LogOut01} className="text-fg-error-primary hover:bg-bg-error-primary">
                        ออกจากระบบ
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown.Root>
    );
};
