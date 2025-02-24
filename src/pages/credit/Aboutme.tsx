import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Aboutme: React.FC = () => {
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
            <div>
            <img src="/icon.svg" alt="SVG Icon" width="30" height="30" />;
            </div>
              <div>
              <h2 className="text-4xl font-bold mb-5">เกี่ยวกับงาน</h2>
            <p className="text-lg">ผลงานชิ้นนี้เกิดขึ้นเพื่อให้ผู้เล่นทุกคนได้เรียนรู้</p>
            <p className="text-lg">และตระหนักถึงภัยเงียบที่ไม่อาจคาดคิด</p>
            <p className="text-lg">โดยเป็นเรื่องราวเกี่ยวกับโรคหลอดเลือดสมอง</p>
            <p className="text-lg">ที่สามารถเกิดได้กับทุกคนแม้แต่ในคนอายุน้อย</p>
            <p className="text-lg">แต่หากได้ทราบวิธีสังเกตอาการของโรคนี้</p>
            <p className="text-lg">ก็จะเป็นประโยชน์ทั้งต่อตัวเองและคนรอบข้าง</p>


            <p className="text-lg">โดยเป็นเรื่องราวเกี่ยวกับโรคหลอดเลือดสมอง</p>

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

export default Aboutme;
