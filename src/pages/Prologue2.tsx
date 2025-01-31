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
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 font-custom">
      <motion.div className="w-full max-w-lg text-center"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeInOut(2, "easeInOut", 0)}>
        <h2 className="text-2xl mb-4">คุณกำลังทำอะไรอยู่</h2>
        <div className="space-y-4">
          {choices.map((choice, index) => (
            <button 
              key={index}
              onClick={() => navigate(choice.path)}
              className="w-full px-6 py-3 bg-gray-700 text-white rounded-3xl hover:bg-gray-600 font-custom "
            >
              {choice.text}
            </button>
          ))}
        </div>
        {/* <div className="mt-16 text-6xl font-bold font-custom">
          12:12
        </div> */}
      </motion.div>
    </div>
  );
};

export default Prologue2;
