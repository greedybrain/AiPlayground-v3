"use client";

import React, { useEffect } from "react";

import { AiToolWithRelations } from "@/types";
import { BsCheck } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import FavCountBookmarkDataGroup from "./FavCountBookmarkDataGroup";
import Identity from "../../ui/Identity";
import { MdOutlineArrowOutward } from "react-icons/md";
import PriceInfo from "./PriceInfo";
import Tag from "./Tag";
import WebsiteScreenshot from "./WebsiteScreenshot";
import Wrapper from "../../ui/Wrapper";
import cn from "@/utils/twMerge";
import useAiToolStore from "@/store/slices/aitool";
import useToolByNameFetcher from "@/hooks/useToolByNameFetcher";

const ToolAtGlance = () => {
    useToolByNameFetcher();
    const { toolAtGlance, setVideoSource, setToolAtGlance } = useAiToolStore(
        (state) => state,
    );

    useEffect(() => {
        return () => {
            setToolAtGlance({} as AiToolWithRelations);
        };
    }, [setToolAtGlance]);

    if (!toolAtGlance.id) return null;

    const {
        affLink,
        companyName,
        description,
        FavoritedBy,
        KeyTakeaways,
        logoUrl,
        name: toolName,
        screenshotUrl,
        Tags,
        videoSource,
        websiteLink,
    } = toolAtGlance;

    const link = affLink ? affLink : websiteLink;

    return (
        <Wrapper className={cn("lg:flex lg:justify-between lg:gap-10")}>
            <Wrapper className={cn("lg:w-full", "mt-8")}>
                <Wrapper
                    className={cn(
                        "550>:h-[300px]",
                        "h-[250px]",
                        "lg:h-[400px]",
                        "max-w-[600px]",
                        "relative",
                        "sm:h-[350px]",
                    )}
                >
                    <a href={link} target="_blank" rel="noreferrer noopener">
                        <WebsiteScreenshot
                            name={toolName}
                            screenshotUrl={screenshotUrl}
                            otherClassnames="rounded-lg"
                        />
                    </a>
                </Wrapper>
                {videoSource && (
                    <button
                        type="button"
                        className={cn(
                            "border-2 border-secondary bg-tertiary",
                            "flex",
                            "gap-3",
                            "items-center",
                            "mt-5",
                            "py-2 px-3",
                            "rounded-md",
                            "shadow-neobrut1",
                        )}
                        onClick={() => {
                            setVideoSource(videoSource);
                            document.body.style.overflow = "hidden";
                        }}
                    >
                        <FaPlay size={20} />
                        <span className={cn("font-medium", "text-lg")}>
                            Play video
                        </span>
                    </button>
                )}
            </Wrapper>
            <Wrapper className={cn("lg:w-full", "mt-8")}>
                <Wrapper
                    className={cn("flex", "items-center", "justify-between")}
                >
                    <Identity
                        name={toolName}
                        companyName={companyName}
                        logoUrl={logoUrl}
                    />
                    <FavCountBookmarkDataGroup
                        count={FavoritedBy?.length}
                        tool={toolAtGlance}
                    />
                </Wrapper>
                <p className={cn("leading-relaxed", "mt-8", "text-secondary")}>
                    {description}
                </p>
                <ul className={cn("flex flex-wrap", "gap-3", "mt-8")}>
                    {Tags.map((tag) => (
                        <Tag key={tag.id} tag={tag} />
                    ))}
                </ul>
                <Wrapper className={cn("mt-8")}>
                    <PriceInfo tool={toolAtGlance} />
                </Wrapper>
                <a
                    href={link}
                    type="button"
                    className={cn(
                        "border-2 border-secondary bg-primary",
                        "flex",
                        "gap-2",
                        "h-[60px]",
                        "items-center",
                        "justify-between",
                        "mt-8 max-w-[550px]",
                        "py-2 px-4",
                        "rounded-md",
                        "shadow-neobrut2",
                        "text-lg",
                    )}
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    <span className={cn("font-semibold")}>Check it out</span>
                    <MdOutlineArrowOutward size={24} />
                </a>
                {KeyTakeaways.length > 0 && (
                    <h2 className={cn("font-semibold", "mt-20", "text-xl")}>
                        Highlights
                    </h2>
                )}
                <ul className={cn("flex flex-col", "gap-4", "mt-5")}>
                    {KeyTakeaways.map((kt) => {
                        return (
                            <li
                                key={kt.id}
                                className={cn("flex", "gap-2", "items-center")}
                            >
                                <div>
                                    <BsCheck size={24} />
                                </div>
                                <p>{kt.takeaway}</p>
                            </li>
                        );
                    })}
                </ul>
            </Wrapper>
        </Wrapper>
    );
};

export default ToolAtGlance;
