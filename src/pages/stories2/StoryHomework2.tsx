import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInOut } from "../../components/fadeInOut";
import { AnimatedText } from "../../components/AnimatedText";
  
  const StoryCanteen: React.FC = () => {
 const navigate = useNavigate();

 // ดึงชื่อจาก localStorage ถ้ามีค่า
 const storedName = localStorage.getItem("userName") || "???";

 // ข้อความที่ต้องการแสดงในลำดับ (แทนที่ {ชื่อที่กรอก} ด้วยค่าจริง)
 const texts = [
 `เจน : ${storedName}`,
 `${storedName} : อ.. เอ่ออ`,
 `เจน : ${storedName} แกคิดว่าไง`,
   " . . . . . . . . . . . .",
 `${storedName} : อะ อึกอ่วย อะ อดดิพ`,
 "เจน : พูดอะไรอ่ะ",
 "เจน : เห้ย!! ทำไมแกปากเบี้ยวอ่ะ ไม่แกล้งดิ!",
 "เจน : อะ อึกอ่วย อะอ้ำพเึพ้อร",

 ];

 // ตัวแปร state สำหรับเก็บตำแหน่งข้อความที่แสดง
 const [index, setIndex] = useState(0);

 // ฟังก์ชันเปลี่ยนข้อความ
 const nextText = () => {
   setIndex((prevIndex) => (prevIndex < texts.length - 1 ? prevIndex + 1 : prevIndex));
 };

 // ใช้ useEffect สำหรับการเปลี่ยนหน้าเมื่อ index ถึงข้อความสุดท้าย
 useEffect(() => {
   if (index === texts.length - 1) {
     navigate('/StoryHomework3'); // นำไปหน้าอื่นหลังจากแสดงข้อความสุดท้าย
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
         src="/gif/18-21/jane_class_18-21.gif"
         alt="Background"
         className="absolute inset-0 w-full h-full object-cover"
       />

       {/* Dialog text container */}
       <div className="absolute bottom-20 my-20 left-1/2 -translate-x-1/2 w-[90%] z-10">
         <div className="px-6 py-4 bg-black/50 rounded-lg">
           <AnimatedText key={index} text={texts[index]} />
         </div>
       </div>

       {/* Continue Button - Bottom right */}
       <div
         onClick={nextText}
         className="absolute bottom-4 right-4 text-white/80 text-2xl cursor-pointer hover:text-white/100 z-20"
       >
         {'>>'}
       </div>
     </motion.div>
   </div>
 );
};
    
  export default StoryCanteen;