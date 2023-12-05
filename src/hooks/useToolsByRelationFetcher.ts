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
        toolAtGlance,
        setLoadingToolsByRelation,
        setAiToolsByRelationDictionary,
        setToolsByRelationCursor,
        setToolsByRelationInitiallyLoaded,
    } = useAiToolStore((state) => state);

    const isAiToolAtGlancePath = pathname.startsWith("/tool") && name;

    const handleGetToolsByTag = useCallback(() => {
        if (!isAiToolAtGlancePath || !toolAtGlance.id) return;

        setLoadingToolsByRelation(true);

        const tags = toolAtGlance.Tags.map((tag) => tag.tagName);

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
        isAiToolAtGlancePath,
        setAiToolsByRelationDictionary,
        setLoadingToolsByRelation,
        setToolsByRelationCursor,
        setToolsByRelationInitiallyLoaded,
        toolAtGlance.id,
        toolAtGlance.Tags,
    ]);

    useEffect(() => {
        handleGetToolsByTag();
    }, [handleGetToolsByTag]);
};

export default useToolsByRelationFetcher;
