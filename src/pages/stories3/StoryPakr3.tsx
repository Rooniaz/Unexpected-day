import React from "react"; 
import { useNavigate } from "react-router-dom";

const StoryPark3: React.FC = () => {
const navigate = useNavigate();

    return (
        <div className="w-full min-h-screen bg-black flex justify-center items-center">
        {/* Mobile-sized container */}
        <div className="relative w-[390px] h-[844px] overflow-hidden">
            
            {/* Background Video */}
            <video 
            src="/video/blurPark.mp4" 
            autoPlay 
            loop 
            muted 
            className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Dialog text container */}
            <div className="absolute bottom-20 my-20 left-1/2 -translate-x-1/2 w-[90%] z-10">
            <div className="px-6 py-4 bg-black/50 rounded-lg">
                <p className="text-lg text-white text-center">
                เจน : เห้ย!! ทำไมแกปากเบี้ยวอะ
                </p>
            </div>
            </div>

            {/* Continue Button - Bottom right */}
            <div 
            onClick={() => navigate('/epilogue')}
            className="absolute bottom-4 right-4 text-black/80 text-2xl cursor-pointer hover:text-black/100 z-20"
            >
            กดเพื่อไปต่อ {'>>'}
            </div>

        </div>
        </div>
    );
};

export default StoryPark3;
