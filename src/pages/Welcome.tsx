import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInOut } from '../components/fadeInOut';
import { useAudio } from "../contexts/AudioProvider"; // นำเข้า useAudio

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: ''
  });

  // โหลดค่าจาก localStorage เมื่อเปิดหน้านี้
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const storedAge = localStorage.getItem("userAge");

    if (storedName && storedAge) {
      setFormData({ name: storedName, age: storedAge });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // บันทึกค่าลง localStorage
    localStorage.setItem("userName", formData.name);
    localStorage.setItem("userAge", formData.age);

    console.log("formData:", formData);
    navigate('/Prechapter');
  };

  // เคลียร์ค่าทุกครั้งที่เข้าหน้านี้ใหม่
  useEffect(() => {
    localStorage.removeItem("userName");
    localStorage.removeItem("userAge");
    setFormData({ name: "", age: "" });
  }, []);

  const { playAudio, pauseAudio } = useAudio();

useEffect(() => {
  playAudio("/Sound/Scene Start/Start & End.mp3", 0.2); // เล่นเพลงเฉพาะหน้านี้
  return () => pauseAudio(); // หยุดเพลงเมื่อออกจากหน้า
}, []);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      {/* เพิ่มพื้นหลังเป็น GIF */}
      <motion.div 
        initial="initial"
        animate="animate"
        exit="exit"
        variants={fadeInOut(2, "easeInOut", 0)}
        className=" relative flex justify-center items-center 
        w-full h-screen 
        sm:w-[390px] sm:h-[844px]"
        style={{
          backgroundImage: "url('/image/bgbefast.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >     
      
         {/* เพิ่มโลโก้ */}
      <div className="absolute top-14 left-1/2 transform -translate-x-1/2">
        <img 
          src="/image/cover/top.png" // เปลี่ยนเป็น path ของโลโก้ของคุณ
          className="w-42 h-36" // ปรับขนาดตามต้องการ
        />
      </div>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="w-full max-w-lg px-6 py-4 bg-opacity-70 rounded-lg ">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-2xl text-[#fa4901] mb-2 ">
                  ชื่อเล่น
                  <span className="text-sm text-black"> (กรุณากรอกชื่อเป็นภาษาไทย ห้ามเว้นวรรค หรือใส่สัญลักษณ์)</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    const thaiRegex = /^[ก-๙\s]+$/; // อนุญาตเฉพาะอักษรไทยและช่องว่าง
                    if (e.target.value === "" || thaiRegex.test(e.target.value)) {
                      setFormData({ ...formData, name: e.target.value });
                    }
                  }}
                  className="w-full p-2 border mb-4 rounded-3xl"
                  required
                />
              </div>
              <div>
                <label className="block text-2xl text-[#fa4901] mb-2 ">อายุ</label>
                <input
                  type="text"
                  inputMode="numeric" // กำหนดแป้นพิมพ์ให้รองรับเฉพาะตัวเลข
                  pattern="[0-9]*"  // กรองค่าให้เป็นตัวเลขเท่านั้น
                  value={formData.age}
                  onChange={(e) => {
                    let value = e.target.value.replace(/[^0-9]/g, ""); // กรองเฉพาะตัวเลข

                    // ตรวจสอบว่าเลขแรกไม่เป็น 0 และมีความยาวไม่เกิน 3 หลัก
                    if (value.length === 1 && value === "0") {
                      value = ""; // ถ้าเลขแรกเป็น 0 ให้ลบออก
                    }
                    if (value.length > 2) {
                      value = value.slice(0, 2); // จำกัดจำนวนหลักสูงสุดที่ 3 หลัก
                    }

                    setFormData({ ...formData, age: value });
                  }}
                  className="w-full p-2 border mb-8 rounded-3xl"
                  required
                />
              </div>
              <button 
                type="submit"
                className="w-full px-6 py-2 text-xl text-[#817c7c] rounded 
                          transition duration-300 ease-in-out hover:drop-shadow-lg"
              >
                กดเพื่อไปต่อ
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Welcome;
