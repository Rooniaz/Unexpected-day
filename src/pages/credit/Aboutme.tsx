import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "./../../contexts/AudioProvider";

const Aboutme: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { playAudio, pauseAudio } = useAudio();

  useEffect(() => {
    playAudio("/Sound/Scene Start/Start & End.mp3", 0.2); // เล่นเพลงเฉพาะหน้านี้
    return () => pauseAudio(); // หยุดเพลงเมื่อออกจากหน้า
  }, []);
 

  const text = `ผลงานชิ้นนี้เกิดขึ้นเพื่อให้ผู้เล่นทุกคนได้เรียนรู้และตระหนักถึงภัยเงียบที่ไม่อาจคาดคิดโดยเป็นเรื่องราวเกี่ยวกับโรคหลอดเลือดสมองที่สามารถเกิดได้กับทุกคนแม้แต่ในคนอายุน้อยแต่หากได้ทราบวิธีสังเกตอาการของโรคนี้ก็จะเป็นประโยชน์ทั้งต่อตัวเองและคนรอบข้าง

ทั้งนี้พวกเราขอขอบคุณผู้เล่นทุกคนที่เข้ามาเล่นเกมเว็บไซต์ของพวกเรา ขอให้ผู้เล่นได้ใช้เวลาในการเล่นเกมเว็บไซต์นี้ให้คุ้มค่า เพื่อรับประโยชน์ผ่านประสบการณ์การเรียนรู้เกี่ยวกับโรคหลอดเลือดสมอง`;


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
            className="absolute top-12 left-4 bg-gray-800 bg-opacity-70 text-white rounded-lg shadow-lg p-4 w-41 z-10"
            initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <ul>
                <li className="py-2 cursor-pointer hover:bg-gray-700 rounded px-2" onClick={() => navigate("/")}>หน้าหลัก</li>
                <li className="py-2 cursor-pointer hover:bg-gray-700 rounded px-2" onClick={() => navigate("/Allcredit")}>ดูผลงานอื่นๆเพิ่มเติม</li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute top-0 left-0 w-full h-auto flex flex-col items-center justify-center p-6 space-y-6">
          <div className="w-full max-w-lg px-6 py-4 bg-opacity-100 rounded-lg">
            {/* <img src="/image/LOGO .png" alt="SVG Icon" width="50" height="30" className="absolute top-7 right-6" /> */}
            <h2 className="text-3xl mb-3 mt-16 text-[#fa4901] drop-shadow-xl">เกี่ยวกับงาน</h2>
            <p
              className="text-base mt-5 font-light"
              dangerouslySetInnerHTML={{ __html: text.replaceAll("\n", "<br />") }}
            ></p>

            <p className="text-base mt-10 text-[#fa4901] ">ดูผลงานของเราเพิ่มเติมได้ที่</p>
            <div className="flex justify-start mt-2 ">
              {socialLinks.map((link, index) => (
                <a key={index} href={link.href} target="_blank" rel="noopener noreferrer">
                  <img src={link.img} alt="Social Icon" width="60" height="30" />
                </a>
              ))}
            </div>
            <div>
              <h2 className="text-3xl mb-3 text-[#fa4901] mt-6">เครดิต</h2>
            <p className="text-lg mt-3 ">ผลงานนวัตกรรมสื่อสารนิพนธ์ของ</p>

            <div className="mt-1 text-left text-base">
            <div className="flex">
              <p className="w-1/4 text-left text-base">ชญานิน</p>
              <p className="w-1/2 text-left pl-8">สุรขจร</p>
            </div>
            <div className="flex">
              <p className="w-1/4 text-left text-base ">ปัทมาพร</p>
              <p className="w-1/2 text-left pl-8">ประทุมถิ่น</p>
            </div>
            <div className="flex">
              <p className="w-1/4 text-left text-base">ฐปนัท</p>
              <p className="w-1/2 text-left pl-8">เดชประมวลพล</p>
            </div>
            <div className="flex">
              <p className="w-1/4 text-left text-base">วรัญญา</p>
              <p className="w-1/2 text-left pl-8">ตันติเฉลิม</p>
            </div>
          </div>

            <p className="text-base mt-2">นิสิตจาก</p>
            <p className="text-base">วิทยาลัยนวัตกรรมสื่อสารสังคม </p>
            <p className="text-base">เอกการสื่อสารเพื่อสุขภาพ มหาวิทยาลัยศรีนครินทรวิโรฒ </p>


            <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <p className=" text-[#fa4901]">โครงเรื่อง</p>
                  <p className=" text-[#fa4901]">บทบรรยาย</p>
                  <p className=" text-[#fa4901]">ภาพประกอบ</p>
                </div>
                <div className="text-sm">
                    <p >ชญานิน สุรขจร</p>
                    <p>ปัทมาพร ประทุมถิ่น</p>
                    <p>ฐปนัท เดชประมวลพล</p>
                    <p>วรัญญา ตันติเฉลิม</p>
                </div>
                </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
                <p className=" text-[#fa4901]">เสียงประกอบ</p>
                <p>วรัญญา ตันติเฉลิม</p>
            </div>


              <p className=" text-sm">
                (ขอบคุณเสียงประกอบจาก envato.co )
              </p>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                    <p className=" text-[#fa4901]">พัฒนา</p>
                </div>
                <div>
                    <p>จุลดิษฐ์ อุ่มวงศ์</p>
                    <p>ดลฤทธิ์ อิทธิโชติ</p>
                </div>
            </div>


              <p className="text-sm  text-[#fa4901] mt-6">
                ขอบคุณทีมงานทุกคนที่มีส่วนร่วมในผลงานนี้
              </p>

              <p className="text-[0.68rem] mt-4 text-[#ffffff] drop-shadow-lg">
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
