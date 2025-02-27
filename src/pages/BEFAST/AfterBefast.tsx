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
            return maxSliderValue;
          }
          return prevValue + 70;
        });
      }, 300);
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
        }, 3000);
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setShowMessage(false);
    }
  }, [sliderValue, navigate]);

  const handleDragEnd = () => {
    if (sliderValue < maxSliderValue) {
      setSliderValue(0); // หรือ setSliderValue ไปที่ตำแหน่งก่อนหน้า
    }
  };

  // คำนวณความยาวของเส้น path สำหรับวงกลม
  const circleLength = 2 * Math.PI * 50; // เส้นรอบวงของวงกลม (รัศมี 50)
  const offset = circleLength * (1 - timeLeft / 10); // คำนวณ offset ตามเวลาที่เหลือ

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 3 }}
      className="w-full min-h-screen flex justify-center items-center bg-black"
    >
      <motion.div className="relative w-[390px] h-[844px] bg-gray-300 overflow-hidden flex flex-col justify-center items-center">
        
        {showMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute top-[40%] left-1/2 transform -translate-x-1/2 text-center"
          >
            <div className="bg-opacity-80 text-[#FFFFFF] text-4xl font-bold px-6 py-2 rounded-lg" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
              ส่งให้ทันภายใน 4.30 ชม.
            </div>
          </motion.div>
        )}

        {showGif && (
          <motion.img
            src="/image/redframer.gif"
            alt="Warning"
            className="absolute top-0 left-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}

        <div ref={trackRef} className="absolute top-[60%] w-[480px] h-12 bg-[#708090] rounded"></div>

        {trackWidth > 0 && (
          <motion.img
            src="/image/hostpitalcar.gif"
            alt="ambulance"
            className="absolute top-[55%] cursor-pointer"
            drag="x"
            dragConstraints={{ left: 0, right: trackWidth - 100 }}
            onDrag={(_event, info) => {
              if (trackRef.current) {
                const offsetX = info.point.x - trackRef.current.offsetLeft;
                const percent = Math.min(
                  Math.max((offsetX / (trackWidth - 10)) * maxSliderValue, 0),
                  maxSliderValue
                );
                setSliderValue(percent);
              }
            }}
            onDragEnd={handleDragEnd}
            animate={{ x: (sliderValue / maxSliderValue) * (trackWidth - 100) }}
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
            <div className="bg-opacity-50 text-white text-3xl font-bold px-6 py-2 rounded-lg">
              <span className="text-red-500">T</span>ime to Call{" "}
              <span className="text-red-500">1669</span>
            </div>
          </motion.div>
        )}

        {sliderValue < maxSliderValue && (
          <div className="absolute top-[20%] flex justify-center items-center">
            <svg width="120" height="120" viewBox="0 0 120 120">
              {/* วงกลมพื้นหลัง */}
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="#FFFFFF"
                strokeWidth="10"
                fill="transparent"
                strokeOpacity="0.2"
              />
              {/* วงกลม Progress ที่เติมเต็มจากด้านล่าง */}
              <motion.circle
                cx="60"
                cy="60"
                r="50"
                stroke={timeLeft <= 3 ? "#FF0000" : "#FFFFFF"} // เปลี่ยนสีเป็นแดงเมื่อเวลาน้อยกว่า 3 วินาที
                strokeWidth="10"
                fill="transparent"
                strokeDasharray={circleLength}
                animate={{ strokeDashoffset: offset }} // ใช้ animate เพื่อให้สมูท
                transition={{ duration: 1, ease: "easeInOut" }} // ปรับการเคลื่อนไหวให้นุ่มนวล
                transform="rotate(-90 60 60)" // หมุนวงกลมเพื่อเริ่มจากด้านล่าง
              />

              {/* ตัวเลขวินาทีที่เหลือ */}
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dy=".3em"
                fill={timeLeft <= 3 ? "#FF0000" : "#FFFFFF"} // เปลี่ยนสีตัวเลขเป็นแดงเมื่อเวลาน้อยกว่า 3 วินาที
                fontSize="24"
                fontWeight="bold"
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