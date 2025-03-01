import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatedText } from "../../components/AnimatedText";

const StoryPark3: React.FC = () => {
  const navigate = useNavigate();
  const storedName = localStorage.getItem("userName") || "???";
  const videoRef = useRef<HTMLVideoElement>(null);
  const [index, setIndex] = useState(0);
  const [bgColor, setBgColor] = useState("transparent");
  const [showContinueText, setShowContinueText] = useState(false);

  const texts = [
    `เจน : ${storedName}!!!`,
    `เจน : ${storedName}!!!*&$`,
  ];

  const nextText = () => {
    setIndex((prevIndex) => (prevIndex < texts.length - 1 ? prevIndex + 1 : prevIndex));
  };

  const handlePicEnd = useCallback(() => {
    setBgColor("black");
    setShowContinueText(true); // แสดงข้อความ "แตะเพื่อไปต่อ"
  }, []);

  const handleUserInteraction = () => {
    if (videoRef.current && videoRef.current.paused) {
      videoRef.current.play().catch((err) => console.error("เล่นวิดีโอไม่สำเร็จ:", err));
    }
  };

  const handleContinue = () => {
    if (showContinueText) {
      navigate("/story/hospital");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (bgColor !== "black") { // เรียก nextText เฉพาะเมื่อ bgColor ไม่ใช่สีดำ
        nextText();
      }
    }, 3000);

    window.addEventListener("touchstart", handleUserInteraction);

    return () => {
      clearInterval(interval); // ล้าง interval เมื่อ component unmount
      window.removeEventListener("touchstart", handleUserInteraction);
    };
  }, [bgColor]); // เพิ่ม bgColor เป็น dependency

  const audioRef2 = useRef<HTMLAudioElement>(null);

  if (audioRef2.current) {
    audioRef2.current.volume = 0.5;
    audioRef2.current.playbackRate = 1;

    setTimeout(() => {
      if (audioRef2.current) {
        audioRef2.current.playbackRate = 2;
      }
    }, 3000);

    setTimeout(() => {
      if (audioRef2.current) {
        audioRef2.current.playbackRate = 3;
      }
    }, 4000);
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-black">
      <audio ref={audioRef2} src="/Sound/Sound fx/heart-beat-fast.mp3" autoPlay loop />
      <div
        className="relative w-[390px] h-[844px] overflow-hidden"
        style={{ backgroundColor: bgColor }}
        onClick={handleContinue} // ฟังก์ชันเมื่อผู้ใช้คลิกหรือแตะหน้าจอ
      >
        <video
          ref={videoRef}
          src="/video/blurPark.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={handlePicEnd}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* ซ่อนข้อความเมื่อ bgColor เป็น "black" */}
        {bgColor !== "black" && (
          <div className="absolute bottom-20 my-20 left-1/2 -translate-x-1/2 w-[90%] z-10">
            <div className="px-6 py-4 bg-black/50 rounded-lg">
              <AnimatedText key={index} text={texts[index]} />
            </div>
          </div>
        )}

        {showContinueText && (
          <div className="absolute inset-x-0 bottom-40 flex justify-center items-center mb-4">
            <div className="text-white text-xl animate-pulse">กดเพื่อไปต่อ</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryPark3;