import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const bgImageRef = useRef<HTMLImageElement | null>(null);
  const [isImageReady, setIsImageReady] = useState(false);
  const [isBgImageReady, setIsBgImageReady] = useState(false);
  const navigate = useNavigate();

  // โหลดข้อมูลจาก localStorage เมื่อคอมโพเนนต์ถูกโหลด
  useEffect(() => {
    const savedName = localStorage.getItem('userName') || '';
    const savedAge = localStorage.getItem('userAge') || '';
    const savedDream = `"${localStorage.getItem('userDream') || ''}"`;

    setFormData({
      name: savedName,
      age: savedAge,
      dream: savedDream
    });

    // โหลดรูปภาพของใบเสร็จ
    const receiptImage = new Image();
    receiptImage.src = 'image/Endstory/cardUn.png'; // ตำแหน่งที่เก็บรูปภาพใบเสร็จของคุณ
    receiptImage.onload = () => {
      receiptImageRef.current = receiptImage;
      setIsImageReady(true);
    };

    // โหลดรูปภาพพื้นหลัง
    const bgImage = new Image();
    bgImage.src = '/image/Endstory/bg-card.png'; // ตำแหน่งที่เก็บรูปภาพพื้นหลัง
    bgImage.onload = () => {
      bgImageRef.current = bgImage;
      setIsBgImageReady(true);
    };
  }, []);

  // สร้าง Canvas เมื่อข้อมูลและรูปภาพพร้อม
  useEffect(() => {
    if (isImageReady && canvasRef.current && receiptImageRef.current) {
      renderCanvas();
    }
  }, [isImageReady, formData]);

  const getFontSize = (text: string) => {
    if (text.length <= 9) return "300px";
    if (text.length <= 50) return "180px";
    return "120px";
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

    const nameX = 1040;
    const nameY = 2000;
    ctx.fillText(formData.name, nameX, nameY);

    const ageX = 2500;
    const ageY = 2000;
    ctx.fillText(formData.age, ageX, ageY);

    const dreamBoxX = 864;
    const dreamBoxY = 2250;
    const dreamBoxWidth = 2000;
    const dreamBoxHeight = 955;
    const paddingTop = 170; // Padding ด้านบน
    const paddingBottom = 12; // Padding ด้านล่าง
    const paddingLeftRight = 120; // Padding ซ้าย-ขวา

    ctx.strokeStyle = "transparent";
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

  // ดาวน์โหลดรูปภาพพร้อมพื้นหลัง
  const handleDownloadWithBackground = () => {
    if (canvasRef.current && bgImageRef.current && isImageReady && isBgImageReady) {
      // สร้าง Canvas ชั่วคราวเพื่อรวมภาพทั้งสอง
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) return;

      // กำหนดขนาด Canvas ให้เท่ากับขนาดพื้นหลัง
      tempCanvas.width = bgImageRef.current.width;
      tempCanvas.height = bgImageRef.current.height;

      // วาดพื้นหลังลงใน Canvas
      tempCtx.drawImage(bgImageRef.current, 0, 0, tempCanvas.width, tempCanvas.height);

      // ปรับ scale ratio ให้ตรงกับที่แสดงในหน้าจอ
      const scaleRatio = 1; // เพิ่มจาก 0.3 เป็น 0.6 เพื่อให้ใบเสร็จใหญ่ขึ้น
      const receiptWidth = canvasRef.current.width * scaleRatio;
      const receiptHeight = canvasRef.current.height * scaleRatio;

      // คำนวณตำแหน่งกึ่งกลาง
      const centerX = (tempCanvas.width - receiptWidth) / 2;
      // ปรับตำแหน่งแนวตั้งให้อยู่บนมากขึ้น
      const centerY = (tempCanvas.height - receiptHeight) / 2 - (tempCanvas.height * 0.0005);

      tempCtx.drawImage(canvasRef.current, centerX, centerY, receiptWidth, receiptHeight);

      // บันทึกภาพจาก Canvas ชั่วคราว
      const link = document.createElement('a');
      link.download = 'Unexpected day receipt.png';
      link.href = tempCanvas.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('กำลังโหลดรูปภาพ กรุณารอสักครู่');
    }
  };

  // แชร์รูปภาพพร้อมพื้นหลัง
  const handleShareWithBackground = async () => {
    if (!canvasRef.current || !bgImageRef.current || !navigator.canShare || !isImageReady || !isBgImageReady) {
      alert('อุปกรณ์ของคุณไม่รองรับการแชร์หรือกำลังโหลดรูปภาพ');
      return;
    }
    try {
      // สร้าง Canvas ชั่วคราวเพื่อรวมภาพทั้งสอง
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) return;

      // กำหนดขนาด Canvas ให้เท่ากับขนาดพื้นหลัง
      tempCanvas.width = bgImageRef.current.width;
      tempCanvas.height = bgImageRef.current.height;

      // วาดพื้นหลังลงใน Canvas
      tempCtx.drawImage(bgImageRef.current, 0, 0, tempCanvas.width, tempCanvas.height);

      // ใช้ค่า scale และตำแหน่งเดียวกับฟังก์ชันดาวน์โหลด
      const scaleRatio = 1; // เพิ่มจาก 0.3 เป็น 0.6 เพื่อให้ใบเสร็จใหญ่ขึ้น
      const receiptWidth = canvasRef.current.width * scaleRatio;
      const receiptHeight = canvasRef.current.height * scaleRatio;

      // คำนวณตำแหน่งกึ่งกลาง
      const centerX = (tempCanvas.width - receiptWidth) / 2;
      // ปรับตำแหน่งแนวตั้งให้อยู่บนมากขึ้น
      const centerY = (tempCanvas.height - receiptHeight) / 2 - (tempCanvas.height * 0.0005);

      tempCtx.drawImage(canvasRef.current, centerX, centerY, receiptWidth, receiptHeight);

      const blob = await new Promise<Blob | null>((resolve) =>
        tempCanvas.toBlob(resolve, 'image/png')
      );
      if (blob) {
        const file = new File([blob], 'Unexpected day receipt.png', { type: 'image/png' });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], title: 'ใบเสร็จพร้อมพื้นหลัง' });
        } else {
          alert('อุปกรณ์ของคุณไม่รองรับการแชร์ไฟล์');
        }
      }
    } catch {
      alert('ไม่สามารถแชร์ได้ กรุณาลองอีกครั้ง');
    }
  };

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2;
    }
  }, []);

  const handleButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  // const handleScreenClick = () => {
  //   navigate('/home');  // เปลี่ยนเส้นทางไปหน้าแรก
  // };
  

  return (
    <div className="w-full min-h-screen bg-black flex flex-col justify-center items-center">
      <audio ref={audioRef} src="/Sound/Sound End/Peaceful_Ambient_Piano_full.mp3" autoPlay loop />
      <motion.div
        className="  relative flex justify-center items-center 
        w-full h-screen 
        sm:w-[390px] sm:h-[844px] overflow-hidden"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={fadeInOut(2, "easeInOut", 0)}
        // onClick={handleScreenClick}
      >
        <div className="w-full min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/image/Endstory/bg-card.png')" }}>
        <button
          onClick={() => navigate('/home')}
          className="absolute z-50 top-4 right-4 bg-black/20 text-white px-4 py-2 rounded-md shadow-md hover:bg-black/22 hover:text-white transition"
          >
          กลับสู่หน้าหลัก
        </button>

          {/* Canvas สำหรับแสดงรูปภาพและข้อมูล */}
          <div className="w-full flex justify-center mb-32 " >
            <canvas
              ref={canvasRef}
              className="max-w-full"
              style={{ 
                display: isImageReady ? 'block' : 'none',
                marginTop: '90px', // ปรับตำแหน่งแนวตั้งให้เหมาะสม
                transform: 'translateY(-5%)' // ปรับตำแหน่งแนวตั้งเพิ่มเติม
              }}            />
            {!isImageReady && (
              <div className="flex items-center justify-center h-64 w-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
              </div>
            )}
          </div>

          {/* ปุ่มควบคุม */}
          <div className="absolute w-full bottom-[8%] left-0 flex flex-col items-center space-y-6">
            <div className="flex justify-center items-center space-x-4">
              <div className="flex flex-col items-center">
                <button
                  onClick={(event) => { handleButtonClick(event); handleDownloadWithBackground(); }}
                  className="relative w-11 h-11 bg-[#85929e] text-white rounded-lg flex items-center justify-center shadow-md hover:bg-[#5d6d7e] transition-colors translate-y-[-4px] mb-2"
                  aria-label="Download with Background"
                >
                  <span className="absolute inset- bg-green-600 rounded-lg opacity-50 translate-x-1 translate-y-1"></span>
                  <FaDownload size={20} />
                </button>
                <span className="text-white text-xs"></span>
              </div>

              <div className="flex flex-col items-center">
                <button
                  onClick={(event) => { handleButtonClick(event); handleShareWithBackground(); }}
                  className="relative w-11 h-11 bg-[#85929e] text-white rounded-lg flex items-center justify-center shadow-md hover:bg-[#5d6d7e] transition-colors translate-y-[-4px] mb-2"
                  aria-label="Share with Background"
                >
                  <span className="absolute inset- bg-blue-600 rounded-lg opacity-50 translate-x-1 translate-y-1"></span>
                  <FaShare size={18} />
                </button>
                <span className="text-white text-xs"></span>
              </div>
            </div>

            <div className="w-cover text-center bg-[#b5b4b4] pr-4 pl-2 flex justify-center items-center rounded-xl">
              <p className="text-black mr-2 inline-block text-xs ">
                อยากรู้เกี่ยวกับโรคหลอดเลือดสมองเพิ่มเติม คลิก
              </p>
              <a
                href="https://www.youtube.com/@brainstormthesis"
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