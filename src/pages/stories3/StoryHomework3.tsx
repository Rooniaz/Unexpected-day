import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInOut } from "../../components/fadeInOut";
import { AnimatedText } from "../../components/AnimatedText";

const StoryHomework3: React.FC = () => {
  const navigate = useNavigate();

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
       setIndex((prevIndex) => (prevIndex < texts.length - 1 ? prevIndex + 1 : prevIndex));
     };
   
     // ใช้ useEffect สำหรับการเปลี่ยนข้อความทุกๆ 3 วินาที
     useEffect(() => {
       const interval = setInterval(() => {
         nextText(); // เปลี่ยนข้อความทุก 3 วินาที
       }, 3000); // เปลี่ยนข้อความทุก 3 วินาที
   
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
            src="/video/blurStudy.mp4"
            autoPlay
            muted
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            onEnded={() => navigate('/epilogue')} // เมื่อวิดีโอจบ ให้ไปหน้าถัดไป
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

export default StoryHomework3;
