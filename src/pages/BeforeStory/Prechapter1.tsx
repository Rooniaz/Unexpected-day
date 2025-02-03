import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInOut } from "../../components/fadeInOut";

const texts = [
    "ฉันกับเพื่อนคุยเรื่องราวอนาคต และ สิ่งต่างๆที่อยากจะทำ",
    "เจน : เรามีอะไรที่อยากจะทำเต็มไปหมดเลยเนอะ",
    "“เคยคิดไหมว่า ถ้าวันหนึ่งโอกาสในการทำสิ่งที่อยากทำหมดลงไป แกจะรู้สึกเสียดายไหม?”",
    " . . . . . . . . . . . .",
    "ฉันจึงกลับมาคิดเรื่องนี้หลังจากจบบทสนทนาลง"
];

const Prechapter: React.FC = () => {
    const navigate = useNavigate();
    const [index, setIndex] = useState(0);
    const [showNextPage, setShowNextPage] = useState(false);

    const nextText = () => {
        if (index < texts.length - 1) {
            setIndex(index + 1);
        } else {
            setShowNextPage(true);  // เริ่มแสดงหน้าถัดไปหลังจากข้อความสุดท้าย
        }
    };

    // เงื่อนไขสำหรับสลับ GIF ตามข้อความ
    const backgroundGif = () => {
        switch (texts[index]) {
            case "ฉันกับเพื่อนคุยเรื่องราวอนาคต และ สิ่งต่างๆที่อยากจะทำ":
                return "/gif/8.gif";  // ใช้ GIF แรก
            case "เจน : เรามีอะไรที่อยากจะทำเต็มไปหมดเลยเนอะ":
                return "/gif/9.gif";  // ใช้ GIF ใหม่
            case "“เคยคิดไหมว่า ถ้าวันหนึ่งโอกาสในการทำสิ่งที่อยากทำหมดลงไป แกจะรู้สึกเสียดายไหม?”":
                return "/gif/10.gif";  // GIF สำหรับคำพูดนี้
            default:
                return "/gif/11-12.gif";  // ค่า default
        }
    };

    // รอ 2 วินาทีแล้วไปหน้าใหม่หลังจากแสดง "วันต่อมา"
    useEffect(() => {
        if (showNextPage) {
            const timer = setTimeout(() => {
                navigate("/Prologue2");
            }, 2000);  // รอ 2 วินาที

            return () => clearTimeout(timer);  // เคลียร์ timer หากมีการเปลี่ยนหน้า
        }
    }, [showNextPage, navigate]);

    return (
        <div className="w-full min-h-screen bg-black flex justify-center items-center">
            <motion.div 
                className="relative w-[390px] h-[844px] overflow-hidden"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={fadeInOut(2, "easeInOut", 0)}
                onClick={showNextPage ? undefined : nextText} // ปรับให้ไม่สามารถคลิกได้เมื่อ showNextPage เป็น true
            >
                {showNextPage ? (
                    // หน้าจอ "วันต่อมา" หลังจากข้อความสุดท้าย
                    <motion.div 
                        className="absolute inset-0 flex justify-center items-center bg-gray-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.p
                            className="text-2xl text-white font-bold"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            วันต่อมา
                        </motion.p>
                    </motion.div>
                ) : (
                    <img 
                        src={backgroundGif()}  // เรียกใช้ฟังก์ชันเพื่อเลือก GIF ตามข้อความ
                        alt="Background" 
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                )}

                <div className="absolute inset-0 bg-black/50"></div>

                <div className="absolute inset-0 flex flex-col justify-center items-center z-10 px-4">
                    <AnimatePresence mode="wait">
                        {/* ซ่อนข้อความที่แสดงเมื่อ showNextPage เป็น true */}
                        <motion.p
                            key={index}
                            className={`text-center break-words font-custom ${index === 5 ? 'text-2xl text-black font-bold' : 'text-lg text-white'}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.8 }}
                            // ซ่อนข้อความเมื่อ showNextPage เป็น true
                            style={{ display: showNextPage ? 'none' : 'block' }}
                        >
                            {texts[index]}
                        </motion.p>
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};

export default Prechapter;
