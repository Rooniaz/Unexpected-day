import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInOut } from "../components/fadeInOut";

const Prologue2: React.FC = () => {
  const navigate = useNavigate();

  const choices = [
    { text: "เรียน", path: "/Place/homework" },
    { text: "ทำงาน", path: "/Place/work" },
    { text: "กินข้าว", path: "/Place/canteen" },
    { text: "นั่งเล่น", path: "/Place/park" },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
<div className="relative flex justify-center items-center 
        w-full h-screen 
        sm:w-[390px] sm:h-[844px]" style={{ backgroundColor: "#000000" }}>        
  <motion.div
          className="w-full max-w-lg text-center"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={fadeInOut(2, "easeInOut", 0)}
        >
          <h2 className="text-2xl mb-4 text-[#fa4901] mb-8">คุณกำลังทำอะไรอยู่</h2>
          <div className="space-y-4">
            {choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => navigate(choice.path)}
                className="w-3/4 px-6 py-2 bg-white text-lg text-black rounded-3xl hover:bg-[#c9c5c4] "
              >
                {choice.text}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Prologue2;
