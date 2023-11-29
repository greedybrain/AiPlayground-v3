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
    } = useAiToolStore((state) => state);

    const handleGetInitialTools = useCallback(() => {
        if (!initiallyLoaded) setLoadingTools(true);

        console.log("LOADING INITIAL TOOLS");

        getInitialTools()
            .then((res) => {
                if (res.success) {
                    res.aiTools && setAiToolsDictionary(res.aiTools);
                    res.nextCursor && setCursor(res.nextCursor);

                    setInitiallyLoaded(true);
                }
            })
            .catch((error) => {
                toast.error(error?.message, { style: darkModeStyle });
            })
            .finally(() => {
                if (!initiallyLoaded) setLoadingTools(false);
            });
    }, [
        initiallyLoaded,
        setAiToolsDictionary,
        setCursor,
        setInitiallyLoaded,
        setLoadingTools,
    ]);

    useEffect(() => {
        handleGetInitialTools();
    }, [handleGetInitialTools]);
};

export default useInitialToolsFetcher;
