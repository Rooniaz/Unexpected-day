import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatedText } from "../../components/AnimatedText";

const StateHospital: React.FC = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [index, setIndex] = useState(0);
  const [bgColor, setBgColor] = useState("transparent");
  const [showContinueText, setShowContinueText] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false); // <- เพิ่ม state นี้

  const texts = [
    `ตอนนี้คุณอยู่ที่โรงพยาบาล`,
    `"คุณสัมผัสได้ถึงความผิดปกติในร่างกายของตัวเอง”`,
  ];

  const nextText = () => {
    setIndex((prevIndex) =>
      prevIndex < texts.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const handlePicEnd = useCallback(() => {
    setBgColor("black");
    setShowContinueText(true);
  }, []);

  const handleUserInteraction = () => {
    if (videoRef.current && videoRef.current.paused) {
      videoRef.current.play().catch((err) =>
        console.error("เล่นวิดีโอไม่สำเร็จ:", err)
      );
    }
  };

  const handleContinue = () => {
    if (showContinueText) {
      setIsNavigating(true); // ซ่อนวิดีโอก่อน
      navigate("/story/hospital2");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (bgColor !== "black") {
        nextText();
      }
    }, 3000);

    window.addEventListener("touchstart", handleUserInteraction);

    return () => {
      clearInterval(interval);
      window.removeEventListener("touchstart", handleUserInteraction);
    };
  }, [bgColor]);

  const audioRef2 = useRef<HTMLAudioElement>(null);
  const audioRef3 = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef2.current) {
      audioRef2.current.volume = 0.5;
      audioRef2.current.playbackRate = 1;

      setTimeout(() => {
        if (audioRef2.current) {
          audioRef2.current.playbackRate = 1;
        }
      }, 3000);

      setTimeout(() => {
        if (audioRef2.current) {
          audioRef2.current.playbackRate = 1;
        }
      }, 4000);
    }

    if (audioRef3.current) {
      audioRef3.current.play().catch((error) => {
        console.log("ไม่สามารถเล่นเสียงใหม่ได้:", error);
      });
    }
  }, []);

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-black">
      <audio
        ref={audioRef2}
        src="/Sound/Hospital Sound/Hospital Ambience.mp3"
        autoPlay
      />
      <audio ref={audioRef3} src="/Sound/Sound fx/Effect-ear-down.mp3" autoPlay />

      <div
        className="relative flex justify-center items-center 
        w-full h-screen 
        sm:w-[390px] sm:h-[844px] h-[844px] overflow-hidden"
        style={{ backgroundColor: bgColor }}
        onClick={handleContinue}
      >
        {!isNavigating && (
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={handlePicEnd}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          >
            <source src="/gif/34-36/awakeUp.mp4" type="video/webm" />
            <source src="/gif/34-36/34-wakeup.mp4" type="video/mp4" />
            {/* <source src="/video/blurWork.mov" type="video/quicktime" /> */}
            Your browser does not support the video tag.
          </video>
        )}

        {bgColor !== "black" && (
          <div className="absolute top-[10%] my-20 left-1/2 -translate-x-1/2 w-[90%] z-10">
            <div className="px-6 py-4 rounded-lg">
              <AnimatedText
                key={index}
                text={texts[index]}
                className="text-black break-words"
              />
            </div>
          </div>
        )}

        {showContinueText && (
          <div className="absolute inset-x-0 bottom-40 flex justify-center items-center mb-4">
            <div className="text-balck text-xl animate-pulse">กดเพื่อไปต่อ</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StateHospital;
