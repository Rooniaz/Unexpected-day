import React from "react";
import { useNavigate } from "react-router-dom";
  
  const StoryCanteen2: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-black flex justify-center items-center">
      {/* Mobile-sized container */}
      <div className="relative w-[390px] h-[844px] overflow-hidden">
        
        {/* Background Image */}
        <img 
          src="/gif/jane_canteen_18-21.gif" 
          alt="Background" 
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dialog text container */}
        <div className="absolute bottom-20 my-20 left-1/2 -translate-x-1/2 w-[90%] z-10">
          <div className="px-6 py-4 bg-black/50 rounded-lg">
            <p className="text-lg text-white font-custom text-center">
              เจน : แกพรุ่งนี้วันหยุดไปเที่ยวที่นี่กันดีมั้ย คิดว่าแกน่าจะชอบนะ canteen
            </p>
          </div>
        </div>

        {/* Continue Button - Bottom right */}
        <div 
          onClick={() => navigate('/epilogue')}
          className="absolute bottom-4 right-4 text-white/80 text-2xl cursor-pointer font-custom hover:text-white/100 z-20"
        >
          {'>>'} 
        </div>

      </div>
    </div>
  );
};

    
  export default StoryCanteen2;