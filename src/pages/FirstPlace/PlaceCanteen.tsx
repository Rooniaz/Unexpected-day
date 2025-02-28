import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInOut } from "../../components/fadeInOut";
import { AnimatedText } from "../../components/AnimatedText";

const PlaceCanteen: React.FC = () => {
  const navigate = useNavigate();

  // ฟังก์ชันนำทางไปหน้าถัดไป
  const goToNext = () => {
    navigate('/story/canteen');
  };

    // สร้าง ref สำหรับ audio element
    const audioRef1 = useRef<HTMLAudioElement>(null);
    // const audioRef2 = useRef<HTMLAudioElement>(null);
    // const audioRef3 = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        // ตั้งค่า volume หลังจาก component mount
        if (audioRef1.current) {
            audioRef1.current.volume = 0.5;
        }
        // if (audioRef2.current) {
        //     audioRef2.current.volume = 0.2;
        // }
        // if (audioRef3.current) {
        //     audioRef3.current.volume = 0.2;
        // }
    }, []);

  return (
    <div className="w-full min-h-screen bg-black flex justify-center items-center">
      <audio ref={audioRef1} src="/Sound/Scene Eating/17061 crowded bar restaurant ambience loop-full.mp3" autoPlay loop />
      <motion.div
        className="relative w-[390px] h-[844px] overflow-hidden"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={fadeInOut(2, "easeInOut", 0)}
        onClick={goToNext} // คลิกที่ไหนก็ไปต่อได้
      >
        {/* Background Image */}
        <img
          src="/gif/Place/canteen.png"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

<div className="absolute inset-0 bg-black/20"></div>

      {/* Dialog text container */}
      <div className="absolute inset-0 flex justify-center items-center z-10">
        <div className="px-6 py-4 rounded-lg">
          <AnimatedText text="ตอนนี้ฉันกำลังกินข้าวอยู่กับเจน" />
        </div>
      </div>

        {/* Continue Button - แสดง UI แต่ไม่ต้องคลิก */}
        <div className="absolute bottom-[8%] right-6 text-white/80 text-2xl z-20">
          {/* {'>>'} */}
        </div>
      </motion.div>
    </div>
  );
};

export default PlaceCanteen;
