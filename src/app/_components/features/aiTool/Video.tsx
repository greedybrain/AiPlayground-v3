"use client";

import Wrapper from "../../ui/Wrapper";
import useAiToolStore from "@/store/slices/aitool";

const Video = () => {
    const { currentVideoSource, setVideoSource } = useAiToolStore();

    if (!currentVideoSource) return null;

    return (
        <Wrapper
            className={`fixed z-40 flex h-screen w-full min-w-[360px] flex-col`}
        >
            <div className={`h-full bg-black/75`} />
            <Wrapper
                className={`fixed flex h-full w-full flex-col items-center justify-center`}
                onClick={() => {
                    setVideoSource("");
                    document.body.style.overflow = "scroll";
                }}
            >
                <iframe
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className={`h-[250px] w-11/12 min-w-[340px] max-w-[950px] rounded-lg semi-sm:h-[325px] sm:h-[325px] md:h-[350px] semi-lg:h-[375px] lg:h-[525px]`}
                    src={`https://www.youtube-nocookie.com/embed/${currentVideoSource}`}
                    title="YouTube video player"
                />
            </Wrapper>
        </Wrapper>
    );
};

export default Video;
