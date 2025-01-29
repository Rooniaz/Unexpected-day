import React from "react";
import { useNavigate } from "react-router-dom";

const Warning: React.FC = () => {
  const navigate = useNavigate();


  return (
    <div
      className="min-h-screen bg-white flex flex-col items-center justify-center p-4"
    >
      <div className="w-full max-w-lg text-center">
        <p className="text-lg font-custom mb-4">เป็นไปได้ที่นี่จะเต็มไปด้วยความหมาย</p>
        <p className="text-lg font-custom mb-4">ไม่อยากจะบอกความหมายของการนำไปของคุณก่อนนำเข้า</p>
        <p className="text-lg font-custom mb-8">หากคุณมีเวลาพอที่จะเลือกสิ่งต่างๆ ในช่วงนี้</p>
        <button 
          onClick={() => navigate('/welcome')}
          className="mt-8 px-6 py-2 bg-black font-custom text-white rounded hover:bg-gray-800"
        >
          ถัดไป {'>>'}
        </button>
      </div>
    </div>
  );
};
export default Warning;
