"use client";

import { MdOutlineSort } from "react-icons/md";
import React from "react";
import SortAndFilterResult from "./aiTool/SortAndFilterResult";
// import SortOptions from "./SortOptions";
import Wrapper from "../ui/Wrapper";
import cn from "@/utils/twMerge";
import { usePathname } from "next/navigation";
import usePopupStore from "@/store/slices/popup";

/**
 * Sort by name, company name, data added, price
 */

/**
 *
 * Step 1: User clicks button to show sort options
 * Step 2: User selects option (i.e Date Added (Desc))
 * Step 3: Url params update to reflect sort option (?sort=date&order=desc)
 * Step 4: Listen for the change in params from Step 3
 * Step 5: Use useRouter to the query params
 * Step 6: Sanitize params to send to server
 *
 */

const SortHandler = () => {
    const pathname = usePathname();
    const { openSortAndFilter } = usePopupStore((state) => state);

    if (pathname.startsWith("/user/favorites")) return null;

    return (
        <Wrapper
            className={cn(
                "flex",
                "gap-4",
                "items-center",
                "justify-end",
                "lg:px-2",
                "mt-16 mb-8 mx-auto",
                "px-2",
            )}
        >
            <SortAndFilterResult />
            <button
                className={cn(
                    "active:scale-95",
                    "border-2 border-secondary bg-white",
                    "flex",
                    "gap-2",
                    "h-[60px] hover:shadow-neobrut2",
                    "items-center",
                    "p-4",
                    "rounded-lg",
                    "shadow-neobrut1",
                    "transition-all",
                )}
                type="button"
                onClick={() => openSortAndFilter()}
            >
                <MdOutlineSort size={24} />
                <p className={cn("font-semibold", "hidden", "sm:block")}>
                    Sort & Filter
                </p>
            </button>
        </Wrapper>
    );
};

export default SortHandler;
