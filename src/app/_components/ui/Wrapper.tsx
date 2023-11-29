"use client";

import type { IWrapper } from "@/types";
import React from "react";

const Wrapper = ({ children, ...rest }: IWrapper) => {
    return <div {...rest}>{children}</div>;
};

export default Wrapper;
