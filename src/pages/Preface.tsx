
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAudio } from "../contexts/AudioProvider";
import { FiMenu, FiX } from "react-icons/fi"; // ไอคอน
import { motion, AnimatePresence } from "framer-motion"; // เพิ่ม animation

const Preface: React.FC = () => {
  const navigate = useNavigate();
  const { playAudio, pauseAudio } = useAudio();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // สถานะเปิด-ปิดเมนู

  useEffect(() => {
    playAudio("/Sound/Scene Start/Start & End.mp3", 0.2); // เล่นเพลงเฉพาะหน้านี้
    return () => pauseAudio(); // หยุดเพลงเมื่อออกจากหน้า
  }, []);

  return (
    <div className="min-h-screen bg-black flex justify-center items-center p-4 relative">
      
      {/* ✅ เนื้อหาหลัก */}
      <div
        className="relative w-[390px] h-[844px] flex justify-center items-center text-center p-4"
        style={{
          backgroundImage: "url('/image/start.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >        {/* ✅ ปุ่ม Hamburger Menu */}
        <motion.button
          className="absolute top-4 left-4 text-black text-3xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileTap={{ scale: 0.9 }} // คลิกแล้วมีเอฟเฟกต์หดลงเล็กน้อย
          animate={{ rotate: isMenuOpen ? 90 : 0 }} // หมุนตอนเปลี่ยนไอคอน
          transition={{ type: "spring", stiffness: 260, damping: 20 }} // ให้มีความเด้งสมูท
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </motion.button>

        {/* ✅ เมนูแสดงเมื่อกด Hamburger */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
            className="absolute top-12 left-4 bg-gray-800 bg-opacity-70 text-white rounded-lg shadow-lg p-4 w-41 z-10"
            initial={{ opacity: 0, x: -50 }} // เริ่มจากความโปร่งใส 0 และขยับมาจากซ้าย
              animate={{ opacity: 1, x: 0 }} // แสดงเมนูด้วย fade-in และ slide-in
              exit={{ opacity: 0, x: -50 }} // ซ่อนเมนูกลับไปทางซ้าย
              transition={{ duration: 0.3 }} // ตั้งเวลาการเปลี่ยนแปลง
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
          <button
            onClick={() => navigate("/warning")}
            className="absolute bottom-36 inset-x-0 w-28 mx-auto px-6 py-2 bg-[#b21f13] text-white rounded-2xl hover:bg-gray-800"            >
            เริ่มต้น
          </button>
        </div>
      </div>
    </div>
  );
};

export default Preface;
