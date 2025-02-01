import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { fadeInOut } from "../../components/fadeInOut";
import { AnimatedText } from "../../components/AnimatedText";

const Hospital2: React.FC = () => {
  const navigate = useNavigate();
  const storedName = localStorage.getItem("userName") || "???";

  const texts = [
    `หมอ : สวัสดีคุณ${storedName}ตอนนี้เป็นยังไงบ้างครับ`,
    `${storedName} : !!?`,
    `หมอ : คุณโชคดีที่เห็นถึงอาการผิดปกติ`,
    `หมอ : ที่คุณล้มลงหมดสติไป`,
    `หมอ : อาการเหล่านี้ ล้วนเป็นอาการของ`,
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

    // ตั้งเวลา 2 วินาทีหลังจากนั้นให้เปิดให้คลิก
    setTimeout(() => {
      setIsClickable(true); // เปิดให้คลิกได้หลังจากข้อความแสดงครบ
    }, 2000); // รอ 2 วินาทีหลังจากแสดงข้อความ
  }, []);

  const handleClick = () => {
    if (isClickable && index === texts.length - 1) {
      navigate("/nextPage"); // เปลี่ยนหน้าไปยังหน้าถัดไป (แทนที่ "/nextPage" ด้วย URL ที่คุณต้องการ)
    }
  };

  useEffect(() => {
    // เปลี่ยนข้อความตามเวลาที่กำหนด
    const interval = setInterval(() => {
      if (index < texts.length - 1) {
        nextText();
      } else {
        clearInterval(interval);
        handleVideoEnd(); // เมื่อครบข้อความทั้งหมดแล้วให้ดำเนินการต่อ
      }
    }, 3000); // เปลี่ยนข้อความทุกๆ 3 วินาที

    return () => clearInterval(interval);
  }, [index, handleVideoEnd]);

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

        {/* Additional Background Image */}
        <img
          src="/gif/37-41/36-40-talktodoc.png"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
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

export default Hospital2;
