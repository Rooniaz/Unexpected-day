import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeInOut } from "../../components/fadeInOut";
import { AnimatedText } from "../../components/AnimatedText";

const StoryCanteen3: React.FC = () => {
  // ดึงชื่อจาก localStorage ถ้ามีค่า
  const storedName = localStorage.getItem("userName") || "???";

  // ข้อความที่ต้องการแสดงในลำดับ (แทนที่ {ชื่อที่กรอก} ด้วยค่าจริง)
  const texts = [
    `เจน : ${storedName}!!!`,
    `เจน : ${storedName}!!!*&$`,
  ];

  // ตัวแปร state สำหรับเก็บตำแหน่งข้อความที่แสดง
  const [index, setIndex] = useState(0);

  // ฟังก์ชันเปลี่ยนข้อความ
  const nextText = () => {
    setIndex((prevIndex) => {
      if (prevIndex < texts.length - 1) {
        return prevIndex + 1;
      } else {
        // หยุดเมื่อถึงข้อความสุดท้าย
        return prevIndex;
      }
    });
  };

  // ฟังก์ชันที่ใช้เมื่อวีดีโอจบ
  const handleVideoEnd = () => {
    nextText(); // เปลี่ยนข้อความเมื่อวีดีโอจบ
  };

  // ใช้ useEffect สำหรับการเปลี่ยนข้อความทุกๆ 3 วินาที
  useEffect(() => {
    const interval = setInterval(() => {
      nextText(); // เปลี่ยนข้อความทุก 3 วินาที
    }, 3000);

    // ล้าง interval เมื่อ component ถูก unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full min-h-screen bg-black flex justify-center items-center">
      {/* Mobile-sized container */}
      <motion.div
        className="relative w-[390px] h-[844px] overflow-hidden"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={fadeInOut(2, "easeInOut", 0)}
      >
        {/* Background Video */}
        <video
          src="/video/blurCanteen.mp4"
          autoPlay
          muted
          onEnded={handleVideoEnd} // เพิ่ม event handler เมื่อวีดีโอจบ
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

export default StoryCanteen3;
