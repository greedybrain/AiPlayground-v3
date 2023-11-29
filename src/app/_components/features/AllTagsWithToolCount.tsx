"use client";

import LoadingAnimation from "./LoadingAnimation";
import React from "react";
import TagWithToolCount from "./TagWithToolCount";
import cn from "@/utils/twMerge";
import useTagsStore from "@/store/slices/tags";

const AllTagsWithToolCount = () => {
    const { tagsDictionary, loadingTags } = useTagsStore((state) => state);

    const tagsArray = Object.values(tagsDictionary);

    if (loadingTags)
        return (
            <LoadingAnimation
                style={{
                    width: 100,
                    marginTop: 50,
                }}
            />
        );

    return (
        <ul
            className={cn(
                "550>:grid-cols-2",
                "grid gap-5",
                "justify-items-center",
                "mt-10 md:grid-cols-3",
            )}
        >
            {tagsArray.map((tag) => {
                return <TagWithToolCount key={tag.id} {...tag} />;
            })}
        </ul>
    );
};

export default AllTagsWithToolCount;
