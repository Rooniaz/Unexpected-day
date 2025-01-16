import React from "react";
import { useNavigate } from "react-router-dom";

const StoryProcrastinate: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg text-center space-y-6">
        <h2 className="text-3xl font-bold">เอาไว้ก่อน... พรุ่งนี้ค่อยทำ</h2>
        <p className="text-lg">ด้วยความที่งานเยอะเกินไป คุณเลือกที่จะพักก่อน</p>
        <p className="text-lg">แต่พรุ่งนี้ก็มาถึง และงานก็ยังคงอยู่ที่เดิม</p>
        <div className="bg-gray-800 p-6 rounded-lg mt-8">
          <p className="text-red-400">เวลาที่เหลือ: 6 วัน</p>
          <p className="text-yellow-400">ความเครียดเพิ่มขึ้น 20%</p>
        </div>
        <button 
          onClick={() => navigate('/story/procrastinate/next')}
          className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-all"
        >
          ดูผลลัพธ์ →
        </button>
      </div>
    </div>
  );
};
export default StoryProcrastinate;