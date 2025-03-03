import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAudio } from "../../contexts/AudioProvider"; 

const GuideBefast: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/BeFast");
  };

  const { playAudio, pauseAudio } = useAudio();

  useEffect(() => {
    playAudio("/Sound/Sound fx/Scene BEFAST.mp3", 0.2); // เล่นเพลงเฉพาะหน้านี้
    return () => pauseAudio(); // หยุดเพลงเมื่อออกจากหน้า
  }, []);


  // const audioRef1 = useRef<HTMLAudioElement>(null);

//   useEffect(() => {
//     // ตั้งค่า volume หลังจาก component mount
//     if (audioRef1.current) {
//         audioRef1.current.volume = 0
//     }
// }, []);

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-black">
              {/* <audio ref={audioRef1} src="/Sound/Sound fx/Scene BEFAST.mp3" autoPlay loop /> */}
      <div
        className="relative w-[390px] h-[844px] overflow-hidden"
        onClick={handleClick}
      >
        {/* 🔹 ใช้ GIF เป็นพื้นหลัง */}
        <img
          src="/image/befast/body-befast-shadow.png"
          alt="GIF Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* 🔹 แสดง GIF รูปมือ + ข้อความ */}
        <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] z-10 text-white text-center text-lg flex flex-col items-center">
          {/* ✅ GIF รูปมือ */}
          <img 
            src="/image/befast/click.gif" 
            alt="Hand Icon" 
            className="w-40 h-30 filter invert"
          />
          
          {/* ✅ ข้อความ */}
          <p>กดไอคอน</p>
          <p>เพื่อสังเกตอาการ</p>
        </div>
      </div>
    </div>
  );
};

export default GuideBefast;
