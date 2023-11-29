import Image from "next/image";
import React from "react";
import type { WebsiteScreenshotProps } from "@/types";
import cn from "@/utils/twMerge";

const WebsiteScreenshot = ({ screenshotUrl, name }: WebsiteScreenshotProps) => {
    return (
        <Image
            src={screenshotUrl}
            alt={`${name} website screenshot`}
            fill
            className={cn("border border-secondary", "rounded-xl")}
        />
    );
};

export default WebsiteScreenshot;
