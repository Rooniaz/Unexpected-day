
import { Variants } from "framer-motion";

export const fadeInOut = (duration: number = 2, ease: string = "easeInOut", delay: number = 0): Variants => {
return {
    initial: { opacity: 0 },
    animate: { 
    opacity: 1,
    transition: { duration, ease, delay },
    },
    exit: { 
    opacity: 0,
    transition: { duration, ease },
    },
};
};
