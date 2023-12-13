import { useCallback, useEffect } from "react";
import { useParams, usePathname } from "next/navigation";

import { capitalizeWordsWithSeparators } from "@/lib/helpers";
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

    const isAiToolsTagsPath = pathname.startsWith("/ai_tools/tags") && tag;

    const handleGetToolsByTag = useCallback(() => {
        const tagAsString = tag as string;

        setLoadingToolsByTag(true);

        const sanitizedTag = capitalizeWordsWithSeparators(tagAsString);

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
        setAiToolsByTagDictionary,
        setLoadingToolsByTag,
        setToolsByTagCursor,
        setToolsByTagInitiallyLoaded,
        setTotalToolsByTagCount,
        tag,
    ]);

    useEffect(() => {
        if (isAiToolsTagsPath) handleGetToolsByTag();
    }, [handleGetToolsByTag, isAiToolsTagsPath]);
};

export default useToolsByTagFetcher;
