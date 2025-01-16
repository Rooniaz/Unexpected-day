import React from "react";
import { useNavigate } from "react-router-dom";
  
  const StorySwitch: React.FC = () => {
    const navigate = useNavigate();
  
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-lg text-center space-y-6">
            <h2 className="text-3xl font-bold">เส้นทางใหม่</h2>
            <p className="text-lg">คุณตัดสินใจที่จะเริ่มต้นใหม่ที่อื่น</p>
            <div className="bg-gray-800 p-6 rounded-lg space-y-4">
              <h3 className="text-xl font-bold">สิ่งที่ต้องพิจารณา</h3>
              <ul className="text-left list-disc list-inside">
                <li>ค่าใช้จ่ายในการย้าย</li>
                <li>การปรับตัวกับที่ใหม่</li>
                <li>ระยะเวลาที่ต้องเริ่มใหม่</li>
                <li>โอกาสในอนาคต</li>
              </ul>
            </div>
            <button 
              onClick={() => navigate('/story/switch/decision')}
              className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-all"
            >
              ตัดสินใจ →
            </button>
          </div>
        </div>
      );
    };
    
  export default StorySwitch;