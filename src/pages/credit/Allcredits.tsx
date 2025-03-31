import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
// import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
// import { Pagination, Navigation } from "swiper/modules";
import { useAudio } from "./../../contexts/AudioProvider";

const Allcredit: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);


   const { playAudio, pauseAudio } = useAudio();

useEffect(() => {
  playAudio("/Sound/Scene Start/Start & End.mp3", 0.2); // เล่นเพลงเฉพาะหน้านี้
  return () => pauseAudio(); // หยุดเพลงเมื่อออกจากหน้า
}, []);

  
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative">
<div className="
        relative flex justify-center items-center 
        w-full h-screen overflow-y-auto bg-black no-scrollbar
        sm:w-[390px] sm:h-[844px]"
        style={{
          backgroundImage: "url('/image/bgbefast.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >

        {/* ✅ ปุ่ม Hamburger Menu */}
        <motion.button
          className="absolute top-4 left-4 text-black text-3xl z-10"
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
              <ul>
                <li className="py-2 cursor-pointer hover:bg-gray-700 rounded px-2" onClick={() => navigate("/home")}>หน้าหลัก</li>
                <li className="py-2 cursor-pointer hover:bg-gray-700 rounded px-2" onClick={() => navigate("/Aboutme")}>Aboutme</li>
                <li className="py-2 cursor-pointer hover:bg-gray-700 rounded px-2" onClick={() => navigate("/Introduction")}>Introduction</li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute top-0 left-0 w-full h-auto flex flex-col items-center justify-center p-6 space-y-6">
          <div className="w-full max-w-lg px-6 py-4 bg-opacity-70 rounded-lg">
          {/* <img src="/image/LOGO .png" alt="SVG Icon" width="50" height="30" className="absolute top-7 right-6" /> */}
          <h2 className="text-4xl font-bold mt-8 text-[#fa4901] drop-shadow-xl">Lab Stroke</h2>
          <div className="wrap">
          <p className="text-white p-4 text-sm relative before:content-['•'] before:absolute before:-left-4 before:text-white before:text-3xl before:pl-3">
            Motion Graphic Video for Communicating Information About
          </p>
            </div>
            <div className="flex justify-center gap-4 bg-blue-500 mb-3">
              <button className="border border-white text-white rounded-full px-4 py-2 text-[0.8rem]">
                โรคหลอดเลือดสมอง
              </button>
              <button className="border border-white text-white rounded-full px-4 py-2 text-[0.8rem]">
                อายุน้อยก็เป็นได้
              </button>
            </div>
            <div className="border-l-4 border-blue-500 text-black p-4 pl-2 pb-0 pt-0 w-fit text-[0.7rem] whitespace-pre-line">
              <p>
              เรื่องราวของหนุ่มออฟฟิศที่ต้องมาพบเข้ากับ
              </p>
              <p>
              เหตุการณ์แปลกประหลาด เมื่อจู่ ๆ ก็มีเสียงปริศนา
              </p>
              <p>
              ของใครคนหนึ่ง ที่จะพาเขาไปพบความจริงบางอย่าง
              </p>
              <p>
              ใน "Lab Stroke" ห้องทดลองที่จะเล่าข้อเท็จจริงเกี่ยว
              </p>
              <p>
              กับโรคหลอดเลือดสมองพร้อมภาพจำลองอนาคตที่              
              </p>
              <p>
              ทำให้ชายหนุ่มต้องกลับมาตระหนักถึง
              </p>
              <p>
              การใช้ชีวิตของเขาในปัจจุบัน              
              </p>
            </div>
            <div className="w-full flex justify-center mt-6 border-3">
            <iframe
                width="350"
                height="200"
                src="https://www.youtube.com/embed/Onyd7v5DWc4"
                title="YouTube video player"
                className="rounded-xl w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
            </div>

            <footer className="text-[0.67rem] mt-8 text-[#ffffff] drop-shadow-md" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)' }}>
            Unexpected Day | การเผชิญกับโรคหลอดเลือดสมองเฉียบพลัน
          </footer>          
          </div>
        </div>
      </div>
    </div>
  );
};

export default Allcredit;
