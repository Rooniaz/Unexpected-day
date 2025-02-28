import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
// import { fadeInOut } from "../../components/fadeInOut";

const texts = [
    "ฉันกับเพื่อนคุยเรื่องราวอนาคต และ สิ่งต่างๆที่อยากจะทำ",
    "เจน : เรามีอะไรที่อยากจะทำเต็มไปหมดเลยเนอะ",
    "“เคยคิดไหมว่า ถ้าวันหนึ่งโอกาสในการทำสิ่งที่อยากทำหมดลงไป แกจะรู้สึกเสียดายไหม?”",
    " . . . . . . . . . . . .",
    "ฉันจึงกลับมาคิดเรื่องนี้หลังจากจบบทสนทนาลง"
];

const Prechapter2: React.FC = () => {
    const navigate = useNavigate();
    const [index, setIndex] = useState(0);

    const nextText = () => {
        if (index < texts.length - 1) {
            setIndex(index + 1);
        } else {
            navigate('/Prologue2');
        }
    };

    return (
        <div className="w-full min-h-screen bg-white flex justify-center items-center">
        <motion.div 
            className="relative w-[390px] h-[844px] overflow-hidden"
            // initial="initial"
            // animate="animate"
            // exit="exit"
            // variants={fadeInOut(2, "easeInOut", 0)}
            onClick={nextText} // แตะหน้าจอเพื่อเปลี่ยนข้อความ
        >
            {/* รูปพื้นหลัง (GIF หรือภาพนิ่ง) */}
            <img 
                src="/gif/8.gif" 
                alt="Background" 
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay สีดำจางๆ เพื่อให้อ่านตัวหนังสือง่ายขึ้น */}
            <div className="absolute inset-0 bg-black/30"></div>

            {/* Dialog คงที่ ปรับขนาดให้พอดี */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-4/5 max-w-md z-10">
                <div className="px-6 py-4 bg-black/50 rounded-lg max-h-40">
                    {/* ตัวหนังสือขยับ แต่ Dialog คงที่ */}
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={index}
                            className="text-lg text-white text-center break-words"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.8 }}
                        >
                            {texts[index]}
                        </motion.p>
                    </AnimatePresence>
                </div>
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

export default Prechapter2;
