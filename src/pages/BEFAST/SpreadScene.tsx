import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AfterBefast from "./AfterBefast";
import { useAudio } from "../../contexts/AudioProvider"; // นำเข้า useAudio

const SpreadScene = () => {
  const [isTransitionDone, setIsTransitionDone] = useState(false);
  const [showFirstText, setShowFirstText] = useState(false); // สถานะเพื่อควบคุมการแสดงข้อความบรรทัดแรก
  const [showSecondText, setShowSecondText] = useState(false); // สถานะเพื่อควบคุมการแสดงข้อความบรรทัดที่สอง
  const navigate = useNavigate();

  const text = "เมื่อพบอาการอย่างใดอย่างหนึ่ง ";
  const redText = "ให้รีบส่งโรงพยาบาลด่วน"; // คำที่ต้องการให้เป็นสีแดง

  const container = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  useEffect(() => {
    // รอ 3 วินาทีก่อนแสดงข้อความบรรทัดแรก
    const firstTextTimer = setTimeout(() => {
      setShowFirstText(true);
    }, 3000);

    // รอ 4 วินาที (3 + 1) ก่อนแสดงข้อความบรรทัดที่สอง
    const secondTextTimer = setTimeout(() => {
      setShowSecondText(true);
    }, 4000);

    return () => {
      clearTimeout(firstTextTimer);
      clearTimeout(secondTextTimer);
    };
  }, []);

  // ฟังก์ชันสำหรับการคลิกหรือแตะหน้าจอ
  const handleClick = () => {
    setIsTransitionDone(true);
    setTimeout(() => {
      navigate("/AfterBefast");
    },); // รอ 0.5 วินาทีก่อนเปลี่ยนหน้าเพื่อให้มี animation สมูท
  };

  const { playAudio, pauseAudio } = useAudio();

  useEffect(() => {
    playAudio("/Sound/Scene Start/Start & End.mp3", 0.2); // เล่นเพลงเฉพาะหน้านี้
    return () => pauseAudio(); // หยุดเพลงเมื่อออกจากหน้า
  }, []);

  return (
    <div
      className="w-full min-h-screen flex justify-center items-center bg-black relative"
      onClick={handleClick} // เพิ่ม event listener สำหรับการคลิกหรือแตะหน้าจอ
      style={{ cursor: "pointer" }} // เปลี่ยน cursor เป็น pointer เพื่อให้รู้ว่าสามารถคลิกได้
    >
      {!isTransitionDone ? (
        <motion.div
          className="relative flex justify-center items-center 
        w-full h-screen overflow-y-auto bg-black no-scrollbar
        sm:w-[390px] sm:h-[844px] flex flex-col justify-center items-center 
                     bg-gradient-to-b from-gray-500 via-white to-gray-500 
                     text-white text-2xl px-6 py-2 relative"
        >
          {/* บรรทัดแรก (สีแดง) */}
          {showFirstText && ( // แสดงข้อความบรรทัดแรกเมื่อ showFirstText เป็น true
            <motion.div
              className="text-[#fa4901] text-2xl text-center text-shadow-2xl font-bold 
                          break-words relative z-10 mt-6"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {text}
            </motion.div>
          )}

          {/* บรรทัดที่สอง (สีแดง) */}
          {showSecondText && ( // แสดงข้อความบรรทัดที่สองเมื่อ showSecondText เป็น true
            <motion.div
              className="mt-2 text-[#fa4901] text-2xl font-bold break-words underline 
                        relative z-10"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {redText}
            </motion.div>
          )}

          {/* เส้นสีเทา (ลด bottom) */}
          <div className="w-full sm:w-[390px] h-[46px] bg-[#565656] absolute bottom-[35%] z-0"></div>
        </motion.div>
      ) : (
        <AfterBefast />
      )}
    </div>
  );
};

export default SpreadScene;