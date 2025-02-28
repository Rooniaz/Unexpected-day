import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInOut } from "../../components/fadeInOut";

const texts = [
    "คุณกับเพื่อนคุยเรื่องราวอนาคต\nและสิ่งต่างๆที่อยากจะทำ",
    "เจน : เรามีอะไรที่อยากจะทำเต็ม\nไปหมดเลยเนอะ",
    "เจน : เคยคิดไหมว่า ถ้าวันหนึ่งโอกาส\nในการทำสิ่งที่อยากทำหมดลงไป\nแกจะรู้สึกเสียดายไหม?",
    "คุณ :  . . . . . . . . . . . .",
    "ฉันจึงกลับมาคิดเรื่องนี้\nหลังจากจบบทสนทนาลง"
];

const Prechapter: React.FC = () => {
    const navigate = useNavigate();
    const [index, setIndex] = useState(0);
    const [showNextPage, setShowNextPage] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null); // อ้างอิงไปยัง audio element

    // สร้าง ref สำหรับ audio element
    // const audioRef1 = useRef<HTMLAudioElement>(null);
    const audioRef2 = useRef<HTMLAudioElement>(null);
    const audioRef3 = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        // ตั้งค่า volume หลังจาก component mount
        // if (audioRef1.current) {
        //     audioRef1.current.volume = 0.2;
        // }
        if (audioRef2.current) {
            audioRef2.current.volume = 1.0;
        }
        if (audioRef3.current) {
            audioRef3.current.volume = 1.0;
        }
    }, []);

    const nextText = () => {
        if (index < texts.length - 1) {
            setIndex(index + 1);
        } else {
            setShowNextPage(true);  
        }
    };

    const backgroundGif = () => {
        switch (texts[index]) {
            case "คุณกับเพื่อนคุยเรื่องราวอนาคต\nและสิ่งต่างๆที่อยากจะทำ":
                return "/gif/8.gif";
            case "เจน : เรามีอะไรที่อยากจะทำเต็ม\nไปหมดเลยเนอะ":
                return "/gif/9.gif";
            case "เจน : เคยคิดไหมว่า ถ้าวันหนึ่งโอกาส\nในการทำสิ่งที่อยากทำหมดลงไป\nแกจะรู้สึกเสียดายไหม?":
                return "/gif/10.gif";
            default:
                return "/gif/11-12.gif";
        }
    };

    useEffect(() => {
        if (showNextPage) {
            const timer = setTimeout(() => {
                navigate("/Prologue2");
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [showNextPage, navigate]);

    useEffect(() => {
        // เริ่มเล่นเสียงเมื่อหน้าโหลด
        if (audioRef.current) {
            audioRef.current.play().catch((error) => {
                console.log("ไม่สามารถเล่นเสียงได้:", error);
            });
        }
    }, []);

    return (
        <div className="w-full min-h-screen bg-black flex justify-center items-center">
          {/* เพิ่มเพลงในหน้า พร้อม ref สำหรับการตั้งค่า volume */}
          {/* <audio ref={audioRef1} src="/Sound/Scene Start/Group of People walking.mp3" autoPlay loop /> */}
          <audio ref={audioRef2} src="/Sound/Scene Start/Start & End.mp3" autoPlay loop />
          <audio ref={audioRef3} src="/Sound/Scene in park/Park Ambience Sound.mp3" autoPlay loop />
            <motion.div 
                className="relative w-[390px] h-[844px] overflow-hidden"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={fadeInOut(2, "easeInOut", 0)}
                onClick={showNextPage ? undefined : nextText}
            >
                {/* <audio ref={audioRef} src="/Sound/Scene Start/Park Ambience.mp3" loop autoPlay />  */}

                {showNextPage ? (
                    <motion.div 
                        className="absolute inset-0 flex justify-center items-center bg-gradient-to-b from-gray-300 to-white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.p
                            className="text-2xl text-[#fa4901] "
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            วันต่อมา
                        </motion.p>
                    </motion.div>
                ) : (
                    <img 
                        src={backgroundGif()}
                        alt="Background" 
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                )}

                <div className="absolute inset-0 bg-black/30"></div>

                <div className="absolute inset-0 flex flex-col justify-start items-center z-10 px-4 pt-36 ">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={index}
                            className={`text-center break-words ${index === 5 ? 'text-2xl text-black font-bold' : 'text-xl '}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.8 }}
                            style={{ display: showNextPage ? 'none' : 'block', whiteSpace: 'pre-line' }}                        >
                            {texts[index]}
                        </motion.p>
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};

export default Prechapter;
