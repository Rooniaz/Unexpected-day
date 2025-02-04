import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { fadeInOut } from "../../components/fadeInOut";
import { useEffect, useState, useRef } from "react";

const Braindetail = () => {
  const navigate = useNavigate();
  const [animationComplete, setAnimationComplete] = useState(false);

  const titleStyle = {
    color: '#FF4500',
    fontFamily: 'Thai Sans Neue, Arial, sans-serif',
    fontSize: '2.8rem',
    textAlign: 'left' as const,
    marginBottom: '0.2rem',
    lineHeight: '1.2',
  };

  const subtitleStyle = {
    color: '#fdfefe',
    fontFamily: 'Thai Sans Neue, Arial, sans-serif',
    fontSize: '1.2rem',
    textAlign: 'left' as const,
    lineHeight: '1.5',
    marginTop: '2rem'
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 1,
        duration: 0.5
      }
    })
  };

  // สร้าง ref สำหรับ audio element
  const audioRef2 = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef2.current) {
      audioRef2.current.volume = 0.5;
    }
  }, []);

  // เริ่มนับถอยหลังหลังจากแอนิเมชันเสร็จสิ้น
  useEffect(() => {
    if (animationComplete) {
      const timer = setTimeout(() => {
        navigate("/Friendbrain");
      }, 5000); // 3 วินาทีหลังจากข้อความแสดงเสร็จ

      return () => clearTimeout(timer);
    }
  }, [animationComplete, navigate]);

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-black">
      <audio ref={audioRef2} src="/Sound/Scene Start/For Education - Full.mp3" autoPlay loop />

      <motion.div
        className="relative w-[390px] h-[844px] overflow-hidden"
        style={{ backgroundColor: 'black' }}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={fadeInOut(2, "easeInOut", 0)}
      >
        <img
          src="/gif/43-45/brain.png"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <motion.div 
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80%] z-20"
          initial="hidden"
          animate="visible"
          onAnimationComplete={() => setAnimationComplete(true)} // ตรวจจับเมื่อแอนิเมชันจบ
        >
          <motion.h1 style={titleStyle} variants={titleVariants} custom={3}>
            โรค<br/>
            หลอดเลือดสมอง<br/>
            เฉียบพลัน
          </motion.h1>

          <motion.p style={subtitleStyle} variants={titleVariants} custom={4}>
            คือ ภาวะที่เกิดจากการที่สมองขาด
            เลือดหรือออกชิเจนอย่างเฉียบพลัน
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Braindetail;
