import { FaFacebook, FaReddit, FaSquareXTwitter } from "react-icons/fa6";

import { FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import React from "react";
import { SiLinktree } from "react-icons/si";
import Wrapper from "./Wrapper";
import cn from "@/utils/twMerge";
import footerNavItems from "@/data/footerNavItems";

const Footer = () => {
    return (
        <footer className={cn("mt-20", "w-full")}>
            <Wrapper className={cn("flex flex-col")}>
                <Wrapper
                    className={cn(
                        "flex flex-col",
                        "gap-4",
                        "items-center",
                        "justify-between",
                        "mx-auto max-w-[1200px] md:flex-row",
                        "p-4",
                        "w-11/12",
                    )}
                >
                    <h1
                        className={cn(
                            "font-extrabold",
                            "text-2xl text-secondary",
                        )}
                    >
                        AiPG
                    </h1>
                    <ul
                        className={cn(
                            "flex flex-col",
                            "gap-5",
                            "items-center",
                            "md:flex-row md:gap-10",
                        )}
                    >
                        {footerNavItems.map((item) => (
                            <li key={item.id} className={cn("font-semibold")}>
                                <Link href={item.path}>{item.name}</Link>
                            </li>
                        ))}
                    </ul>
                </Wrapper>
                <Wrapper
                    className={cn("border-t-2 border-t-secondary", "w-full")}
                >
                    <Wrapper
                        className={cn(
                            "flex flex-col-reverse",
                            "gap-10",
                            "items-center",
                            "justify-between",
                            "mx-auto max-w-[1200px] md:flex-row",
                            "px-4 py-7",
                            "w-11/12",
                        )}
                    >
                        <p className={cn("font-semibold")}>
                            Copyright &copy; 2023 AiPlayground
                        </p>
                        <ul
                            className={cn(
                                "flex flex-col",
                                "gap-4",
                                "md:flex-row",
                            )}
                        >
                            <li>
                                <a
                                    href="https://www.linkedin.com/company/aiplayground-aipg/"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    <FaLinkedin fill="#0866c2" size={35} />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.reddit.com/user/aiplayground-aipg"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    <FaReddit fill="#ff4400" size={35} />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.facebook.com/itsaipg"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    <FaFacebook fill="#0766ff" size={35} />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://twitter.com/itsaipg"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    <FaSquareXTwitter
                                        fill="#000000"
                                        size={35}
                                    />
                                </a>
                            </li>
                            <li
                                className={cn(
                                    "bg-[#40df5c]",
                                    "p-2",
                                    "rounded-md",
                                )}
                            >
                                <a
                                    href="https://linktr.ee/itsaipg"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    <SiLinktree fill="#000000" size={20} />
                                </a>
                            </li>
                        </ul>
                    </Wrapper>
                </Wrapper>
            </Wrapper>
        </footer>
    );
};

export default Footer;
