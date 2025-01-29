import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInOut } from "../../components/fadeInOut";
import { AnimatedText } from "../../components/AnimatedText";

  
  const StoryCanteen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-black flex justify-center items-center">
      {/* Mobile-sized container */}
      <motion.div className="relative w-[390px] h-[844px] overflow-hidden"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeInOut(2, "easeInOut", 0)}>
        
        {/* Background Image */}
        <img 
          src="/gif/canteen_15-17.gif" 
          alt="Background" 
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dialog text container */}
        <div className="absolute bottom-20 my-20 left-1/2 -translate-x-1/2 w-[90%] z-10">
          <div className="px-6 py-4 bg-black/50 rounded-lg">
          <AnimatedText 
              text="เจน : แกพรุ่งนี้วันหยุดไปเที่ยวที่นี่กันดีมั้ย คิดว่าแกน่าจะชอบนะ canteen"
            />
          </div>
        </div>
        {/* Continue Button - Bottom right */}
        <div 
          onClick={() => navigate('/story/canteen2')}
          className="absolute bottom-4 right-4 text-white/80 text-2xl cursor-pointer hover:text-white/100 z-20"
        >
          {'>>'} 
        </div>

      </motion.div>
    </div>
  );
};

    
  export default StoryCanteen;