import React, { useEffect, useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeInOut } from '../../components/fadeInOut';
import { FaDownload, FaYoutube, FaShare } from 'react-icons/fa';

const UnexpectedDayForm: React.FC = () => {
  // const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    dream: ''
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const receiptImageRef = useRef<HTMLImageElement | null>(null);
  const [isImageReady, setIsImageReady] = useState(false);

  // โหลดข้อมูลจาก localStorage เมื่อคอมโพเนนต์ถูกโหลด
  useEffect(() => {
    const savedName = localStorage.getItem('userName') || '';
    const savedAge = localStorage.getItem('userAge') || '';
    const savedDream = localStorage.getItem('userDream') || '';
    
    setFormData({
      name: savedName,
      age: savedAge,
      dream: savedDream
    });

    // โหลดรูปภาพของใบเสร็จ
    const receiptImage = new Image();
    receiptImage.src = 'image/Endstory/Card_Endstory.png'; // ตำแหน่งที่เก็บรูปภาพใบเสร็จของคุณ
    receiptImage.onload = () => {
      receiptImageRef.current = receiptImage;
      setIsImageReady(true);
    };
  }, []);

  // สร้าง Canvas เมื่อข้อมูลและรูปภาพพร้อม
  useEffect(() => {
    if (isImageReady && canvasRef.current && receiptImageRef.current) {
      renderCanvas();
    }
  }, [isImageReady, formData]);
  

  const getFontSize = (text: string) => {
    if (text.length <= 9) return "250px";
    if (text.length <= 50) return "140px";
    return "100px";
  };

  const renderCanvas = () => {
    if (!canvasRef.current || !receiptImageRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const scale = 1;
    canvas.width = receiptImageRef.current.width * scale;
    canvas.height = receiptImageRef.current.height * scale;

    ctx.drawImage(receiptImageRef.current, 0, 0, canvas.width, canvas.height);

    ctx.font = "300 140px Sarabun-Light";
    ctx.fillStyle = "black";

    const nameX = 1320;
    const nameY = 2400;
    ctx.fillText(formData.name, nameX, nameY);

    const ageX = 2900;
    const ageY = 2400;
    ctx.fillText(formData.age, ageX, ageY);

    const dreamBoxX = 860;
    const dreamBoxY = 2610;
    const dreamBoxWidth = 2700;
    const dreamBoxHeight = 960;
    const paddingTop =170; // Padding ด้านบน
    const paddingBottom = 12; // Padding ด้านล่าง
    const paddingLeftRight = 120; // Padding ซ้าย-ขวา

    ctx.strokeStyle = "#FA4901";
    ctx.lineWidth = 3;
    ctx.strokeRect(dreamBoxX, dreamBoxY, dreamBoxWidth, dreamBoxHeight);

    let fontSize = parseInt(getFontSize(formData.dream));
    fontSize = Math.max(fontSize, 10);
    ctx.fillStyle = "#FA4901";
    ctx.textAlign = "center";

    let lines: string[] = [];
    let currentLine = "";
    const words = formData.dream.split(" ");
    const maxWidth = dreamBoxWidth - paddingLeftRight * 2;
    const maxTextHeight = dreamBoxHeight - (paddingTop + paddingBottom);
    let lineHeight = fontSize * 1.2;

    // ปรับขนาดตัวอักษรให้ข้อความไม่เกินกรอบ
    do {
        ctx.font = `300 ${fontSize}px Sarabun-Light`;
        lines = [];
        currentLine = "";

        for (let i = 0; i < words.length; i++) {
            const testLine = currentLine + words[i] + " ";
            const testWidth = ctx.measureText(testLine).width;

            if (testWidth > maxWidth && currentLine !== "") {
                lines.push(currentLine);
                currentLine = words[i] + " ";
            } else {
                currentLine = testLine;
            }
        }
        lines.push(currentLine);

        lineHeight = fontSize * 1.2;
        const totalTextHeight = lines.length * lineHeight;

        if (totalTextHeight > maxTextHeight) {
            fontSize -= 2;
        } else {
            break;
        }
    } while (fontSize > 10);

    // คำนวณตำแหน่ง y ให้เริ่มจาก paddingTop และอยู่ตรงกลางแนวตั้ง
    const totalTextHeight = lines.length * lineHeight;
    let y = dreamBoxY + paddingTop + (maxTextHeight - totalTextHeight) / 2 + lineHeight / 2;

    // วาดข้อความในแต่ละบรรทัด
    for (const line of lines) {
        if (y + lineHeight > dreamBoxY + dreamBoxHeight - paddingBottom) break; // ป้องกันข้อความล้น
        ctx.fillText(line, dreamBoxX + dreamBoxWidth / 2, y);
        y += lineHeight;
    }
};



  // ดาวน์โหลดรูปภาพ
  const handleDownload = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = 'ใบเสร็จของฉัน.png';
      link.href = canvasRef.current.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  
  // แชร์รูปภาพ
  const handleShare = async () => {
    if (!canvasRef.current || !navigator.canShare) {
      alert('อุปกรณ์ของคุณไม่รองรับการแชร์');
      return;
    }
    try {
      const blob = await new Promise<Blob | null>((resolve) =>
        canvasRef.current!.toBlob(resolve, 'image/png')
      );
      if (blob) {
        const file = new File([blob], 'ใบเสร็จของฉัน.png', { type: 'image/png' });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], title: 'ใบเสร็จของฉัน' });
        } else {
          alert('อุปกรณ์ของคุณไม่รองรับการแชร์ไฟล์');
        }
      }
    } catch {
      alert('ไม่สามารถแชร์ได้ กรุณาลองอีกครั้ง');
    }
  };
  
  
  // const goToNext = () => {
  //   // navigate('/');
  // };
  
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2;
    }
  }, []);

  const handleButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };
  
  return (
    <div className="w-full min-h-screen bg-black flex flex-col justify-center items-center">
      <audio ref={audioRef} src="/Sound/Sound End/Peaceful_Ambient_Piano_full.mp3" autoPlay loop />
      <motion.div
        className="relative w-[390px] h-[844px] overflow-hidden"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={fadeInOut(2, "easeInOut", 0)}
        // onClick={goToNext}
      >
<div className="w-full min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/image/Endstory/bg-card.png')" }}>

          {/* Canvas สำหรับแสดงรูปภาพและข้อมูล */}
          <div className="w-full flex justify-center mb-32">
            <canvas
              ref={canvasRef}
              className="max-w-full"
              style={{ display: isImageReady ? 'block' : 'none' }}
            />
            {!isImageReady && (
              <div className="flex items-center justify-center h-64 w-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
              </div>
            )}
          </div>
          
          {/* ปุ่มควบคุม */}
          <div className="absolute w-full bottom-44 left-0 flex flex-col items-center space-y-6">
            <div className="flex justify-center items-center space-x-4">
              <button 
                onClick={(event) => { handleButtonClick(event); handleDownload(); }} 
                className="relative w-10 h-10 bg-[#85929e] text-white rounded-lg flex items-center justify-center shadow-md hover:bg-[##aeb6bf] transition-colors translate-y-[-4px]"
                aria-label="Download"
              >
                <span className="absolute inset- bg-red-600 rounded-lg opacity-50 translate-x-1 translate-y-1"></span> 
                <FaDownload size={20} />
              </button>

              <button 
                onClick={(event) => { handleButtonClick(event); handleShare(); }} 
                className="relative w-10 h-10 bg-[#85929e] text-white rounded-lg flex items-center justify-center shadow-md hover:bg-[##aeb6bf] transition-colors translate-y-[-4px]"
                aria-label="Share"
              >
                <span className="absolute inset- bg-red-600 rounded-lg opacity-50 translate-x-1 translate-y-1"></span> 
                <FaShare size={18} />
              </button>
            </div>
            
            <div className="w-cover text-center bg-[#b5b4b4] pr-4 pl-2 flex justify-center items-center rounded-xl">
              <p className="text-black mr-2 inline-block text-xs ">
                อยากรู้เกี่ยวกับโรคหลอดเลือดสมองเพิ่มเติม คลิ๊ก
              </p>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-3xl text-red-600 hover:text-red-700 transition-colors"
                onClick={(event) => handleButtonClick(event)}
              >
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UnexpectedDayForm;