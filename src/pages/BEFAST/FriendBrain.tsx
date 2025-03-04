import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "../../contexts/AudioProvider";

const FriendBrain: React.FC = () => {
  const navigate = useNavigate();

  const texts = [
    "ซึ่งเพื่อนคุณสังเกตอาการ",
    "ของโรคหลอดเลือดสมองจาก",
  ];

  const [visibleTexts, setVisibleTexts] = useState<string[]>([]);
  const [bgColor, setBgColor] = useState("transparent");
  const [isClickable, setIsClickable] = useState(false);

  const showNextText = useCallback(() => {
    if (visibleTexts.length < texts.length) {
      setTimeout(() => {
        setVisibleTexts((prev) => [...prev, texts[prev.length]]);
      }, 1000); // กำหนดเวลา 3 วินาทีสำหรับแต่ละข้อความ
    }
  }, [visibleTexts.length, texts]);

  const handleVideoEnd = useCallback(() => {
    setBgColor("black");
    setTimeout(() => {
      setIsClickable(true);
    }, 1000);
  }, []);

  const handleClick = () => {
      navigate("/GuideBefast");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (visibleTexts.length < texts.length) {
        showNextText();
      } else {
        clearInterval(interval);
        handleVideoEnd();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [visibleTexts.length, showNextText, handleVideoEnd]);

  const { playAudio, pauseAudio } = useAudio();

  useEffect(() => {
    playAudio("/Sound/Sound fx/Scene BEFAST.mp3", 0.2);
    return () => pauseAudio();
  }, []);

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-black">
      <div
        className={`relative flex justify-center items-center 
        w-full h-screen 
        sm:w-[390px] sm:h-[844px] overflow-hidden ${isClickable ? "cursor-pointer" : ""}`}
        style={{ backgroundColor: bgColor ,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        onClick={handleClick}
      >
        <img
          src="/image/befast/body-befast-shadow.png"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] z-10">
          <div className="rounded-lg flex flex-col items-center space-y-6">
            <AnimatePresence>
              {visibleTexts.map((text, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.5 }}
                  className="flex flex-wrap justify-center text-white text-2xl"
                >
                  {text}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendBrain;