
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
//import { fadeInOut } from "../components/fadeInOut"; // นำเข้า fadeInOut
//กำหนด motion.img  หรือต่างๆ  motion.div
//initial="initial"
//animate="animate"
//exit="exit"
//variants={fadeInOut(2, "easeInOut", 0)}
//transition={{ duration: 2 }} // ระยะเวลาในการเฟดภาพพื้นหลัง
