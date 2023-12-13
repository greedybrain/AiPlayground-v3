import { useCallback, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { darkModeStyle } from "@/utils/darkModeToast";
import { getToolsByQuery } from "@/server/actions/aitools";
import toast from "react-hot-toast";
import useAiToolStore from "@/store/slices/aitool";

const useToolsByQueryFetcher = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const {
        setLoadingToolsByQuery,
        setAiToolsByQueryDictionary,
        setToolsByQueryCursor,
        setTotalToolsByQueryCount,
        setToolsByQueryInitiallyLoaded,
        setTagsGeneratedByQuery,
    } = useAiToolStore((state) => state);

    const isAiToolsQueryPath =
        pathname.startsWith("/ai_tools/search") &&
        searchParams.toString().includes("query");

    const handleGetToolsByQuery = useCallback(() => {
        const { query } = Object.fromEntries(searchParams.entries());

        setLoadingToolsByQuery(true);

        query &&
            getToolsByQuery(query)
                .then((res) => {
                    if (res.success) {
                        setAiToolsByQueryDictionary(res.aiTools!);
                        setToolsByQueryCursor(res.nextCursor!);
                        setTotalToolsByQueryCount(res.totalCount!);
                        setTagsGeneratedByQuery(res.tags!);

                        setToolsByQueryInitiallyLoaded(true);
                    }
                })
                .catch((error) => {
                    toast.error(error?.message, { style: darkModeStyle });
                })
                .finally(() => {
                    setLoadingToolsByQuery(false);
                });
    }, [
        searchParams,
        setAiToolsByQueryDictionary,
        setLoadingToolsByQuery,
        setTagsGeneratedByQuery,
        setToolsByQueryCursor,
        setToolsByQueryInitiallyLoaded,
        setTotalToolsByQueryCount,
    ]);

    useEffect(() => {
        if (isAiToolsQueryPath) handleGetToolsByQuery();
    }, [handleGetToolsByQuery, isAiToolsQueryPath]);
};

export default useToolsByQueryFetcher;
