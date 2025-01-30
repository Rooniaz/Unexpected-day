import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInOut } from "../../components/fadeInOut";
import { AnimatedText } from "../../components/AnimatedText";

const StoryCanteen: React.FC = () => {
  const navigate = useNavigate();

  // ข้อความที่ต้องการแสดงในลำดับ
  const texts = [
    "เจน : แก พรุ่งนี้วันหยุดไปเที่ยวกันไหมคิดว่าแกน่าจะชอบนะ",
    "ฉัน : ไม่อ่ะ ช่วงนี้ยุ่งๆอยู่ด้วย",
    "เจน : ไปเหอะ",
    " . . . . . . . . . . . .",
    "ฉันจึงกลับมาคิดเรื่องนี้หลังจากจบบทสนทนาลง"
  ];

  // ตัวแปร state สำหรับเก็บตำแหน่งข้อความที่แสดง
  const [index, setIndex] = useState(0);

  // ฟังก์ชันเปลี่ยนข้อความ
  const nextText = () => {
    setIndex((prevIndex) => {
      if (prevIndex < texts.length - 1) {
        return prevIndex + 1; // ถ้ามีข้อความถัดไป ให้เพิ่ม index
      } else {
        return prevIndex; // ถ้าถึงข้อความสุดท้าย ไม่ต้องทำอะไร
      }
    });
  };

  // ใช้ useEffect สำหรับการเปลี่ยนหน้าเมื่อ index ถึงข้อความสุดท้าย
  useEffect(() => {
    if (index === texts.length - 1) {
      navigate('/story/canteen2'); // นำไปหน้าอื่นหลังจากแสดงข้อความสุดท้าย
    }
  }, [index, navigate]); // useEffect นี้จะถูกเรียกเมื่อ index เปลี่ยนแปลง

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
        {/* Background Image */}
        <img
          src="/gif/canteen_15-17.gif"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dialog text container */}
        <div className="absolute bottom-20 my-20 left-1/2 -translate-x-1/2 w-[90%] z-10">
          <div className="px-6 py-4 bg-black/50 rounded-lg">
            <AnimatedText
              key={index} // ใช้ key เพื่อให้ AnimatedText รีเรนเดอร์ใหม่ทุกครั้งที่ index เปลี่ยน
              text={texts[index]} // ใช้ข้อความจาก texts ตามตำแหน่ง index
            />
          </div>
        </div>

        {/* Continue Button - Bottom right */}
        <div
          onClick={nextText} // คลิกที่ปุ่มเพื่อเปลี่ยนข้อความ
          className="absolute bottom-4 right-4 text-white/80 text-2xl cursor-pointer hover:text-white/100 z-20"
        >
          {'>>'}
        </div>
      </motion.div>
    </div>
  );
};

export default StoryCanteen;
