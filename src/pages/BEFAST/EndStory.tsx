import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeInOut } from '../../components/fadeInOut';
// import html2canvas from 'html2canvas';
import { FaDownload, FaYoutube, FaShare } from 'react-icons/fa';

const UnexpectedDayForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    dream: ''
  });
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedName = localStorage.getItem('userName') || '';
    const savedAge = localStorage.getItem('userAge') || '';
    const savedDream = localStorage.getItem('userDream') || '';
    
    setFormData({
      name: savedName,
      age: savedAge,
      dream: savedDream
    });
  }, []);

  const handleDownload = () => {
    if (printRef.current) {
      html2canvas(printRef.current).then((canvas) => {
        const link = document.createElement('a');
        link.download = 'unexpected_day.png';
        link.href = canvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }
  };
  
  const handleShare = async () => {
    if (printRef.current && navigator.share) {
      try {
        const canvas = await html2canvas(printRef.current);
        canvas.toBlob(async (blob) => {
          if (blob) {
            const file = new File([blob], 'unexpected_day.png', { type: 'image/png' });
            await navigator.share({
              title: 'Unexpected Day',
              text: 'การเผชิญกับโรคหลอดเลือดสมองเฉียบพลัน',
              files: [file],
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            }).catch(_error => {
              // Fallback for browsers that support share but not file sharing
              navigator.share({
                title: 'Unexpected Day',
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
  
  const goToNext = () => {
    navigate('/'); // การ navigate จะเกิดขึ้นหลังจากกระทำการเสร็จแล้ว
  };
  

  const audioRef2 = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef2.current) {
      audioRef2.current.volume = 0.5;
    }
  }, []);

  const handleButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // หยุดการ propagate ของเหตุการณ์คลิก
  };
  
  return (
    <div className="w-full min-h-screen bg-black flex flex-col justify-center items-center">
      <audio ref={audioRef2} src="/Sound/Sound End/Peaceful_Ambient_Piano_full.mp3" autoPlay loop />
      <motion.div
        className="relative w-[390px] h-[844px] overflow-hidden"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={fadeInOut(2, "easeInOut", 0)}
        onClick={goToNext} // คลิกที่ div จะไปหน้าอื่น
      >
        <div className="w-full h-full flex flex-col justify-center items-center p-6 bg-[#FFF8E7] relative">
          {/* Main content area - reduced height to make room for buttons */}
          <div 
            className="w-full border-2 border-blue-500 mb-32" 
            ref={printRef}
            style={{ maxHeight: '650px' }}
          >
            {/* เนื้อหาหลัก */}
            <div className="bg-[#E6F3FF] p-4 text-center border-b-2 border-blue-500">
              <h1 className="text-2xl font-bold mb-1">Unexpected Day</h1>
              <div className="text-base">การเผชิญกับโรคหลอดเลือดสมองเฉียบพลัน</div>
            </div>
            {/* อื่นๆ */}
            <div className="bg-[#E6F3FF] p-3 border-b-2 border-blue-500 ">
              <div className="text-lg text-center">ความฝันของคุณ</div>
            </div>
            <div className="bg-white p-4 min-h-[120px] border-b-2 border-blue-500 ">
              {formData.dream}
            </div>
            {/* ข้อมูล */}
            <div className="grid grid-cols-2 border-b-2 border-blue-500 ">
              <div className="p-3 bg-[#E6F3FF] border-r-2 border-blue-500">
                <span className="text-lg">คุณ : </span>
                <span>{formData.name}</span>
              </div>
              <div className="p-3 bg-[#E6F3FF]">
                <span className="text-lg">อายุ : </span>
                <span>{formData.age}</span>
              </div>
            </div>
            <div className="bg-white p-4 text-center">
              <p>อายุเท่านี้</p>
              <p>ก็สามารถเป็น</p>
              <p>โรคหลอดเลือดสมองเฉียบพลันได้!</p>
              <p>เพราะฉะนั้นอย่าละเลยการใช้ชีวิต</p>
            </div>
            <div className="bg-white text-center p-2 text-sm ">
              หากพบอาการผิดปกติโทร 1669
            </div>
          </div>
          
          {/* Positioned controls outside the printed area */}
          <div className="absolute w-full bottom-16 left-0 flex flex-col items-center space-y-6">
            {/* Action buttons - side by side */}
            <div className="flex justify-center items-center space-x-4">
              {/* Download button - now circular */}
              <button 
                onClick={(event) => { handleButtonClick(event); handleDownload(); }} 
                className="w-12 h-12 bg-orange-400 text-white rounded-full flex items-center justify-center shadow-md hover:bg-orange-500 transition-colors"
                aria-label="Download"
              >
                <FaDownload size={20} />
              </button>
              
              {/* Share button - circular */}
              <button 
                onClick={(event) => { handleButtonClick(event); handleShare(); }} 
                className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-blue-600 transition-colors"
                aria-label="Share"
              >
                <FaShare size={18} />
              </button>
            </div>
            
            {/* YouTube information - text and icon on same line */}
            <div className="w-full text-center pt-2 pb-4 flex justify-center items-center">
              <p className="text-black mr-2 inline-block">
                อยากรู้เกี่ยวกับโรคหลอดเลือดสมองเพิ่มเติม คลิ๊ก
              </p>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-3xl text-red-600 hover:text-red-700 transition-colors"
                onClick={(event) => handleButtonClick(event)} // ส่ง event ไปที่ handleButtonClick
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