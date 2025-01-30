import React from "react";
import { useNavigate } from "react-router-dom";

const Prechapter: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div
        className="min-h-screen bg-white flex flex-col items-center justify-center text-center p-4">
        
        <div className="w-full max-w-lg">
            <div className="bg-white relative">
            {/* <div className="absolute top-0 left-0 w-16 h-20 bg-black transform -skew-x-12"></div>
            <div className="absolute top-0 right-0 w-16 h-20 bg-black transform skew-x-12"></div> */}
            </div>
            <div className="py-16 px-4">
            <p className="text-lg font-custom mb-8">"ชีวิตของวัยหนุ่มสาวมี</p>
            <p className="text-lg font-custom  mb-4">ความฝันมากมาย</p>
            <p className="text-lg font-custom mb-4 mt-9">ที่อยากจะทำ"</p>
            <button 
                onClick={() => navigate('/DreamInput')}
                className="mt-8 px-6 py-2 bg-black text-white rounded hover:bg-gray-800 font-custom"
            >
                {'>>'}
            </button>
            </div>
        </div>
        </div>
    );
};

export default Prechapter;