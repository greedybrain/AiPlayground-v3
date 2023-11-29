import type { ITaglineSecondary } from "@/types";
import React from "react";

const TaglineSecondary = ({ ...rest }: ITaglineSecondary) => {
    return <p {...rest}>Dive in now and explore our tools.</p>;
};

export default TaglineSecondary;
