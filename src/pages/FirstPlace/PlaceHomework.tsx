import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInOut } from "../../components/fadeInOut";
import { AnimatedText } from "../../components/AnimatedText";

const PlaceHomework: React.FC = () => {
  const navigate = useNavigate();
  const [showNextScene, setShowNextScene] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const audioRef1 = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef1.current) {
      audioRef1.current.volume = 0.5;
    }
  }, []);

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setShowNextScene(true);

    setTimeout(() => {
      navigate("/story/homework");
    }, 2000); // ปรับให้พอดีกับ GIF
  };

    return (
      <div className="w-full min-h-screen bg-black flex justify-center items-center">
              <audio ref={audioRef1} src="/Sound/Scene Study/Scene Studying.mp3" autoPlay loop />
              <motion.div
        className="relative w-[390px] h-[844px] overflow-hidden"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={fadeInOut(2, "easeInOut", 0)}
        onClick={goToNext}
      >
        <AnimatePresence mode="wait">
          {showNextScene ? (
            // GIF Transition (ซ้อนทับแบบ smooth)
            <motion.img
              key="gif"
              src="/gif/22-25/Class-blink.gif"
              alt="Transition"
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          ) : (
            <>
              <motion.img
                key="background"
                src="/gif/Place/class.png"
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
              <div className="absolute inset-0 bg-black/20"></div>

              <div className="absolute inset-0 flex justify-center items-center z-10">
                <div className="px-6 py-4 rounded-lg">
                  <AnimatedText text="ตอนนี้คุณกำลังเรียนอยู่กับเจน" className="text-white "/>
                </div>
              </div>
            </>
          )}
        </AnimatePresence>

        {/* ป้องกันการคลิกซ้ำระหว่าง transitions*/}
        {!showNextScene && (
        <motion.div
            className="absolute inset-x-0 bottom-40 flex justify-center items-center mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 3 }} // หน่วงเวลา 1.5 วินาทีก่อนขึ้น
          >
            <div className="text-white text-xl animate-pulse">กดเพื่อไปต่อ</div>
          </motion.div>
          )}
      </motion.div>
    </div>
  );
};

export default PlaceHomework;
