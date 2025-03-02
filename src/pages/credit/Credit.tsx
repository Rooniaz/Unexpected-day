import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // ไอคอน
import { motion, AnimatePresence } from "framer-motion"; // เพิ่ม animation
import { useAudio } from "./../../contexts/AudioProvider";


const Credit: React.FC = () => {
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
              <li className="py-2 cursor-pointer hover:bg-gray-700 rounded px-2" onClick={() => navigate("/Credit1")}>เครดิต1</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="w-full max-w-lg px-6 py-4 bg-opacity-70 rounded-lg ">
            <form onSubmit={handleSubmit} className="space-y-6">
            <img 
              src="/icon.svg" 
              alt="SVG Icon" 
              width="30" 
              height="30" 
              className="absolute top-6 right-6"
            />

              <div>
              <h2 className="text-4xl font-bold mb-3 text-[#fa4901]">เครดิต</h2>
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
              <button 
                type="submit"
                className="absolute bottom-[3%] right-6 font-bold text-xl text-orange-500 underline rounded"
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

export default Credit;
