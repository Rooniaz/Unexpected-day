import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInOut } from "../../components/fadeInOut";
import { AnimatedText } from "../../components/AnimatedText";

const DoctorDetail: React.FC = () => {
  const navigate = useNavigate();
  const [showTextBox, setShowTextBox] = useState(false);
  const [index, setIndex] = useState(0);
  const [isClickable, setIsClickable] = useState(false); // ป้องกันการคลิกก่อนครบเวลา
  const [isLocked, setIsLocked] = useState(false);

  const texts = [
    `หากคุณมาโรงพยาบาลได้ทันเวลา
      จะสามารถช่วยลดความรุนแรงและ
      เพิ่มโอกาสรอดชีวิต`,
  ];

  useEffect(() => {
    setTimeout(() => {
      setIsClickable(true); // ปลดล็อกให้กดได้หลัง 3 วิ
    }, 3000);
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setTimeout>;
    if (isLocked && !showTextBox && index >= 3) {
      interval = setInterval(() => {
        setIndex((prev) => {
          if (prev < texts.length - 1) {
            return prev + 1;
          } else {
            clearInterval(interval);
            navigate('/AfterDoctor');
            return prev;
          }
        });
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isLocked, index, showTextBox, navigate]);

  const handleTextBoxClick = () => {
    setShowTextBox(false);
    setIsLocked(true);
    setIndex((prev) => prev + 1);
  };

  const nextText = () => {
    if (!isClickable || showTextBox || isLocked) return;

    if (index < texts.length - 1) {
      if (index === 2) {
        setShowTextBox(true);
      } else {
        setIndex((prev) => prev + 1);
      }
    } else {
      navigate('/AfterDoctor');
    }
  };

  const audioRef2 = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef2.current) {
      audioRef2.current.volume = 0.5;
    }
  }, []);

  return (
    <div className="w-full min-h-screen bg-black flex justify-center items-center">
      <audio ref={audioRef2} src="/Sound/Hospital Sound/Hospital Ambience.mp3" autoPlay loop />
      <motion.div
        className="relative flex justify-center items-center 
        w-full h-screen 
        sm:w-[390px] sm:h-[844px] overflow-hidden"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={fadeInOut(2, "easeInOut", 0)}
        onClick={!showTextBox && isClickable && !isLocked ? nextText : undefined}
      >
        <img
          src="/gif/37-41/36-40-talktodoc.png"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {!showTextBox ? (
          <div className="absolute bottom-80 my-20 left-1/2 -translate-x-1/2 w-[90%] z-10">
            <div className="px-6 py-4 rounded-lg">
              <AnimatedText key={index} text={texts[index]} className="text-black text-xl break-words" />
            </div>
          </div>
        ) : (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] z-10">
            <div 
              className="bg-white rounded-lg p-4 cursor-pointer"
              onClick={handleTextBoxClick}
            >
              <input
                type="text"
                value="พิมพ์เพื่อตอบ"
                disabled
                className="w-full text-center bg-transparent text-gray-500"
              />
            </div>
          </div>
        )}

        <div className="absolute bottom-[8%] right-6 text-white/80 text-2xl z-20">
          {/* {'>>'} */}
        </div>
      </motion.div>
    </div>
  );
};

export default DoctorDetail;
