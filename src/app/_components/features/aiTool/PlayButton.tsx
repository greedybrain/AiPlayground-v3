import { FaPlay } from "react-icons/fa";
import type { PlayButtonProps } from "@/types";
import React from "react";
import Wrapper from "../../ui/Wrapper";
import cn from "@/utils/twMerge";
import useAiToolStore from "@/store/slices/aitool";

const PlayButton = ({ src }: PlayButtonProps) => {
    const { setVideoSource } = useAiToolStore((state) => state);

    return (
        <Wrapper
            className={cn(
                "border-2 border-secondary bg-tertiary",
                "cursor-pointer",
                "flex",
                "h-[45px]",
                "items-center",
                "justify-center",
                "rounded-lg",
                "shadow-neobrut1",
                "w-[45px]",
            )}
            onClick={() => {
                setVideoSource(src);
                document.body.style.overflow = "hidden";
            }}
        >
            <FaPlay size={18} />
        </Wrapper>
    );
};

export default PlayButton;
