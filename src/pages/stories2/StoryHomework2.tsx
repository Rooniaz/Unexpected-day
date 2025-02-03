import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInOut } from "../../components/fadeInOut";
import { AnimatedText } from "../../components/AnimatedText";

const StoryHomeWork2: React.FC = () => {
  const navigate = useNavigate();
  const storedName = localStorage.getItem("userName") || "???";
  const [showTextBox, setShowTextBox] = useState(false);
  const [index, setIndex] = useState(0);

  const texts = [
    `เจน : ${storedName}`,
    `${storedName} : อ.. เอ่ออ`,
    `เจน : ${storedName} แกคิดว่าไง`,
    `${storedName} : อะ อึกอ่วย อะ อดดิพ`,
    "เจน : พูดอะไรอ่ะ",
    "เจน : เห้ย!! ทำไมแกปากเบี้ยวอ่ะ ไม่แกล้งดิ!",
    "เจน : อะ อึกอ่วย อะอ้ำพเึพ้อร",
  ];

  const handleTextBoxClick = () => {
    setShowTextBox(false); // ซ่อน text box
    setIndex(prev => prev + 1); // ไปข้อความถัดไป
  };

  const nextText = () => {
    if (index < texts.length - 1) {
      if (index === 2) { // ถ้าเป็นข้อความ "แกคิดว่าไง"
        setShowTextBox(true); // แสดง text box
      } else {
        setIndex(prev => prev + 1);
      }
    } else {
      navigate('/StoryHomework3'); // ไปหน้าถัดไปเมื่อจบทุกข้อความ
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
        onClick={!showTextBox ? nextText : undefined}
      >
        {/* Background Image */}
        <img
          src="/gif/18-21/jane_class_18-21.gif"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dialog text or Text box */}
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
                className="w-full text-center bg-transparent cursor-pointer text-gray-500"
                onClick={handleTextBoxClick}
              />
            </div>
          </div>
        )}

        {/* Continue Button */}
        <div className="absolute bottom-4 right-4 text-white/80 text-2xl z-20">
          {'>>'}
        </div>
      </motion.div>
    </div>
  );
};

export default StoryHomeWork2;