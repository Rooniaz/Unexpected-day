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
 

  const text = `ผลงานนี้เป็นผลงานนวัตกรรมสื่อสารนิพนธ์ จัดทำโดย
                ชญานิน สุรขจร , ปัทมาพร ประทุมถิ่น ,
                วรัญญา ตันติเฉลิม และ ฐปนัท เดชประมวลพล
                นิสิตจากวิทยาลัยนวัตกรรมสื่อสารสังคม 
                เอกการสื่อสารเพื่อสุขภาพ มหาวิทยาลัยศรีนครินทรวิโรฒ`;

  
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative">
  <div
      className="
      relative flex justify-center items-center 
      w-full h-screen overflow-y-auto no-scrollbar 
      sm:w-[390px] sm:h-[844px]  bg-gradient-to-b from-[#000000] to-[#4a1908]"
    >
        {/* ✅ ปุ่ม Hamburger Menu */}
        <motion.button
          className="absolute top-4 left-4 text-black text-3xl z-10 text-white"
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
            className="absolute top-12 left-4 bg-gray-800 bg-opacity-70 text-white rounded-lg shadow-lg p-4 w-41 z-10 "
            initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <ul>
                <li className="py-2 cursor-pointer hover:bg-gray-700 rounded px-2" onClick={() => navigate("/home")}>หน้าหลัก</li>
                <li className="py-2 cursor-pointer hover:bg-gray-700 rounded px-2" onClick={() => navigate("/Allcredit")}>Lab Stroke</li>
                <li className="py-2 cursor-pointer hover:bg-gray-700 rounded px-2" onClick={() => navigate("/Introduction")}>Introduction</li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute top-0 left-0 w-full h-auto flex flex-col items-center justify-center p-6 space-y-6">
          <div className="w-full max-w-lg px-6 py-4 bg-opacity-100 rounded-lg">
            {/* <img src="/image/LOGO .png" alt="SVG Icon" width="50" height="30" className="absolute top-7 right-6" /> */}
            <h2 className="text-3xl mb-3 mt-6 text-[#fa4901] font-bold drop-shadow-xl">About us            </h2>
            <p
              className="text-[0.77rem] mt-4 font-light border-b-2 border-white pb-3 text-white"
              dangerouslySetInnerHTML={{ __html: text.replaceAll("\n", "<br />") }}
            ></p>
            <div className="wrap-underline "></div>
            <div>
            <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <p className=" text-white font-bold">โครงเรื่อง</p>
                  <p className=" text-white font-bold">บทบรรยาย</p>
                  <p className=" text-white font-bold">ภาพประกอบ</p>
                </div>
                <div className="text-sm text-white">
                    <p >ชญานิน สุรขจร</p>
                    <p>ปัทมาพร ประทุมถิ่น</p>
                    <p>ฐปนัท เดชประมวลพล</p>
                    <p>วรัญญา ตันติเฉลิม</p>
                </div>
                </div>

            <div className="grid grid-cols-2 gap-4 mt-4 text-white">
                <p className=" text-white font-bold">เสียงประกอบ</p>
                <p>วรัญญา ตันติเฉลิม</p>
            </div>


              <p className=" text-[0.6rem] text-white">
                (ขอบคุณเสียงประกอบจาก envato.co )
              </p>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                    <p className=" text-white font-bold">พัฒนา</p>
                </div>
                <div>
                    <p className="text-white">จุลดิษฐ์ อุ่มวงศ์</p>
                    <p className="text-white">ดลฤทธิ์ อิทธิโชติ</p>
                </div>
            </div>


              <p className="text-[0.87rem]  text-white mt-6 font-bold">
              ขอขอบคุณหน่วยงานที่ให้ความอนุเคราะห์ข้อมูล
              </p>
              <p className="text-[0.87rem]  text-white ">
              พญ.ศรัญญา ยุทธโกวิท จาก สถาบันประสาทวิทยา              
              </p>
              <div className="flex justify-center items-center space-x-4 mt-8  ">
                {/* รูปที่ 1 (กว้างกว่า) */}
                <img src="/image/SWU_White.png" alt="รูปที่ 1" className="w-48 h-16 " />
                {/* รูปที่ 2 (สั้นกว่า) */}
                <img src="/image/health-com-logo.png" alt="รูปที่ 2" className="w-32 h-16 " />
              </div>

              <p className="text-[0.6rem] mt-8 text-[#ffffff] drop-shadow-lg text-center">
                Unexpected Day | การเผชิญกับโรคหลอดเลือดสมองเฉียบพลัน
              </p>

              </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutme;
