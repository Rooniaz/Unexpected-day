import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


const Warning: React.FC = () => {
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
      className="min-h-screen bg-white flex flex-col items-center justify-center p-4"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeVariants}
      // style={{
      //   backgroundImage: 'url("/animebg.gif")',
      //   backgroundSize: 'cover',
      //   backgroundPosition: 'center',
        
      // }}
      
    >
      <div className="w-full max-w-lg text-center">
        <p className="text-lg mb-4">เป็นไปได้ที่นี่จะเต็มไปด้วยความหมาย</p>
        <p className="text-lg mb-4">ไม่อยากจะบอกความหมายของการนำไปของคุณก่อนนำเข้า</p>
        <p className="text-lg mb-8">หากคุณมีเวลาพอที่จะเลือกสิ่งต่างๆ ในช่วงนี้</p>
        <button 
          onClick={() => navigate('/welcome')}
          className="mt-8 px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          ถัดไป →
        </button>
      </div>
    </motion.div>
  );
};
export default Warning;
