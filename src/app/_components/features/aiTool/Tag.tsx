import type { AiToolWithRelations } from "@/types";
import React from "react";
import cn from "@/utils/twMerge";

const Tag = (tag: AiToolWithRelations["Tags"][0]) => {
    return (
        <li
            key={tag.id}
            className={cn(
                "bg-white border border-secondary",
                "cursor-pointer",
                "font-semibold",
                "max-w-[125px]",
                "px-3 py-2",
                "rounded-md",
                "shadow-neobrut1",
                "text-secondary text-sm truncate",
            )}
        >
            {tag.tagName}
        </li>
    );
};

export default Tag;
