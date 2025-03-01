import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInOut } from "../../components/fadeInOut";
import { AnimatedText, AnimatedText2 } from "../../components/AnimatedText";

const StoryCanteen: React.FC = () => {
  const navigate = useNavigate();

  const storedName = localStorage.getItem("userName") || "???";
  const texts = [
    `เจน : ${storedName} กินข้าวเสร็จแล้วจะทำอะไรต่อ`,
    `${storedName} : คงไปหาที่เดินเล่นหน่อย อาหารจะได้ย่อยเร็ว ๆ`,
    "เจน : ดีเหมือนกัน ตอนนี้รู้สึกอิ่มเกิน"
  ];

  const [index, setIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  const audioRef1 = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef1.current) {
      audioRef1.current.volume = 0.5;
    }
  }, []);

  useEffect(() => {
    if (index === texts.length - 1) {
      setTimeout(() => {
        navigate('/story/canteen2');
      }, 4000);
    }
  }, [index, navigate]);

  const nextText = () => {
    if (!isChanging) {
      setIsChanging(true);
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex < texts.length - 1 ? prevIndex + 1 : prevIndex));
        setIsChanging(false);
      }, 500);
    }
  };

  return (
    <div className="w-full min-h-screen bg-black flex justify-center items-center">
      <audio ref={audioRef1} src="/Sound/Scene Eating/Scene Eating.mp3" autoPlay loop />
      <motion.div
        className="relative w-[390px] h-[844px] overflow-hidden"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={fadeInOut(2, "easeInOut", 0)}
        onClick={nextText}
      >
        <img
          src="/gif/15-17/canteen_15-17.gif"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute bottom-20 my-20 left-1/2 -translate-x-1/2 w-[90%] z-10">
          <div className="px-6 py-4 bg-black/50 rounded-lg">
            {/* กำหนดว่าจะใช้ AnimatedText หรือ AnimatedText2 */}
            {index % 2 === 0 ? (
              <AnimatedText 
                key={index} 
                text={texts[index]} 
                className="text-white "
              />
            ) : (
              <AnimatedText2 
                key={index} 
                text={texts[index]} 
                color="yellow"  // เปลี่ยนสีข้อความเป็นสีน้ำเงิน
              />
            )}
          </div>
        </div>

        <div className="absolute bottom-[8%] right-6 text-white/80 text-2xl cursor-pointer hover:text-white/100 z-20">
          {/* {'>>'} */}
        </div>
      </motion.div>
    </div>
  );
};

export default StoryCanteen;
