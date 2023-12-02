import type { DescriptionProps } from "@/types";
import Link from "next/link";
import React from "react";
import cn from "@/utils/twMerge";

const Description = ({ name, text }: DescriptionProps) => {
    return (
        <Link href={`/tool/${name}`} target="_blank" rel="noreferrer noopener">
            <p
                className={cn(
                    "line-clamp-3",
                    "mt-4",
                    "px-3",
                    "sm:line-clamp-4",
                    "text-sm text-secondary",
                )}
            >
                {text}
            </p>
        </Link>
    );
};

export default Description;
