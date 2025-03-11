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

  // const socialLinks = [
  //   { href: "https://www.instagram.com", img: "/image/icons/iconig.png" ,description: "instagram" },
  //   { href: "https://www.facebook.com", img: "/image/icons/iconfb.png" ,description: "facebook"},
  //   { href: "https://www.youtube.com", img: "/image/icons/iconyt.png" ,description: "youtube"},
  // ];
  // const imageSlides = [
  //   "/image/Slidimg/tiger.jpg",
  //   "/image/Slidimg/bird.jpg",
  //   "/image/Slidimg/tiger.jpg",
  //   "/image/Slidimg/bird.jpg",
  // ];
  
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
                <li className="py-2 cursor-pointer hover:bg-gray-700 rounded px-2" onClick={() => navigate("/Aboutme")}>เกี่ยวกับงาน & เครดิต</li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute top-0 left-0 w-full h-auto flex flex-col items-center justify-center p-6 space-y-6">
          <div className="w-full max-w-lg px-6 py-4 bg-opacity-70 rounded-lg">
          {/* <img src="/image/LOGO .png" alt="SVG Icon" width="50" height="30" className="absolute top-7 right-6" /> */}
          <h2 className="text-4xl font-bold mb-3 mt-10 text-[#fa4901] drop-shadow-xl">Lab Stroke</h2>
            <p className="text-xl mt-5 text-[#fa4901] mb-5">อายุน้อยก็เป็นได้</p>
            <div className="w-full flex justify-center">
            <iframe
                width="350"
                height="200"
                src="https://www.youtube.com/embed/Onyd7v5DWc4"
                title="YouTube video player"
                className="rounded"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
            </div>
            <div className="text-center">
              <p className="text-sm mt-5 text-[#fa4901]">
                อีกสื่อ Motion Graphic ที่ถ่ายทอดข้อมูลเกี่ยวกับ 
              </p>
              <p className="text-sm mb-4 text-[#fa4901]">
                “โรคหลอดเลือดสมอง” และ “อายุน้อยก็เป็นได้”
              </p>
            </div>
            <div className="text-sm leading-relaxed text-justify indent-6 w-full break-words">
              <p>
                เป็นเรื่องราวของหนุ่มออฟฟิศที่ต้องมาพบเข้ากับเหตุการณ์แปลกประหลาด 
                เมื่อจู่ๆ ก็มีเสียงปริศนาจากของใครคนหนึ่งที่จะพาเขาไปพบความจริงบางอย่าง 
                ใน “Lab Stroke” ห้องทดลองที่จะเล่าข้อเท็จจริงเกี่ยวกับโรคหลอดเลือดสมอง 
                พร้อมภาพจำลองอนาคตที่ทำให้ชายหนุ่มต้องกลับมาตระหนักถึงการใช้ชีวิตของเขาในปัจจุบัน
              </p>
            </div>


            {/* <p className="text-sm mt-5">ทั้งนี้พวกเราขอขอบคุณผู้เล่นทุกคนที่เข้ามาเล่นเกม</p>
            <p className="text-sm">เว็บไซต์ของพวกเรา ขอให้ผู้เล่นได้ใช้เวลาในการเล่น</p>
            <p className="text-sm">เกมเว็บไซต์นี้ให้คุ้มค่า เพื่อรับประโยชน์ผ่าน</p>
            <p className="text-sm">ประสบการณ์การเรียนรู้เกี่ยวกับโรคหลอดเลือดสมอง</p> */}

            {/* ✅ เพิ่ม Swiper สำหรับเลื่อนรูปภาพ */}
            {/* <Swiper
              modules={[Pagination, Navigation]}
              pagination={{ clickable: true }}
              navigation
              loop={true}
              className="w-full h-[250px] rounded-lg overflow-hidden mt-6"
            >
              {imageSlides.map((src, index) => (
                <SwiperSlide key={index}>
                  <img src={src} alt={`Slide ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
                </SwiperSlide>
              ))}
            </Swiper> */}

            {/* <p className="text-base mt-8 text-[#fa4901] drop-shadow-xl">ดูผลงานของเราเพิ่มเติมได้ที่</p> */}
            {/* <div className="flex justify-start mt-4 space-x-4">

            </div> */}

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
