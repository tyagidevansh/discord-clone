"use client";

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ActionTooltip } from "../action-tooltip";

interface NavigationItemProps {
    id: string;
    imageUrl: string;
    name: string;
}

export const NavigationItem = ({
    id,
    imageUrl,
    name,
}: NavigationItemProps) => {
    const pathname = usePathname();
    const router = useRouter();
    const serverId = pathname.split('/').pop(); 

    const onClick = () => {
        router.push(`/servers/${id}`);
    };

    return (
        <ActionTooltip side="right" align="center" label={name}>
            <button
                onClick={onClick}
                className="group relative flex items-center mb-4"
            >
                <div
                    className={cn(
                        "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
                        serverId !== id && "group-hover:h-[20px]",
                        serverId === id ? "h-[36px]" : "h-[8px]"
                    )}
                />

                <div
                    className={cn(
                        "relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
                        serverId === id
                            ? "bg-primary/10 text-primary rounded-[16px] shadow-md"
                            : ""
                    )}
                >
                    <Image fill src={imageUrl} alt="Channel" />
                </div>
            </button>
        </ActionTooltip>
    );
};
