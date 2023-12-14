import { useCallback, useEffect } from "react";

import { darkModeStyle } from "@/utils/darkModeToast";
import { getInitialTools } from "@/server/actions/aitools";
import toast from "react-hot-toast";
import useAiToolStore from "@/store/slices/aitool";

const useInitialToolsFetcher = () => {
    const {
        initiallyLoaded,
        setLoadingTools,
        setAiToolsDictionary,
        setCursor,
        setInitiallyLoaded,
        setDefaultTotalToolsCount,
    } = useAiToolStore((state) => state);

    const handleGetInitialTools = useCallback(() => {
        getInitialTools()
            .then((res) => {
                if (res.errored) {
                    toast.error(res.message, { style: darkModeStyle });
                    return;
                }

                if (res.success) {
                    res.aiTools && setAiToolsDictionary(res.aiTools);
                    res.nextCursor && setCursor(res.nextCursor);
                    res.totalCount && setDefaultTotalToolsCount(res.totalCount);

                    setInitiallyLoaded(true);
                }
            })
            .catch((error) => {
                toast.error(error?.message, { style: darkModeStyle });
            })
            .finally(() => {
                setLoadingTools(false);
            });
    }, [
        setAiToolsDictionary,
        setCursor,
        setDefaultTotalToolsCount,
        setInitiallyLoaded,
        setLoadingTools,
    ]);

    useEffect(() => {
        if (!initiallyLoaded) handleGetInitialTools();
    }, [handleGetInitialTools, initiallyLoaded]);
};

export default useInitialToolsFetcher;
