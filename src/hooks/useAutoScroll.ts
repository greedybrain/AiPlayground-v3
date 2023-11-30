import { useEffect } from "react";

const useAutoScroll = (movementInPixels: number, duration: number) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            window.scrollBy(0, movementInPixels);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, movementInPixels]);
};

export default useAutoScroll;
