import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInOut } from "../../components/fadeInOut";
import { AnimatedText, AnimatedText2 } from "../../components/AnimatedText";

const StoryWork: React.FC = () => {
  const navigate = useNavigate();

  // ดึงชื่อจาก localStorage ถ้ามีค่า
  const storedName = localStorage.getItem("userName") || "???";

  // ข้อความที่ต้องการแสดงในลำดับ (แทนที่ {ชื่อที่กรอก} ด้วยค่าจริง)
  const texts = [
    `เจน : ${storedName} ช่วงนี้ว่างมั้ย ไปฟิตเนสกัน`,
    `${storedName} : ไม่อ่ะ ไม่ชอบเหงื่อเยอะ`,
    "เจน : หาเวลาออกกำลังกายบ้างเถอะเดี๋ยวป่วยนะ"
  ];

  // ตัวแปร state สำหรับเก็บตำแหน่งข้อความที่แสดง
  const [index, setIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false); // ใช้ track การเปลี่ยนข้อความ

  // ฟังก์ชันเปลี่ยนข้อความ
  const nextText = () => {
    if (!isChanging) {
      setIsChanging(true);
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex < texts.length - 1 ? prevIndex + 1 : prevIndex));
        setIsChanging(false); // เปิดให้สามารถคลิกเพื่อเปลี่ยนข้อความได้อีก
      }, 500); // เพิ่มดีเลย์ที่ 500ms ก่อนจะเปลี่ยนข้อความ
    }
  };

  // ใช้ useEffect สำหรับการเปลี่ยนหน้าเมื่อ index ถึงข้อความสุดท้าย
  useEffect(() => {
    if (index === texts.length - 1) {
      // เพิ่มดีเลย์ก่อนที่จะนำทางไปหน้าถัดไป
      setTimeout(() => {
        navigate('/story/work2'); // นำไปหน้าอื่นหลังจากแสดงข้อความสุดท้าย
      }, 4000); // ดีเลย์ 1 วินาทีเพื่อให้ข้อความสุดท้ายแสดง
    }
  }, [index, navigate]); // useEffect นี้จะถูกเรียกเมื่อ index เปลี่ยนแปลง

  // สร้าง ref สำหรับ audio element
  const audioRef1 = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // ตั้งค่า volume หลังจาก component mount
    if (audioRef1.current) {
      audioRef1.current.volume = 1.0;
    }
  }, []);

  return (
    <div className="w-full min-h-screen bg-black flex justify-center items-center">
      {/* เพิ่มเพลงในหน้า */}
      <audio ref={audioRef1} src="/Sound/Scene Working/Scene Working.mp3" autoPlay loop />
      
      {/* Mobile-sized container */}
      <motion.div
        className="relative w-[390px] h-[844px] overflow-hidden"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={fadeInOut(2, "easeInOut", 0)}
        onClick={nextText}
      >
        {/* Background Image */}
        <img
          src="/gif/15-17/office_15-17.gif"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dialog text container */}
        <div className="absolute bottom-20 my-20 left-1/2 -translate-x-1/2 w-[90%] z-10">
          <div className="px-6 py-4 bg-black/50 rounded-lg">
            {/* กำหนดว่าจะใช้ AnimatedText หรือ AnimatedText2 */}
            {index % 2 === 0 ? (
              <AnimatedText 
                key={index} 
                text={texts[index]} 
                className="text-white break-words"
              />
            ) : (
              <AnimatedText2 
                key={index} 
                text={texts[index]} 
                color="yellow"  // เปลี่ยนสีข้อความเป็นสีน้ำเงิน
              />
            )}
          </div>
        </div>

        {/* Continue Button - Bottom right */}
        <div
          className="absolute bottom-[8%] right-6 text-white/80 text-2xl cursor-pointer hover:text-white/100 z-20"
        >
          {/* {'>>'} */}
        </div>
      </motion.div>
    </div>
  );
};

export default StoryWork;
