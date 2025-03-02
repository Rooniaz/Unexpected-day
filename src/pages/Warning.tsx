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
      className="min-h-screen bg-black flex justify-center items-center p-4 relative"
      onClick={() => navigate("/welcome")} // ✅ กดที่หน้าจอเพื่อไปต่อ
    >
      {/* ✅ เนื้อหาหลัก */}
      <div
          className="relative w-[390px] h-[844px] flex justify-center items-center text-center p-4"
            style={{
              backgroundImage: "url('/image/bgbefast.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >        {/* ✅ ปุ่ม Hamburger Menu */}
        {/* <motion.button
          className="absolute top-4 left-4 text-black text-3xl"
          onClick={(e) => {
            e.stopPropagation(); // ป้องกันการคลิกที่ปุ่มแล้วไปหน้ายถัดไป
            setIsMenuOpen(!isMenuOpen);
          }}
          whileTap={{ scale: 0.9 }}
          animate={{ rotate: isMenuOpen ? 90 : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </motion.button> */}

        {/* ✅ เมนูแสดงเมื่อกด Hamburger */}
        {/* <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="absolute top-16 left-4 bg-gray-800 bg-opacity-80 text-white rounded-lg shadow-lg p-4 w-40 z-10"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()} // ป้องกันการกดเมนูแล้วไปหน้ายถัดไป
            >
              <ul className="text-left">
                <li className="py-2 cursor-pointer hover:bg-gray-700 rounded px-2" onClick={() => navigate("/Aboutme")}>
                  เกี่ยวกับ
                </li>
                <li className="py-2 cursor-pointer hover:bg-gray-700 rounded px-2" onClick={() => navigate("/Credit")}>
                  เครดิต
                </li>
                <li className="py-2 cursor-pointer hover:bg-gray-700 rounded px-2" onClick={() => navigate("/Credit1")}>
                  เครดิต1
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence> */}
      <div className="absolute top-6  right-6">
        <img 
          src="/image/LOGO .png" // เปลี่ยนเป็น path ของโลโก้ของคุณ
          className="w-14 h-18" // ปรับขนาดตามต้องการ
        />
      </div>
        {/* ✅ คำเตือนและข้อมูล */}
        <div className="w-full max-w-lg">
        <div className="w-full flex justify-center">
          <p className="text-2xl font-custom mb-4 bg-yellow-300 text-black p-2 rounded-2xl w-64 text-center">
            Trigger Warning!
          </p>
        </div>
          <p className="text-base font-custom mb-4">เว็บไซต์นี้มีเสียงและเอฟเฟคที่ละเอียดอ่อน </p>
          <p className="text-base font-custom mb-4">โปรดใช้วิจารณญาณในการเล่นเกมเว็บไซต์ของพวกเรา</p>
          <p className="text-base font-custom mb-8">
            ขอให้<span className="text-orange-500">ทุกคนโชคดีและมีสุขภาพที่แข็งแรงนะคะ</span> :)
          </p>
          <div className="absolute inset-x-0 bottom-40 flex justify-center items-center mb-4">
          <div className="text-[#817c7c] text-xl animate-pulse">กดเพื่อไปต่อ</div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Warning;
