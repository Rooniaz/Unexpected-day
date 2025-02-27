import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Aboutme: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const socialLinks = [
    { href: "https://www.instagram.com", img: "/image/icons/iconig.png" },
    { href: "https://www.facebook.com", img: "/image/icons/iconfb.png" },
    { href: "https://www.youtube.com", img: "/image/icons/iconyt.png" },
  ];
  
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative">
      <div 
        className="relative w-[390px] h-[844px] max-h-screen overflow-y-auto bg-black no-scrollbar"
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
              className="absolute top-16 left-4 bg-gray-800 bg-opacity-70 text-white rounded-lg shadow-lg p-4 w-40 z-10"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <ul>
                <li className="py-2 cursor-pointer hover:bg-gray-700 rounded px-2" onClick={() => navigate("/")}>หน้าหลัก</li>
                <li className="py-2 cursor-pointer hover:bg-gray-700 rounded px-2" onClick={() => navigate("/Allcredit")}>เครดิตss</li>
                <li className="py-2 cursor-pointer hover:bg-gray-700 rounded px-2" onClick={() => navigate("/Credit1")}>เครดิต1</li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute top-0 left-0 w-full h-auto flex flex-col items-center justify-center p-6 space-y-6">
          <div className="w-full max-w-lg px-6 py-4 bg-opacity-100 rounded-lg">
            <img src="/icon.svg" alt="SVG Icon" width="30" height="30" className="absolute top-7 right-6" />
            <h2 className="text-4xl font-bold mb-3 mt-10 text-[#fa4901] drop-shadow-xl">เกี่ยวกับงาน</h2>
            <p className="text-base mt-5">ผลงานชิ้นนี้เกิดขึ้นเพื่อให้ผู้เล่นทุกคนได้เรียนรู้</p>
            <p className="text-base">และตระหนักถึงภัยเงียบที่ไม่อาจคาดคิด</p>
            <p className="text-base">โดยเป็นเรื่องราวเกี่ยวกับโรคหลอดเลือดสมอง</p>
            <p className="text-base">ที่สามารถเกิดได้กับทุกคนแม้แต่ในคนอายุน้อย</p>
            <p className="text-base">แต่หากได้ทราบวิธีสังเกตอาการของโรคนี้</p>
            <p className="text-base">ก็จะเป็นประโยชน์ทั้งต่อตัวเองและคนรอบข้าง</p>
            <p className="text-base mt-5">ทั้งนี้พวกเราขอขอบคุณผู้เล่นทุกคนที่เข้ามาเล่นเกม</p>
            <p className="text-base">เว็บไซต์ของพวกเรา ขอให้ผู้เล่นได้ใช้เวลาในการเล่น</p>
            <p className="text-base">เกมเว็บไซต์นี้ให้คุ้มค่า เพื่อรับประโยชน์ผ่าน</p>
            <p className="text-base">ประสบการณ์การเรียนรู้เกี่ยวกับโรคหลอดเลือดสมอง</p>

            <p className="text-base mt-14 text-[#fa4901] drop-shadow-xl">ดูผลงานของเราเพิ่มเติมได้ที่</p>
            <div className="flex justify-start mt-4">
              {socialLinks.map((link, index) => (
                <a key={index} href={link.href} target="_blank" rel="noopener noreferrer">
                  <img src={link.img} alt="Social Icon" width="60" height="30" />
                </a>
              ))}
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-3 text-[#fa4901] mt-10">เครดิต</h2>
            <p className="text-base mt-3">โปรเจกต์นี้เป็นผลงานนวัตกรรมสื่อสารนิพนธ์ ของ</p>
            <p className="text-base">ชญานิน สุรขจร, ปัทมาพร ประทุมถิ่น, ฐปนัท</p>
            <p className="text-base">เดชประมวลพล และ วรัญญา ตันติเฉลิม นิสิตจาก</p>
            <p className="text-base">วิทยาลัยนวัตกรรมสื่อสารสังคม เอกการสื่อสารเพื่อ</p>
            <p className="text-base">สุขภาพ มหาวิทยาลัยศรีนครินทรวิโรฒ </p>


            <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <p className="font-bold text-[#fa4901]">โครงเรื่อง</p>
                  <p className="font-bold text-[#fa4901]">บทบรรยาย</p>
                  <p className="font-bold text-[#fa4901]">ภาพประกอบ</p>
                </div>
                <div>
                    <p >ชญานิน สุรขจร</p>
                    <p>ปัทมาพร ประทุมถิ่น</p>
                    <p>ฐปนัท เดชประมวลพล</p>
                    <p>วรัญญา ตันติเฉลิม</p>
                </div>
                </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
                <p className="font-bold text-[#fa4901]">เสียงประกอบ</p>
                <p>วรัญญา ตันติเฉลิม</p>
            </div>


              <p className=" text-sm">
                (ขอบคุณเสียงประกอบจาก envato.co )
              </p>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                    <p className="font-bold text-[#fa4901]">พัฒนา</p>
                </div>
                <div>
                    <p>จุลดิษฐ์ อุ่มวงศ์</p>
                    <p>ดลฤทธิ์ อิทธิโชติ</p>
                </div>
            </div>


              <p className="text-sm font-bold text-[#fa4901] mt-6">
                ขอบคุณทีมงานทุกคนที่มีส่วนร่วมในผลงานนี้
              </p>

              <p className="text-xs mt-4 text-[#ffffff] drop-shadow-lg">
                Unexpected Day | การเผชิญกับโรคหลอดเลือดสมองแบบเฉียบพลัน
              </p>

              </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutme;
