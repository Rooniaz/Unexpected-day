import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { fadeInOut } from "../../components/fadeInOut";
import { useEffect, useState } from "react";
import { useAudio } from "../../contexts/AudioProvider"; // นำเข้า useAudio

const Braindetail = () => {
  const navigate = useNavigate();
  const [animationComplete, setAnimationComplete] = useState(false);

  const { playAudio, pauseAudio } = useAudio();

  useEffect(() => {
    playAudio(); // เล่นเพลงต่อจากหน้า Warning
    return () => pauseAudio(); // หยุดเพลงเมื่อออกจากหน้า (แต่เก็บเวลาไว้)
  }, []);

  // เริ่มนับถอยหลังหลังจากแอนิเมชันเสร็จสิ้น
  useEffect(() => {
    if (animationComplete) {
      const timer = setTimeout(() => {
        navigate("/Friendbrain");
      }, 5000); // 5 วินาทีหลังจากข้อความแสดงเสร็จ

      return () => clearTimeout(timer);
    }
  }, [animationComplete, navigate]);

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5,  // ให้ข้อความตัวแดงขึ้นก่อน
        duration: 0.8,
      },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 1,  // ให้ข้อความสีขาวขึ้นหลังจากตัวแดง
        duration: 0.8,
      },
    },
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-black">
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
          <motion.h1
            className="font-custom font-bold text-[#FF4500] text-4xl text-left mb-1.5"
            variants={titleVariants}
          >
            โรค<br />
            หลอดเลือดสมอง<br />
            เฉียบพลัน
          </motion.h1>

          <motion.p
            className="font-light text-white text-lg text-left mt-8"
            variants={subtitleVariants}
          >
            <div className="flex flex-col-reverse ...">
              <span className="font-bold">
                คือ ภาวะที่เกิดจากการที่สมองขาดเลือด <br />
                หรือออกซิเจนอย่างเฉียบพลัน
              </span>
            </div>

            {/* ใช้ flex และ align-items: stretch เพื่อให้เส้นยาวเท่ากับข้อความ */}
            <div className="flex pt-3">
              <div className="border-l-4 border-[#FF4500] mr-3"></div>
              <div>
                ประเทศไทยมีจำนวนผู้ป่วยโรคหลอด
                เลือดสมองมากขึ้นทุกปี และคร่าชีวิต
                ประชากรไทยมากถึง 50,000 คนต่อปี
                หรือเฉลี่ยชั่วโมงละ 6 คน
              </div>
            </div>

            <div className="pt-3">
              เป็นสาเหตุหลักของการเสียชีวิตอันดับ
              ต้นๆ ในประเทศไทย
            </div>
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Braindetail;