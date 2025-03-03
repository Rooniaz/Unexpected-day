import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { fadeInOut } from "../../components/fadeInOut";
import { useEffect, useRef, useState } from "react";
import { useAudio } from "../../contexts/AudioProvider";

const Braindetail = () => {
  const navigate = useNavigate(); // ใช้ useNavigate ถูกต้องแล้ว
  const [animationComplete, setAnimationComplete] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef(null);
  const { playAudio, pauseAudio } = useAudio();

  useEffect(() => {
    playAudio("/Sound/Sound fx/Scene BEFAST.mp3", 0.2);
    return () => pauseAudio();
  }, []);

  const handlePicEnd = () => {
    setVideoEnded(true); // เมื่อวิดีโอจบ
  };

  const handleClick = () => {
    if (videoEnded && animationComplete) {
      navigate("/Friendbrain"); // เปลี่ยนหน้าเมื่อคลิกหลังจากวิดีโอจบและ animation เสร็จสิ้น
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-black">
      <motion.div
        className="relative w-[390px] h-[844px] overflow-hidden"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={fadeInOut(2, "easeInOut", 0)}
        onClick={handleClick} // ตรวจจับการคลิก
      >
        {/* วิดีโอพื้นหลัง */}
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={handlePicEnd} // เมื่อวิดีโอจบ
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        >
          <source src="/video/blurCanteen.webm" type="video/webm" />
          <source src="/video/blurCanteen.mp4" type="video/mp4" />
          <source src="/video/blurCanteen.mov" type="video/quicktime" />
          Your browser does not support the video tag.
        </video>

        <motion.div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80%] z-20"
          initial="hidden"
          animate="visible"
          onAnimationComplete={() => setAnimationComplete(true)} // เมื่อ animation เสร็จสิ้น
        >
          {/* ...เนื้อหาอื่นๆ... */}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Braindetail;