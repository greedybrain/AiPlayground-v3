import type { IFieldIcon } from "@/types";
import React from "react";
import cn from "@/utils/twMerge";

const FieldIcon = ({
    color,
    size,
    Icon,
    wrapperWidth,
    wrapperHeight,
}: IFieldIcon) => {
    return (
        <div
            className={cn("flex items-center justify-center")}
            style={{
                width: wrapperWidth,
                height: wrapperHeight,
            }}
        >
            <Icon color={color} size={size} />
        </div>
    );
};

export default FieldIcon;
