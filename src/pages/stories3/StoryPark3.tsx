import React, { useState, useEffect, useCallback, useRef } from "react";
// import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
// import { fadeInOut } from "../../components/fadeInOut";
import { AnimatedText } from "../../components/AnimatedText";

const StoryPark3: React.FC = () => {
  const navigate = useNavigate();
  const storedName = localStorage.getItem("userName") || "???";
  const videoRef = useRef<HTMLVideoElement>(null); // ใช้ ref เพื่อควบคุมวิดีโอ

  const texts = [
    `เจน : ${storedName}!!!`,
    `เจน : ${storedName}!!!*&$`,
  ];

  const [index, setIndex] = useState(0);
  const [bgColor, setBgColor] = useState("transparent");

  const nextText = () => {
    setIndex((prevIndex) => (prevIndex < texts.length - 1 ? prevIndex + 1 : prevIndex));
  };

  const handlePicEnd = useCallback(() => {
    setBgColor("black");
    nextText();
    setTimeout(() => navigate("/story/hospital"), 1000);
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

 const audioRef2 = useRef<HTMLAudioElement>(null); // heartbeat audio ref
  
  if (audioRef2.current) {
      audioRef2.current.volume = 0.5;
      audioRef2.current.playbackRate = 1; // เริ่มด้วยความเร็วปกติ

      // หลัง 3 วินาที เพิ่มความเร็วเป็น 2 เท่า
      setTimeout(() => {
        if (audioRef2.current) {
          audioRef2.current.playbackRate = 2;
        }
      }, 3000);

      // หลังจากนั้นอีก 3 วินาที (รวม 6 วินาที) เพิ่มเป็น 3 เท่า
      setTimeout(() => {
        if (audioRef2.current) {
          audioRef2.current.playbackRate = 3;
        }
      }, 4000);
    }


  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-black">
                      {/* เพิ่มเพลงในหน้า */}
                      <audio ref={audioRef2} src="/Sound/Sound fx/Heartbeat.mp3" autoPlay loop />

      <div
        className="relative w-[390px] h-[844px] overflow-hidden"
        style={{ backgroundColor: bgColor }}
        // initial="initial"
        // animate="animate"
        // exit="exit"
        // variants={fadeInOut(2, "easeInOut", 0)}
      >
        <video
          ref={videoRef} // อ้างอิงวิดีโอ
          src="/video/blurPark.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={handlePicEnd}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        <div className="absolute bottom-20 my-20 left-1/2 -translate-x-1/2 w-[90%] z-10">
          <div className="px-6 py-4 bg-black/50 rounded-lg">
            <AnimatedText key={index} text={texts[index]} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default StoryPark3;
