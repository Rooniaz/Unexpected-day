import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { fadeInOut } from "../../components/fadeInOut";
import { AnimatedText2 } from "../../components/AnimatedText";

const Hospital1: React.FC = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);

  const texts = [
    `ตอนนี้คุณอยู่ที่โรงพยาบาล`,
    `"คุณสัมผัสได้ถึงความผิดปกติในร่างกายของตัวเอง”`,
  ];

  const [index, setIndex] = useState(0);
  const [bgColor, setBgColor] = useState("transparent");
  const [videoStarted, setVideoStarted] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false); // <--- เพิ่มตัวนี้
  const [videoError, setVideoError] = useState(false);
  const [showFallbackMessage, setShowFallbackMessage] = useState(false);
  const [isReadyToProceed, setIsReadyToProceed] = useState(false);

  const nextText = () => {
    setIndex((prevIndex) =>
      prevIndex < texts.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const handleProceed = () => {
    if (isReadyToProceed) {
      navigate("/story/hospital2");
    }
  };

  const handleVideoEnd = useCallback(() => {
    console.log("วิดีโอจบแล้ว");
    setVideoEnded(true); // <--- ตั้งค่าไว้ว่าเล่นจบแล้ว
    setBgColor("black");
    nextText();
    setIsReadyToProceed(true);
  }, []);

  useEffect(() => {
    const tryPlayVideo = () => {
      if (videoRef.current) {
        videoRef.current
          .play()
          .then(() => {
            console.log(" วิดีโอเริ่มเล่นอัตโนมัติ");
            setVideoStarted(true);
          })
          .catch((err) => {
            console.warn("วิดีโอรอการโต้ตอบจากผู้ใช้", err);
          });
      }
    };

    tryPlayVideo();

    const timeout = setTimeout(() => {
      if (!videoStarted) {
        console.warn("fallback: วิดีโอไม่เล่นภายใน 5 วิ");
        setShowFallbackMessage(true);
        setBgColor("black");
        nextText();
        setIsReadyToProceed(true);
      }
    }, 6000);

    const handleUserInteraction = () => {
      if (isReadyToProceed) {
        handleProceed();
      } else if (
        videoRef.current &&
        videoRef.current.paused &&
        !videoEnded // <--- ห้ามเล่นซ้ำถ้าจบแล้ว
      ) {
        videoRef.current
          .play()
          .then(() => setVideoStarted(true))
          .catch((err) => {
            console.error("เล่นวิดีโอไม่สำเร็จ:", err);
            setVideoError(true);
          });
      }
    };

    window.addEventListener("touchstart", handleUserInteraction);
    window.addEventListener("click", handleUserInteraction);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("touchstart", handleUserInteraction);
      window.removeEventListener("click", handleUserInteraction);
    };
  }, [isReadyToProceed, videoStarted, videoEnded]);

  // เพิ่มเสียง ambience
  const audioRef1 = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef1.current) {
      audioRef1.current.volume = 1;
    }
  }, []);

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-black">
      <audio
        ref={audioRef1}
        src="/Sound/Hospital Sound/Hospital Ambience.mp3"
        autoPlay
        loop
      />

      <motion.div
        className="relative justify-center items-center w-full h-screen sm:w-[390px] sm:h-[844px]"
        style={{ backgroundColor: bgColor }}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={fadeInOut(2, "easeInOut", 0)}
      >
        {/* วิดีโอ */}
        <video
          ref={videoRef}
          src="/gif/34-36/34-wakeup.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={handleVideoEnd}
          onError={() => {
            console.error("โหลดวิดีโอไม่สำเร็จ");
            setVideoError(true);
            setShowFallbackMessage(true);
            setBgColor("black");
            nextText();
            setIsReadyToProceed(true);
          }}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* ข้อความ */}
        {(videoStarted || showFallbackMessage) && (
          <div className="absolute top-20 my-20 left-1/2 -translate-x-1/2 w-[90%] z-10">
            <div className="px-6 py-4 rounded-lg break-words">
              <AnimatedText2 key={index} text={texts[index]} color="black" />
            </div>
          </div>
        )}

        {/* fallback: ถ้า video error */}
        {videoError && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white text-sm bg-red-600 px-3 py-1 rounded">
            ไม่สามารถโหลดวิดีโอได้
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Hospital1;
