import React, { useEffect, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInOut } from "../../components/fadeInOut";
import { useAudio } from "../../contexts/AudioProvider";

const texts = [
    "ไม่ว่าจะเป็นเช่นไร",
    "โรคหลอดเลือดสมองนั้น\nเป็นได้เฉียบพลัน",
    "เพียงแค่รู้วิธีการสังเกตตามหลัก\nBEFAST\nก็สามารถเพิ่มโอกาสรอดชีวิต",
    "สุดท้ายนี้",
    "เรามีบางสิ่งที่จะมอบให้คุณ",
    "นั่นก็คือ",
];

const AfterDoctor: React.FC = () => {
    const navigate = useNavigate();
    const [index, setIndex] = useState(0);
    const [isReady, setIsReady] = useState(false); // สถานะเพื่อตรวจสอบว่าผู้ใช้สามารถกดได้หรือไม่
    const { playAudio, pauseAudio } = useAudio();

    useEffect(() => {
        playAudio("/Sound/Scene Start/Start & End.mp3", 0.2); // เล่นเพลงเฉพาะหน้านี้
        return () => pauseAudio(); // หยุดเพลงเมื่อออกจากหน้า
    }, []);

    useEffect(() => {
        setIsReady(false); // เมื่อข้อความเปลี่ยน ให้ตั้งค่า isReady เป็น false
        const timer = setTimeout(() => {
            setIsReady(true); // หลังจาก 3 วินาที ให้ตั้งค่า isReady เป็น true
        }, 3000); // ดีเลย์ 3 วินาที

        return () => clearTimeout(timer); // เคลียร์ timer เมื่อ component unmount หรือ index เปลี่ยน
    }, [index]);

    const nextText = () => {
        if (isReady) { // ตรวจสอบว่า isReady เป็น true หรือไม่
            if (index < texts.length - 1) {
                setIndex(index + 1);
            } else {
                navigate('/EndStory');
            }
        }
    };

    const renderTextWithHighlight = (text: string): ReactNode => {
        const lines = text.split("\n");

        return lines.map((line, lineIndex) => {
            if (
                line.includes("โรคหลอดเลือดสมองนั้น") ||
                line.includes("เป็นได้เฉียบพลัน") ||
                line.includes("เพียงแค่รู้วิธีการสังเกตตามหลัก") ||
                line.includes("BEFAST") ||
                line.includes("ก็สามารถเพิ่มโอกาสรอดชีวิต")
            ) {
                return (
                    <span key={lineIndex} style={{ color: '#fa4901' }}>
                        {line}
                    </span>
                );
            }
            return line;
        }).reduce<ReactNode[]>((prev, curr, currIndex) => {
            const result = [
                ...prev,
                currIndex > 0 ? <br key={`br-${currIndex}`} /> : null,
                curr,
            ];
            return result;
        }, []);
    };

    return (
        <div className="w-full min-h-screen bg-[#000000] flex justify-center items-center">
            <motion.div
                className="relative flex justify-center items-center 
                w-full h-screen 
                sm:w-[390px] sm:h-[844px] overflow-hidden"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={fadeInOut(2, "easeInOut", 0)}
                onClick={nextText} // เมื่อผู้ใช้คลิก ให้เรียก nextText
            >
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: 'url(/image/bg-lastfinal.png)' }}
                ></div>

                <div className="absolute inset-0"></div>

                <div className="absolute inset-0 flex justify-center items-center z-10 px-4">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={index}
                            className="text-2xl font-custom text-black text-center break-words whitespace-pre-line"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.8 }}
                        >
                            {renderTextWithHighlight(texts[index])}
                        </motion.p>
                    </AnimatePresence>
                </div>

                {/* แสดงข้อความ "คลิกเพื่อดำเนินการต่อ" เมื่อ isReady เป็น true */}
                {isReady && (
                    <motion.p
                        className="absolute bottom-5 text-gray-500 text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                    </motion.p>
                )}
            </motion.div>
        </div>
    );
};

export default AfterDoctor;