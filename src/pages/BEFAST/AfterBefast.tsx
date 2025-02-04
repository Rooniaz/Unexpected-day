import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AfterBefast = () => {
  const [sliderValue, setSliderValue] = useState(0);
  const [showMessage, setShowMessage] = useState(false); // สถานะการแสดงข้อความ
  const maxSliderValue = 100;
  const trackRef = useRef<HTMLDivElement | null>(null); // กำหนดประเภทของ trackRef เป็น HTMLDivElement
  const [trackWidth, setTrackWidth] = useState(0);
  const navigate = useNavigate(); // ใช้ useNavigate เพื่อเปลี่ยนหน้า

  useLayoutEffect(() => {
    if (trackRef.current) {
      setTrackWidth(trackRef.current.offsetWidth);
    }
  }, [trackRef.current]); // ใช้ trackRef.current เป็น dependency เพื่ออัพเดตค่าเมื่อ DOM เปลี่ยนแปลง

  // ใช้ useEffect เพื่อตั้งเวลาเมื่อ sliderValue ถึง maxSliderValue
  useEffect(() => {
    if (sliderValue >= maxSliderValue) {
      // ตั้งเวลาให้แสดงข้อความหลังจาก 3 วินาที
      const timer = setTimeout(() => {
        setShowMessage(true);
        // ตั้งเวลาให้เปลี่ยนหน้าไปที่ /TimeToCall หลังจากแสดงข้อความครบ 3 วินาที
        setTimeout(() => {
          navigate("/TimeToCall"); // เปลี่ยนหน้า
        }, 3000); // หน่วงเวลา 3 วินาที

      }, 3000); // หน่วงเวลา 3 วินาที

      // เคลียร์ timer เมื่อ component ถูก unmount หรือมีการเปลี่ยนแปลง
      return () => clearTimeout(timer);
    } else {
      // ถ้า sliderValue ยังไม่ถึง maxSliderValue ให้ซ่อนข้อความ
      setShowMessage(false);
    }
  }, [sliderValue, navigate]); // เพิ่ม navigate ใน dependency เพื่อให้แน่ใจว่าได้ใช้ค่าใหม่

  return (
    <motion.div
      initial={{ opacity: 0 }}  // เริ่มต้นที่ความทึบ (ไม่เห็น)
      animate={{ opacity: 1 }}  // เปลี่ยนไปที่ความทึบ 100% (แสดงผล)
      transition={{ duration: 3 }}  // ระยะเวลาในการทำ fade in
      className="w-full min-h-screen flex justify-center items-center bg-gradient-to-b from-gray-300 to-white"
    >
      {/* กล่องหลัก (ขนาดยังคงเดิม) */}
      <motion.div className="relative w-[390px] h-[844px] bg-gray-300 overflow-hidden flex flex-col justify-center items-center">
        
        {/* ข้อความที่แสดงขึ้นมาที่ด้านบนสุด */}
        {showMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute top-[40%] left-1/2 transform -translate-x-1/2 text-center" //ใส่ shadowให้ ส่งให้ทัน
          >
            <div className="bg-opacity-80 text-[#FFFFFF] font-custom text-4xl font-bold px-6 py-2 rounded-lg"> 
              ส่งให้ทันภายใน 4.30 ชม.
            </div>
          </motion.div>
        )}

        {/* เส้นทางที่รถวิ่ง (ชิดขอบซ้าย-ขวา) */}
        <div
          ref={trackRef}
          className="absolute top-[60%] w-full h-12 bg-[#708090] rounded"
        ></div>

        {/* รถพยาบาลลากได้ */}
        {trackWidth > 0 && (
          <motion.img
            src="/image/hostpitalcar.png"
            alt="ambulance"
            className="absolute top-[57%] cursor-pointer"
            drag="x" // ให้ผู้ใช้ลากรถตามแนวแกน X
            dragConstraints={{ left: 0, right: trackWidth - 100 }} // ขอบเขตการลาก
            onDrag={(_event, info) => {
              if (trackRef.current) {
                const offsetX = info.point.x - trackRef.current.offsetLeft;
                // คำนวณเปอร์เซ็นต์จากตำแหน่งที่ลาก โดยการใช้ 500px เป็นจุดที่ต้องการให้ sliderValue = 100
                const percent = Math.min(
                  Math.max((offsetX / (500 - 100)) * maxSliderValue, 0),
                  maxSliderValue
                );
                setSliderValue(percent); // อัพเดตค่า sliderValue ตามตำแหน่งที่ลาก
              }
            }}
            style={{ width: "100px", height: "auto", left: 0 }}
          />
        )}

        {/* แสดงข้อความเมื่อ sliderValue ถึง 500px (แสดงเมื่อ sliderValue = 100) */}
        {sliderValue >= 100 && (
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
