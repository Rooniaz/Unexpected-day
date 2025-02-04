import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: ''
  });

  // โหลดค่าจาก localStorage เมื่อเปิดหน้านี้
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const storedAge = localStorage.getItem("userAge");

    if (storedName && storedAge) {
      setFormData({ name: storedName, age: storedAge });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // บันทึกค่าลง localStorage
    localStorage.setItem("userName", formData.name);
    localStorage.setItem("userAge", formData.age);

    console.log("formData:", formData);
    navigate('/Prechapter');
  };

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
        <audio ref={audioRef2} src="/Sound/Scene Start/For Education - Full.mp3" autoPlay loop />
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="w-full max-w-lg px-6 py-4 bg-opacity-70 rounded-lg ">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-2xl text-orange-500 mb-2 font-custom">ชื่อเล่น</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-2 border mb-8 rounded-3xl"
                  required
                />
              </div>
              <div>
                <label className="block text-2xl text-orange-500 mb-2 font-custom">อายุ</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                  className="w-full p-2 border mb-8 rounded-3xl"
                  required
                />
              </div>
              <button 
                type="submit"
                className="w-full px-6 py-2 font-bold text-xl font-custom text-orange-500 underline rounded"
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

export default Welcome;
