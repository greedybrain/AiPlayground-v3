import { useCallback, useEffect } from "react";
import { useParams, usePathname } from "next/navigation";

import { darkModeStyle } from "@/utils/darkModeToast";
import { getToolsByTag } from "@/server/actions/aitools";
import toast from "react-hot-toast";
import useAiToolStore from "@/store/slices/aitool";

const useToolsByTagFetcher = () => {
    const pathname = usePathname();
    const { tag } = useParams();

    const {
        setLoadingToolsByTag,
        setAiToolsByTagDictionary,
        setToolsByTagCursor,
        setTotalToolsByTagCount,
        setToolsByTagInitiallyLoaded,
    } = useAiToolStore((state) => state);

    const handleGetToolsByTag = useCallback(() => {
        const tagAsString = tag as string;
        if (!pathname.startsWith("/ai_tools/tags") && !tagAsString) return;

        setLoadingToolsByTag(true);

        console.log("LOADING TOOLS BY TAG");

        const sanitizedTag = tagAsString?.replaceAll("%20", " ");

        getToolsByTag(sanitizedTag)
            .then((res) => {
                if (res.success) {
                    res.aiTools && setAiToolsByTagDictionary(res.aiTools);
                    res.nextCursor && setToolsByTagCursor(res.nextCursor);
                    res.totalCount && setTotalToolsByTagCount(res.totalCount);

                    setToolsByTagInitiallyLoaded(true);
                }
            })
            .catch((error) => {
                toast.error(error?.message, { style: darkModeStyle });
            })
            .finally(() => {
                setLoadingToolsByTag(false);
            });
    }, [
        tag,
        pathname,
        setAiToolsByTagDictionary,
        setLoadingToolsByTag,
        setToolsByTagCursor,
        setToolsByTagInitiallyLoaded,
        setTotalToolsByTagCount,
    ]);

    useEffect(() => {
        handleGetToolsByTag();
    }, [handleGetToolsByTag]);
};

export default useToolsByTagFetcher;
