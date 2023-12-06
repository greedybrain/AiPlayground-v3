import { useCallback, useEffect, useMemo } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { darkModeStyle } from "@/utils/darkModeToast";
import { getToolsBySortAndFilter } from "@/server/actions/aitools";
import toast from "react-hot-toast";
import useAiToolStore from "@/store/slices/aitool";

const useToolsSortAndFilter = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const {
        sortAndFilterInitiallyLoaded,
        setSortAndFilterInitiallyLoaded,
        setSortAndFitlerCursor,
        setAiToolsSortedAndFilteredDictionary,
        setLoadingSortAndFilteredTools,
        setTotalSortAndFilterCount,
    } = useAiToolStore((state) => state);

    const paramsRecord = useMemo(() => {
        let record: Record<string, string> = {};
        searchParams.forEach((value, key) => {
            record[key] = value;
        });

        return record;
    }, [searchParams]);

    const handleGetToolsBySortAndFilter = useCallback(() => {
        if (
            !(
                pathname.startsWith("/ai_tools") && paramsRecord["price_range"]
            ) ||
            sortAndFilterInitiallyLoaded
        )
            return;

        setLoadingSortAndFilteredTools(true);

        getToolsBySortAndFilter(paramsRecord)
            .then((res) => {
                if (res.success) {
                    res.aiTools &&
                        setAiToolsSortedAndFilteredDictionary(res.aiTools);
                    res.nextCursor && setSortAndFitlerCursor(res.nextCursor);

                    if (res.totalCount)
                        setTotalSortAndFilterCount(res.totalCount);
                    else setTotalSortAndFilterCount(0);

                    setSortAndFilterInitiallyLoaded(true);
                }
            })
            .catch((error) => {
                toast.error(error?.message, { style: darkModeStyle });
            })
            .finally(() => {
                setLoadingSortAndFilteredTools(false);
            });
    }, [
        paramsRecord,
        pathname,
        setAiToolsSortedAndFilteredDictionary,
        setSortAndFitlerCursor,
        setLoadingSortAndFilteredTools,
        setTotalSortAndFilterCount,
        setSortAndFilterInitiallyLoaded,
        sortAndFilterInitiallyLoaded,
    ]);

    useEffect(() => {
        handleGetToolsBySortAndFilter();
    }, [handleGetToolsBySortAndFilter]);
};

export default useToolsSortAndFilter;
