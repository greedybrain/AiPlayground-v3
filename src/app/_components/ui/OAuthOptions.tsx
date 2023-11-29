import OAuthOption from "../features/OAuthOption";
import React from "react";
import cn from "@/utils/twMerge";
import oauthOptions from "@/data/oauthOptions";

const OAuthOptions = () => {
    return (
        <ul
            className={cn(
                "grid grid-cols-3 gap-6",
                "justify-items-center",
                "w-full",
            )}
        >
            {oauthOptions.map((option) => (
                <OAuthOption key={option.id} iconSize={45} {...option} />
            ))}
        </ul>
    );
};

export default OAuthOptions;
