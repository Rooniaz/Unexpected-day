import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInOut } from "../../components/fadeInOut";

const DreamInput: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ dream: "" });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("formdata:", formData);
        navigate("/Prechapter1");
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
            <motion.div
                className="relative w-[390px] h-[844px] overflow-hidden"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={fadeInOut(2, "easeInOut", 0)}
            >
                {/* รูปภาพพื้นหลัง (GIF) */}
                <img
                    src="/gif/3-6.gif"
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="relative z-10 flex flex-col items-center justify-center h-full">
                    <p className="font-custom mb-5 text-lg text-white drop-shadow-md">
                        แล้วความฝันของคุณคืออะไร?
                    </p>

                    <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                        <div className="flex justify-center items-center">
                            <input
                                type="text"
                                value={formData.dream}
                                onChange={(e) =>
                                    setFormData({ ...formData, dream: e.target.value })
                                }
                                className="w-80 h-[100px] border rounded-xl text-center font-custom text-lg bg-white focus:outline-none"
                                placeholder="พิมพ์เพื่อตอบ"
                                required
                            />
                        </div>
                        <div className="flex justify-center items-center">
                            <button
                                type="submit"
                                className="w-auto px-4 py-1 font-bold text-xl font-custom text-black bg-gray-500 rounded border-2 border-gray-500 hover:bg-gray-600 transition"
                            >
                                ตกลง
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default DreamInput;
