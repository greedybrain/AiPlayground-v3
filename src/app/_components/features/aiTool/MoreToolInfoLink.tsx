import { BsArrowUpRightSquare, BsArrowUpRightSquareFill } from "react-icons/bs";

import { AiToolWithRelations } from "@/types";
import React from "react";
import cn from "@/utils/twMerge";

const MoreToolInfo = ({
    tool,
    index,
}: {
    tool: AiToolWithRelations;
    index: number;
}) => {
    const link = tool.affLink ? tool.affLink : tool.websiteLink;

    return (
        <a href={link} target="_blank" rel="noreferrer noopener">
            {index === 0 ? (
                <BsArrowUpRightSquare
                    className={cn("bg-primary", "cursor-pointer", "rounded-md")}
                    size={40}
                />
            ) : (
                <BsArrowUpRightSquareFill
                    className={cn("cursor-pointer", "rounded-md")}
                    size={40}
                />
            )}
        </a>
    );
};

export default MoreToolInfo;
