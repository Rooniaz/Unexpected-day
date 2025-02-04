import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeInOut } from '../../components/fadeInOut';

const UnexpectedDayForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    dream: ''
  });

  useEffect(() => {
    const savedName = localStorage.getItem('userName') || '';
    const savedAge = localStorage.getItem('userAge') || '';
    const savedDream = localStorage.getItem('userDream') || '';
    
    setFormData({
      name: savedName,
      age: savedAge,
      dream: savedDream
    });
  }, []);

  const goToNext = () => {
    navigate('/epilogue');
  };

        // สร้าง ref สำหรับ audio element
      // const audioRef1 = useRef<HTMLAudioElement>(null);
      const audioRef2 = useRef<HTMLAudioElement>(null);
      // const audioRef3 = useRef<HTMLAudioElement>(null);
  
      useEffect(() => {
          // ตั้งค่า volume หลังจาก component mount
          // if (audioRef1.current) {
          //     audioRef1.current.volume = 0.5;
          // }
          if (audioRef2.current) {
              audioRef2.current.volume = 0.5;
          }
          // if (audioRef3.current) {
          //     audioRef3.current.volume = 0.2;
          // }
      }, []);

  return (
    <div className="w-full min-h-screen bg-black flex justify-center items-center">
                    {/* <audio ref={audioRef1} src="/Sound/Hospital Sound/Hospital Busy Ambience Loop.mp3" autoPlay loop /> */}
                    <audio ref={audioRef2} src="/Sound/Sound End/Peaceful_Ambient_Piano_full.mp3" autoPlay loop />
  {/* <audio ref={audioRef3} src="/Sound/Hospital Sound/Hospital Busy Ambience Loop.mp3" autoPlay loop /> */}
      <motion.div
        className="relative w-[390px] h-[844px] overflow-hidden"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={fadeInOut(2, "easeInOut", 0)}
        onClick={goToNext}
      >
        <div className="w-full h-full flex justify-center items-center p-6 bg-[#FFF8E7]">
          <div className="w-full border-2 border-blue-500">
            {/* Header */}
            <div className="bg-[#E6F3FF] p-4 text-center border-b-2 border-blue-500 font-custom">
              <h1 className="text-2xl font-bold mb-1">
                Unexpected Day
              </h1>
              <div className="text-base">
                การเผชิญกับโรคหลอดเลือดสมองเฉียบพลัน
              </div>
            </div>

            {/* Dream Section */}
            <div className="bg-[#E6F3FF] p-3 border-b-2 border-blue-500 font-custom">
              <div className="text-lg text-center">ความฝันของ {formData.name}</div>
            </div>

            {/* Dream Content */}
            <div className="bg-white p-4 min-h-[120px] border-b-2 border-blue-500 font-custom">
              {formData.dream}
            </div>

            {/* Name and Age */}
            <div className="grid grid-cols-2 border-b-2 border-blue-500 font-custom">
              <div className="p-3 bg-[#E6F3FF] border-r-2 border-blue-500">
                <span className="text-lg">คุณ : </span>
                <span>{formData.name}</span>
              </div>
              <div className="p-3 bg-[#E6F3FF]">
                <span className="text-lg">อายุ : </span>
                <span>{formData.age}</span>
              </div>
            </div>

            {/* Bottom Message */}
            <div className="bg-white p-4 text-center font-custom">
              <p>อายุเท่านี้</p>
              <p>ก็สามารถเป็น</p>
              <p>โรคหลอดเลือดสมองเฉียบพลันได้!</p>
              <p>เพราะฉะนั้นอย่าละเลยการใช้ชีวิต</p>
            </div>

            {/* Footer */}
            <div className="bg-white text-center p-2 text-sm font-custom">
              หากพบอาการผิดปกติโทร 1669
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="absolute bottom-4 right-4 text-white/80 text-2xl z-20">
          {'>>'}
        </div>
      </motion.div>
    </div>
  );
};

export default UnexpectedDayForm;