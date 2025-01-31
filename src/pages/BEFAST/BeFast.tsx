import React, { useState } from "react";

const BeFast: React.FC = () => {
  const [inputs, setInputs] = useState(["", "", "", "", ""]);
  const [showFirstDialog, setShowFirstDialog] = useState(false);
  const [showSecondDialog, setShowSecondDialog] = useState(false);
  const [popupMessage, setPopupMessage] = useState<{ text: string, image: string, description: string }>({ text: "", image: "", description: "" });
  const [completed, setCompleted] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [buttonsClicked, setButtonsClicked] = useState(new Set<number>()); // เก็บข้อมูลว่าได้กดปุ่มไหนบ้าง
  const characters = ["B", "E", "F", "A", "S"];
  const maxSliderValue = 100;

  const buttonPositions = [
    { top: "64%", left: "42%" },
    { top: "18%", left: "62%" },
    { top: "15%", left: "40%" },
    { top: "40%", left: "26%" },
    { top: "22%", left: "62%" },
  ];

  const buttonMessages = [
    { text: "ข้อความสำหรับปุ่ม 1", image: "/image/balance.png", description: "นี่คือคำอธิบายสำหรับปุ่ม 1" },
    { text: "ข้อความสำหรับปุ่ม 2", image: "/image/icon2.png", description: "นี่คือคำอธิบายสำหรับปุ่ม 2" },
    { text: "ข้อความสำหรับปุ่ม 3", image: "/image/icon3.png", description: "นี่คือคำอธิบายสำหรับปุ่ม 3" },
    { text: "ข้อความสำหรับปุ่ม 4", image: "/image/icon4.png", description: "นี่คือคำอธิบายสำหรับปุ่ม 4" },
    { text: "ข้อความสำหรับปุ่ม 5", image: "/image/icon5.png", description: "นี่คือคำอธิบายสำหรับปุ่ม 5" },
  ];

  const handleButtonClick = (index: number) => {
    if (isDialogOpen || buttonsClicked.has(index)) return; // เช็คว่าปุ่มถูกกดไปแล้วหรือไม่

    setButtonsClicked((prevClicked) => new Set(prevClicked).add(index)); // เพิ่มปุ่มที่กดเข้าไปใน set

    setInputs((prev) => {
      const newInputs = [...prev];
      newInputs[index] = characters[index];
      return newInputs;
    });

    const message = buttonMessages[index];
    setPopupMessage({ text: message.text, image: "", description: "" });
    setShowFirstDialog(true);
    setIsDialogOpen(true);

    // แสดงรูปภาพหลังจาก 1 วินาที
    setTimeout(() => {
      setPopupMessage((prevState) => ({ ...prevState, image: message.image }));
    }, 1000);

    // แสดงคำอธิบายหลังจาก 2 วินาที
    setTimeout(() => {
      setPopupMessage((prevState) => ({ ...prevState, description: message.description }));
    }, 2000);

    // แสดงปุ่ม "ตกลง" หลังจากคำอธิบายแสดงแล้ว (เพิ่มเวลา 1 วินาทีหลังจากคำอธิบาย)
    setTimeout(() => {
      setShowButton(true);
    }, 3000);
  };

  React.useEffect(() => {
    if (inputs.every((input) => input !== "")) {
      setCompleted(true);
      setTimeout(() => {
        if (!showFirstDialog) {
          setShowSecondDialog(true);
        }
      }, 300);
    }
  }, [inputs, showFirstDialog]);

  const handleCloseFirstDialog = () => {
    setShowFirstDialog(false);
    setIsDialogOpen(false);
  };

  const handleCloseSecondDialog = () => {
    setShowSecondDialog(false);
    setIsDialogOpen(false);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setSliderValue(newValue);

    if (newValue >= maxSliderValue) {
      setCompleted(true);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative">
      <div
        className="relative w-[390px] h-[844px] overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/image/body-Befast.png')" }}
      >
        {buttonPositions.map((pos, index) => (
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
            disabled={buttonsClicked.has(index)} // ปิดการใช้งานปุ่มที่กดแล้ว
          >
            <img
              src="/image/icon befast.png"
              alt="Befast Icon"
              className="w-10 h-10 transition-opacity hover:opacity-80 active:opacity-60"
            />
          </button>
        ))}

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-3 text-xl font-bold">
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
          <div className="bg-gray-800 p-6 rounded-lg text-white text-xl w-[90%] md:w-[400px] flex flex-col items-center">
            <p className="text-center animate-fadeIn delay-1000">{popupMessage.text}</p>
            {popupMessage.image && <img src={popupMessage.image} alt="Popup Icon" className="w-20 h-20 mt-4 animate-fadeIn delay-2000" />}
            {popupMessage.description && <p className="mt-4 text-center animate-fadeIn delay-3000">{popupMessage.description}</p>}
            {showButton && (
              <div className="flex justify-center w-full mt-4 animate-fadeIn delay-4000">
                <button
                  onClick={handleCloseFirstDialog}
                  className="px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600"
                >
                  ตกลง
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Dialog ที่ 2 */}
      {showSecondDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg text-white text-xl w-[90%] md:w-[400px] flex flex-col items-center">
            <input
              type="range"
              min="0"
              max={maxSliderValue}
              value={sliderValue}
              onChange={handleSliderChange}
              className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
            />
            <div className="mt-2 text-lg font-semibold">
              {sliderValue === maxSliderValue ? "✅ Complete" : `${sliderValue}%`}
            </div>
            <button
              onClick={handleCloseSecondDialog}
              className="mt-4 px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600"
            >
              ตกลง
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BeFast;
