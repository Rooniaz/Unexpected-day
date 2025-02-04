import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const BeFast: React.FC = () => {
  const [inputs, setInputs] = useState(["", "", "", "", "", ""]);
  const [showFirstDialog, setShowFirstDialog] = useState(false);
  const [popupMessage, setPopupMessage] = useState<{ text: string, image: string, description: string }>({ text: "", image: "", description: "" });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [, setShowButton] = useState(false);
  const [buttonsClicked, setButtonsClicked] = useState(new Set<number>());
  const [isContentComplete, setIsContentComplete] = useState(false); // เพิ่ม state นี้

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
    { text: "F(Face)", image: "/image/face.png", description: "ใบหน้าเบี้ยว มุมปากตก" },
    { text: "A(Arm)", image: "/image/arm.png", description: "แขน ขาอ่อนแรงครึ่งซีก" },
    { text: "S(Speech)", image: "/image/speech.png", description: "พูดไม่ชัด พูดไม่เป็นคำ" },
  ];

  const navigate = useNavigate();

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
    setIsContentComplete(false); // ตั้งค่าเป็น false เมื่อเริ่มแสดงเนื้อหาใหม่

    setTimeout(() => {
      setPopupMessage((prevState) => ({ ...prevState, image: message.image }));
    }, 1000);

    setTimeout(() => {
      setPopupMessage((prevState) => ({ ...prevState, description: message.description }));
    }, 2000);

    setTimeout(() => {
      setIsContentComplete(true); // ตั้งค่าเป็น true เมื่อเนื้อหาแสดงครบถ้วน
      setShowButton(true); // แสดงปุ่ม "ตกลง"
    }, 3000);
  };

  useEffect(() => {
    if (buttonsClicked.size === buttonPositions.length) {
      setTimeout(() => {
        navigate("/SpreadScene");
      }, 6000);
    }
  }, [buttonsClicked, navigate]);

  const handleCloseFirstDialog = () => {
    setShowFirstDialog(false);
    setIsDialogOpen(false);
    setShowButton(false); // ซ่อนปุ่ม "ตกลง" เมื่อปิด dialog
  };

      // สร้าง ref สำหรับ audio element
      // const audioRef1 = useRef<HTMLAudioElement>(null);
      const audioRef2 = useRef<HTMLAudioElement>(null);
      // const audioRef3 = useRef<HTMLAudioElement>(null);
  
      useEffect(() => {
          // ตั้งค่า volume หลังจาก component mount
          // if (audioRef1.current) {
          //     audioRef1.current.volume = 0.5;
          // }
          if (audioRef2.current) {
              audioRef2.current.volume = 0.5;
          }
          // if (audioRef3.current) {
          //     audioRef3.current.volume = 0.2;
          // }
      }, []);

  return (
    <motion.div 
      className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 3 }}
    >
              {/* <audio ref={audioRef1} src="/Sound/Hospital Sound/Hospital Busy Ambience Loop.mp3" autoPlay loop /> */}
              <audio ref={audioRef2} src="/Sound/Scene Start/For Education - Full.mp3" autoPlay loop />
  {/* <audio ref={audioRef3} src="/Sound/Hospital Sound/Hospital Busy Ambience Loop.mp3" autoPlay loop /> */}
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
            <div key={index} className="w-12 h-12 flex items-center justify-center bg-white text-black rounded shadow-xl">
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        
          <motion.div
            className="bg-[#FFFFFF] p-6 rounded-lg text-white text-xl w-[320px] md:w-[400px] flex flex-col items-center z-10"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <p className="text-center font-custom text-[#CD5C5C] text-4xl">{popupMessage.text}</p>
            {popupMessage.image && (
              <div className="w-full h-[260px] overflow-hidden rounded-lg"> {/* Container สำหรับรูปภาพ */}
                <img
                  src={popupMessage.image}
                  alt="Popup Icon"
                  className="w-full h-full object-cover" // ปรับให้รูปภาพเต็มกรอบ
                />
              </div>
            )}
            {popupMessage.description && (
              <p className="text-center text-[#F08080] font-custom mt-4">{popupMessage.description}</p>
            )}
            {isContentComplete && ( // ตรวจสอบว่าเนื้อหาแสดงครบถ้วนแล้ว
              <div className="flex justify-center w-full">
                <button
                  onClick={handleCloseFirstDialog}
                  className="px-4 py-2 rounded font-custom text-[#000000]"
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