import React, { useState, useEffect ,useRef} from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInOut } from "../../components/fadeInOut";
import { AnimatedText } from "../../components/AnimatedText";

const StoryHomework: React.FC = () => {
  const navigate = useNavigate();

  // ดึงชื่อจาก localStorage ถ้ามีค่า
  const storedName = localStorage.getItem("userName") || "???";

  // ข้อความที่ต้องการแสดงในลำดับ (แทนที่ {ชื่อที่กรอก} ด้วยค่าจริง)
  const texts = [
    `เจน : ${storedName} พรุ่งนี้วันหยุดไปเที่ยวกันไหมคิดว่าแกน่าจะชอบนะ`,
    `${storedName} : ไม่อ่ะ ช่วงนี้ยุ่งๆอยู่ด้วย`,
    "เจน : ไปเหอะ นานๆทีจะได้ไปด้วยกันนะ",
    " . . . . . . . . . . . .",
    "ฉันจึงกลับมาคิดเรื่องนี้หลังจากจบบทสนทนาลง"
  ];

  // ตัวแปร state สำหรับเก็บตำแหน่งข้อความที่แสดง
  const [index, setIndex] = useState(0);

  // ฟังก์ชันเปลี่ยนข้อความ
  const nextText = () => {
    setIndex((prevIndex) => (prevIndex < texts.length - 1 ? prevIndex + 1 : prevIndex));
  };

  // ใช้ useEffect สำหรับการเปลี่ยนหน้าเมื่อ index ถึงข้อความสุดท้าย
  useEffect(() => {
    if (index === texts.length - 1) {
      navigate('/story/homework2'); // นำไปหน้าอื่นหลังจากแสดงข้อความสุดท้าย
    }
  }, [index, navigate]); // useEffect นี้จะถูกเรียกเมื่อ index เปลี่ยนแปลง

    // สร้าง ref สำหรับ audio element
    const audioRef1 = useRef<HTMLAudioElement>(null);
    // const audioRef2 = useRef<HTMLAudioElement>(null);
    // const audioRef3 = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        // ตั้งค่า volume หลังจาก component mount
        if (audioRef1.current) {
            audioRef1.current.volume = 0.5;
        }
        // if (audioRef2.current) {
        //     audioRef2.current.volume = 0.2;
        // }
        // if (audioRef3.current) {
        //     audioRef3.current.volume = 0.2;
        // }
    }, []);
  
  return (
    <div className="w-full min-h-screen bg-black flex justify-center items-center">
      {/* เพิ่มเพลงในหน้า */}
      <audio ref={audioRef1} src="/Sound/Scene Study/Auditorium Lecture Room Ambience Loop.mp3" autoPlay loop />
      
      {/* Mobile-sized container */}
      <motion.div
        className="relative w-[390px] h-[844px] overflow-hidden"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={fadeInOut(2, "easeInOut", 0)}
        onClick={nextText} // ทำให้ทั้งหน้าเป็นคลิกเพื่อเปลี่ยนข้อความ
      >
        {/* Background Image */}
        <img
          src="/gif/15-17/class_15-17.gif"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dialog text container */}
        <div className="absolute bottom-20 my-20 left-1/2 -translate-x-1/2 w-[90%] z-10">
          <div className="px-6 py-4 bg-black/50 rounded-lg">
            <AnimatedText key={index} text={texts[index]} />
          </div>
        </div>

        {/* Continue Button - Bottom right */}
        <div className="absolute bottom-4 right-4 text-white/80 text-2xl cursor-pointer hover:text-white/100 z-20">
          {'>>'}
        </div>
      </motion.div>
    </div>
  );
};

export default StoryHomework;
