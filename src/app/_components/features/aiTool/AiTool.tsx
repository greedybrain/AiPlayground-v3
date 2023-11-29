import type { AiToolWithRelations } from "@/types";
import Description from "./Description";
import FavCountBookmarkDataGroup from "./FavCountBookmarkDataGroup";
import Identity from "../../ui/Identity";
import PlayButtonTagsGroup from "../../ui/PlayButtonTagsGroup";
import PriceInfoMoreToolInfoGroup from "./PriceInfoMoreToolInfoGroup";
import React from "react";
import WebsiteScreenshot from "./WebsiteScreenshot";
import Wrapper from "../../ui/Wrapper";
import cn from "@/utils/twMerge";

const AiTool = ({
    index,
    ...tool
}: AiToolWithRelations & { index: number }) => {
    return (
        <li
            key={tool.id}
            className={cn(
                "border-2 border-secondary bg-white",
                "px-2 pt-2 pb-4",
                "rounded-2xl",
                "shadow-neobrut3",
            )}
        >
            <Wrapper className={cn("h-[250px]", "relative", "w-full")}>
                <WebsiteScreenshot
                    screenshotUrl={tool.screenshotUrl}
                    name={tool.name}
                />
                <PlayButtonTagsGroup
                    src={tool.videoSource ?? ""}
                    tags={tool.Tags}
                />
            </Wrapper>
            <Wrapper
                id="WrapIdentityAndBookmarkData"
                className={cn(
                    "flex",
                    "items-center",
                    "justify-between",
                    "mt-4",
                    "px-2",
                )}
            >
                <Identity
                    name={tool.name}
                    companyName={tool.companyName}
                    logoUrl={tool.logoUrl}
                />
                <FavCountBookmarkDataGroup
                    count={tool.FavoritedBy.length}
                    tool={tool}
                />
            </Wrapper>
            <Description text={tool.description} />
            <PriceInfoMoreToolInfoGroup tool={tool} index={index} />
        </li>
    );
};

export default AiTool;
