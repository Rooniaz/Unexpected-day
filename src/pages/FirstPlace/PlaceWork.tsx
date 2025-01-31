import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInOut } from "../../components/fadeInOut";
import { AnimatedText } from "../../components/AnimatedText";

const PlaceWork: React.FC = () => {
  const navigate = useNavigate();

  // ฟังก์ชันนำทางไปหน้าถัดไป
  const goToNext = () => {
    navigate('/story/work');
  };

  return (
    <div className="w-full min-h-screen bg-black flex justify-center items-center">
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
          src="/gif/Place/office.png"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dialog text container */}
        <div className="absolute bottom-20 my-20 left-1/2 -translate-x-1/2 w-[90%] z-10">
          <div className="px-6 py-4 bg-black/50 rounded-lg">
            <AnimatedText text="ตอนนี้ฉันกำลังกินข้าวอยู่กับเจน" />
          </div>
        </div>

        {/* Continue Button - แสดง UI แต่ไม่ต้องคลิก */}
        <div className="absolute bottom-4 right-4 text-white/80 text-2xl z-20">
          {'>>'}
        </div>
      </motion.div>
    </div>
  );
};

export default PlaceWork;
