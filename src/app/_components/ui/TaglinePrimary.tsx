import type { ITaglinePrimary } from "@/types";
import React from "react";

const TaglinePrimary = ({ abbrevStyles, ...rest }: ITaglinePrimary) => {
    return (
        <p {...rest}>
            Your portal to the future of{" "}
            <span className={abbrevStyles}>AI</span>
        </p>
    );
};

export default TaglinePrimary;
