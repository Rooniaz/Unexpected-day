import React from "react";
import { useNavigate } from "react-router-dom";


const Aboutme: React.FC = () => {
const navigate = useNavigate();




  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    navigate('/');
  };




  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      {/* เพิ่มพื้นหลังเป็น GIF */}
      <div 
        className="relative w-[390px] h-[844px] overflow-hidden"
        style={{
          backgroundImage: "url('/image/bgbefast.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="w-full max-w-lg px-6 py-4 bg-opacity-70 rounded-lg ">
            <form onSubmit={handleSubmit} className="space-y-6">
            <img 
              src="/icon.svg" 
              alt="SVG Icon" 
              width="30" 
              height="30" 
              className="absolute top-7 right-6"
            />

              <div>
              <h2 className="text-4xl font-bold mb-5 text-[#fa4901]">เกี่ยวกับงาน</h2>
            <p className="text-base mt-10">ผลงานชิ้นนี้เกิดขึ้นเพื่อให้ผู้เล่นทุกคนได้เรียนรู้</p>
            <p className="text-base">และตระหนักถึงภัยเงียบที่ไม่อาจคาดคิด</p>
            <p className="text-base">โดยเป็นเรื่องราวเกี่ยวกับโรคหลอดเลือดสมอง</p>
            <p className="text-base">ที่สามารถเกิดได้กับทุกคนแม้แต่ในคนอายุน้อย</p>
            <p className="text-base">แต่หากได้ทราบวิธีสังเกตอาการของโรคนี้</p>
            <p className="text-base">ก็จะเป็นประโยชน์ทั้งต่อตัวเองและคนรอบข้าง</p>

            <p className="text-base mt-5">ทั้งนี้พวกเราขอขอบคุณผู้เล่นทุกคนที่เข้ามาเล่นเกม</p>
            <p className="text-base ">เว็บไซต์ของพวกเรา ขอให้ผู้เล่นได้ใช้เวลาในการเล่น</p>
            <p className="text-base ">เกมเว็บไซต์นี้ให้คุ้มค่า เพื่อรับประโยชน์ผ่าน</p>
            <p className="text-base ">ประสบการณ์การเรียนรู้เกี่ยวกับโรคหลอดเลือดสมอง</p>
            <p className="text-base ">ด้วยกันนะคะ</p>

            <p className="text-base mt-14 text-[#ffffff] drop-shadow-md">ดูผลงานของเราเพิ่มเติมได้ที่</p>
            <div className="flex space-x-4 mt-4">
              <a href="https://www.youtube.com/channel/yourchannel" target="_blank" rel="noopener noreferrer">
                <img src="/image/icons/icon_ins.png" alt="YouTube Icon" width="30" height="30" />
              </a>
              <a href="https://www.youtube.com/channel/yourchannel" target="_blank" rel="noopener noreferrer">
                <img src="/image/icons/icon_fb.png" alt="YouTube Icon" width="30" height="30" />
              </a>
              <a href="https://www.youtube.com/channel/yourchannel" target="_blank" rel="noopener noreferrer">
                <img src="/image/icons/icon_youtube.png" alt="YouTube Icon" width="30" height="30" />
              </a>
            </div>
            <p className="text-xs mt-4 text-[#ffffff] drop-shadow-md">Unexpected Day | การเผชิญกับโรคหลอดเลือดสมองแบบเฉียบพลัน</p>

              </div>
              <button 
                type="submit"
                className="absolute bottom-[3%] right-6 font-bold text-xl text-orange-500 underline rounded"
              >
                กดเพื่อไปต่อ →
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutme;
