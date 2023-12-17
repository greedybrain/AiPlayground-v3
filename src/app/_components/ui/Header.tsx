import AuthModalTrigger from "../features/AuthModalTrigger";
import Avatar from "../features/Avatar";
import BrandLogo from "./BrandLogo";
import HeaderOverlay from "./HeaderOverlay";
import Link from "next/link";
import MenuButton from "../features/MenuButton";
import NavItems from "./NavItems";
import React from "react";
import SignInModal from "./SignInModal";
import Wrapper from "./Wrapper";
import cn from "@/utils/twMerge";

const Header = () => {
    return (
        <header className={cn("w-full")}>
            <Wrapper
                className={cn(
                    "mx-auto max-w-[1200px]",
                    "p-4",
                    "relative",
                    "w-full",
                )}
            >
                <SignInModal />
                <Wrapper className={cn("flex items-center justify-between")}>
                    <Link href="/">
                        <BrandLogo wrapperWidth={65} wrapperHeight={65} />
                    </Link>
                    <Wrapper className={cn("flex", "gap-4", "items-center")}>
                        <NavItems />
                        <AuthModalTrigger />
                        <Avatar
                            className={cn(
                                "border-2 border-secondary",
                                "cursor-pointer",
                                "rounded-lg",
                                "shadow-neobrut1",
                            )}
                            wrapperWidth={40}
                            wrapperHeight={40}
                        />
                        <MenuButton />
                    </Wrapper>
                </Wrapper>
            </Wrapper>
            <HeaderOverlay />
        </header>
    );
};

export default Header;
