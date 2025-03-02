import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { fadeInOut } from "../../components/fadeInOut";
import { useEffect, useState } from "react";
import { useAudio } from "../../contexts/AudioProvider"; // ใช้ AudioProvider2

const Braindetail = () => {
  const navigate = useNavigate();
  const [animationComplete, setAnimationComplete] = useState(false);
  const { playAudio, pauseAudio } = useAudio();

  useEffect(() => {
    playAudio("/Sound/Sound fx/Scene BEFAST.mp3", 0.2); // เล่นเพลงเฉพาะหน้านี้
    return () => pauseAudio(); // หยุดเพลงเมื่อออกจากหน้า
  }, []);

  useEffect(() => {
    if (animationComplete) {
      const timer = setTimeout(() => {
        navigate("/Friendbrain");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [animationComplete, navigate]);

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
          onAnimationComplete={() => setAnimationComplete(true)}
        >
          <motion.h1
            className="font-custom font-bold text-[#FF4500] text-4xl text-left mb-1.5"
            variants={fadeInOut(0.5, "easeInOut", 0)}
          >
            โรค<br />
            หลอดเลือดสมอง<br />
            เฉียบพลัน
          </motion.h1>

          <motion.p
            className="font-light text-white text-lg text-left mt-8"
            variants={fadeInOut(1, "easeInOut", 0.5)}
          >
            <div className="flex flex-col-reverse">
              <span className="font-bold">
                คือ ภาวะที่เกิดจากการที่สมองขาดเลือด <br />
                หรือออกซิเจนอย่างเฉียบพลัน
              </span>
            </div>

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
