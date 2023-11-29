import { MdOutlineBookmarkAdded } from "react-icons/md";
import React from "react";
import type { RemoveFavoriteProps } from "@/types";
import cn from "@/utils/twMerge";
import { darkModeStyle } from "@/utils/darkModeToast";
import { removeFavorite } from "@/server/actions/favorites";
import toast from "react-hot-toast";
import useAiToolStore from "@/store/slices/aitool";
import useFavoritesStore from "@/store/slices/favorite";

const RemoveFavorite = ({
    tool,
    setFavCount,
    setIsFavorited,
}: RemoveFavoriteProps) => {
    const { aiToolsDictionary, setAiToolsDictionary } = useAiToolStore(
        (state) => state,
    );

    const {
        addToolToFavorites,
        removeToolFromFavorites,
        favoritesTotalCount,
        setFavoritesTotalCount,
    } = useFavoritesStore((state) => state);

    const handleOptimisticRemoveFav = async () => {
        setFavCount(tool.FavoritedBy.length - 1);
        setIsFavorited(false);
        removeToolFromFavorites(tool)

        const res = await removeFavorite(tool.id);

        if (!res.success) {
            setFavCount(tool.FavoritedBy.length + 1);
            setIsFavorited(true);
            addToolToFavorites(tool)

            return toast.error(res.message, { style: darkModeStyle });
        }

        const removedFavorite = res.aiTool!;

        const copyAiToolsDictionary = { ...aiToolsDictionary };
        copyAiToolsDictionary[removedFavorite.nameLowercase] = {
            ...removedFavorite,
        };

        setIsFavorited(false);
        setFavCount(removedFavorite.FavoritedBy.length);
        removeToolFromFavorites(removedFavorite);

        setAiToolsDictionary(copyAiToolsDictionary);

        setFavoritesTotalCount(favoritesTotalCount - 1);

        return toast.success(res.message, { style: darkModeStyle });
    };

    return (
        <MdOutlineBookmarkAdded
            onClick={handleOptimisticRemoveFav}
            className={cn("cursor-pointer", "fill-green-600")}
            size={30}
        />
    );
};

export default RemoveFavorite;
