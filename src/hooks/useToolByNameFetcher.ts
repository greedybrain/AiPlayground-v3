import { useCallback, useEffect } from "react";
import { useParams, usePathname } from "next/navigation";

import { capitalizeWordsWithSeparators } from "@/lib/helpers";
import { darkModeStyle } from "@/utils/darkModeToast";
import { getToolByName } from "@/server/actions/aitools";
import toast from "react-hot-toast";
import useAiToolStore from "@/store/slices/aitool";

const useToolByNameFetcher = () => {
    const pathname = usePathname();
    const { name } = useParams();

    const { setToolAtGlance } = useAiToolStore((state) => state);

    const isToolPath = pathname.startsWith("/tool");

    const handleGetToolByName = useCallback(() => {
        if (!isToolPath) return;

        const nameAsString = name as string;

        const nameSanitized = capitalizeWordsWithSeparators(nameAsString);

        getToolByName(nameSanitized)
            .then((res) => {
                if (res.success) {
                    res.aiTool && setToolAtGlance(res.aiTool);

                    // setToolsByTagInitiallyLoaded(true);
                }
            })
            .catch((error) => {
                toast.error(error?.message, { style: darkModeStyle });
            })
            .finally(() => {
                // setLoadingToolsByTag(false);
            });
    }, [isToolPath, name, setToolAtGlance]);

    useEffect(() => {
        handleGetToolByName();
    }, [handleGetToolByName]);
};

export default useToolByNameFetcher;
