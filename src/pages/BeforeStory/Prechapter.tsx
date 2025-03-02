import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInOut } from "../../components/fadeInOut";
import { useAudio } from "../../contexts/AudioProvider"; // ใช้ AudioProvider2

const texts = [
    "“ชีวิตของวัยหนุ่มสาวมีความฝัน\nมากมายที่อยากจะทำ”",
    "แล้วความฝันของคุณคืออะไร\nไหนลองเล่าหน่อยได้ไหม",
    "น่าสนใจมากเลย!",
    "วัยรุ่นอย่างพวกเราใช้ชีวิต\nตามปกติอย่างทุกๆวัน",
    "ไปเที่ยว เรียน สังสรรค์ ทำงาน"
];

const Prechapter: React.FC = () => {
    const navigate = useNavigate();
    const [index, setIndex] = useState(0);
    const [inputValue, setInputValue] = useState("");
    const [showInput, setShowInput] = useState(false);
    const [textMoveUp, setTextMoveUp] = useState(false);
    const [showWhiteBg, setShowWhiteBg] = useState(false);

    const audioRef1 = useRef<HTMLAudioElement>(null);
    const audioRef2 = useRef<HTMLAudioElement>(null);
    const audioRef3 = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (audioRef1.current) audioRef1.current.volume = 0.2;
        if (audioRef2.current) audioRef2.current.volume = 0.2;
        if (audioRef3.current) audioRef3.current.volume = 0.2;
    }, []);

    useEffect(() => {
        if (index === 1) {
            setTimeout(() => {
                setTextMoveUp(true);
                setTimeout(() => {
                    setShowInput(true);
                }, 800); // กล่องข้อความมาหลังจากข้อความเลื่อนขึ้น
            }, 3000);
        } else {
            setTextMoveUp(false);
            setShowInput(false);
        }
    }, [index]);

    const nextText = () => {
        if (index < texts.length - 1) {
            setIndex(index + 1);
        } else {
            setShowWhiteBg(true); // แสดงพื้นหลังสีขาวเมื่อถึงข้อความสุดท้าย
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (inputValue.trim() !== "") {
            localStorage.setItem("userDream", inputValue);
            nextText();
        }
    };

    const handleContinue = () => {
        navigate("/Prechapter1"); // นำทางไปยังหน้าถัดไป
    };

    const { playAudio, pauseAudio } = useAudio();

useEffect(() => {
  playAudio("/Sound/Scene Start/Start & End.mp3", 0.2); // เล่นเพลงเฉพาะหน้านี้
  return () => pauseAudio(); // หยุดเพลงเมื่อออกจากหน้า
}, []);

    return (
        <div className="w-full min-h-screen bg-black flex justify-center items-center">
            <audio ref={audioRef1} src="/Sound/Scene Start/Group of People walking.mp3" autoPlay loop />
            {/* <audio ref={audioRef2} src="/Sound/Scene Start/Start & End.mp3" autoPlay loop /> */}
            <audio ref={audioRef3} src="/Sound/Scene in park/Park Ambience Sound.mp3" autoPlay loop />
            <motion.div 
                className="relative w-[390px] h-[844px] overflow-hidden"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={fadeInOut(2, "easeInOut", 0)}
                onClick={index === 1 ? undefined : nextText} // คลิกเพื่อเปลี่ยนข้อความ
            >
                {!showWhiteBg && (
                    <>
                        <img 
                            src="/gif/3-6.gif" 
                            alt="Background" 
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20"></div>
                    </>
                )}

                <div className="absolute inset-0 flex flex-col justify-start items-center z-10 px-4 pt-36">
                    <AnimatePresence mode="wait">
                        {!showWhiteBg && (
                            <motion.p
                                key={index}
                                className="text-center break-words text-xl"
                                style={{ whiteSpace: "pre-line" }}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: textMoveUp ? -0 : 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.8 }}
                            >
                                {texts[index]}
                            </motion.p>
                        )}
                    </AnimatePresence>

                    {index === 1 && (
                        <AnimatePresence>
                            {showInput && (
                                <motion.form 
                                    onSubmit={handleSubmit} 
                                    className="space-y-6 py-2"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <div className="flex justify-center items-center pt-36">
                                        <input
                                            type="text"
                                            value={inputValue}
                                            onChange={handleInputChange}
                                            onInput={(e) => {
                                                const input = e.target as HTMLInputElement;
                                                input.value = input.value.replace(/[^ก-๙\s]/g, '');
                                            }}
                                            className="w-80 h-40 p-2 border rounded-3xl text-center text-lg"
                                            placeholder="พิมพ์เพื่อตอบ"
                                            required
                                        />
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <button 
                                            type="submit"
                                            className="w-full px-6 py-2 text-xl text-[#817c7c] rounded 
                                            transition duration-300 ease-in-out hover:drop-shadow-lg pt-16"
                                        >
                                            กดเพื่อไปต่อ
                                        </button>
                                    </div>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    )}

                    <AnimatePresence>
                        {showWhiteBg && (
                            <motion.div
                                className="absolute inset-0 bg-white flex justify-center items-center cursor-pointer"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 2 }}
                                onClick={handleContinue} // คลิกที่ใดก็ได้บนพื้นหลังสีขาวเพื่อไปต่อ
                            >
                                <div className="absolute inset-x-0 bottom-40 flex justify-center items-center mb-4">
                                    <div className="text-[#817c7c] text-xl animate-pulse">กดเพื่อไปต่อ</div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};

export default Prechapter;