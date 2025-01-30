import React from "react";
import { useNavigate } from "react-router-dom";

const Epilogue: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg text-center space-y-6">
        <h2 className="text-3xl font-bold">BeFast</h2>
        <p className="text-lg">ทุกการตัดสินใจล้วนมีผลต่อเส้นทางของเรา</p>
        <div className="bg-gray-800 p-6 rounded-lg">
          <p className="text-xl mb-4">สิ่งที่คุณได้เรียนรู้</p>
          <p className="text-gray-300">การจัดการเวลาและการตัดสินใจที่ดีคือกุญแจสำคัญ</p>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-all"
        >
          เริ่มต้นใหม่อีกครั้ง
        </button>
      </div>
    </div>
  );
};

export default Epilogue;


