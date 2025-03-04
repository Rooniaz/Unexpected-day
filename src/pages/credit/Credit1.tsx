import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // ไอคอน
import { motion, AnimatePresence } from "framer-motion"; // เพิ่ม animation
import { useAudio } from "./../../contexts/AudioProvider";

const Credit1: React.FC = () => {
const navigate = useNavigate();
const { playAudio, pauseAudio } = useAudio();
const [isMenuOpen, setIsMenuOpen] = useState(false); // สถานะเปิด-ปิดเมนู


useEffect(() => {
  playAudio("/Sound/Scene Start/Start & End.mp3", 0.2); // เล่นเพลงเฉพาะหน้านี้
  return () => pauseAudio(); // หยุดเพลงเมื่อออกจากหน้า
}, []);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    navigate('/');
  };




  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      {/* เพิ่มพื้นหลังเป็น GIF */}
      <div 
        className="relative w-[390px] h-[844px] overflow-hidden"
        style={{
          backgroundImage: "url('/image/bgbefast.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
                              {/* ✅ ปุ่ม Hamburger Menu */}
      <motion.button
        className="absolute top-4 left-4 text-black text-3xl z-10"
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
            className="absolute top-16 left-4 bg-gray-800  bg-opacity-70 text-white rounded-lg shadow-lg p-4 w-40 z-10"
            initial={{ opacity: 0, x: -50 }} // เริ่มจากความโปร่งใส 0 และขยับมาจากซ้าย
            animate={{ opacity: 1, x: 0 }} // แสดงเมนูด้วย fade-in และ slide-in
            exit={{ opacity: 0, x: -50 }} // ซ่อนเมนูกลับไปทางซ้าย
            transition={{ duration: 0.3 }} // ตั้งเวลาการเปลี่ยนแปลง
          >
            <ul>
              <li className="py-2 cursor-pointer hover:bg-gray-700 rounded px-2" onClick={() => navigate("/")}>หน้าหลัก</li>
              <li className="py-2 cursor-pointer hover:bg-gray-700 rounded px-2" onClick={() => navigate("/Aboutme")}>เกี่ยวกับ</li>
              <li className="py-2 cursor-pointer hover:bg-gray-700 rounded px-2" onClick={() => navigate("/Credit")}>เครดิต</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
        <div className="absolute top-0 left-0 w-full h-full flex items-start justify-center ">
          <div className="w-full max-w-lg px-6 py-4 bg-opacity-70 rounded-lg  mt-10">
            <form onSubmit={handleSubmit} className="space-y-6">
            <img 
              src="/icon.svg" 
              alt="SVG Icon" 
              width="30" 
              height="30" 
              className="absolute top-6 right-6"
            />

            <div>
            <h2 className="text-4xl mb-3">หัวข้อ</h2>
            <p className="text-base mt-6 mb-4">อายุน้อยก็เป็นได้</p>
            <div className="w-full flex justify-center">
            <iframe
                width="350"
                height="200"
                src="https://www.youtube.com/embed/l-2hOKIrIyI"
                title="YouTube video player"
                className="rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
            </div>
            <p className="text-base mt-8">เนื้อหาคลิป</p>
            {/* <p className="text-base mt-3">อายุน้อยก็เป็นได้อายุน้อยก็เป็นได้อายุน้อยก็เป็นได้</p>
            <p className="text-base mt-3">อายุน้อยก็เป็นได้</p> */}



              <p className="absolute bottom-[10%] text-xs mt-4 text-[#ffffff] drop-shadow-lg">
              Unexpected Day | การเผชิญกับโรคหลอดเลือดสมองเฉียบพลัน
              </p>

              </div>
              <button 
                type="submit"
                className="absolute bottom-[3%] right-6 text-xl underline rounded"
              >
                กดเพื่อไปต่อ →
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Credit1;
