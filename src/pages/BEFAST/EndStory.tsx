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
    receiptImage.src = 'build/image/EndStory/card-unexpectedday2.png'; // ตำแหน่งที่เก็บรูปภาพใบเสร็จของคุณ
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
    if (text.length <= 9) return "110px";
    if (text.length <= 50) return "30px";
    return "20px";
  };

  const renderCanvas = () => {
    if (!canvasRef.current || !receiptImageRef.current) return;
  
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
  
    const scale = 1;
    canvas.width = receiptImageRef.current.width * scale;
    canvas.height = receiptImageRef.current.height * scale;
  
    ctx.drawImage(receiptImageRef.current, 0, 0, canvas.width, canvas.height);
  
    ctx.font = '300 36px Sarabun-Light';
    ctx.fillStyle = 'black';
  
    const nameX = 375;
    const nameY = 625;
    ctx.fillText(formData.name, nameX, nameY);
  
    const ageX = 700;
    const ageY = 625;
    ctx.fillText(formData.age, ageX, ageY);
  
    const dream = `“${formData.dream}”`;
    const maxWidth = 400; // ความกว้างของกรอบที่ข้อความจะพอดี
    const lineHeight = 36; // ความสูงของบรรทัดข้อความ
    let y = 850;
  
    // วาดกรอบสำหรับข้อความความฝัน
    const dreamBoxX = 220;
    const dreamBoxY = 675;
    const dreamBoxWidth = 645;
    const dreamBoxHeight = 232; // ความสูงของกรอบ
    ctx.strokeStyle = '#FA4901';
    ctx.lineWidth = 3;
    ctx.strokeRect(dreamBoxX, dreamBoxY, dreamBoxWidth, dreamBoxHeight);
  
    // คำนวณขนาดฟอนต์ที่เหมาะสม
    const dreamFontSize = getFontSize(formData.dream);
    ctx.fillStyle = '#FA4901';
    ctx.font = `300 ${dreamFontSize} Sarabun-Light`;
  
    const words = dream.split(' ');
    let line = '';
    
    // วาดข้อความความฝันภายในกรอบ
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
  
      // ถ้าความกว้างเกินขอบกรอบ ให้เริ่มบรรทัดใหม่
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, dreamBoxX + 10, y); // ขยับข้อความให้ห่างจากขอบกรอบ
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, dreamBoxX + 10, y); // ขยับข้อความให้ห่างจากขอบกรอบ
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
    if (canvasRef.current && navigator.share) {
      try {
        canvasRef.current.toBlob(async (blob) => {
          if (blob) {
            const file = new File([blob], 'ใบเสร็จของฉัน.png', { type: 'image/png' });
            await navigator.share({
              title: 'ใบเสร็จของฉัน',
              text: 'การเผชิญกับโรคหลอดเลือดสมองเฉียบพลัน',
              files: [file],
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            }).catch(_error => {
              // Fallback for browsers that support share but not file sharing
              navigator.share({
                title: 'ใบเสร็จของฉัน',
                text: 'การเผชิญกับโรคหลอดเลือดสมองเฉียบพลัน',
                url: document.location.href,
              });
            });
          }
        }, 'image/png');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        alert('ไม่สามารถแชร์ได้ กรุณาลองอีกครั้ง');
      }
    } else {
      alert('อุปกรณ์ของคุณไม่รองรับการแชร์');
    }
  };
  
  // const goToNext = () => {
  //   // navigate('/');
  // };
  
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
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
        <div className="w-full h-full flex flex-col justify-center items-center p-6 bg-gradient-to-b from-orange-500 via-orange-400 to-blue-300 relative">
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
          <div className="absolute w-full bottom-16 left-0 flex flex-col items-center space-y-6">
            <div className="flex justify-center items-center space-x-4">
              <button 
                onClick={(event) => { handleButtonClick(event); handleDownload(); }} 
                className="w-12 h-12 bg-orange-400 text-white rounded-full flex items-center justify-center shadow-md hover:bg-orange-500 transition-colors"
                aria-label="Download"
              >
                <FaDownload size={20} />
              </button>
              
              <button 
                onClick={(event) => { handleButtonClick(event); handleShare(); }} 
                className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-blue-600 transition-colors"
                aria-label="Share"
              >
                <FaShare size={18} />
              </button>
            </div>
            
            <div className="w-full text-center pt-2 pb-4 flex justify-center items-center">
              <p className="text-white mr-2 inline-block">
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