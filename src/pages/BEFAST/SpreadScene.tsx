import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";  // ใช้ useNavigate แทนการกำหนด path
import AfterBefast from "./AfterBefast"; // สมมติว่า AfterBefast เป็นคอมโพเนนต์อื่น

const SpreadScene = () => {
  const [isTransitionDone, setIsTransitionDone] = useState(false);
  const navigate = useNavigate();  // ฟังก์ชันสำหรับการนำทาง

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitionDone(true); // เมื่อเวลาผ่านไปแล้ว ให้เปลี่ยนไปที่หน้า AfterBefast
      navigate("/AfterBefast");  // ใช้ navigate แทนการกำหนด path ตรงๆ
    }, 3000); // แสดงข้อความ 3 วินาที


    
    return () => clearTimeout(timer); // ทำการเคลียร์ timer เมื่อคอมโพเนนต์ unmount
  }, [navigate]);

        // สร้าง ref สำหรับ audio element
      // const audioRef1 = useRef<HTMLAudioElement>(null);
      const audioRef2 = useRef<HTMLAudioElement>(null);
      // const audioRef3 = useRef<HTMLAudioElement>(null);
  
      useEffect(() => {
          // ตั้งค่า volume หลังจาก component mount
          // if (audioRef1.current) {
          //     audioRef1.current.volume = 0.5;
          // }
          if (audioRef2.current) {
              audioRef2.current.volume = 0.5;
          }
          // if (audioRef3.current) {
          //     audioRef3.current.volume = 0.2;
          // }
      }, []);
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-b from-gray-300 to-white">
              {/* <audio ref={audioRef1} src="/Sound/Hospital Sound/Hospital Busy Ambience Loop.mp3" autoPlay loop /> */}
              <audio ref={audioRef2} src="/Sound/Scene Start/For Education - Full.mp3" autoPlay loop />
  {/* <audio ref={audioRef3} src="/Sound/Hospital Sound/Hospital Busy Ambience Loop.mp3" autoPlay loop /> */}
      {/* แสดงข้อความก่อนเข้าสู่หน้า AfterBefast */}
      {!isTransitionDone ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="w-[390px] h-[844px] flex justify-center items-center bg-[#000000] text-white text-4xl font-bold px-6 py-2 rounded-lg"
        >
          <div>
            เมื่อพบอาการอย่างใดอย่างหนึ่งให้ <span className="text-red-500">รีบ</span>
          </div>
        </motion.div>
      ) : (
        <AfterBefast />
      )}
    </div>
  );
};

export default SpreadScene;
