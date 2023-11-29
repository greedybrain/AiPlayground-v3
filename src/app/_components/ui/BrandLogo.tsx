"use client";

import type { ICustomImage } from "@/types";
import Image from "next/image";
import React from "react";
import aipg_logo from "public/assets/branding/aipg-mascot-logo.png";

const BrandLogo = ({ wrapperHeight, wrapperWidth, ...rest }: ICustomImage) => {
    return (
        <div
            style={{
                position: "relative",
                width: wrapperWidth,
                height: wrapperHeight,
                cursor: "pointer",
            }}
        >
            <Image {...rest} alt="branding logo" fill src={aipg_logo} />
        </div>
    );
};

export default BrandLogo;
