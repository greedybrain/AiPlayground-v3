import useModalStore from "@/store/slices/popup";
import { useEffect, type RefObject } from "react";

const useDetectOutsideClick = (ref: RefObject<HTMLElement>) => {
    const {
        closeSignInPopup,
        signInPopupIsOpen,
        drawerNavIsOpen,
        closeDrawerNav,
    } = useModalStore((state) => state);

    useEffect(() => {
        const handleModal = (event: MouseEvent) => {
            const target = event.target as Node;
            if (ref.current && !ref.current.contains(target)) {
                if (signInPopupIsOpen) closeSignInPopup();
                if (drawerNavIsOpen) closeDrawerNav();
            }
        };

        document.addEventListener("mousedown", handleModal);

        return () => {
            document.removeEventListener("mousedown", handleModal);
        };
    });
};

export default useDetectOutsideClick;
