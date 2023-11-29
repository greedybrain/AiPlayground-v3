import type { CompanyNameProps } from "@/types";
import React from "react";
import cn from "@/utils/twMerge";

const CompanyName = ({ companyName }: CompanyNameProps) => {
    return (
        <p
            className={cn(
                "max-w-[150px]",
                "text-sm text-secondary/70 truncate",
            )}
        >{`by ${companyName}`}</p>
    );
};

export default CompanyName;
