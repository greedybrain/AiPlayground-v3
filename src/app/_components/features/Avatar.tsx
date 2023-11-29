"use client";

import { BiSolidUserRectangle } from "react-icons/bi";
import type { ICustomImage } from "@/types";
import Image from "next/image";
import React from "react";
import cn from "@/utils/twMerge";
import { useSession } from "next-auth/react";

const Avatar = ({ wrapperHeight, wrapperWidth, ...rest }: ICustomImage) => {
    const { data: session } = useSession();

    if (!session || !session.user) return null;

    const avatar = session.user.image;

    if (!avatar)
        return (
            <BiSolidUserRectangle
                className={cn("cursor-pointer")}
                size={wrapperWidth}
            />
        );

    return (
        <div
            style={{
                position: "relative",
                width: wrapperWidth,
                height: wrapperHeight,
                cursor: "pointer",
            }}
        >
            <Image {...rest} alt="user avatar" fill src={avatar} />
        </div>
    );
};

export default Avatar;
