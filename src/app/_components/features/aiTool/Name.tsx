import type { NameProps } from "@/types";
import React from "react";
import cn from "@/utils/twMerge";

const Name = ({ text }: NameProps) => {
    return <p className={cn("font-bold", "text-sm")}>{text}</p>;
};

export default Name;
