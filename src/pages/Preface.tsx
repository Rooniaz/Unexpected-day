import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


const Preface: React.FC = () => {
  const navigate = useNavigate();

  // กำหนดค่าการทำงานของ fade transition
const fadeVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 ,
    transition: { duration: 1.5, ease: "easeInOut" }, 

  },
  exit: { opacity: 0 ,
    transition: { duration: 1.5, ease: "easeInOut" }, 
  },
}; 

  return (
    <motion.div
    className="min-h-screen bg-white flex flex-col items-center justify-center text-center p-4"
    initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeVariants}>
      <div className="w-full max-w-lg">
        <div className="bg-white relative">
          <div className="absolute top-0 left-0 w-16 h-20 bg-black transform -skew-x-12"></div>
          <div className="absolute top-0 right-0 w-16 h-20 bg-black transform skew-x-12"></div>
        </div>
        <div className="py-16 px-4">
          <h1 className="text-5xl font-custom font-bold mb-2">Unexpected</h1>
          <p className="text-5xl font-custom font-bold mb-4">Day</p>
          <p className="text-lg font-custom mb-4">การเผชิญกับโรคหลอดเลือด</p>
          <p className="text-lg font-custom mb-8">สมองแบบเฉียบพลัน</p>
          {/* <p className="text-xl font-bold mb-6">'Deadline is my inspiration'</p> */}
          <button 
            onClick={() => navigate('/warning')}
            className="mt-8 px-6 py-2 bg-black text-white rounded hover:bg-gray-800 font-custom"
          >
            ถัดไป →
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Preface;