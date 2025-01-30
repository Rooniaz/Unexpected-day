import React from "react";
import { useState} from "react";
import { useNavigate } from "react-router-dom";

const DreamInput : React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        dream: '',
        });
    
        const handleSubmit = (e) => {
        e.preventDefault();
        console.log("formdata:", formData);
        navigate('/Prechapter1',);
        };
    
        return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-lg">
            {/* <h2 className="text-2xl mb-8 text-center">ยินดีต้อนรับเข้าสู่บทของความหมาย</h2>
            <p className="text-lg mb-4 text-center">ที่จะพาคุณผ่านจุดเกิดเหตุทั้งหลาย ๆ</p> */}
            <div className="flex justify-center items-center font-custom mb-5">
                <p>แล้วความฝันของคุณคืออะไร?</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex justify-center items-center ">
                <input
                    type="text"
                    value={formData.dream}
                    onChange={(e) => setFormData({...formData, dream: e.target.value})}
                    className="w-full p-2 border rounded-3xl w-80 h-40 text-center font-custom text-lg"
                    placeholder="พิมพ์เพื่อตอบ"
                    required
                />
                </div>
                <div className="flex justify-center items-center ">
                <button 
                type="submit"
                className="w-auto px-4 py-1 font-bold  text-xl font-custom text-white bg-green-500 rounded border-2 border-green-500"
                >
                ตกลง 
                </button>
                </div>
            </form>
            </div>
        </div>
        );
    };

export default DreamInput;



