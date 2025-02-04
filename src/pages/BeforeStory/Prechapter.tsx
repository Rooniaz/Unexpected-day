import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInOut } from "../../components/fadeInOut";

const texts = [
    "ชีวิตของวัยหนุ่มสาว ",
    "มีความฝันมากมายที่อยากจะทำ?",
    "แล้วความฝันของคุณคืออะไร?",
    "ใช้ชีวิตตามปกติอย่างทุกๆวัน",
    "ไปเที่ยว เรียน สังสรรค์ ทำงาน" // ข้อความสุดท้าย
];

const Prechapter: React.FC = () => {
    const navigate = useNavigate();
    const [index, setIndex] = useState(0);
    const [inputValue, setInputValue] = useState("");
    
    // สร้าง ref สำหรับ audio element
    const audioRef1 = useRef<HTMLAudioElement>(null);
    const audioRef2 = useRef<HTMLAudioElement>(null);
    const audioRef3 = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        // ตั้งค่า volume หลังจาก component mount
        if (audioRef1.current) {
            audioRef1.current.volume = 0.5;
        }
        if (audioRef2.current) {
            audioRef2.current.volume = 0.2;
        }
        if (audioRef3.current) {
            audioRef3.current.volume = 0.2;
        }
    }, []);

    

    const nextText = () => {
        if (index < texts.length - 1) {
            setIndex(index + 1);
        } else {
            navigate("/Prechapter1");
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

    return (
        <div className="w-full min-h-screen bg-black flex justify-center items-center">
          {/* เพิ่มเพลงในหน้า พร้อม ref สำหรับการตั้งค่า volume */}
          {/* <audio ref={audioRef1} src="/Sound/Scene Start/26365 Group of people walking on grass path loop-full.mp3" autoPlay loop /> */}
          <audio ref={audioRef2} src="/Sound/Scene Start/For Education - Full.mp3" autoPlay loop />
          <audio ref={audioRef3} src="/Sound/Scene in park/Park Ambience.mp3" autoPlay loop />
          
            <motion.div 
                className="relative w-[390px] h-[844px] overflow-hidden"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={fadeInOut(2, "easeInOut", 0)}
                onClick={index === 2 ? undefined : nextText}
            >
                <img 
                    src="/gif/3-6.gif" 
                    alt="Background" 
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/50"></div>

                <div className="absolute inset-0 flex flex-col justify-center items-center z-10 px-4">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={index}
                            className={`text-center break-words font-custom ${index === 2 ? 'text-2xl text-white ' : 'text-xl text-white'}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.8 }}
                        >
                            {texts[index]}
                        </motion.p>
                    </AnimatePresence>

                    {index === 2 && (
                        <form onSubmit={handleSubmit} className="space-y-6 py-2">
                            <div className="flex justify-center items-center">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    className="w-80 h-40 p-2 border rounded-3xl text-center font-custom text-lg"
                                    placeholder="พิมพ์เพื่อตอบ"
                                    required
                                />
                            </div>
                            <div className="flex justify-center items-center">
                                <button 
                                    type="submit"
                                    className="w-auto px-4 py-1 font-bold text-xl font-custom text-black bg-grey-500 rounded border-2 border-grey-500"
                                >
                                    ตกลง
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default Prechapter;
