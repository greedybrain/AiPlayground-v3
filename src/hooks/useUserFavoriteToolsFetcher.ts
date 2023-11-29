import { useCallback, useEffect } from "react";

import { darkModeStyle } from "@/utils/darkModeToast";
import { getUserFavoriteTools } from "@/server/actions/favorites";
import toast from "react-hot-toast";
import useFavoritesStore from "@/store/slices/favorite";
import { usePathname } from "next/navigation";

const useUserFavoriteToolsFetcher = () => {
    const pathname = usePathname();

    const {
        favoritesInitiallyLoaded,
        setLoadingFavorites,
        setFavoritesCursor,
        setFavoritesDictionary,
        setFavoritesTotalCount,
        setFavoritesInitiallyLoaded,
    } = useFavoritesStore((state) => state);

    const handleGetUserFavoriteTools = useCallback(() => {
        if (!favoritesInitiallyLoaded && pathname.startsWith("/user/favorites"))
            setLoadingFavorites(true);

        getUserFavoriteTools()
            .then((res) => {
                if (res.success) {
                    res.aiTools && setFavoritesDictionary(res.aiTools);
                    res.nextCursor && setFavoritesCursor(res.nextCursor);
                    res.totalCount && setFavoritesTotalCount(res.totalCount);

                    setFavoritesInitiallyLoaded(true);
                }
            })
            .catch((error) => {
                toast.error(error?.message, { style: darkModeStyle });
            })
            .finally(() => {
                if (!favoritesInitiallyLoaded) setLoadingFavorites(false);
            });
    }, [
        favoritesInitiallyLoaded,
        pathname,
        setFavoritesCursor,
        setFavoritesDictionary,
        setFavoritesInitiallyLoaded,
        setLoadingFavorites,
        setFavoritesTotalCount,
    ]);

    useEffect(() => {
        if (pathname.startsWith("/user/favorites")) {
            handleGetUserFavoriteTools();
        }
    }, [handleGetUserFavoriteTools, pathname]);
};

export default useUserFavoriteToolsFetcher;
