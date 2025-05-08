import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AfterBefast = () => {
  const [sliderValue, setSliderValue] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [showGif, setShowGif] = useState(false);
  const maxSliderValue = 100;
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const navigate = useNavigate();
  const [isAutoMoveComplete, setIsAutoMoveComplete] = useState(false);


  const handleDragEnd = () => {
    if (sliderValue < maxSliderValue) {
      setSliderValue(0);
    }
  };

  useLayoutEffect(() => {
    if (trackRef.current) {
      setTrackWidth(trackRef.current.offsetWidth);
    }
  }, [trackRef.current]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (timeLeft > 0 && sliderValue < maxSliderValue) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && sliderValue < maxSliderValue) {
      const autoMove = setInterval(() => {
        setSliderValue((prevValue) => {
          if (prevValue >= maxSliderValue) {
            clearInterval(autoMove);
            setIsAutoMoveComplete(true); // เพิ่มบรรทัดนี้
            return maxSliderValue;
          }
          return prevValue + 5; // เปลี่ยนจาก 100 เป็น 5 เพื่อให้เลื่อนช้าลง
        });
      }, 100); // ลดเวลาระหว่างแต่ละครั้งเพื่อให้การเคลื่อนที่ดูราบรื่น
      return () => clearInterval(autoMove);
    }
  }, [timeLeft, sliderValue]);

  useEffect(() => {
    if (timeLeft <= 3) {
      setShowGif(true);
    } else {
      setShowGif(false);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (sliderValue >= maxSliderValue) {
      const timer = setTimeout(() => {
        setShowMessage(true);
        setTimeout(() => {
          navigate("/TimeToCall");
        }, 5000);
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setShowMessage(false);
    }
  }, [sliderValue, navigate]);

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (timeLeft / 10) * circumference;

  const audioRef1 = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // ตั้งค่า volume หลังจาก component mount
    if (audioRef1.current) {
        audioRef1.current.volume = 1  //รอเพลง BassImpactLowDrum
    }

}, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 3 }}
      className="w-full min-h-screen flex justify-center items-center bg-black"
    >
        <audio ref={audioRef1} src="/Sound/Sound fx/Effect Rush-Time-BEFAST.mp3" autoPlay loop />
        <motion.div
  className="relative flex justify-center items-center w-full h-screen 
             sm:w-[390px] sm:h-[844px] overflow-hidden flex-col"
  style={{
    backgroundImage: "url('/image/BgAfterbefast.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
        
        {showMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute top-[50%] left-1/2 transform -translate-x-1/2 text-center"
          >
            <div className="bg-opacity-80 text-[#fa4901] text-2xl px-6 py-2 rounded-lg whitespace-nowrap" >
            ส่งให้ทันภายใน 4.30 ชม.
            </div>
          </motion.div>
        )}
        
        {showGif && sliderValue < maxSliderValue && (
          <motion.img
            src="/image/befast/redframe2.gif"
            alt="Warning"
            className="absolute top-0 left-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}

<div 
  ref={trackRef} 
  className="absolute top-[60%] w-[550px] h-12 bg-[#565656] rounded flex items-center pb-3"
>
<motion.div
    className={`absolute left-[10%] text-[#9aa0a6] text-5xl px-6 py-2 rounded-lg z-20 ${
      sliderValue >= 100 || isAutoMoveComplete  ? "hidden" : ""
    }`}
    animate={{ x: 60, opacity: 0 }}
    initial={{ x: 0, opacity: 1 }}
    transition={{ duration: 1.5, repeat: Infinity }}
  >
    {" >> "}
  </motion.div>
  
  <motion.div
    className={`absolute left-[60%] text-[#9aa0a6] text-5xl px-6 py-2 rounded-lg z-20 ${
      sliderValue >= 100 || isAutoMoveComplete  ? "hidden" : ""
    }`}
    animate={{ x: 60, opacity: 0 }}
    initial={{ x: 0, opacity: 1 }}
    transition={{ duration: 1.5, repeat: Infinity }}
  >
    {" >> "}
  </motion.div>

  <motion.div
    className={`absolute left-[40%] text-[#9aa0a6] text-5xl px-6 py-2 rounded-lg z-20 ${
      sliderValue >= 100 || isAutoMoveComplete  ? "hidden" : ""
    }`}
    animate={{ x: 60, opacity: 0 }}
    initial={{ x: 0, opacity: 1 }}
    transition={{ duration: 1.5, repeat: Infinity }}
  >
    {" >> "}
  </motion.div>
</div>

        {trackWidth > 0 && (
          <motion.img
            src="/image/hostpitalcar.gif"
            alt="ambulance"
            className="absolute top-[54%] cursor-pointer z-20"             
            drag="x"
            dragConstraints={{ left: 0, right: trackWidth - 100 }}
            onDrag={(_event, info) => {
              if (trackRef.current) {
                // แก้วิธีการคำนวณ slider value ให้มีความละเอียดมากขึ้น
                const trackRect = trackRef.current.getBoundingClientRect();
                const position = info.point.x - trackRect.left;
                
                // คำนวณเป็นเปอร์เซ็นต์โดยคำนึงถึงขนาดของรถพยาบาล
                const carWidth = 140; // ขนาดความกว้างของรูปรถพยาบาล
                const availableTrackWidth = trackWidth - carWidth;
                
                // คำนวณค่า sliderValue ที่มีความแม่นยำมากขึ้น
                const percent = Math.min(
                  Math.max((position / availableTrackWidth) * maxSliderValue, 0),
                  maxSliderValue
                );
                
                // ปรับ sliderValue ให้เพิ่มขึ้นทีละน้อยเพื่อให้การเลื่อนราบรื่น
                setSliderValue(Math.round(percent));
              }
            }}
            onDragEnd={handleDragEnd}
            animate={{ x: (sliderValue / maxSliderValue) * (trackWidth - 140) }} // ปรับให้ใช้ขนาดจริงของรถพยาบาล
            transition={{ duration: 0.5, ease: "linear" }}
            style={{ width: "140px", height: "auto", left: 0 }}
          />
        )}

        {sliderValue >= 100 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute top-[63%] left-[50%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
          >
            <div className="bg-opacity-50 text-white text-3xl font-bold px-6 py-2 rounded-lg pb-2">
              <span className="text-[#fa4901]">T</span>ime to Call{" "}
              <span className="text-[#fa4901]">1669</span>
            </div>
          </motion.div>
        )}
        {!showMessage && (
          <>
            <div className="bg-opacity-80 absolute top-[46%] text-[#fa4901] text-xl px-6 py-2 rounded-lg flex items-center animate-pulse">
              เร็วเข้า!
            </div>
            <div className="bg-opacity-80 absolute top-[50%] text-[#fa4901] text-xl px-6 py-2 rounded-lg flex items-center animate-pulse">
            “เลื่อนรถ” เพื่อส่งโรงพยาบาล            
            </div>
          </>
        )}
        <div className="relative w-full h-[200px]">

        </div>
        {sliderValue < maxSliderValue && (
          <div className="absolute top-[20%] text-white text-4xl font-bold">
            <svg width="120" height="120" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r={radius}
                fill="transparent"
                stroke={timeLeft <= 3 ? "url(#red-gradient)" : "#ffffff"}
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                transform="rotate(-90 60 60)"
                style={{ transition: "stroke-dashoffset 0.5s ease, stroke 0.5s ease" }}
              />
              <defs>
                <linearGradient id="red-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: "#ff0000", stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: "#ff0000", stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dy=".3em"
                fill={timeLeft <= 3 ? "#ff0000" : "#ffffff"}
                fontSize="30"
                style={{ transition: "fill 0.5s ease" }}
              >
                {timeLeft}
              </text>
            </svg>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default AfterBefast;