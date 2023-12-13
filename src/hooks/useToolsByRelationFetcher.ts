import { useCallback, useEffect } from "react";
import { useParams, usePathname } from "next/navigation";

import { darkModeStyle } from "@/utils/darkModeToast";
import { getToolsByRelation } from "@/server/actions/aitools";
import toast from "react-hot-toast";
import useAiToolStore from "@/store/slices/aitool";

const useToolsByRelationFetcher = () => {
    const pathname = usePathname();
    const { name } = useParams();

    const {
        toolInDetail,
        setLoadingToolsByRelation,
        setAiToolsByRelationDictionary,
        setToolsByRelationCursor,
        setToolsByRelationInitiallyLoaded,
    } = useAiToolStore((state) => state);

    const isAiToolInDetailPath = pathname.startsWith("/tool") && name;

    const handleGetToolsByTag = useCallback(() => {
        setLoadingToolsByRelation(true);

        const tags = toolInDetail.Tags.map((tag) => tag.tagName);

        getToolsByRelation(tags)
            .then((res) => {
                if (res.success) {
                    res.aiTools && setAiToolsByRelationDictionary(res.aiTools);
                    res.nextCursor && setToolsByRelationCursor(res.nextCursor);

                    setToolsByRelationInitiallyLoaded(true);
                }
            })
            .catch((error) => {
                toast.error(error?.message, { style: darkModeStyle });
            })
            .finally(() => {
                setLoadingToolsByRelation(false);
            });
    }, [
        setAiToolsByRelationDictionary,
        setLoadingToolsByRelation,
        setToolsByRelationCursor,
        setToolsByRelationInitiallyLoaded,
        toolInDetail.Tags,
    ]);

    useEffect(() => {
        if (isAiToolInDetailPath && toolInDetail.id)
            return handleGetToolsByTag();
    }, [handleGetToolsByTag, isAiToolInDetailPath, toolInDetail.id]);
};

export default useToolsByRelationFetcher;
