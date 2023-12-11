import type { AiToolWithRelations } from "@/types";
import Link from "next/link";
import React from "react";
import Tippy from "@tippyjs/react";
import { capitalizeWordsWithSeparators } from "@/lib/helpers";
import cn from "@/utils/twMerge";

const Tag = ({
    tag,
    shouldTruncate,
}: {
    tag: AiToolWithRelations["Tags"][0];
    shouldTruncate?: boolean;
}) => {
    return (
        <li
            key={tag.id}
            className={cn(
                "bg-white border border-secondary",
                "cursor-pointer",
                "font-semibold",
                // "max-w-[125px]",
                "px-3 py-2",
                "rounded-md",
                "shadow-neobrut1",
                "text-secondary text-sm",
                {
                    truncate: shouldTruncate,
                },
            )}
        >
            {shouldTruncate ? (
                <Tippy
                    content={
                        <span className={cn("text-white")}>{tag.tagName}</span>
                    }
                >
                    <Link
                        href={`/ai_tools/tags/${capitalizeWordsWithSeparators(
                            tag.tagName,
                        )}`}
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        {tag.tagName}
                    </Link>
                </Tippy>
            ) : (
                <Link
                    href={`/ai_tools/tags/${capitalizeWordsWithSeparators(
                        tag.tagName,
                    )}`}
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    {tag.tagName}
                </Link>
            )}
        </li>
    );
};

export default Tag;
