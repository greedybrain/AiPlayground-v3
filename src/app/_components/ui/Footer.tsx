import Link from "next/link";
import React from "react";
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
                            <li
                                key={item.id}
                                className={cn("font-semibold", "text-sm")}
                            >
                                <Link href={item.path}>{item.name}</Link>
                            </li>
                        ))}
                    </ul>
                </Wrapper>
                <p
                    className={cn(
                        "border-t-2 border-t-secondary",
                        "font-semibold",
                        "md:py-6",
                        "py-7",
                        "text-center text-sm",
                        "w-full",
                    )}
                >
                    Copyright &copy; 2023 AiPlayground
                </p>
            </Wrapper>
        </footer>
    );
    // return (
    //     <Wrapper
    //         className={cn(
    //             "flex flex-col",
    //             "gap-8",
    //             "items-center",
    //             "mt-20",
    //             "md:gap-4",
    //             "w-full",
    //         )}
    //     >
    //         <Wrapper className={cn("mx-auto max-w-[1200px]", "px-4", "w-full")}>
    //             <Wrapper
    //                 className={cn(
    //                     "flex flex-col",
    //                     "gap-8",
    //                     "items-center",
    //                     "max-w-[1200px] md:flex-row md:justify-between mx-auto",
    //                     "w-full",
    //                 )}
    //             >
    //                 <h1
    //                     className={cn(
    //                         "font-extrabold",
    //                         "text-2xl text-secondary",
    //                     )}
    //                 >
    //                     AiPG
    //                 </h1>
    // <ul
    //     className={cn(
    //         "flex flex-col",
    //         "gap-5",
    //         "items-center",
    //         "md:flex-row md:gap-10",
    //     )}
    // >
    //     {footerNavItems.map((item) => (
    //         <li
    //             key={item.id}
    //             className={cn("font-semibold", "text-sm")}
    //         >
    //             <Link href={item.path}>{item.name}</Link>
    //         </li>
    //     ))}
    // </ul>
    //             </Wrapper>
    //         </Wrapper>
    //         <p
    //             className={cn(
    //                 "border-t-2 border-t-secondary",
    //                 "font-semibold",
    //                 "md:py-6",
    //                 "py-7",
    //                 "text-center text-sm",
    //                 "w-full",
    //             )}
    //         >
    //             Copyright &copy; 2023 AiPlayground
    //         </p>
    //     </Wrapper>
    // );
};

export default Footer;
