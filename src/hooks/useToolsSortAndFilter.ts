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
        setLoadingSortAndFilteredTools(true);

        console.log("LOADING TOOLS BY SORT AND FILTER");

        getToolsBySortAndFilter(paramsRecord)
            .then((res) => {
                if (res.success) {
                    res.aiTools &&
                        setAiToolsSortedAndFilteredDictionary(res.aiTools);
                    res.nextCursor && setSortAndFitlerCursor(res.nextCursor);
                    res.totalCount &&
                        setTotalSortAndFilterCount(res.totalCount);

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
        setAiToolsSortedAndFilteredDictionary,
        setSortAndFitlerCursor,
        setLoadingSortAndFilteredTools,
        setTotalSortAndFilterCount,
        setSortAndFilterInitiallyLoaded,
    ]);

    useEffect(() => {
        if (pathname.startsWith("/ai_tools")) {
            handleGetToolsBySortAndFilter();
        }
    }, [handleGetToolsBySortAndFilter, pathname]);
};

export default useToolsSortAndFilter;
