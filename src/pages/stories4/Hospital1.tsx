import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { fadeInOut } from "../../components/fadeInOut";
import { AnimatedText } from "../../components/AnimatedText";

const Hospital1: React.FC = () => {
  const navigate = useNavigate();
  const storedName = localStorage.getItem("userName") || "???";
  const videoRef = useRef<HTMLVideoElement>(null); // ใช้ ref เพื่อควบคุมวิดีโอ

  const texts = [
    `${storedName} : นี่เราร่างกายรู้สึกไม่ดีเลย`,
    `${storedName} : มันเกิดอะไรขึ้น ทำไมเราถึงเป็นแบบนี้`,
  ];

  const [index, setIndex] = useState(0);
  const [bgColor, setBgColor] = useState("transparent");

  const nextText = () => {
    setIndex((prevIndex) => (prevIndex < texts.length - 1 ? prevIndex + 1 : prevIndex));
  };

  const handleVideoEnd = useCallback(() => {
    setBgColor("black"); // เปลี่ยนพื้นหลังเป็นสีดำ
    nextText(); // เปลี่ยนข้อความ
    setTimeout(() => navigate("/story/hospital2"), 1000); // เปลี่ยนหน้าไปยังหน้าถัดไป
  }, [navigate]);

  // ฟังก์ชันเริ่มเล่นวิดีโอเมื่อผู้ใช้แตะหน้าจอ
  const handleUserInteraction = () => {
    if (videoRef.current && videoRef.current.paused) {
      videoRef.current.play().catch((err) => console.error("เล่นวิดีโอไม่สำเร็จ:", err));
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextText();
    }, 3000);

    // ฟัง Event การแตะหน้าจอ
    window.addEventListener("touchstart", handleUserInteraction);

    return () => {
      clearInterval(interval);
      window.removeEventListener("touchstart", handleUserInteraction);
    };
  }, []);

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-black">
                                  {/* เพิ่มเพลงในหน้า */}
                                  <audio src="/Sound/Hospital Sound/Hospital Busy Ambience Loop.mp3" autoPlay loop />
      <motion.div
        className="relative w-[390px] h-[844px] overflow-hidden"
        style={{ backgroundColor: bgColor }}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={fadeInOut(2, "easeInOut", 0)}
      >
        <video
          ref={videoRef} // อ้างอิงวิดีโอ
          src="/gif/34-36/34-wakeup.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={handleVideoEnd}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        <div className="absolute bottom-20 my-20 left-1/2 -translate-x-1/2 w-[90%] z-10">
          <div className="px-6 py-4 bg-black/50 rounded-lg">
            <AnimatedText key={index} text={texts[index]} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hospital1;