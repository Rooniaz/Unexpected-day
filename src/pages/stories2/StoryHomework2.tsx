import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatedText } from "../../components/AnimatedText";

const StoryHomework2: React.FC = () => {
  const navigate = useNavigate();
  const storedName = localStorage.getItem("userName") || "???";
  const [showTextBox, setShowTextBox] = useState(false);
  const [index, setIndex] = useState(0);
  const [isClickable] = useState(true);
  const [isLocked, setIsLocked] = useState(false); 
  const [userReply, setUserReply] = useState("");
  const [isProcessing, setIsProcessing] = useState(false); // 🔒 กันกดซ้ำ

  const texts = [
    `เจน : ${storedName}`,
    `${storedName} : อ.. เอ่ออ`,
    `เจน : ${storedName} แกคิดว่าไง`,
    `${storedName} : : อ..อะ %^&8#`,
    "เจน : พูดอะไรอ่ะ",
    "เจน : เห้ย!! ทำไมแกปากเบี้ยวอ่ะ ไม่แกล้งดิ!",
    "เจน : อะ อึกอ่วย อะอ้ำพเึพ้อร",
  ];

  useEffect(() => {
    let interval: ReturnType<typeof setTimeout>;
    if (isLocked && !showTextBox && index >= 3) {
      interval = setInterval(() => {
        setIndex((prev) => {
          if (prev < texts.length - 1) {
            return prev + 1;
          } else {
            clearInterval(interval);
            navigate('/StoryHomework3');
            return prev;
          }
        });
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isLocked, index, showTextBox, navigate]);

  useEffect(() => {
    if (!userReply.trim()) return; 
    
    setIsProcessing(true); 
    const timer = setTimeout(() => {
      setShowTextBox(false);
      setIsLocked(true);
      setIndex((prev) => prev + 1);
      setIsProcessing(false); 
    }, 500);

    return () => clearTimeout(timer); // 🔄 เคลียร์เมื่อเปลี่ยนข้อความ
  }, [userReply]);

  const nextText = () => {
    if (!isClickable || showTextBox || isLocked || isProcessing) return; // ป้องกันกดซ้ำ
  
    setIsProcessing(true); // 🔒 ล็อกปุ่ม
    if (index < texts.length - 1) {
      if (index === 2) {
        setShowTextBox(true);
      } else {
        setIndex((prev) => prev + 1);
      }
    } else {
      navigate('/StoryHomework3');
    }
  
    setTimeout(() => {
      setIsProcessing(false); // 🔓 ปลดล็อกหลังจากดีเลย์
    }, 500);
  };
  

  // เปลี่ยน GIF เมื่อถึงข้อความ "เจน : พูดอะไรอ่ะ"
  const backgroundGif = () => {
    if (index >= 4) {
      return "/gif/26-27/class.gif";  // ใช้ GIF นี้ค้างไว้
    }
    return "/gif/18-21/jane_class_18-21.gif";  // ค่า default
  };
    
  return (
    <div className="w-full min-h-screen bg-black flex justify-center items-center">
      <audio src="/Sound/Scene Working/Very Calm Office.mp3" autoPlay loop />
      <div
        className="relative w-[390px] h-[844px] overflow-hidden"
        onClick={!showTextBox && isClickable && !isLocked ? nextText : undefined} 
      >
        <img
          src={backgroundGif()}  
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {!showTextBox ? (
          <div className="absolute bottom-20 my-20 left-1/2 -translate-x-1/2 w-[90%] z-10">
            <div className="px-6 py-4 bg-black/50 rounded-lg">
              <AnimatedText key={index} text={texts[index]} />
            </div>
          </div>
        ) : (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] z-10">
            <div className="bg-white rounded-lg p-4 cursor-pointer">
              <input
                type="text"
                value={userReply}
                placeholder="พิมพ์เพื่อตอบ..."
                className="w-full text-center bg-transparent text-black text-xl outline-none border-none py-10"
                onChange={(e) => setUserReply(e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="absolute bottom-[8%] right-6 text-white/80 text-2xl z-20">
          {/* {'>>'} */}
        </div>
      </div>
    </div>
  );
};

export default StoryHomework2;
