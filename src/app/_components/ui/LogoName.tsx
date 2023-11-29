import type { ILogoName } from "@/types";
import React from "react";

const LogoName = ({ ...rest }: ILogoName) => {
    return <p {...rest}>AiPlayground</p>;
};

export default LogoName;
