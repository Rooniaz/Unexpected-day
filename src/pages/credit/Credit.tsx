import React from "react";
import { useNavigate } from "react-router-dom";


const Credit: React.FC = () => {
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
              <h2 className="text-4xl font-bold mb-3 text-[#fa4901]">เครดิต</h2>
            <p className="text-base mt-3">โปรเจกต์นี้เป็นผลงานนวัตกรรมสื่อสารนิพนธ์ ของ</p>
            <p className="text-base">ชญานิน สุรขจร, ปัทมาพร ประทุมถิ่น, ฐปนัท</p>
            <p className="text-base">เดชประมวลพล และ วรัญญา ตันติเฉลิม นิสิตจาก</p>
            <p className="text-base">วิทยาลัยนวัตกรรมสื่อสารสังคม เอกการสื่อสารเพื่อ</p>
            <p className="text-base">สุขภาพ มหาวิทยาลัยศรีนครินทรวิโรฒ </p>


            <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <p className="font-bold text-[#fa4901]">โครงเรื่อง</p>
                  <p className="font-bold text-[#fa4901]">บทบรรยาย</p>
                  <p className="font-bold text-[#fa4901]">ภาพประกอบ</p>
                </div>
                <div>
                    <p >ชญานิน สุรขจร</p>
                    <p>ปัทมาพร ประทุมถิ่น</p>
                    <p>ฐปนัท เดชประมวลพล</p>
                    <p>วรัญญา ตันติเฉลิม</p>
                </div>
                </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
                <p className="font-bold text-[#fa4901]">เสียงประกอบ</p>
                <p>วรัญญา ตันติเฉลิม</p>
            </div>


              <p className=" text-sm">
                (ขอบคุณเสียงประกอบจาก envato.co )
              </p>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                    <p className="font-bold text-[#fa4901]">พัฒนา</p>
                </div>
                <div>
                    <p>จุลดิษฐ์ อุ่มวงศ์</p>
                    <p>ดลฤทธิ์ อิทธิโชติ</p>
                </div>
            </div>


              <p className="text-sm font-bold text-[#fa4901] mt-6">
                ขอบคุณทีมงานทุกคนที่มีส่วนร่วมในผลงานนี้
              </p>

              <p className="text-xs mt-4 text-[#ffffff] drop-shadow-lg">
                Unexpected Day | การเผชิญกับโรคหลอดเลือดสมองแบบเฉียบพลัน
              </p>

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

export default Credit;
