import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAudio } from "../contexts/AudioProvider";
// import { FiMenu, FiX } from "react-icons/fi"; // ไอคอน
// import { motion, AnimatePresence } from "framer-motion"; // เพิ่ม animation

const Warning: React.FC = () => {
  const navigate = useNavigate();
  const { playAudio, pauseAudio } = useAudio();
  // const [isMenuOpen, setIsMenuOpen] = useState(false); // สถานะเปิด-ปิดเมนู

  useEffect(() => {
    playAudio("/Sound/Scene Start/Start & End.mp3", 0.2); // เล่นเพลงเฉพาะหน้านี้
    return () => pauseAudio(); // หยุดเพลงเมื่อออกจากหน้า
  }, []);

  return (
    <div
      className="min-h-screen bg-black flex justify-center items-center relative"
      onClick={() => navigate("/welcome")} // ✅ กดที่หน้าจอเพื่อไปต่อ
    >
      {/* ✅ เนื้อหาหลัก */}
      <div className="
        relative flex justify-center items-center 
        w-full h-screen 
        sm:w-[390px] sm:h-[844px]"
            style={{
              backgroundImage: "url('/image/bgbefast.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >    
        {/* ✅ คำเตือนและข้อมูล. */}
        <div className="w-full max-w-lg">
              {/* ✅ คำเตือนและข้อมูล */}
              <div className="w-full max-w-lg flex flex-col items-center text-center mb-16">
          <p className="text-xl font-custom mb-4 bg-yellow-300 text-black p-2 rounded-2xl w-64">
            Trigger Warning!
          </p>
          <p className="text-sm font-custom mb-4">เว็บไซต์นี้มีเสียงและเอฟเฟ็กต์ที่ละเอียดอ่อน</p>
          <p className="text-sm font-custom mb-4">โปรดใช้วิจารณญาณในการเล่นเกมเว็บไซต์ของพวกเรา</p>
          <p className="text-sm font-custom mb-8">
            ขอให้<span className="text-orange-500">ทุกคนโชคดีและมีสุขภาพที่แข็งแรงนะคะ</span> :)
          </p>
        </div>

          <div className="absolute inset-x-0 bottom-20% flex justify-center items-center">
          <div className="text-[#817c7c] text-xl animate-pulse">กดเพื่อไปต่อ</div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Warning;
