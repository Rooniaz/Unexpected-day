import React from "react";
import { useNavigate } from "react-router-dom";
  
  const StoryTimeManagement: React.FC = () => {
    const navigate = useNavigate();
  
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-lg text-center space-y-6">
            <h2 className="text-3xl font-bold">จัดการเวลาให้เป็นระบบ</h2>
            <div className="grid grid-cols-2 gap-4 my-8">
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-lg font-bold mb-2">เช้า</p>
                <p>ทำการบ้านวิชาหลัก</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-lg font-bold mb-2">บ่าย</p>
                <p>ทำงานกลุ่ม</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-lg font-bold mb-2">เย็น</p>
                <p>ทบทวนบทเรียน</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-lg font-bold mb-2">ค่ำ</p>
                <p>เตรียมงานพรุ่งนี้</p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/story/timemanagement/results')}
              className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-all"
            >
              ดูผลการจัดการเวลา →
            </button>
          </div>
        </div>
      );
    };
    
  export default StoryTimeManagement;