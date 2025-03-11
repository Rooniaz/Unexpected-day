import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const TimeToCall = () => {
  const navigate = useNavigate();
  
  const text = "B E F A S T";
  const subText = "วิธีการสังเกตอาการโรคหลอดเลือดสมอง";
  const buttonText = "กดเพื่อไปต่อ";

  const container = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }, // แสดงทีละตัว ห่างกัน 0.2 วิ
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 2 },
    },
  };

  // ข้อความ subText จะขึ้นหลังจาก B E F A S T ครบ 3 วินาที
  const subTextVariant = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 2, delay: 4 }, // เริ่มหลังสุดท้ายของ B E F A S T + 3 วิ นะ
    },
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-black">
      <motion.div
        initial="hidden"
        animate="show"
        exit="hidden"
        variants={container}
        className=" relative justify-center items-center 
        w-full h-screen sm:w-[390px] sm:h-[844px] flex flex-col justify-center items-center bg-[#DCDCDC] text-[#fa4901] text-6xl px-6 py-2 text-center"
      >
        {/* ข้อความ B E F A S T */}
        <div className="font-bold mt-40 text-[3.5rem]">
        {text.split("").map((char, index) => (
          <motion.span key={index} variants={letter} className="tracking-wider">
            {char}
          </motion.span>
        ))}
      </div>

        {/* ข้อความ วิธีการสังเกตอาการโรคหลอดเลือดสมอง */}
        <motion.p 
          className="text-base text-[#fa4901] mt-8"
          variants={subTextVariant}
        >
          {subText}
        </motion.p>

        {/* ปุ่ม "กดเพื่อไปต่อ" */}
        <motion.button
          onClick={() => navigate("/DoctorDetail")}
          className="text-xl text-gray-500 mt-60 hover:text-gray-700 transition "
          variants={subTextVariant}
        >
          {buttonText}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default TimeToCall;
