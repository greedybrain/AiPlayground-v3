import { useCallback, useEffect, useMemo } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { darkModeStyle } from "@/utils/darkModeToast";
import { getToolsBySortAndFilter } from "@/server/actions/aitools";
import toast from "react-hot-toast";
import useAiToolStore from "@/store/slices/aitool";

const useToolsSortAndFilter = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const {
        setSortAndFilterInitiallyLoaded,
        setSortAndFitlerCursor,
        setAiToolsSortedAndFilteredDictionary,
        setLoadingSortAndFilteredTools,
        setTotalSortAndFilterCount,
    } = useAiToolStore((state) => state);

    const searchParamRecords = useMemo(() => {
        let record: Record<string, string> = {};
        searchParams.forEach((value, key) => {
            record[key] = value;
        });

        return record;
    }, [searchParams]);

    const handleGetToolsBySortAndFilter = useCallback(() => {
        setLoadingSortAndFilteredTools(true);

        getToolsBySortAndFilter(searchParamRecords)
            .then((res) => {
                if (res.errored) {
                    toast.error(res.message, { style: darkModeStyle });
                    return;
                }

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
        searchParamRecords,
        setAiToolsSortedAndFilteredDictionary,
        setSortAndFitlerCursor,
        setLoadingSortAndFilteredTools,
        setTotalSortAndFilterCount,
        setSortAndFilterInitiallyLoaded,
    ]);

    useEffect(() => {
        if (
            !(
                pathname.startsWith("/ai_tools") &&
                searchParamRecords["price_range"]
            )
        ) {
            return;
        }
        console.log("useToolsSortAndFilter called");
        handleGetToolsBySortAndFilter();
    }, [handleGetToolsBySortAndFilter, pathname, searchParamRecords]);
};

export default useToolsSortAndFilter;
