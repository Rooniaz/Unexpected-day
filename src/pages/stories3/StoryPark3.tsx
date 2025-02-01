import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // ใช้สำหรับการเปลี่ยนหน้า
import { fadeInOut } from "../../components/fadeInOut";
import { AnimatedText } from "../../components/AnimatedText";

const StoryPark3: React.FC = () => {
 const navigate = useNavigate(); // สร้าง instance ของ useNavigate
  const storedName = localStorage.getItem("userName") || "???";

  const texts = [
    `เจน : ${storedName}!!!`,
    `เจน : ${storedName}!!!*&$`,
  ];

  const [index, setIndex] = useState(0);
  const [bgColor, setBgColor] = useState("transparent");

  const nextText = () => {
    setIndex((prevIndex) => {
      if (prevIndex < texts.length - 1) {
        return prevIndex + 1;
      } else {
        return prevIndex;
      }
    });
  };

  const handlePicEnd = useCallback(() => {
    setBgColor("black"); // เปลี่ยนพื้นหลังเป็นสีดำ
    nextText(); // เปลี่ยนข้อความ

    // ตั้งเวลา 1 วินาทีหลังจากนั้นให้เปลี่ยนหน้า
    setTimeout(() => {
      navigate("/story/hospital"); // เปลี่ยนหน้าไปยังหน้าถัดไป (แทนที่ "/nextPage" ด้วย URL ที่คุณต้องการ)
    }, 2000);
  }, [navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextText();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-black">
      {/* Mobile-sized container */}
      <motion.div
        className="relative w-[390px] h-[844px] overflow-hidden"
        style={{ backgroundColor: bgColor }}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={fadeInOut(2, "easeInOut", 0)}
      >
        {/* Background Video */}
        <video
          src="/video/blurPark.mp4"
          autoPlay
          muted
          onEnded={handlePicEnd}
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
export default StoryPark3;
