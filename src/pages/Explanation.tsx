
// ไม่ได้ใช้แล้ว

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAudio } from "../contexts/AudioProvider";

const Explanation: React.FC = () => {
  const navigate = useNavigate();
  const { playAudio, pauseAudio } = useAudio();

  useEffect(() => {
    playAudio("/Sound/Scene Start/Start & End.mp3", 0.2); // เล่นเพลงเฉพาะหน้านี้
    return () => pauseAudio(); // หยุดเพลงเมื่อออกจากหน้า
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg text-center">
        <p className="text-lg  mb-8 font-bold">คำชี้แจง</p>
        <p className="text-lg  mb-2">ผลงานชิ้นนี้เกิดขึ้นเพื่อให้ผู้เล่นทุกคนได้เรียนรู้</p>
        <p className="text-lg  mb-2">และตระหนักถึงภัยเงียบที่ไม่อาจคาดคิด</p>
        <p className="text-lg  mb-2">โดยเป็นเรื่องราวเกี่ยวกับโรคหลอดเลือดสมอง</p>
        <p className="text-lg  mb-2">ซึ่งเป็นโรคที่สามารถเกิดได้กับทุกคนแม้แต่ในคนอายุน้อย</p>
        <p className="text-lg  mb-2">แต่หากทราบวิธีสังเกตอาการของโรคนี้</p>
        <p className="text-lg  mb-2">ก็จะเป็นประโยชน์ทั้งต่อตัวเองและคนรอบข้างได้นั่นเอง</p>
        <p className="text-lg  mb-4 mt-8">ทั้งนี้พวกเราขอขอบคุณผู้เล่นทุกคนที่เข้ามาเล่นเกมเว็บไซต์นี้</p>
        <p className="text-lg  mb-4">ตอนนี้พวกเราขอให้ทุกคนใช้เวลาในการเรียนรู้ให้คุ้มค่าที่สุดนะคะ</p>
        
        <button 
          onClick={() => navigate('/welcome')}
          className="mt-8 px-6 py-2 bg-black  text-white rounded hover:bg-gray-800"
        >
          ถัดไป {'>>'}
        </button>
      </div>
    </div>
  );
};

export default Explanation;
