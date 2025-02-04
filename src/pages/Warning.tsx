import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Warning: React.FC = () => {
  const navigate = useNavigate();

    // สร้าง ref สำหรับ audio element
    const audioRef1 = useRef<HTMLAudioElement>(null);
    const audioRef2 = useRef<HTMLAudioElement>(null);
    const audioRef3 = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        // ตั้งค่า volume หลังจาก component mount
        if (audioRef1.current) {
            audioRef1.current.volume = 0.5;
        }
        if (audioRef2.current) {
            audioRef2.current.volume = 0.5;
        }
        if (audioRef3.current) {
            audioRef3.current.volume = 0.2;
        }
    }, []);

  return (
    <div
      className="min-h-screen bg-white flex flex-col items-center justify-center p-4"
    >
    {/* <audio ref={audioRef1} src="/Sound/Scene Start/26365 Group of people walking on grass path loop-full.mp3" autoPlay loop /> */}
    <audio ref={audioRef2} src="/Sound/Scene Start/For Education - Full.mp3" autoPlay loop />
          {/* <audio ref={audioRef3} src="/Sound/Scene in park/Park Ambience.mp3" autoPlay loop /> */}
      <div className="w-full max-w-lg text-center">
        <p className="text-lg font-custom mb-4">เว็บไซต์นี้มีเสียงและเอฟเฟคที่ละเอียดอ่อน </p>
        <p className="text-lg font-custom mb-4">โปรดใช้วิจารณญาณในการเล่นเกมเว็บไซต์ของพวกเรา</p>
        <p className="text-lg font-custom mb-8">ขอให้ทุกคนได้รับทั้งความสุขและสาระความรู้จากการดำเนินเรื่อง ณ ที่นี้ด้วยนะคะ :)</p>
        <button 
          onClick={() => navigate('/Explanation')}
          className="mt-8 px-6 py-2 bg-black font-custom text-white rounded hover:bg-gray-800"
        >
          ถัดไป {'>>'}
        </button>
      </div>
    </div>
  );
};
export default Warning;
