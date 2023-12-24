import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link";
import React from "react";
import Wrapper from "../_components/ui/Wrapper";
import cn from "@/utils/twMerge";
import { redirectIfUnauthorized } from "@/server/helper";

const adminActions = [
    {
        path: "/admin/actions/tools",
        type: "tool_actions",
        text: "Manage Tools - Create, update, or delete tools",
    },
    {
        path: "/admin/actions/promotions",
        type: "promo_actions",
        text: "Manage Social Media - Create blast posts and more",
    },
];

const AdminPage = async () => {
    await redirectIfUnauthorized();

    return (
        <Wrapper className={cn("mx-auto max-w-[1200px]", "px-4", "w-11/12")}>
            <h1 className={cn("font-semibold", "mt-5", "text-3xl")}>
                Dashboard
            </h1>
            <h3 className={cn("mt-5", "text-lg", "underline")}>
                Admin Actions
            </h3>
            <ul className={cn("flex flex-col", "gap-2", "mt-2")}>
                {adminActions.map((action) => {
                    return (
                        <li
                            key={action.type}
                            className={cn("flex", "gap-2", "items-center")}
                        >
                            <Link
                                href={action.path}
                                className={cn("text-link")}
                            >
                                {action.text}
                            </Link>
                            <FaArrowRight fill="#2d74c8" />
                        </li>
                    );
                })}
            </ul>
        </Wrapper>
    );
};

export default AdminPage;
