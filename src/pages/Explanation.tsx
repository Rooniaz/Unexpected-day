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
        <p className="text-lg font-custom mb-8 font-bold">คำชี้แจง </p>
        <p className="text-lg font-custom mb-2">ผลงานชิ้นนี้เกิดขึ้นเพื่อให้ผู้เล่นทุกคนได้เรียนรู้ </p>
        <p className="text-lg font-custom mb-2">และตระหนักถึงภัยเงียบที่ไม่อาจคาดคิด</p>
        <p className="text-lg font-custom mb-2">โดยเป็นเรื่องราวเกี่ยวกับโรคหลอดเลือดสมอง</p>
        <p className="text-lg font-custom mb-2">ซึ่งเป็นโรคที่สามารถเกิดได้กับทุกคนแม้แต่ในคนอายุน้อย</p>
        <p className="text-lg font-custom mb-2">แต่หากทราบวิธีสังเกตอาการของโรคนี้</p>
        <p className="text-lg font-custom mb-2">ก็จะเป็นประโยชน์ทั้งต่อตัวเองและคนรอบข้างได้นั่นเอง</p>
        <p className="text-lg font-custom mb-4 mt-8">ทั้งนี้พวกเราขอขอบคุณผู้เล่นทุกคนที่เข้ามาเล่นเกมเว็บไซต์นี้</p>
        <p className="text-lg font-custom mb-4">ตอนนี้พวกเราขอให้ทุกคนใช้เวลาในการเรียนรู้ให้คุ้มค่าที่สุดนะคะ</p>
        <button 
        onClick={() => navigate('/welcome')}
        className="mt-8 px-6 py-2 bg-black font-custom text-white rounded hover:bg-gray-800"
        >
        ถัดไป {'>>'}
        </button>
    </div>
    </div>
);
};
export default Warning;
