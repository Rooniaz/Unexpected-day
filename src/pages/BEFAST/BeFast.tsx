import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
// import { useAudio } from "../../contexts/AudioProvider"; // นำเข้า useAudio

const BeFast: React.FC = () => {
  const [inputs, setInputs] = useState(["", "", "", "", "",""]);
  const [showFirstDialog, setShowFirstDialog] = useState(false);
  const [popupMessage, setPopupMessage] = useState<{ text: string; image: string; description: string }>({ text: "", image: "", description: "" });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [buttonsClicked, setButtonsClicked] = useState(new Set<number>());
  const [isContentComplete, setIsContentComplete] = useState(false);

  const navigate = useNavigate();
  const audioRef2 = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef2.current) {
      audioRef2.current.volume = 0.5;
    }
  }, []);

  const characters = ["B", "E", "F", "A", "S"];
  const buttonPositions = [
    { top: "60%", left: "38%" },
    { top: "15%", left: "58%" },
    { top: "19%", left: "36%" },
    { top: "39%", left: "26%" },
    { top: "22%", left: "58%" },
  ];

  const buttonMessages = [
    { text: "B=Balance", image: "/image/befast/B.gif", description: "เวียนหัว เดินเซ ทรงตัวไม่ได้" },
    { text: "E=Eye", image: "/image/befast/E.gif", description: "ตามัว มองไม่เห็นเฉียบพลัน" },
    { text: "F=Face", image: "/image/befast/F.gif", description: "ปากเบี้ยว มุมปากตก" },
    { text: "A=Arm", image: "/image/befast/A.gif", description: "แขนขาอ่อนแรงครึ่งซีก" },
    { text: "S=Speech", image: "/image/befast/S.gif", description: "พูดไม่ชัด พูดไม่ออก สื่อสารไม่ได้" },
  ];

  const [isImageLoaded, setIsImageLoaded] = useState(false);

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
  setIsContentComplete(false);
  setIsImageLoaded(false); // รีเซ็ตสถานะการโหลดภาพ

  setTimeout(() => setPopupMessage((prev) => ({ ...prev, image: message.image })), 1000);
};

const handleImageLoad = () => {
  setIsImageLoaded(true);
  
  // ใช้ index ล่าสุดที่ถูกคลิกเพื่อดึง description ที่ถูกต้อง
  const lastClickedIndex = Array.from(buttonsClicked).pop();
  if (lastClickedIndex !== undefined) {
    const message = buttonMessages[lastClickedIndex];
    setPopupMessage((prev) => ({ ...prev, description: message.description }));
  }

  setTimeout(() => setIsContentComplete(true), 5000);
};
  const handleCloseFirstDialog = () => {
    setShowFirstDialog(false);
    setTimeout(() => {
      setIsDialogOpen(false);

      // ตรวจสอบว่าครบ ["B", "E", "F", "A", "S"] หรือยัง
      if (inputs.join("") === "BEFAS") {
        setTimeout(() => {
          navigate("/SpreadScene");
        }, 3000);
      }
    }, 300);
  };

  // const { playAudio, pauseAudio } = useAudio();

  // useEffect(() => {
  //   playAudio(); // เล่นเพลงต่อจากหน้า Warning
  //   return () => pauseAudio(); // หยุดเพลงเมื่อออกจากหน้า (แต่เก็บเวลาไว้)
  // }, []);

  const audioRef1 = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // ตั้งค่า volume หลังจาก component mount
    if (audioRef1.current) {
        audioRef1.current.volume = 1
    }

}, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative">
        <audio ref={audioRef1} src="/Sound/Sound fx/Scene BEFAST.mp3" autoPlay loop />
      <div className="relative w-[390px] h-[844px] overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('/image/body_befast.png')" }}>
        {buttonPositions.map((pos, index) => (
          !buttonsClicked.has(index) && (
            <button
              key={index}
              onClick={() => handleButtonClick(index)}
              className="absolute bg-transparent p-0 border-none transition-transform transform hover:scale-125 active:scale-90"
              style={{
                top: pos.top,
                left: pos.left,
                transform: "translate(-50%, -50%)",
              }}
            >
              <img src="/image/icon_eye_befast.gif" alt="Befast Icon" className="w-16 h-16 transition-opacity hover:opacity-80 active:opacity-60" />
            </button>
          )
        ))}

        <div className="absolute bottom-36 left-1/2 transform -translate-x-1/2 flex gap-3 text-xl font-bold">
          {inputs.map((char, index) => (
            <div key={index} className="w-12 h-14 flex items-center justify-center font-custom text-5xl bg-white text-[#fa4901] rounded shadow-xl">
              {char}
            </div>
          ))}
        </div>
      </div>

      {showFirstDialog && (
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-lg transition-opacity duration-500" />

        <motion.div
          className="bg-[#FFFFFF] p-6 text-black rounded text-xl w-[350px] md:w-[400px] flex flex-col items-center z-10"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="text-center text-white bg-[#fa4901] rounded p-2 pt-1 mb-4 text-4xl">{popupMessage.text}</p>
          {popupMessage.image && (
            <div className="w-full h-[250px] overflow-hidden bg-white">
              <img 
                src={popupMessage.image} 
                alt="Popup Icon" 
                className="w-full h-full object-cover" 
                onLoad={handleImageLoad} // เรียก handleImageLoad เมื่อภาพโหลดเสร็จ
              />
            </div>
          )}
          {isImageLoaded && popupMessage.description && (
            <p className="text-center text-[#000000] mb-2 mt-4">{popupMessage.description}</p>
          )}
          {isContentComplete && (
            <div className="flex justify-center w-full">
              <button onClick={handleCloseFirstDialog} className="px-2 py-1 rounded mt-2 text-lg text-[#ffffff] bg-[#fa4901]">
                เข้าใจแล้ว
              </button>
            </div>
          )}
        </motion.div>
      </div>
    )}
    </div>
  );
};

export default BeFast;
