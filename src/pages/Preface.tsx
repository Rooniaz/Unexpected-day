import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Preface: React.FC = () => {
  const navigate = useNavigate();
    // สร้าง ref สำหรับ audio element
    const audioRef1 = useRef<HTMLAudioElement>(null);
    const audioRef2 = useRef<HTMLAudioElement>(null);
    const audioRef3 = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        // ตั้งค่า volume หลังจาก component mount
        if (audioRef1.current) {
            audioRef1.current.volume = 0.5;
        }
        if (audioRef2.current) {
            audioRef2.current.volume = 0.5;
        }
        if (audioRef3.current) {
            audioRef3.current.volume = 0.2;
        }
    }, []);

  return (
    <div
    className="min-h-screen bg-white flex flex-col items-center justify-center text-center p-4">
    {/* <audio ref={audioRef1} src="/Sound/Scene Start/26365 Group of people walking on grass path loop-full.mp3" autoPlay loop /> */}
    <audio ref={audioRef2} src="/Sound/Scene Start/For Education - Full.mp3" autoPlay loop />
          {/* <audio ref={audioRef3} src="/Sound/Scene in park/Park Ambience.mp3" autoPlay loop /> */}
      <div className="w-full max-w-lg">
        <div className="bg-white relative">
          {/* <div className="absolute top-0 left-0 w-16 h-20 bg-black transform -skew-x-12"></div>
          <div className="absolute top-0 right-0 w-16 h-20 bg-black transform skew-x-12"></div> */}
        </div>
        <div className="py-16 px-4">
          <h1 className="text-5xl font-custom font-bold mb-2">Unexpected</h1>
          <p className="text-5xl font-custom font-bold mb-4">Day</p>
          <p className="text-lg font-custom mb-4 mt-9">การเผชิญกับโรคหลอดเลือด</p>
          <p className="text-lg font-custom mb-8">สมองแบบเฉียบพลัน</p>
          <button 
            onClick={() => navigate('/warning')}
            className="mt-8 px-6 py-2 bg-black text-white rounded hover:bg-gray-800 font-custom"
          >
            ถัดไป {'>>'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Preface;