import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { fadeInOut } from "../../components/fadeInOut";
import { AnimatedText2 } from "../../components/AnimatedText";
// import { useAudio } from "../../contexts/AudioProvider";

const Hospital1: React.FC = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);

  const texts = [
    `ตอนนี้คุณอยู่ที่โรงพยาบาล`,
    `"คุณสัมผัสได้ถึงความผิดปกติในร่างกายของตัวเอง”`,
  ];

  const [index, setIndex] = useState(0);
  const [bgColor, setBgColor] = useState("transparent");
  const [videoEnded, setVideoEnded] = useState(false); // เก็บสถานะวิดีโอจบหรือยัง

  const handleClick = () => {
    if (index < texts.length - 1) {
      setIndex(index + 1); // ไปยังข้อความถัดไป
    } else if (videoEnded) {
      navigate("/story/hospital2"); // เปลี่ยนหน้าเมื่อแตะหลังวิดีโอจบ
    }
  };

  const handleVideoEnd = useCallback(() => {
    setBgColor("black");
    setVideoEnded(true);
    // รอ 6 วินาทีหลังวิดีโอจบ (ถ้าแตะข้อความสุดท้ายแล้วค่อย navigate ใน handleClick)
  }, []);

  const handleUserInteraction = () => {
    if (videoRef.current && videoRef.current.paused) {
      videoRef.current.play().catch((err) => console.error("เล่นวิดีโอไม่สำเร็จ:", err));
    }
  };

  useEffect(() => {
    window.addEventListener("touchstart", handleUserInteraction);
    return () => window.removeEventListener("touchstart", handleUserInteraction);
  }, []);

  // ตั้งค่าเสียง
  const audioRef1 = useRef<HTMLAudioElement>(null);
  const audioRef2 = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef1.current) audioRef1.current.volume = 1;
    if (audioRef2.current) audioRef2.current.volume = 1;
  }, []);

  return (
    <div
      className="w-full min-h-screen flex justify-center items-center bg-black"
      onClick={handleClick} // แตะหน้าจอเพื่อไปยังข้อความถัดไป
    >
      <audio ref={audioRef1} src="/Sound/Hospital Sound/Hospital Ambience.mp3" autoPlay loop />
      {/* <audio ref={audioRef2} src="/Sound/Hospital Sound/Sound Bg Hospital.mp3" autoPlay loop /> */}

      <motion.div
        className="relative justify-center items-center w-full h-screen sm:w-[390px] sm:h-[844px]"
        style={{ backgroundColor: bgColor }}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={fadeInOut(2, "easeInOut", 0)}
      >
        <video
          ref={videoRef}
          src="/gif/34-36/34-wakeup.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={handleVideoEnd}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        <div className="absolute top-20 my-20 left-1/2 -translate-x-1/2 w-[90%] z-10">
          <div className="px-6 py-4 rounded-lg break-words">
            <AnimatedText2 key={index} text={texts[index]} color="black" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hospital1;
