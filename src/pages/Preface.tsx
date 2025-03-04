
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAudio } from "../contexts/AudioProvider";
import { FiMenu, FiX } from "react-icons/fi"; // ไอคอน
import { motion, AnimatePresence } from "framer-motion"; // เพิ่ม animation

const Preface: React.FC = () => {
  const navigate = useNavigate();
  const { playAudio, pauseAudio } = useAudio();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    playAudio("/Sound/Scene Start/Start & End.mp3", 0.2);
    return () => pauseAudio();
  }, []);

  return (
    <div className="min-h-screen bg-black flex justify-center items-center relative">
      
      <div
        className="relative w-[390px] h-[844px] flex justify-center items-center text-center p-4"
        style={{
          backgroundImage: "url('/image/cover.gif')", // ใช้ GIF แทน PNG
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >        
        {/* ✅ ปุ่ม Hamburger Menu */}
        <motion.button
          className="absolute top-4 left-4 text-black text-3xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileTap={{ scale: 0.9 }}
          animate={{ rotate: isMenuOpen ? 90 : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </motion.button>

        {/* ✅ เมนูแสดงเมื่อกด Hamburger */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="absolute top-12 left-4 bg-gray-800 bg-opacity-70 text-white rounded-lg shadow-lg p-4 w-41 z-10"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <ul className="text-left">
                <li className="py-2 cursor-pointer hover:bg-gray-700 rounded px-2" onClick={() => navigate("/Aboutme")}>
                  เกี่ยวกับงาน & เครดิต
                </li>
                <li className="py-2 cursor-pointer hover:bg-gray-700 rounded px-2" onClick={() => navigate("/Allcredit")}>
                  ดูผลงานอื่นๆเพิ่มเติม
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="w-full max-w-lg">
                {/* <h1 className="text-5xl font-bold mb-4 text-[#fa4901] font-custom">Unexpected</h1>
          <p className="text-5xl font-bold mb-4 text-[#fa4901] font-custom">Day</p>
          <p className="text-2xl mt-14 text-white font-custom">การเผชิญกับโรคหลอด</p>
          <p className="text-2xl mb-8 text-white font-custom" >เลือดสมองแบบเฉียบพลัน</p> */}
          <img 
            src="/image/button/Start_button.png"
            alt="เริ่มต้น"
            onClick={() => navigate("/warning")}
            className="absolute bottom-2 inset-x-0 w-84 mx-auto cursor-pointer hover:opacity-350"
          />
        </div>
      </div>
    </div>
  );
};

export default Preface;