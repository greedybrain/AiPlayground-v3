"use client";

import React, { useEffect } from "react";

import Options from "./TagOptions";
import PriceRangeOptions from "./PriceRangeOptions";
import SortCriterions from "./SortCriterions";
import Wrapper from "../ui/Wrapper";
import cn from "@/utils/twMerge";
import { getTags } from "@/server/actions/tags";
import usePopupStore from "@/store/slices/popup";
import { useRouter } from "next/navigation";
import useTagsStore from "@/store/slices/tags";
import useToolSortStore from "@/store/slices/tool_sort";

const SortAndFilter = () => {
    const { setTags, setLoadingTags } = useTagsStore((state) => state);
    const { sortAndFilterOpen, closeSortAndFilter } = usePopupStore(
        (state) => state,
    );
    const {
        resetSortAndFilter,
        tagsSelected,
        ranges,
        selectedRange,
        selectedCriterion,
        criterions,
    } = useToolSortStore((state) => state);

    const { push } = useRouter();

    useEffect(() => {
        setLoadingTags(true);
        getTags()
            .then((res) => {
                if (res.success) {
                    res.tags && setTags(res.tags);
                }
                setLoadingTags(false);
            })
            .catch(() => setLoadingTags(false));
    }, [setLoadingTags, setTags]);

    if (!sortAndFilterOpen) return null;

    const handleCancelClick = () => {
        resetSortAndFilter();
        closeSortAndFilter();
    };

    const handleSubmit = async () => {
        closeSortAndFilter();

        const queryParams = new URLSearchParams();

        const tags = Object.values(tagsSelected).map((tag) =>
            tag.tagName.toLocaleLowerCase(),
        );

        if (tags.length > 0) {
            queryParams.append("tags", tags.join(","));
        }

        queryParams.append("price_range", ranges[selectedRange]);
        queryParams.append("sort", criterions[selectedCriterion][0]);
        queryParams.append("order", criterions[selectedCriterion][1]);

        const path = `/ai_tools?${queryParams.toString()}`;
        void push(path);
    };

    return (
        <Wrapper
            className={cn(
                "fixed flex",
                "h-screen",
                "justify-end",
                "w-full",
                "z-30",
            )}
        >
            <Wrapper
                className={cn(
                    "bg-black/70",
                    "cursor-pointer",
                    "flex-1",
                    "hidden",
                    "sm:block",
                )}
                onClick={() => closeSortAndFilter()}
            />
            <Wrapper
                className={cn(
                    "400>:drop-shadow-2xl",
                    "bg-white",
                    "flex flex-col",
                    "max-w-[450px] min-w-[360px]",
                    "overflow-y-scroll",
                    "pt-6",
                    "w-full",
                )}
            >
                <Wrapper
                    className={cn(
                        "flex",
                        "items-center",
                        "justify-between",
                        "px-6",
                    )}
                >
                    <h2 className={cn("font-medium", "text-lg")}>
                        Sort & Filter
                    </h2>
                    <p
                        className={cn("cursor-pointer", "text-sm", "underline")}
                        onClick={resetSortAndFilter}
                    >
                        Reset
                    </p>
                </Wrapper>

                <Options />
                <PriceRangeOptions />
                <Wrapper className={cn("flex-1")}>
                    <SortCriterions />
                </Wrapper>
                {/* Sort and filter footer  */}
                <Wrapper
                    className={cn(
                        "border-t border-secondary/10",
                        "flex",
                        "gap-4",
                        "items-center",
                        "justify-evenly",
                        "py-4 px-6",
                    )}
                >
                    <button
                        className={cn(
                            "bg-white border-2 border-secondary shadow-neobrut1",
                            "cursor-pointer",
                            "font-medium",
                            "h-[50px] hover:shadow-neobrut2",
                            "rounded-lg",
                            "shadow-neobrut1",
                            "transition-all",
                            "w-[47%]",
                        )}
                        onClick={handleCancelClick}
                    >
                        Cancel
                    </button>
                    <button
                        className={cn(
                            "bg-primary border-secondary border-2",
                            "font-medium",
                            "h-[50px] hover:shadow-neobrut2",
                            "rounded-lg",
                            "shadow-neobrut1",
                            "transition-all",
                            "w-[47%]",
                        )}
                        type="button"
                        onClick={handleSubmit}
                    >
                        Apply
                    </button>
                </Wrapper>
            </Wrapper>
        </Wrapper>
    );
};

export default SortAndFilter;
