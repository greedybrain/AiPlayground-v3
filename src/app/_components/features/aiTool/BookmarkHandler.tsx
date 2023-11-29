import AddFavorite from "./AddFavorite";
import type { BookmarkHandlerProps } from "@/types";
import React from "react";
import RemoveFavorite from "./RemoveFavorite";

const BookmarkHandler = ({
    tool,
    isFavorited,
    setFavCount,
    setIsFavorited,
}: BookmarkHandlerProps) => {
    if (isFavorited)
        return (
            <RemoveFavorite
                tool={tool}
                setFavCount={setFavCount}
                setIsFavorited={setIsFavorited}
            />
        );

    return (
        <AddFavorite
            tool={tool}
            setFavCount={setFavCount}
            setIsFavorited={setIsFavorited}
        />
    );
};

export default BookmarkHandler;
