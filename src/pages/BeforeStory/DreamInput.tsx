import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DreamInput: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        dream: '',
    });

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log("formdata:", formData);
        
        // บันทึกความฝันลงใน localStorage
        localStorage.setItem('userDream', formData.dream);

        navigate('/Prechapter1');
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-lg">
                <div className="flex justify-center items-center mb-5">
                    <p>แล้วความฝันของคุณคืออะไร?</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex justify-center items-center">
                        <input
                            type="text"
                            value={formData.dream}
                            onChange={(e) => setFormData({ ...formData, dream: e.target.value })}
                            className="w-full p-2 border rounded-3xl w-80 h-40 text-center text-lg"
                            placeholder="พิมพ์เพื่อตอบ"
                            required
                        />
                    </div>
                    <div className="flex justify-center items-center">
                        <button 
                            type="submit"
                            className="w-auto px-4 py-1 font-bold text-xl text-black bg-grey-500 rounded border-2 border-grey-500"
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
