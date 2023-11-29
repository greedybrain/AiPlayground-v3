import LoadingAnimation from "./LoadingAnimation";
import Option from "./TagOption";
import React from "react";
import Wrapper from "../ui/Wrapper";
import cn from "@/utils/twMerge";
import useTagsStore from "@/store/slices/tags";
import useToolSortStore from "@/store/slices/tool_sort";

const Options = () => {
    const { tagsDictionary: tagsDictionary, loadingTags } = useTagsStore(
        (state) => state,
    );
    const { tagsSelected } = useToolSortStore((state) => state);

    const tagsAsArray = Object.values(tagsDictionary);
    const selectionCount = Object.keys(tagsSelected).length;

    return (
        <Wrapper className={cn("mt-10", "px-6")}>
            <h2 className={cn("font-medium", "mb-4")}>
                Tags{" "}
                <span className={cn("font-medium", "ml-1", "text-sm")}>
                    {selectionCount > 0
                        ? `(${selectionCount} selected)`
                        : "(Select up to 5)"}
                </span>
            </h2>
            {loadingTags && (
                <LoadingAnimation
                    style={{
                        width: 50,
                    }}
                />
            )}
            <ul className={cn("flex flex-wrap", "gap-3")}>
                {tagsAsArray.map((tag) => (
                    <Option key={tag.id} {...tag} />
                ))}
            </ul>
        </Wrapper>
    );
};

export default Options;
