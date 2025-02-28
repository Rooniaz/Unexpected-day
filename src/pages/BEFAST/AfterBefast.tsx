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
        }, 3000);
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setShowMessage(false);
    }
  }, [sliderValue, navigate]);

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

        {/* เพิ่มความกว้างของ track จาก 450px เป็น 550px */}
        <div ref={trackRef} className="absolute top-[60%] w-[550px] h-12 bg-[#708090] rounded"></div>

        {trackWidth > 0 && (
          <motion.img
            src="/image/hostpitalcar.gif"
            alt="ambulance"
            className="absolute top-[55%] cursor-pointer z-10"             
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
            <div className="bg-opacity-50 text-white text-3xl font-bold px-6 py-2 rounded-lg">
              <span className="text-red-500">T</span>ime to Call{" "}
              <span className="text-red-500">1669</span>
            </div>
          </motion.div>
        )}

        {sliderValue < maxSliderValue && (
          <div className="absolute top-[20%] text-white text-4xl font-bold">
            {timeLeft} วินาที
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default AfterBefast;