import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { fadeInOut } from "../../components/fadeInOut";
import { useEffect, useRef, useState } from "react";
import { useAudio } from "../../contexts/AudioProvider";

const Braindetail = () => {
  const navigate = useNavigate();
  const { playAudio, pauseAudio } = useAudio();
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false); // ✅ ตรวจสอบว่า duration โหลดเสร็จหรือยัง

  useEffect(() => {
    playAudio("/Sound/Sound fx/Scene BEFAST.mp3", 0.2);
    return () => pauseAudio();
  }, []);

  // ✅ ฟังก์ชันให้ไปหน้า Friendbrain เมื่อแตะหน้าจอ
  const handleScreenTap = () => {
    navigate("/Friendbrain");
  };

  // ✅ ใช้เมื่อวิดีโอโหลดเสร็จ เพื่อให้ duration พร้อมใช้งาน
  const handleLoadedMetadata = () => {
    setVideoLoaded(true);
  };

  // ✅ หยุดวิดีโอที่เฟรมสุดท้าย
  const handleVideoEnd = () => {
    if (videoRef.current && videoLoaded && !isNaN(videoRef.current.duration)) {
      setTimeout(() => {
        videoRef.current.pause();
        videoRef.current.currentTime = Math.max(0, videoRef.current.duration - 0.1); // ✅ ค้างที่เฟรมสุดท้าย
      }, 50); // ✅ หน่วงเวลานิดหน่อยให้ browser อัปเดตค่า
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
        onClick={handleScreenTap} // ✅ แตะแล้วเปลี่ยนหน้า
      >
        {/* วิดีโอ Background */}
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={handleLoadedMetadata} // ✅ ตรวจสอบว่า duration โหลดเสร็จ
          onEnded={handleVideoEnd} // ✅ หยุดที่เฟรมสุดท้าย
          className="absolute w-[390px] h-[844px] object-cover pointer-events-none"
        >
          <source src="/video/blurWork.webm" type="video/webm" />
          <source src="/video/blurWork.mp4" type="video/mp4" />
          <source src="/video/blurWork.mov" type="video/quicktime" />
          Your browser does not support the video tag.
        </video>

        {/* Content Layer */}
        <motion.div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80%] z-20"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 1 } },
          }}
        >
          {/* สามารถเพิ่มเนื้อหาหรือปุ่มได้ที่นี่ */}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Braindetail;
