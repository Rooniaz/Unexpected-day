import { useState } from "react";
import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
import { fadeInOut } from "../../components/fadeInOut";

const AfterBefast = () => {
//   const navigate = useNavigate();
  const [sliderValue, setSliderValue] = useState(0); // ค่าของ Slider
  const maxSliderValue = 100;

  const handleClick = () => {
    // navigate("/Friendbrain");
  };

  const handleCloseSecondDialog = () => {
    console.log("Dialog closed");
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-b from-gray-300 to-white">
      {/* กล่องหลัก */}
      <motion.div
        className="relative w-[390px] h-[844px] bg-gray-300 overflow-hidden" // ใช้ bg-gray-300 แทนภาพพื้นหลัง
        initial="initial"
        animate="animate"
        exit="exit"
        variants={fadeInOut(2, "easeInOut", 0)}
        onClick={handleClick}
      >
        {/* รถพยาบาลเคลื่อนที่ */}
        <motion.img
          src="/image/hostpitalcar.png"
          alt="ambulance"
          className="absolute bottom-40"
          style={{
            left: `${sliderValue}%`,
            width: "100px",
            height: "auto",
          }}
          animate={{ x: sliderValue * 3 }}
          transition={{ type: "spring", stiffness: 50 }}
        />

        {/* Slider Bar ที่ดูเหมือนถนน */}
        <div className="absolute bottom-40 w-3/4 left-1/2 -translate-x-1/2 flex items-center">
          <input
            type="range"
            value={sliderValue}
            onChange={(e) => setSliderValue(Number(e.target.value))}
            min={0}
            max={100}
            step={1}
            className="w-full slider" // เพิ่ม class สำหรับการตกแต่ง
          />
        </div>

        {/* แสดงข้อความ */}
        <div className="mt-2 text-lg font-semibold">
          {sliderValue === maxSliderValue ? "✅ Complete" : `${sliderValue}%`}
        </div>

        {/* ปุ่ม ตกลง */}
        <button
          onClick={handleCloseSecondDialog}
          className="mt-4 px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600"
        >
          ตกลง
        </button>
      </motion.div>
    </div>
  );
};

export default AfterBefast;
