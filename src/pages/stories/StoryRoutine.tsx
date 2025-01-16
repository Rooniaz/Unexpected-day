import React from "react";
import { useNavigate } from "react-router-dom";

const StoryRoutine: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg text-center space-y-6">
        <h2 className="text-3xl font-bold">ชีวิตประจำวัน</h2>
        <div className="space-y-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-lg">08:00 - ตื่นนอน</p>
            <div className="w-full bg-gray-700 h-2 rounded-full">
              <div className="w-3/4 bg-green-500 h-2 rounded-full"></div>
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-lg">12:00 - เรียนออนไลน์</p>
            <div className="w-full bg-gray-700 h-2 rounded-full">
              <div className="w-1/2 bg-yellow-500 h-2 rounded-full"></div>
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-lg">18:00 - ทำการบ้าน</p>
            <div className="w-full bg-gray-700 h-2 rounded-full">
              <div className="w-1/4 bg-red-500 h-2 rounded-full"></div>
            </div>
          </div>
        </div>
        <button 
          onClick={() => navigate('/story/routine/progress')}
          className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-all"
        >
          ตรวจสอบความคืบหน้า →
        </button>
      </div>
    </div>
  );
};

export default StoryRoutine;