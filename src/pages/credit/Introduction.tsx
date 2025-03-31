import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
// import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
// import { Pagination, Navigation } from "swiper/modules";
import { useAudio } from "./../../contexts/AudioProvider";

const Introduction: React.FC = () => {
const navigate = useNavigate();
const [isMenuOpen, setIsMenuOpen] = useState(false);

const socialLinks = [
    { href: "https://www.instagram.com", img: "/image/icons/iconig.png" },
    { href: "https://www.facebook.com", img: "/image/icons/iconfb.png" },
    { href: "https://www.youtube.com", img: "/image/icons/iconyt.png" },
];


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
                <li className="py-2 cursor-pointer hover:bg-gray-700 rounded px-2" onClick={() => navigate("/Allcredit")}>Lab Stroke</li>
            </ul>
            </motion.div>
        )}
        </AnimatePresence>

            <div className="absolute top-0 left-0 w-full h-auto flex flex-col items-center justify-center p-6 space-y-6">
            <div className="w-full max-w-lg px-6 py-4 bg-opacity-70 rounded-lg">
            {/* <img src="/image/LOGO .png" alt="SVG Icon" width="50" height="30" className="absolute top-7 right-6" /> */}
            <h2 className="text-4xl font-bold mt-10 text-center text-[#fa4901] drop-shadow-xl">Introduction</h2>
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden mt-4">
        <div className="p-4 pt-2">
            <div className="flex justify-center pb-2 border-b-2 border-gray-200">
            <div className="text-3xl text-gray-400">★★★</div>
            </div>
            
            <div className="mt-4 text-gray-700 text-[0.84rem] whitespace-pre-line">
                {`ผลงานชิ้นนี้เกิดขึ้นเพื่อให้ผู้เล่นทุกคนได้เรียนรู้\nและตระหนักถึงภัยเงียบที่ไม่อาจคาดคิด\nโดยเป็นเรื่องราวเกี่ยวกับโรคหลอดเลือดสมอง\nที่สามารถเกิดได้กับทุกคนแม้แต่ในคนอายูน้อย\nแต่หากได้ทราบวิธีสังเกตอาการของโรคนี้ก็จะ\nเป็นประโยชน์ทั้งต่อตัวเองและคนรอบข้าง`}
            </div>
            <div className="mt-4 text-gray-700 text-[0.84rem] whitespace-pre-line">
                {`ทั้งนี้พวกเราขอขอบคุณผู้เล่นทุกคนที่เข้ามา\nเล่นเกมเว็บไซต์ของพวกเราขอให้ผู้เล่นได้ใช้\nเวลาในการเล่นเกมเว็บไซต์นี้ให้คุ้มค่าเพื่อรับ\nประโยชน์ผ่านประสบการณ์การเรียนรู้เกี่ยว\nกับโรคหลอดเลือดสมองด้วยกันนะคะ`}
            </div>
        </div>
        </div>
            
        <div className="wrap">
        <p className="text-white p-4 text-[0.78rem] border-b-2 border-black w-3/4 pl-0 pb-1 mt-3">
        ทำความรู้จักกับพวกเราเพิ่มเติมได้ที่        
        </p>
            </div>
            <div className="flex justify-center mt-2 gap-8 mt-4">
              {socialLinks.map((link, index) => (
                <a key={index} href={link.href} target="_blank" rel="noopener noreferrer">
                  <img src={link.img} alt="Social Icon" width="60" height="30" />
                </a>
              ))}
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

export default Introduction;
