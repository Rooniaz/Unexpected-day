import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatedText2 } from "../../components/AnimatedText";
import { useAudio } from "../../contexts/AudioProvider"; // นำเข้า useAudio


const FriendBrain: React.FC = () => {
  const navigate = useNavigate();

  const texts = [
    `ซึ่งเพื่อนคุณสังเกตอาการของ`,
    `โรคหลอดเลือดสมองจาก...`,
  ];

  const [visibleTexts, setVisibleTexts] = useState<string[]>([]);
  const [bgColor, setBgColor] = useState("transparent");
  const [isClickable, setIsClickable] = useState(false);

  const showNextText = useCallback(() => {
    if (visibleTexts.length < texts.length) {
      setVisibleTexts(prev => [...prev, texts[prev.length]]);
    }
  }, [visibleTexts.length, texts]);

  const handleVideoEnd = useCallback(() => {
    setBgColor("black");
    setTimeout(() => {
      setIsClickable(true);
    }, 2000);
  }, []);

  const handleClick = () => {
    if (isClickable && visibleTexts.length === texts.length) {
      navigate("/GuideBefast");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (visibleTexts.length < texts.length) {
        showNextText();
      } else {
        clearInterval(interval);
        handleVideoEnd();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [visibleTexts.length, showNextText, handleVideoEnd]);


    const { playAudio, pauseAudio } = useAudio();
  
    useEffect(() => {
      playAudio(); // เล่นเพลงต่อจากหน้า Warning
      return () => pauseAudio(); // หยุดเพลงเมื่อออกจากหน้า (แต่เก็บเวลาไว้)
    }, []);
  

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-black">
      <div
        className="relative w-[390px] h-[844px] overflow-hidden"
        style={{ backgroundColor: bgColor }}
        onClick={handleClick}
      >
        <img
          src="/image/befast/body-befast-shadow.png"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] z-10">
          <div className="rounded-lg flex flex-col items-center space-y-6">
            {visibleTexts.map((text, index) => (
              <div key={index} > {/* เพิ่ม key ที่นี่ */}
                <AnimatedText2 text={text}  />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendBrain;
