import React, { useEffect, useState } from "react";
import { useParams, usePathname, useSearchParams } from "next/navigation";

import cn from "@/utils/twMerge";
import { initPathCheckForCorrectToolsRender } from "@/lib/helpers";
import useAiToolStore from "@/store/slices/aitool";
import useFavoritesStore from "@/store/slices/favorite";

const SortAndFilterResult = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { tag, name } = useParams();
    const [resultCount, setResultCount] = useState<number>(0);

    const {
        totalSortAndFilterCount,
        totalToolsByTagCount,
        totalToolsByQueryCount,
    } = useAiToolStore((state) => state);

    const { favoritesTotalCount } = useFavoritesStore((state) => state);

    useEffect(() => {
        const {
            isAiToolsForTagPath,
            isAiToolsQueryPath,
            isAiToolsSortAndFilterPath,
            isFavoritesPath,
        } = initPathCheckForCorrectToolsRender(
            pathname,
            tag as string,
            name as string,
            searchParams,
        );

        if (totalSortAndFilterCount > 0 && isAiToolsSortAndFilterPath) {
            setResultCount(totalSortAndFilterCount);
        } else if (totalToolsByTagCount > 0 && isAiToolsForTagPath) {
            setResultCount(totalToolsByTagCount);
        } else if (favoritesTotalCount > 0 && isFavoritesPath) {
            setResultCount(favoritesTotalCount);
        } else if (totalToolsByQueryCount > 0 && isAiToolsQueryPath) {
            setResultCount(totalToolsByQueryCount);
        }
    }, [
        favoritesTotalCount,
        name,
        pathname,
        searchParams,
        tag,
        totalSortAndFilterCount,
        totalToolsByQueryCount,
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
