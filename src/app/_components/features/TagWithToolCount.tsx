import { AiToolWithRelations } from "@/types";
import Link from "next/link";
import React from "react";
import Wrapper from "../ui/Wrapper";
import cn from "@/utils/twMerge";

const TagWithToolCount = (tag: AiToolWithRelations["Tags"][0]) => {
    return (
        <li className={cn("w-full")}>
            <Link
                className={cn("inline-block")}
                href={`/ai_tools/tags/${tag.tagName}`}
                target="_blank"
                rel="noreferrer noopener"
            >
                <Wrapper className={cn("flex", "gap-1", "items-center")}>
                    <p>{tag.tagName}</p>
                    <p className={cn("font-semibold", "text-sm text-link")}>
                        ({tag.AiTools.length} tools)
                    </p>
                </Wrapper>
            </Link>
        </li>
    );
};

export default TagWithToolCount;
