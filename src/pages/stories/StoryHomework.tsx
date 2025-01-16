import React from "react";
import { useNavigate } from "react-router-dom";

const StoryHomework: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg text-center">
        <h2 className="text-3xl mb-6">การบ้านที่ต้องทำ</h2>
        <button 
          onClick={() => navigate('/epilogue')}
          className="mt-8 px-6 py-2 bg-white text-black rounded hover:bg-gray-200"
        >
          ดำเนินต่อ →
        </button>
      </div>
    </div>
  );
};
export default StoryHomework;