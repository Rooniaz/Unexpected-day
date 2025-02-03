import { useState, useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";

const AfterBefast = () => {
  const [sliderValue, setSliderValue] = useState(0);
  const maxSliderValue = 100;
  const trackRef = useRef(null);
  const [trackWidth, setTrackWidth] = useState(0);

  useLayoutEffect(() => {
    if (trackRef.current) {
      setTrackWidth(trackRef.current.offsetWidth);
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}  // เริ่มต้นที่ความทึบ (ไม่เห็น)
      animate={{ opacity: 1 }}  // เปลี่ยนไปที่ความทึบ 100% (แสดงผล)
      transition={{ duration: 3 }}  // ระยะเวลาในการทำ fade in
      className="w-full min-h-screen flex justify-center items-center bg-gradient-to-b from-gray-300 to-white"
    >
      {/* กล่องหลัก */}
      <motion.div className="relative w-[390px] h-[844px] bg-gray-300 overflow-hidden flex flex-col justify-center items-center">
        
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
            onDrag={(event, info) => {
              if (trackRef.current) {
                const offsetX = info.point.x - trackRef.current.offsetLeft;
                const percent = Math.min(
                  Math.max((offsetX / (trackWidth - 100)) * maxSliderValue, 0),
                  maxSliderValue
                );
                setSliderValue(percent); // อัพเดตค่า sliderValue ตามตำแหน่งที่ลาก
              }
            }}
            style={{ width: "100px", height: "auto", left: 0 }}
          />
        )}

        {/* ข้อความ Time to Call 1669 ขึ้นตรงกลางหน้าจอ */}
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
