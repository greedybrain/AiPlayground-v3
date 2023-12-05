import React from "react";
import Tag from "./Tag";
import type { TagsProps } from "@/types";
import Wrapper from "../../ui/Wrapper";
import cn from "@/utils/twMerge";
import { usePathname } from "next/navigation";
import useToolSortStore from "@/store/slices/tool_sort";

const TagsForTool = ({ tags }: TagsProps) => {
    const { tagsSelected } = useToolSortStore((state) => state);
    const pathname = usePathname();

    let tagsArray: TagsProps["tags"] = Object.values(tagsSelected);

    if (pathname.startsWith("/ai_tools") && tagsArray.length > 0) {
        const allTags = Object.values(tags);

        const selectedTags = allTags.filter(
            (tag) => tagsSelected[tag.tagName.toLocaleLowerCase()],
        );
        const unselectedTags = allTags.filter(
            (tag) => !tagsSelected[tag.tagName.toLocaleLowerCase()],
        );

        tagsArray = [...selectedTags, ...unselectedTags];
    } else {
        tagsArray = tags;
    }

    const renderTagsLengthDifference = () => {
        if (tagsArray.length > 2) {
            return (
                <li
                    className={cn(
                        "bg-white border-2 border-secondary",
                        "font-semibold",
                        "px-3 py-2",
                        "rounded-md",
                        "shadow-neobrut1",
                        "text-secondary text-sm",
                    )}
                >
                    +{tags.length - 2}
                </li>
            );
        }

        return null;
    };

    return (
        <Wrapper
            className={cn(
                "absolute",
                "bottom-0 bg-gradient-to-t from-black/75 to-white/0",
                "flex flex-col",
                "h-[75px]",
                "justify-center",
                "rounded-b-xl",
                "text-white",
                "w-full",
            )}
        >
            <ul className={cn("flex", "gap-2", "px-4")}>
                {tagsArray.slice(0, 2).map((tag) => (
                    <Tag key={tag.id} shouldTruncate tag={tag} />
                ))}
                {renderTagsLengthDifference()}
            </ul>
        </Wrapper>
    );
};

export default TagsForTool;
