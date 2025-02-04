import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAudio } from "../contexts/AudioProvider"; // นำเข้า useAudio

const Preface: React.FC = () => {
  const navigate = useNavigate();
  const { playAudio, pauseAudio } = useAudio();

  useEffect(() => {
    playAudio(); // เล่นเพลงต่อจากหน้า Warning
    return () => pauseAudio(); // หยุดเพลงเมื่อออกจากหน้า (แต่เก็บเวลาไว้)
  }, []);


  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center p-4">
      <div className="w-full max-w-lg">
        <div className="py-16 px-4">
          <h1 className="text-5xl font-custom font-bold mb-2">Unexpected</h1>
          <p className="text-5xl font-custom font-bold mb-4">Day</p>
          <p className="text-lg font-custom mb-4 mt-9">การเผชิญกับโรคหลอดเลือด</p>
          <p className="text-lg font-custom mb-8">สมองแบบเฉียบพลัน</p>
          <button
            onClick={() => navigate("/warning")}
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
