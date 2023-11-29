"use client";

import type { ILottieProps } from "@/types";
import Lottie from "react-lottie";
import React from "react";
import aipg_v3_circle_dots from "../../../../public/assets/animations/aipg-v3-circle-dots.json";

const LoadingAnimation = ({ ...rest }: ILottieProps) => {
    return (
        <Lottie
            {...rest}
            options={{
                loop: true,
                animationData: aipg_v3_circle_dots,
                rendererSettings: {
                    preserveAspectRatio: "xMidYMid slice",
                },
            }}
        />
    );
};

export default LoadingAnimation;
