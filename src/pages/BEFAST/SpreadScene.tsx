import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AfterBefast from "./AfterBefast";

const SpreadScene = () => {
  const [isTransitionDone, setIsTransitionDone] = useState(false);
  const navigate = useNavigate();

  const text = "เมื่อพบอาการอย่างใดอย่างหนึ่งให้";
  const redText = "รีบ"; // คำที่ต้องการให้เป็นสีแดง

  const container = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.1 },
    },
  };

  // ประกาศ useRef สำหรับ audio
  const audioRef2 = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef2.current) {
      audioRef2.current.volume = 0.5; // ตั้งค่า volume ของ audio
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitionDone(true);
      setTimeout(() => {
        // navigate("/AfterBefast");
      },); // 2 วินาทีก่อนเปลี่ยนหน้า
    }, 6000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-black">
      <audio ref={audioRef2} src="/Sound/Scene Start/For Education - Full.mp3" autoPlay loop />

      {!isTransitionDone ? (
        <motion.div
          initial="hidden"
          animate="show"
          exit="hidden"
          variants={container}
          className="w-[390px] h-[844px] flex flex-col justify-center items-center bg-gradient-to-b from-gray-500 via-white to-gray-500 text-white text-3xl font-custom px-6 py-2"
        >
          {/* บรรทัดแรก */}
          <div className="flex flex-row text-[#696969] justify-center items-center text-center text-shadow-2xl">
            {text.split("").map((char, index) => (
              <motion.span key={index} variants={letter}>
                {char}
              </motion.span>
            ))}
          </div>

          {/* บรรทัดที่สอง (สีแดง) */}
          <motion.div className="mt-2 text-red-500 text-4xl font-bold" variants={letter}>
            {redText}
          </motion.div>
        </motion.div>
      ) : (
        <AfterBefast />
      )}
    </div>
  );
};

export default SpreadScene;
