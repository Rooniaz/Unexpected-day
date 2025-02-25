import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAudio } from "../contexts/AudioProvider";

const Warning: React.FC = () => {
  const navigate = useNavigate();
  const { playAudio, pauseAudio } = useAudio();

  useEffect(() => {
    playAudio(); // เล่นเพลงเมื่อเข้าสู่หน้า Warning
    return () => pauseAudio(); // หยุดเพลงเมื่อออกจากหน้า (แต่เก็บเวลาไว้)
  }, []);

  return (
    <div
      className="min-h-screen bg-white flex flex-col items-center justify-center p-4 cursor-pointer"
      onClick={() => navigate('/welcome')} // คลิกที่ทั้งหน้าเพื่อไปต่อ
    >
      <div className="w-full max-w-lg text-center">

        <p className="text-4xl font-custom mb-4 bg-yellow-300 text-black p-2">Trigger Warning!</p>
        <p className="text-lg font-custom mb-4">เว็บไซต์นี้มีเสียงและเอฟเฟคที่ละเอียดอ่อน </p>
        <p className="text-lg font-custom mb-4">โปรดใช้วิจารณญาณในการเล่นเกมเว็บไซต์ของพวกเรา</p>
        <p className="text-lg font-custom mb-8">ขอให้<span className="text-orange-500">ทุกคนโชคดีและมีสุขภาพที่แข็งแรงนะคะ</span> :)</p>

      </div>
    </div>
  );
};

export default Warning;
