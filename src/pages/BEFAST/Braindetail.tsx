import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { fadeInOut } from "../../components/fadeInOut";
import { useEffect, useRef } from "react";

const Braindetail = () => {
  const navigate = useNavigate();

  const titleStyle = {
    color: '#FF4500',
    fontFamily: 'Thai Sans Neue, Arial, sans-serif',
    fontSize: '3rem',
    textAlign: 'left' as const,
    marginBottom: '0.2rem',
    lineHeight: '1.2'
  };

  const subtitleStyle = {
    color: '#fdfefe',
    fontFamily: 'Thai Sans Neue, Arial, sans-serif',
    fontSize: '1.2rem',
    textAlign: 'left' as const,
    lineHeight: '1.5',
    marginTop: '1rem'
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.3,
        duration: 0.5
      }
    })
  };

  const handleClick = () => {
    navigate("/Friendbrain");
  };

      // สร้าง ref สำหรับ audio element
      // const audioRef1 = useRef<HTMLAudioElement>(null);
      const audioRef2 = useRef<HTMLAudioElement>(null);
      // const audioRef3 = useRef<HTMLAudioElement>(null);
  
      useEffect(() => {
          // ตั้งค่า volume หลังจาก component mount
          // if (audioRef1.current) {
          //     audioRef1.current.volume = 0.5;
          // }
          if (audioRef2.current) {
              audioRef2.current.volume = 0.5;
          }
          // if (audioRef3.current) {
          //     audioRef3.current.volume = 0.2;
          // }
      }, []);

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-black">
        {/* <audio ref={audioRef1} src="/Sound/Hospital Sound/Hospital Busy Ambience Loop.mp3" autoPlay loop /> */}
        <audio ref={audioRef2} src="/Sound/Scene Start/For Education - Full.mp3" autoPlay loop />
  {/* <audio ref={audioRef3} src="/Sound/Hospital Sound/Hospital Busy Ambience Loop.mp3" autoPlay loop /> */}
      <motion.div
        className="relative w-[390px] h-[844px] overflow-hidden"
        style={{ backgroundColor: 'black' }}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={fadeInOut(2, "easeInOut", 0)}
        onClick={handleClick}
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
        >
          <motion.h1 
            style={titleStyle}
            variants={titleVariants}
            custom={0}
          >
            โรค
          </motion.h1>
          <motion.h1 
            style={titleStyle}
            variants={titleVariants}
            custom={1}
          >
            หลอดเลือดสมอง
          </motion.h1>
          <motion.h1 
            style={titleStyle}
            variants={titleVariants}
            custom={2}
          >
            เฉียบพลัน
          </motion.h1>
          <motion.p 
            style={subtitleStyle}
            variants={titleVariants}
            custom={3}
          >
            คือ ภาวะที่เกิดจากการที่สมองขาด
            เลือดหรือออกชิเจนอย่างเฉียบพลัน
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Braindetail;