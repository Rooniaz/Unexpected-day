import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInOut } from "../../components/fadeInOut";
import { AnimatedText } from "../../components/AnimatedText";

const StoryPark2: React.FC = () => {
  const navigate = useNavigate();
  const storedName = localStorage.getItem("userName") || "???";
  const [showTextBox, setShowTextBox] = useState(false);
  const [index, setIndex] = useState(0);
  const [isClickable] = useState(true);
  const [isLocked, setIsLocked] = useState(false); // 🔒 ตัวแปรสำหรับล็อกไม่ให้คลิก

  const texts = [
    `เจน : ${storedName}`,
    `${storedName} : อ.. เอ่ออ`,
    `เจน : ${storedName} แกคิดว่าไง`,
    `${storedName} : อะ อึกอ่วย อะ อดดิพ`,
    "เจน : พูดอะไรอ่ะ",
    "เจน : เห้ย!! ทำไมแกปากเบี้ยวอ่ะ ไม่แกล้งดิ!",
    "เจน : อะ อึกอ่วย อะอ้ำพเึพ้อร",
  ];

  useEffect(() => {
    let interval: ReturnType<typeof setTimeout>;
    if (isLocked && !showTextBox && index >= 3) {
      // เริ่มแสดงข้อความอัตโนมัติหลังจาก index 3
      interval = setInterval(() => {
        setIndex((prev) => {
          if (prev < texts.length - 1) {
            return prev + 1;
          } else {
            clearInterval(interval);
            navigate('/StoryHomework3'); // ไปหน้าต่อไปเมื่อจบข้อความ
            return prev;
          }
        });
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isLocked, index, showTextBox, navigate]);

  const handleTextBoxClick = () => {
    setShowTextBox(false);
    setIsLocked(true); // 🔒 ล็อกไม่ให้คลิกหน้าจออีก
    setIndex((prev) => prev + 1);
  };

  const nextText = () => {
    if (!isClickable || showTextBox || isLocked) return; // ❌ ป้องกันการคลิกเมื่อถูกล็อก

    if (index < texts.length - 1) {
      if (index === 2) {
        setShowTextBox(true); // แสดง textbox
      } else {
        setIndex((prev) => prev + 1);
      }
    } else {
      navigate('/StoryPark3');
    }
  };

  return (
    <div className="w-full min-h-screen bg-black flex justify-center items-center">
      <motion.div
        className="relative w-[390px] h-[844px] overflow-hidden"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={fadeInOut(2, "easeInOut", 0)}
        onClick={!showTextBox && isClickable && !isLocked ? nextText : undefined} // 👈 ตรวจสอบการล็อก
      >
        <img
          src="/gif/18-21/jane_park_18-21.gif"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {!showTextBox ? (
          <div className="absolute bottom-20 my-20 left-1/2 -translate-x-1/2 w-[90%] z-10">
            <div className="px-6 py-4 bg-black/50 rounded-lg">
              <AnimatedText key={index} text={texts[index]} />
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

        <div className="absolute bottom-4 right-4 text-white/80 text-2xl z-20">
          {'>>'}
        </div>
      </motion.div>
    </div>
  );
};

export default StoryPark2;
