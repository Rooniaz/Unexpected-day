import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const TimeToCall = () => {
  const [isTransitionDone, setIsTransitionDone] = useState(false);
  const navigate = useNavigate();  // ฟังก์ชันสำหรับการนำทาง

  const text = "B E F A S T";

  const container = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }, // ตั้งเวลาให้ตัวอักษรแอนิเมตทีละตัว
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.1 }, // การแอนิเมตของตัวอักษร
    },
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitionDone(true); // ทำให้ transition เสร็จสมบูรณ์
      setTimeout(() => {
        navigate("/DoctorDetail");  // นำทางไปยังหน้า DoctorDetail หลังจาก transition เสร็จ
      }, 500); // ให้เวลาให้ transition เสร็จก่อนที่จะนำทาง
    }, 6000);

    return () => clearTimeout(timer); 
  }, [navigate]);

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-black">
      {!isTransitionDone ? (
        <motion.div
          initial="hidden"
          animate="show"
          exit="hidden"
          variants={container} // ใช้ container สำหรับการแอนิเมตตัวอักษร
          className="w-[390px] h-[844px] flex justify-center font-bold items-center bg-[#DCDCDC] text-[#fa4901] text-6xl px-6 py-2 "
        >
          <div>
            {text.split("").map((char, index) => (
              <motion.span key={index} variants={letter}>
                {char}
              </motion.span>
            ))}
          </div>
        </motion.div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default TimeToCall;
