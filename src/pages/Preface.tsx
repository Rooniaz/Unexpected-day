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
      
      <div className="
        relative flex justify-center items-center 
        w-full h-screen 
        sm:w-[390px] sm:h-[844px]"
        style={{
          backgroundImage: "url('/image/cover/cover.gif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
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
                  About Us
                </li>
                <li className="py-2 cursor-pointer hover:bg-gray-700 rounded px-2" onClick={() => navigate("/IntroDuction")}>
                  Introduction
                </li>
                <li className="py-2 cursor-pointer hover:bg-gray-700 rounded px-2" onClick={() => navigate("/Allcredit")}>
                  Lab Stroke
                </li>

              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="w-full max-w-lg">
          <img src="/image/cover/top.png" className="absolute top-[-10px] right-2 w-32 h-24" />
          <img src="/image/cover/header.png" className="absolute top-[-25px] w-full" />
          <button
            onClick={() => navigate("/warning")}
            className="absolute bottom-80 left-40 right-10 transform translate-x-10 inset-x-0 w-40 h-12 mx-auto cursor-pointer hover:opacity-80 bg-[#b7bdc2] rounded-3xl drop-shadow-xl"
            style={{ backgroundColor: 'rgba(183, 189, 194, 0.55)' }}  // ใช้ backgroundColor เพื่อแยก opacity
          >
            <p className="text-white text-xl">เริ่มต้น</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Preface;
