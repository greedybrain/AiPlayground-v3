import type { AddFavoriteProps } from "@/types";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import React from "react";
import { addFavorite } from "@/server/actions/favorites";
import cn from "@/utils/twMerge";
import { darkModeStyle } from "@/utils/darkModeToast";
import toast from "react-hot-toast";
import useAiToolStore from "@/store/slices/aitool";
import useFavoritesStore from "@/store/slices/favorite";

const AddFavorite = ({
    tool,
    setFavCount,
    setIsFavorited,
}: AddFavoriteProps) => {
    const { addToolToFavorites, setFavoritesTotalCount, favoritesTotalCount } =
        useFavoritesStore((state) => state);

    const { aiToolsDictionary, setAiToolsDictionary } = useAiToolStore(
        (state) => state,
    );

    const handleOptimisticAddFav = async () => {
        setFavCount(tool.FavoritedBy.length + 1);
        setIsFavorited(true);

        const res = await addFavorite(tool.id);

        if (!res.success) {
            setFavCount(tool.FavoritedBy.length - 1);
            setIsFavorited(false);

            return toast.error(res.message, { style: darkModeStyle });
        }

        const newlyAddedTool = res.aiTool!;

        const copyAiToolsDictionary = { ...aiToolsDictionary };
        copyAiToolsDictionary[newlyAddedTool.nameLowercase] = newlyAddedTool;

        setIsFavorited(res.success);
        setFavCount(newlyAddedTool.FavoritedBy.length);
        addToolToFavorites(newlyAddedTool);

        setAiToolsDictionary(copyAiToolsDictionary);

        setFavoritesTotalCount(favoritesTotalCount + 1);

        return toast.success(res.message, { style: darkModeStyle });
    };

    return (
        <MdOutlineBookmarkAdd
            onClick={handleOptimisticAddFav}
            className={cn("cursor-pointer")}
            size={30}
        />
    );
};

export default AddFavorite;
