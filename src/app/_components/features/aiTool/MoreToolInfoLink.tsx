import { BsArrowUpRightSquare, BsArrowUpRightSquareFill } from "react-icons/bs";

import Link from "next/link";
import React from "react";
import cn from "@/utils/twMerge";

const MoreToolInfo = ({ index }: { index: number }) => {
    return (
        <Link href={"#"} target="_blank" rel="noreferrer noopener">
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
        </Link>
    );
};

export default MoreToolInfo;
