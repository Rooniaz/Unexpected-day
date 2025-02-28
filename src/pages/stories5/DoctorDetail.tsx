import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInOut } from "../../components/fadeInOut";
import { AnimatedText } from "../../components/AnimatedText";

const DoctorDetail: React.FC = () => {
  const navigate = useNavigate();
  const [showTextBox, setShowTextBox] = useState(false);
  const [index, setIndex] = useState(0);
  const [isClickable] = useState(true);
  const [isLocked, setIsLocked] = useState(false);

  const texts = [
    `หมอ : หากคุณมาโรงพยาบาลได้ทันเวลา
      จะสามารถช่วยลดความรุนแรงและเพิ่มโอกาสรอดชีวิต`,
  ];

  useEffect(() => {
    let interval: ReturnType<typeof setTimeout>;
    if (isLocked && !showTextBox && index >= 3) {
        interval = setInterval(() => {
        setIndex((prev) => {
            if (prev < texts.length - 1) {
            return prev + 1;
            } else {
            clearInterval(interval);
            navigate('/AfterDoctor');
            return prev;
            }
        });
        }, 3000);
    }
    return () => clearInterval(interval);
  }, [isLocked, index, showTextBox, navigate]);

  const handleTextBoxClick = () => {
    setShowTextBox(false);
    setIsLocked(true);
    setIndex((prev) => prev + 1);
  };

  const nextText = () => {
    if (!isClickable || showTextBox || isLocked) return;

    if (index < texts.length - 1) {
      if (index === 2) {
        setShowTextBox(true); // แสดง textbox
      } else {
        setIndex((prev) => prev + 1);
      }
    } else {
      navigate('/AfterDoctor');
    }
  };

      // สร้าง ref สำหรับ audio element
      // const audioRef1 = useRef<HTMLAudioElement>(null);
      const audioRef2 = useRef<HTMLAudioElement>(null);
      // const audioRef3 = useRef<HTMLAudioElement>(null);
  
      useEffect(() => {
          // ตั้งค่า volume หลังจาก component mount
          // if (audioRef1.current) {
          //     audioRef1.current.volume = 0.5;
          // }
          if (audioRef2.current) {
              audioRef2.current.volume = 0.5;
          }
          // if (audioRef3.current) {
          //     audioRef3.current.volume = 0.2;
          // }
      }, []);

  return (
    <div className="w-full min-h-screen bg-black flex justify-center items-center">
              {/* <audio ref={audioRef1} src="/Sound/Hospital Sound/Hospital Busy Ambience Loop.mp3" autoPlay loop /> */}
              <audio ref={audioRef2} src="/Sound/Sound End/Peaceful_Ambient_Piano_full.mp3" autoPlay loop />
  {/* <audio ref={audioRef3} src="/Sound/Hospital Sound/Hospital Busy Ambience Loop.mp3" autoPlay loop /> */}
      <motion.div
        className="relative w-[390px] h-[844px] overflow-hidden"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={fadeInOut(2, "easeInOut", 0)}
        onClick={!showTextBox && isClickable && !isLocked ? nextText : undefined} // 👈 ตรวจสอบการล็อก
      >
        <img
          src="/gif/37-41/36-40-talktodoc.png"
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

        <div className="absolute bottom-[8%] right-6 text-white/80 text-2xl z-20">
          {/* {'>>'} */}
        </div>
      </motion.div>
    </div>
  );
};

export default DoctorDetail;
