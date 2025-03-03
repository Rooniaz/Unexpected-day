import React, { useEffect, useState, ReactNode } from "react"; // เพิ่ม ReactNode
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
    const { playAudio, pauseAudio } = useAudio();

    useEffect(() => {
        playAudio("/Sound/Scene Start/Start & End.mp3", 0.2); // เล่นเพลงเฉพาะหน้านี้
        return () => pauseAudio(); // หยุดเพลงเมื่อออกจากหน้า
    }, []);

    const nextText = () => {
        if (index < texts.length - 1) {
            setIndex(index + 1);
        } else {
            navigate('/EndStory');
        }
    };

    // ฟังก์ชันสำหรับการแสดงข้อความที่มีการเน้นคำ
    const renderTextWithHighlight = (text: string): ReactNode => {
        // แยกข้อความด้วย \n
        const lines = text.split("\n");

        return lines.map((line, lineIndex) => {
            // ตรวจสอบว่าเป็นคำที่ต้องการเน้นหรือไม่
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
                // เพิ่ม <br /> สำหรับการขึ้นบรรทัดใหม่
                currIndex > 0 ? <br key={`br-${currIndex}`} /> : null,
                curr,
            ];
            return result;
        }, []);
    };

    return (
        <div className="w-full min-h-screen bg-[#000000] flex justify-center items-center">
            <motion.div
                className="relative w-[390px] h-[844px] overflow-hidden"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={fadeInOut(2, "easeInOut", 0)}
                onClick={nextText}
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