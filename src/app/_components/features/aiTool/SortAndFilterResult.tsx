import { useParams, usePathname } from "next/navigation";

import React from "react";
import cn from "@/utils/twMerge";
import useAiToolStore from "@/store/slices/aitool";
import useFavoritesStore from "@/store/slices/favorite";

const SortAndFilterResult = () => {
    const pathname = usePathname();
    const { tag } = useParams();

    const { totalSortAndFilterCount, totalToolsByTagCount } = useAiToolStore(
        (state) => state,
    );

    const { favoritesTotalCount } = useFavoritesStore((state) => state);

    let finalCount = 0;

    const isAiToolsPath = pathname.startsWith("/ai_tools");
    const isAiToolsTagsPath = pathname.startsWith("/ai_tools/tags");
    const isFavoritesPath = pathname.startsWith("/user/favorites");

    if (totalSortAndFilterCount > 0 && isAiToolsPath) {
        finalCount = totalSortAndFilterCount;
    } else if (totalToolsByTagCount > 0 && isAiToolsTagsPath && tag) {
        finalCount = totalToolsByTagCount;
    } else if (favoritesTotalCount > 0 && isFavoritesPath) {
        finalCount = favoritesTotalCount;
    }

    const renderCount = () => {
        if (finalCount === 0) {
            return null;
        } else {
            return (
                <p
                    className={cn(
                        "font-semibold",
                        "self-end",
                        "text-center text-secondary/75 text-sm",
                    )}
                >
                    {finalCount === 1
                        ? `(${finalCount} result)`
                        : `(${finalCount} results)`}
                </p>
            );
        }
    };

    return renderCount();
};

export default SortAndFilterResult;
