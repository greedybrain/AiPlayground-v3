import type { PlayButtonProps, TagsProps } from "@/types";

import PlayButton from "../features/aiTool/PlayButton";
import React from "react";
import TagsForTool from "../features/aiTool/TagsForTool";
import Wrapper from "./Wrapper";
import cn from "@/utils/twMerge";

const PlayButtonAndTags = ({ src, tags }: PlayButtonProps & TagsProps) => {
    return (
        <Wrapper
            className={cn(
                "absolute",
                "flex flex-col",
                "h-full",
                "items-center",
                "justify-evenly",
                "w-full",
                "z-10",
            )}
        >
            {src && <PlayButton src={src} />}
            <TagsForTool tags={tags} />
        </Wrapper>
    );
};

export default PlayButtonAndTags;
