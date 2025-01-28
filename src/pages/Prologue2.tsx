import React from "react";
import { useNavigate } from "react-router-dom";

const Prologue2: React.FC = () => {
  const navigate = useNavigate();

  const choices = [
    { text: "เรียน", path: "/story/homework" },
    { text: "ทำงาน", path: "/story/work" },
    { text: "กินข้าว", path: "/story/canteen" },
    { text: "นั่งเฉย ๆ", path: "/story/park" },
    // { text: "ทำนั่งอยู่ส่วนหนาแหมงไปกลับ", path: "/story/routine" }
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg text-center">
        <h2 className="text-2xl mb-4">คุณกำลังทำอะไรอยู่</h2>
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
