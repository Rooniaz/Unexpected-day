import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // นำเข้าจาก framer-motion

const BeFast: React.FC = () => {
  const [inputs, setInputs] = useState(["", "", "", "", "" , ""]);
  const [showFirstDialog, setShowFirstDialog] = useState(false);
  const [popupMessage, setPopupMessage] = useState<{ text: string, image: string, description: string }>({ text: "", image: "", description: "" });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [buttonsClicked, setButtonsClicked] = useState(new Set<number>());
  const characters = ["B", "E", "F", "A", "S"];

  const buttonPositions = [
    { top: "64%", left: "42%" },
    { top: "18%", left: "62%" },
    { top: "15%", left: "40%" },
    { top: "40%", left: "26%" },
    { top: "22%", left: "62%" },
  ];

  const buttonMessages = [
    { text: "B(Balance)", image: "/image/balance.png", description: "เดินเซ ทรงตัวไม่ได้ เวียนศีรษะ บ้านหมุน" },
    { text: "E(Eye)", image: "/image/eye with bg.png", description: "ตามัว,มองไม่เห็น, เห็นภาพซ้อนเฉียบพลัน" },
    { text: "F(Face)", image: "/image/face.png", description: "นี่คือคำอธิบายสำหรับปุ่ม 3" },
    { text: "A(Arm)", image: "/image/arm.png", description: "แขน ขาอ่อนแรงครึ่งซีก" },
    { text: "S(Speech)", image: "/image/speech.png", description: "พูดไม่ชัด พูดไม่เป็นคำ" },
  ];

  const navigate = useNavigate();  // ใช้ navigate เพื่อไปยังหน้าถัดไป

  const handleButtonClick = (index: number) => {
    if (isDialogOpen || buttonsClicked.has(index)) return;

    setButtonsClicked((prevClicked) => new Set(prevClicked).add(index));

    setInputs((prev) => {
      const newInputs = [...prev];
      newInputs[index] = characters[index];
      return newInputs;
    });

    const message = buttonMessages[index];
    setPopupMessage({ text: message.text, image: "", description: "" });
    setShowFirstDialog(true);
    setIsDialogOpen(true);

    setTimeout(() => {
      setPopupMessage((prevState) => ({ ...prevState, image: message.image }));
    }, 1000);

    setTimeout(() => {
      setPopupMessage((prevState) => ({ ...prevState, description: message.description }));
    }, 2000);

    setTimeout(() => {
      setShowButton(true);
    }, 3000);
  };

  useEffect(() => {
    if (buttonsClicked.size === buttonPositions.length) {
      setTimeout(() => {
        navigate("/SpreadScene");  // ไปยังหน้าถัดไปหลังจากการ fade-out
      }, 5000); // ให้เวลาการ fade-out ทำงานเสร็จหลังจาก 3 วินาที
    }
  }, [buttonsClicked, navigate]);

  const handleCloseFirstDialog = () => {
    setShowFirstDialog(false);
    setIsDialogOpen(false);
  };

  return (
    <motion.div 
      className="min-h-screen bg-white text-white flex flex-col items-center justify-center p-4 relative"
      initial={{ opacity: 0 }}  // เริ่มต้นด้วย opacity 0
      animate={{ opacity: 1 }}  // ทำให้ opacity เป็น 1
      exit={{ opacity: 1 }} // เมื่อออกจากหน้านี้ให้ fade-out
      transition={{ duration: 3 }}  // กำหนดเวลาในการ fade-in และ fade-out
    >
      <div
        className="relative w-[390px] h-[844px] overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/image/body-Befast.png')" }}
      >
        {buttonPositions.map((pos, index) => (
          !buttonsClicked.has(index) && (
            <button
              key={index}
              onClick={() => handleButtonClick(index)}
              className="absolute bg-transparent p-0 border-none transition-transform transform 
                        hover:scale-125 active:scale-90"
              style={{
                top: pos.top,
                left: pos.left,
                transform: "translate(-50%, -50%)",
              }}
            >
              <img
                src="/image/icon befast.png"
                alt="Befast Icon"
                className="w-10 h-10 transition-opacity hover:opacity-80 active:opacity-60"
              />
            </button>
          )
        ))}

        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-3 text-xl font-bold">
          {inputs.map((char, index) => (
            <div key={index} className="w-12 h-12 flex items-center justify-center bg-white text-black rounded">
              {char}
            </div>
          ))}
        </div>
      </div>

      {/* Dialog แรก */}
      {showFirstDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <motion.div
          className="absolute inset-0 backdrop-blur-lg"
          initial={{ opacity: 0 }}  // เริ่มต้นด้วยความโปร่งใส 0
          animate={{ opacity: 1 }}  // เปลี่ยนเป็นโปร่งใส 1 เมื่อแสดง
          exit={{ opacity: 0 }}  // ลดความโปร่งใสลงเมื่อออก
          transition={{ duration: 0.5 }}  // เวลาในการเปลี่ยนแปลง
        />
      
        <motion.div
          className="bg-[#DCDCDC] p-6 rounded-lg text-white text-xl w-[90%] md:w-[400px] flex flex-col items-center z-10"
          initial={{ scale: 0 }}  // เริ่มต้นด้วยขนาด 0
          animate={{ scale: 1 }}  // ขยายขนาดจนเต็มเมื่อแสดง
          exit={{ scale: 0 }}  // ย่อลงขนาดเมื่อออก
          transition={{ duration: 0.5, ease: "easeOut" }}  // เวลาในการขยายและย่อ
        >
          <p className="text-center font-custom">{popupMessage.text}</p>
          {popupMessage.image && <img src={popupMessage.image} alt="Popup Icon" className="w-60 h-40 mt-4" />}
          {popupMessage.description && <p className="mt-4 text-center font-custom">{popupMessage.description}</p>}
          {showButton && (
            <div className="flex justify-center w-full mt-4">
              <button
                onClick={handleCloseFirstDialog}
                className="px-4 py-2 rounded-lg font-custom "
              >
                ตกลง
              </button>
            </div>
          )}
        </motion.div>
      </div>
      )}
    </motion.div>
  );
};

export default BeFast;
