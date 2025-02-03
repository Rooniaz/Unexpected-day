import React from "react";
import { useNavigate } from "react-router-dom";

const Preface: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
    className="min-h-screen bg-white flex flex-col items-center justify-center text-center p-4">
                            {/* เพิ่มเพลงในหน้า */}
                            <audio src="/Sound/Scene Start/For Education - Full.mp3" autoPlay loop />
      
      <div className="w-full max-w-lg">
        <div className="bg-white relative">
          {/* <div className="absolute top-0 left-0 w-16 h-20 bg-black transform -skew-x-12"></div>
          <div className="absolute top-0 right-0 w-16 h-20 bg-black transform skew-x-12"></div> */}
        </div>
        <div className="py-16 px-4">
          <h1 className="text-5xl font-custom font-bold mb-2">Unexpected</h1>
          <p className="text-5xl font-custom font-bold mb-4">Day</p>
          <p className="text-lg font-custom mb-4 mt-9">การเผชิญกับโรคหลอดเลือด</p>
          <p className="text-lg font-custom mb-8">สมองแบบเฉียบพลัน</p>
          <button 
            onClick={() => navigate('/warning')}
            className="mt-8 px-6 py-2 bg-black text-white rounded hover:bg-gray-800 font-custom"
          >
            ถัดไป {'>>'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Preface;