import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { fadeInOut } from "../../components/fadeInOut";
import { AnimatedText } from "../../components/AnimatedText";

const Hospital1: React.FC = () => {
  const navigate = useNavigate();
  const storedName = localStorage.getItem("userName") || "???";

  const texts = [
    `${storedName} : นี่เราร่างกายรู้สึกไม่ดีเลย`,
    `${storedName} : มันเกิดอะไรขึ้น ทำไมเราถึงเป็นแบบนี้`,
  ];

  const [index, setIndex] = useState(0);
  const [bgColor, setBgColor] = useState("transparent");
  const [isClickable, setIsClickable] = useState(false); // State เพื่อควบคุมการคลิก

  const nextText = () => {
    setIndex((prevIndex) => {
      if (prevIndex < texts.length - 1) {
        return prevIndex + 1;
      } else {
        return prevIndex;
      }
    });
  };

  const handleVideoEnd = useCallback(() => {
    setBgColor("black"); // เปลี่ยนพื้นหลังเป็นสีดำ
    nextText(); // เปลี่ยนข้อความ

    // ตั้งเวลา 1 วินาทีหลังจากนั้นให้เปิดให้คลิก
    setTimeout(() => {
      setIsClickable(true); // เปิดให้คลิกได้หลังจากข้อความแสดงครบ
    }, 2000); // รอ 1 วินาทีหลังจากแสดงข้อความ
  }, []);

  const handleClick = () => {
    if (isClickable && index === texts.length - 1) {
      navigate("/story/hospital2"); // เปลี่ยนหน้าไปยังหน้าถัดไป (แทนที่ "/nextPage" ด้วย URL ที่คุณต้องการ)
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextText();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      {/* Mobile-sized container */}
      <motion.div
        className="relative w-[390px] h-[844px] overflow-hidden"
        style={{ backgroundColor: bgColor }}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={fadeInOut(2, "easeInOut", 0)}
        onClick={handleClick} // คลิกที่ container นี้เพื่อเปลี่ยนหน้า
      >
        {/* Background Video */}
        <video
          src="/gif/34-36/34-wakeup.mp4"
          autoPlay
          muted
          onEnded={handleVideoEnd}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Dialog text container */}
        <div className="absolute bottom-20 my-20 left-1/2 -translate-x-1/2 w-[90%] z-10">
          <div className="px-6 py-4 bg-black/50 rounded-lg">
            <AnimatedText key={index} text={texts[index]} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hospital1;
