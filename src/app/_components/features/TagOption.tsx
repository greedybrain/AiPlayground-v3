import React, { useEffect, useState } from "react";

import type { AiToolWithRelations } from "@/types";
import cn from "@/utils/twMerge";
import { darkModeStyle } from "@/utils/darkModeToast";
import toast from "react-hot-toast";
import useToolSortStore from "@/store/slices/tool_sort";

const Option = (tag: AiToolWithRelations["Tags"][0]) => {
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const { addSelectedTag, removeSelectedTag, tagsSelected } =
        useToolSortStore((state) => state);

    useEffect(() => {
        const foundSelected = tagsSelected[tag.tagName.toLocaleLowerCase()];

        if (foundSelected) {
            setIsSelected(true);
        } else {
            setIsSelected(false);
        }
    }, [tag.tagName, tagsSelected]);

    const selectionCount = Object.keys(tagsSelected).length;

    return (
        <li
            className={cn(
                "border-2 border-secondary/10 bg-white",
                "cursor-pointer",
                "hover:bg-gray-100/50 hover:drop-shadow-sm",
                "px-3 py-2",
                "rounded-full",
                "text-sm text-center transition-all",
                {
                    "border-secondary": isSelected,
                },
            )}
            onClick={() => {
                const selected = {
                    [tag.tagName.toLocaleLowerCase()]: tag,
                };

                if (!isSelected) {
                    if (selectionCount >= 5) {
                        toast.error("Only up to 5 tags allowed", {
                            id: "tagLimitReached",
                            style: darkModeStyle,
                        });
                        return;
                    }

                    addSelectedTag(selected);
                    setIsSelected(true);
                    return;
                }

                removeSelectedTag(selected);
                setIsSelected(false);
            }}
        >
            {tag.tagName}
        </li>
    );
};

export default Option;
