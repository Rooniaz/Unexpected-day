import React, { useState } from "react";

const BeFast: React.FC = () => {
  const [inputs, setInputs] = useState(["", "", "", "", ""]);
  const [showFirstDialog, setShowFirstDialog] = useState(false); // Dialog แรก
  const [showSecondDialog, setShowSecondDialog] = useState(false); // Dialog ที่ 2
  const [popupMessage, setPopupMessage] = useState(""); // ข้อความใน Dialog แรก
  const [completed, setCompleted] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // ตรวจสอบว่า dialog เปิดอยู่หรือไม่
  const characters = ["B", "E", "F", "A", "S"];

  const handleButtonClick = (index: number) => {
    if (isDialogOpen) return; // ถ้ามี dialog เปิดอยู่จะไม่อนุญาตให้ทำอะไร

    setInputs((prev) => {
      const newInputs = [...prev];
      newInputs[index] = characters[index];
      return newInputs;
    });
    setPopupMessage(`คุณกดปุ่ม ${index + 1}`);
    setShowFirstDialog(true); // แสดง Dialog แรก
    setIsDialogOpen(true); // ตั้งค่า isDialogOpen เป็น true
  };

  // ตรวจสอบว่า input ทั้ง 5 ช่องกรอกครบแล้วหรือยัง
  React.useEffect(() => {
    if (inputs.every(input => input !== "")) {
      setCompleted(true); // เมื่อกรอกครบทั้งหมด
      // ตั้งเวลาเพื่อให้แน่ใจว่า Dialog 1 ปิดก่อนแล้วค่อยแสดง Dialog 2
      setTimeout(() => {
        if (!showFirstDialog) {
          setShowSecondDialog(true); // แสดง Dialog ที่ 2
        }
      }, 300); // Delay 300ms ให้ dialog แรกปิดไปก่อน
    }
  }, [inputs, showFirstDialog]);

  const handleCloseFirstDialog = () => {
    setShowFirstDialog(false);
    setIsDialogOpen(false); // ปิด dialog และสามารถดำเนินการต่อได้
  };

  const handleCloseSecondDialog = () => {
    setShowSecondDialog(false);
    setIsDialogOpen(false); // ปิด dialog และสามารถดำเนินการต่อได้
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const scrollWidth = e.currentTarget.scrollWidth;
    const clientWidth = e.currentTarget.clientWidth;

    if (scrollLeft + clientWidth >= scrollWidth) {
      setCompleted(true);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative">
      <div className="relative w-[390px] h-[700px] overflow-hidden">
        <div className="absolute bottom-20 my-20 left-1/2 -translate-x-1/2 w-[90%] z-10">
          <h2 className="text-3xl font-bold">Be Fast UI</h2>
          <div className="grid grid-cols-5 gap-4">
            {characters.map((_, index) => (
              <button
                key={index}
                onClick={() => handleButtonClick(index)}
                className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-all"
              >
                ปุ่ม {index + 1}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-5 gap-2 mt-4">
            {inputs.map((value, index) => (
              <input
                key={index}
                type="text"
                value={value}
                readOnly
                className="p-2 text-center text-black rounded bg-white"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Dialog แรก */}
      {showFirstDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg text-white text-xl w-[90%] md:w-[400px]">
            <p>{popupMessage}</p>
            <button
              onClick={handleCloseFirstDialog}
              className="mt-4 px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600"
            >
              ตกลง
            </button>
          </div>
        </div>
      )}

      {/* Dialog ที่ 2 */}
      {showSecondDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div
            className="bg-gray-800 p-6 rounded-lg text-white text-xl overflow-x-auto w-[90%] md:w-[400px]"
            onScroll={handleScroll}
            style={{
              cursor: 'grab',
              maxWidth: '100%',
              display: 'flex',
              overflowX: 'auto',
              paddingBottom: '20px',
            }}
          >
            <div
              className="flex space-x-4"
              style={{
                flexShrink: 0,
              }}
            >
              {inputs.map((input, index) => (
                <div
                  key={index}
                  className="min-w-[150px] p-4 bg-gray-700 rounded-lg flex items-center justify-center"
                >
                  {input}
                </div>
              ))}
            </div>
            {completed && (
              <p className="mt-4 text-green-500 font-bold">Complete</p>
            )}
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
