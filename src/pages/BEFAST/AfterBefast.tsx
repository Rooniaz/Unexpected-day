import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AfterBefast = () => {
  const [sliderValue, setSliderValue] = useState(0);
  const [showMessage, setShowMessage] = useState(false); 
  const maxSliderValue = 100;
  
  // กำหนดชนิดให้กับ trackRef เป็น HTMLDivElement
  const trackRef = useRef<HTMLDivElement | null>(null);  
  const [trackWidth, setTrackWidth] = useState(0);
  const navigate = useNavigate(); 

  useLayoutEffect(() => {
    if (trackRef.current) {
      setTrackWidth(trackRef.current.offsetWidth);
    }
  }, []);

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
      className="w-full min-h-screen flex justify-center items-center bg-gradient-to-b from-gray-300 to-white"
    >
      <motion.div className="relative w-[390px] h-[844px] bg-gray-300 overflow-hidden flex flex-col justify-center items-center">
        
        {showMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute top-40 left-1/2 transform -translate-x-1/2 text-center"
          >
            <div className="bg-opacity-80 text-[#708090] font-custom text-2xl font-bold px-6 py-2 rounded-lg">
              ส่งให้ทันภายใน 4.30 ชม.
            </div>
          </motion.div>
        )}

        <div
          ref={trackRef}
          className="absolute top-[60%] w-full h-12 bg-[#708090] rounded"
        ></div>

        {trackWidth > 0 && (
          <motion.img
            src="/image/hostpitalcar.png"
            alt="ambulance"
            className="absolute top-[57%] cursor-pointer"
            drag="x" 
            dragConstraints={{ left: 0, right: trackWidth - 100 }} 
            onDrag={(_event, info) => {
              if (trackRef.current) {
                const offsetX = info.point.x - trackRef.current.offsetLeft;
                const percent = Math.min(
                  Math.max((offsetX / (trackWidth - 100)) * maxSliderValue, 0),
                  maxSliderValue
                );
                setSliderValue(percent); 
              }
            }}
            style={{ width: "100px", height: "auto", left: 0 }}
          />
        )}

        {sliderValue >= maxSliderValue && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute top-[63%] left-[40%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
          >
            <div className="bg-opacity-50 text-white font-custom text-4xl font-bold px-6 py-2 rounded-lg">
              <span className="text-red-500">T</span>ime to Call{" "}
              <span className="text-red-500">1669</span>
            </div>
          </motion.div>
        )}
        
      </motion.div>
    </motion.div>
  );
};

export default AfterBefast;
