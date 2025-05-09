import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { fadeInOut } from "../../components/fadeInOut";
import { AnimatedText, AnimatedText2 } from "../../components/AnimatedText";

const Hospital2: React.FC = () => {
  const navigate = useNavigate();
  const storedName = localStorage.getItem("userName") || "???";

  const texts = [
    `หมอ : สวัสดีคุณ${storedName}ตอนนี้เป็นยังไงบ้างครับ`,
    `${storedName} : .....เอ่อ`,
    `หมอ : โชคดีที่เพื่อนสังเกตเห็นถึงอาการผิดปกติ`,
    `หมอ : ที่คุณล้มลงหมดสติไป`,
    `หมอ : อาการเหล่านี้ ล้วนเป็นอาการของ`,
  ];

  const [index, setIndex] = useState(0);
  const [isReady, setIsReady] = useState(false); // ให้กดได้หรือยัง
  const [bgColor, setBgColor] = useState("transparent");

  const nextText = () => {
    setIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      if (newIndex === texts.length - 1) {
        setBgColor("black");
      }
      return newIndex;
    });
  };

  const handleClick = () => {
    if (!isReady) return; // ถ้ายังกดไม่ได้ ให้ข้าม
    setIsReady(false); // ล็อกไว้ก่อน
    if (index < texts.length - 1) {
      nextText();
    } else {
      navigate("/StrokeDetail");
    }
  };

  // ปลดล็อกการแตะหลังข้อความเปลี่ยนไปแล้ว 3 วินาที
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, [index]);

  // Audio
  const audioRef1 = useRef<HTMLAudioElement>(null);
  const audioRef2 = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef1.current) audioRef1.current.volume = 1;
    if (audioRef2.current) audioRef2.current.volume = 1;
  }, []);

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-black">
      <audio
        ref={audioRef1}
        src="/Sound/Hospital Sound/Hospital Ambience.mp3"
        autoPlay
        loop
      />

      <motion.div
        className="relative justify-center items-center w-full h-screen sm:w-[390px] sm:h-[844px]"
        style={{ backgroundColor: bgColor }}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={fadeInOut(2, "easeInOut", 0)}
        onClick={handleClick}
      >
        <img
          src="/gif/37-41/36-40-talktodoc.png"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute bottom-20 my-20 left-1/2 -translate-x-1/2 w-[90%] z-10">
          <div className="px-6 py-4 bg-black/50 rounded-lg">
            {index === 1 ? (
              <AnimatedText2 key={index} text={texts[index]} color="yellow" />
            ) : (
              <AnimatedText key={index} text={texts[index]} className="text-white" />
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hospital2;
