import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInOut } from "../../components/fadeInOut";

const texts = [
    "ไม่ว่าจะเป็นเช่นไร",
    "โรคหลอดเลือดสมองนั้นเป็นได้เฉียบพลัน",
    "ขึ้นอยู่กับคุณว่าจะรู้วิธีการสังเกตแบบ BEFAST และขอความช่วยเหลือได้ทัน",
    "สุดท้ายนี้",
    "เราอยากให้คุณรู้ว่า",
];

const AfterDoctor: React.FC = () => {
    const navigate = useNavigate();
    const [index, setIndex] = useState(0);

    const nextText = () => {
        if (index < texts.length - 1) {
            setIndex(index + 1);
        } else {
            navigate('/EndStory');
        }
    };

    return (
        <div className="w-full min-h-screen bg-white flex justify-center items-center">
            <motion.div 
                className="relative w-[390px] h-[844px] overflow-hidden bg-gray-500" // เปลี่ยนเป็นสีเทา
                initial="initial"
                animate="animate"
                exit="exit"
                variants={fadeInOut(2, "easeInOut", 0)}
                onClick={nextText} // แตะหน้าจอเพื่อเปลี่ยนข้อความ
            >
                {/* ลบ <img> ที่ใช้ background image */}

                {/* Overlay เพื่อให้ข้อความอ่านได้ง่ายขึ้น */}
                <div className="absolute inset-0 bg-black/50"></div>

                {/* กล่องข้อความ */}
                <div className="absolute inset-0 flex justify-center items-center z-10 px-4">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={index}
                            className="text-lg font-custom text-white text-center break-words"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.8 }}
                        >
                            {texts[index]}
                        </motion.p>
                    </AnimatePresence>
                </div>

                {/* ไกด์ให้ผู้ใช้รู้ว่าต้องแตะหน้าจอ */}
                <motion.p 
                    className="absolute bottom-5 text-gray-500 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                >
                </motion.p>
            </motion.div>
        </div>
    );
};

export default AfterDoctor;
