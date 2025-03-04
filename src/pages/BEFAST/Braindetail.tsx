import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAudio } from "../../contexts/AudioProvider";

const Braindetail = () => {
  const navigate = useNavigate();
  const [animationComplete, setAnimationComplete] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const videoRef = useRef(null);
  const { playAudio, pauseAudio } = useAudio();

  useEffect(() => {
    playAudio("/Sound/Sound fx/Scene BEFAST.mp3", 0.2);
    return () => pauseAudio();
  }, []);

  const handlePicEnd = () => {
    setVideoEnded(true);
  };

  const handleClick = () => {
    if (videoEnded && animationComplete) {
      setIsExiting(true); // เริ่มทำแอนิเมชันจางหาย
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-black">
      <motion.div
        className="relative w-[390px] h-[844px] overflow-hidden"
        initial="initial"
        animate={isExiting ? "exit" : "animate"}
        exit="exit"
        variants={{
          initial: { opacity: 1 },
          animate: { opacity: 1 },
          exit: { opacity: 0, transition: { duration: 3 } }, // ค่อย ๆ จางหายไป
        }}
        onAnimationComplete={() => {
          if (isExiting) navigate("/Friendbrain");
        }}
        onClick={handleClick}
      >
        {/* วิดีโอพื้นหลังแบบเต็มขนาด */}
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

        <motion.div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80%] z-20"
          initial="hidden"
          animate="visible"
          onAnimationComplete={() => setAnimationComplete(true)}
        >
          {/* ...เนื้อหาอื่นๆ... */}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Braindetail;
