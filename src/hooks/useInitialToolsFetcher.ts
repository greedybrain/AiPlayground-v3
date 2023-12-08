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
        if (initiallyLoaded) return;

        setLoadingTools(true);

        getInitialTools()
            .then((res) => {
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
        initiallyLoaded,
        setAiToolsDictionary,
        setCursor,
        setDefaultTotalToolsCount,
        setInitiallyLoaded,
        setLoadingTools,
    ]);

    useEffect(() => {
        handleGetInitialTools();
    }, [handleGetInitialTools]);
};

export default useInitialToolsFetcher;
