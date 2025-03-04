import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { fadeInOut } from "../../components/fadeInOut";
import { useEffect, useRef, useState } from "react";
import { useAudio } from "../../contexts/AudioProvider";

const Braindetail = () => {
  const navigate = useNavigate();
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const secondVideoRef = useRef<HTMLVideoElement>(null);
  const { playAudio, pauseAudio } = useAudio();

  useEffect(() => {
    playAudio("/Sound/Sound fx/Scene BEFAST.mp3", 0.2);
    return () => pauseAudio();
  }, []);

  const handlePicEnd = () => {
    if (videoRef.current) {
      videoRef.current.pause(); // หยุดวิดีโอแรก
      videoRef.current.currentTime = videoRef.current.duration; // ค้างเฟรมสุดท้าย
    }
    setVideoEnded(true);
  };

  const handleSecondPicEnd = () => {
    navigate("/Friendbrain"); // เปลี่ยนหน้าเมื่อวิดีโอที่สองจบ
  };

  const handleClick = () => {
    if (videoEnded && secondVideoRef.current) {
      if (videoRef.current) {
        videoRef.current.style.display = "none"; // ซ่อนวิดีโอแรก
      }
      secondVideoRef.current.style.display = "block"; // แสดงวิดีโอที่สอง
      secondVideoRef.current.play(); // เล่นวิดีโอที่สอง
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-black" onClick={handleClick}>
      <motion.div
        className="relative w-[390px] h-[844px] overflow-hidden"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={fadeInOut(2, "easeInOut", 0)}
      >
        {/* วิดีโอแรก */}
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={handlePicEnd}
          className="absolute inset-0 w-[390px] h-[844px]"
        >
          <source src="/video/brain_video/fact.webm" type="video/webm" />
          <source src="/video/brain_video/fact.mp4" type="video/mp4" />
          <source src="/video/brain_video/fact.mov" type="video/quicktime" />
          Your browser does not support the video tag.
        </video>

        {/* วิดีโอที่สอง (ซ่อนไว้ก่อนน) */}
        <video
          ref={secondVideoRef}
          muted
          playsInline
          preload="auto"
          onEnded={handleSecondPicEnd}
          className="absolute inset-0 w-[390px] h-[844px]"
          style={{ display: "none" }} // ซ่อนวิดีโอที่สองก่อน
        >
          <source src="/video/brain_video/factclose.webm" type="video/webm" />
          <source src="/video/brain_video/factclose.mp4" type="video/mp4" />
          <source src="/video/brain_video/factclose.mov" type="video/quicktime" />
          Your browser does not support the video tag.
        </video>
      </motion.div>
    </div>
  );
};

export default Braindetail;
