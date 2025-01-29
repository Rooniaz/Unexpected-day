import React from "react";
import { useState} from "react";
import { useNavigate } from "react-router-dom";

const Welcome: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      name: '',
      age: ''
    });
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("formdata:", formData);
      navigate('/prologue2',);
    };
  
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-lg">
          {/* <h2 className="text-2xl mb-8 text-center">ยินดีต้อนรับเข้าสู่บทของความหมาย</h2>
          <p className="text-lg mb-4 text-center">ที่จะพาคุณผ่านจุดเกิดเหตุทั้งหลาย ๆ</p> */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-2xl text-orange-500 mb-2 font-custom">ชื่อเล่น</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full p-2 border rounded-3xl"
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
              className="w-full px-6 py-2 font-bold text-xl font-custom text-orange-500 underline rounded "
            >
              กดเพื่อไปต่อ →
            </button>
          </form>
        </div>
      </div>
    );
  };

export default Welcome;



