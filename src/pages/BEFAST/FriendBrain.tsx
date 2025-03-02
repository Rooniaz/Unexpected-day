import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatedText, AnimatedText3 } from "../../components/AnimatedText";
// import { useAudio } from "../../contexts/AudioProvider";

const FriendBrain: React.FC = () => {
  const navigate = useNavigate();

  const texts = [
    `ซึ่งเพื่อนคุณสังเกตอาการ`,
    `ของโรคหลอดเลือดสมองจาก...`,
  ];

  const [visibleTexts, setVisibleTexts] = useState<string[]>([]);
  const [bgColor, setBgColor] = useState("transparent");
  const [isClickable, setIsClickable] = useState(false);

  const showNextText = useCallback(() => {
    if (visibleTexts.length < texts.length) {
      setTimeout(() => {
        setVisibleTexts((prev) => [...prev, texts[prev.length]]);
      }, 500 * visibleTexts.length);
    }
  }, [visibleTexts.length, texts]);

  // แยกข้อความปกติและข้อความที่ต้องเน้น
  const splitText = (text: string) => {
    const parts = text.split(/(สังเกตอาการ|โรคหลอดเลือด)/g); // แยกคำที่ต้องการเน้น
    return parts.map((part, index) =>
      part.match(/สังเกตอาการ|โรคหลอดเลือด/) ? (
        <AnimatedText3 key={index} text={part} />
      ) : (
        <AnimatedText key={index} text={part} />
      )
    );
  };

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

  // const { playAudio, pauseAudio } = useAudio();

  // useEffect(() => {
  //   playAudio();
  //   return () => pauseAudio();
  // }, []);

  const audioRef1 = useRef<HTMLAudioElement>(null);


  useEffect(() => {
    // ตั้งค่า volume หลังจาก component mount
    if (audioRef1.current) {
        audioRef1.current.volume = 0.5
    }
}, []);

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-black">
        <audio ref={audioRef1} src="/Sound/Sound fx/Scene BEFAST.mp3" autoPlay loop />
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
              <div key={index} className="flex flex-wrap justify-center text-white">
                {splitText(text)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendBrain;
