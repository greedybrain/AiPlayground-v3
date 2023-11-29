import type { CompanyLogoProps } from "@/types";
import Image from "next/image";
import React from "react";
import cn from "@/utils/twMerge";

const CompanyLogo = ({ companyName, logoUrl }: CompanyLogoProps) => {
    return (
        <Image
            src={logoUrl}
            alt={`${companyName} logo`}
            width={30}
            height={30}
            className={cn("rounded-lg")}
        />
    );
};

export default CompanyLogo;
