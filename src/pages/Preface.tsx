import React from "react";
import { useNavigate } from "react-router-dom";

const Preface: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center p-4">
      <div className="w-full max-w-lg">
        <div className="bg-white relative">
          <div className="absolute top-0 left-0 w-16 h-20 bg-black transform -skew-x-12"></div>
          <div className="absolute top-0 right-0 w-16 h-20 bg-black transform skew-x-12"></div>
        </div>
        <div className="py-16 px-4">
          <h1 className="text-3xl font-bold mb-8">DEADLINE ALWAYS EXISTS</h1>
          <p className="text-lg mb-4">สิ่งสามัญที่เป็นขาแรงของ Senior Project</p>
          <p className="text-lg mb-4">โครงการและแผนงานที่ได้ และคืบหน้าอย่างไร</p>
          <p className="text-lg mb-8">รู้ว่าอะไรต้องทำก่อนหลัง</p>
          <p className="text-xl font-bold mb-6">'Deadline is my inspiration'</p>
          <button 
            onClick={() => navigate('/warning')}
            className="mt-8 px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            ถัดไป →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Preface;