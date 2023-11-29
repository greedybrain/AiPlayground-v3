import type { BookmarkHandlerProps, FavCountProps } from "@/types";
import React, { useEffect, useState } from "react";

import BookmarkHandler from "./BookmarkHandler";
import FavCount from "./FavCount";
import Wrapper from "../../ui/Wrapper";
import { checkIfFavorited } from "@/server/actions/favorites";
import cn from "@/utils/twMerge";
import { useSession } from "next-auth/react";

const FavCountAndBookmarkData = ({
    count,
    tool,
}: FavCountProps &
    Omit<
        BookmarkHandlerProps,
        | "setFavCount"
        | "isFavorited"
        | "setIsFavorited"
        | "setCheckingIfFavorited"
    >) => {
    const session = useSession();
    const [favCount, setFavCount] = useState(count);
    const [isFavorited, setIsFavorited] = useState<boolean>(false);

    useEffect(() => {
        if (session) {
            checkIfFavorited(tool.id).then((favorited) => {
                if (favorited) {
                    setIsFavorited(true);
                } else {
                    setIsFavorited(false);
                }
            });
        }
    }, [session, setIsFavorited, tool.id]);

    return (
        <Wrapper
            id="BookmarkData"
            className={cn("flex", "gap-2", "items-center")}
        >
            <FavCount count={favCount} />
            <BookmarkHandler
                tool={tool}
                setFavCount={setFavCount}
                isFavorited={isFavorited}
                setIsFavorited={setIsFavorited}
            />
        </Wrapper>
    );
};

export default FavCountAndBookmarkData;
