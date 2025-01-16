import React from "react";
import { useNavigate } from "react-router-dom";

const Prologue2: React.FC = () => {
  const navigate = useNavigate();

  const choices = [
    { text: "งานการบ้าน", path: "/story/homework" },
    { text: "เอาไม่ได้ป่อยมันก่อน", path: "/story/procrastinate" },
    { text: "ย่อยเวลาจากวันที่จะงานทั้งวัน", path: "/story/timemanagement" },
    { text: "ตีตั๋วไปสวิตชาน", path: "/story/switch" },
    { text: "ทำนั่งอยู่ส่วนหนาแหมงไปกลับ", path: "/story/routine" }
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg text-center">
        <h2 className="text-2xl mb-4">ยินดีนำท่านเข้าสู่ทีนี่</h2>
        <div className="space-y-4">
          {choices.map((choice, index) => (
            <button 
              key={index}
              onClick={() => navigate(choice.path)}
              className="w-full px-6 py-3 bg-gray-700 text-white rounded hover:bg-gray-600"
            >
              {choice.text}
            </button>
          ))}
        </div>
        <div className="mt-16 text-6xl font-bold">
          12:12
        </div>
      </div>
    </div>
  );
};

export default Prologue2;
