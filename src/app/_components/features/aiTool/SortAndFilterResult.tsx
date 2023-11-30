import React, { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";

import cn from "@/utils/twMerge";
import useAiToolStore from "@/store/slices/aitool";
import useFavoritesStore from "@/store/slices/favorite";

const SortAndFilterResult = () => {
    const pathname = usePathname();
    const { tag } = useParams();
    const [resultCount, setResultCount] = useState<number>(0);

    const { totalSortAndFilterCount, totalToolsByTagCount } = useAiToolStore(
        (state) => state,
    );

    const { favoritesTotalCount } = useFavoritesStore((state) => state);

    useEffect(() => {
        const isAiToolsSortAndFilterPath =
            pathname.startsWith("/ai_tools") && !tag;
        const isAiToolsTagsPath = pathname.startsWith("/ai_tools/tags") && tag;
        const isFavoritesPath = pathname.startsWith("/user/favorites");

        if (totalSortAndFilterCount > 0 && isAiToolsSortAndFilterPath) {
            setResultCount(totalSortAndFilterCount);
        } else if (totalToolsByTagCount > 0 && isAiToolsTagsPath) {
            setResultCount(totalToolsByTagCount);
        } else if (favoritesTotalCount > 0 && isFavoritesPath) {
            setResultCount(favoritesTotalCount);
        }
    }, [
        favoritesTotalCount,
        pathname,
        tag,
        totalSortAndFilterCount,
        totalToolsByTagCount,
    ]);

    const renderCount = () => {
        if (resultCount === 0) {
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
                    {resultCount === 1
                        ? `(${resultCount} result)`
                        : `(${resultCount} results)`}
                </p>
            );
        }
    };

    return renderCount();
};

export default SortAndFilterResult;
