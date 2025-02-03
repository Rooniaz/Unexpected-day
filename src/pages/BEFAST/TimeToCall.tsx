import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const TimeToCall = () => {
  const [isTransitionDone, setIsTransitionDone] = useState(false);
  const navigate = useNavigate();  // ฟังก์ชันสำหรับการนำทาง

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitionDone(false);
      navigate("/DoctorDetail"); 
    }, 8000); 

    return () => clearTimeout(timer); 
  }, [navigate]);

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-b from-gray-300 to-white">
      {!isTransitionDone ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 2 }}
        className="w-[390px] h-[844px] flex justify-center items-center bg-[#708090] text-[#B22222] text-6xl px-6 py-2 rounded-lg"
        >
        <div>
            B E F A S T
          </div>
        </motion.div>
      ) : (
        // หลังจาก 3 วินาที จะถูกเปลี่ยนไปที่หน้า AfterBefast
        <div></div>
      )}
    </div>
  );
};

export default TimeToCall;
