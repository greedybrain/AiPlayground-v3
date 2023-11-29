import CompanyLogo from "../features/aiTool/CompanyLogo";
import CompanyName from "../features/aiTool/CompanyName";
import Name from "../features/aiTool/Name";
import React from "react";
import Wrapper from "./Wrapper";
import cn from "@/utils/twMerge";

const Identity = ({ ...rest }) => {
    return (
        <Wrapper className={cn("flex", "gap-2", "items-center")}>
            <CompanyLogo
                companyName={rest.companyName}
                logoUrl={rest.logoUrl}
            />
            <Wrapper id="Identity">
                <Name text={rest.name} />
                <CompanyName companyName={rest.companyName} />
            </Wrapper>
        </Wrapper>
    );
};

export default Identity;
