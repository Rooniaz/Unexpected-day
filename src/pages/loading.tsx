import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Preloader: React.FC = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [assets, setAssets] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [failedAssets, setFailedAssets] = useState<string[]>([]);

  const handleError = (src: string, event: string | Event): void => {
    setFailedAssets((prevFailedAssets) => [...prevFailedAssets, src]);
    console.error("Error loading asset:", src, event);
  };

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await fetch("/assets.json");
        const data = await response.json();
        const allAssets = [...data.images, ...data.videos, ...data.audio];
        setAssets(allAssets);
      } catch (error) {
        setError("ไม่สามารถโหลดข้อมูล assets ได้");
        console.error("Error loading assets:", error);
      }
    };

    fetchAssets();
  }, []);

  useEffect(() => {
    if (assets.length === 0) return;

    let loadedCount = 0;

    const loadAsset = (src: string) => {
      return new Promise<void>((resolve, reject) => {
        if (/\.(mp4|webm|mov)$/i.test(src)) {
          const video = document.createElement("video");
          video.src = src;
          video.onloadeddata = () => {
            loadedCount++;
            setProgress((loadedCount / assets.length) * 100);
            resolve();
          };
          video.onerror = (event) => {
            handleError(src, event);
            reject();
          };
        } else if (/\.(mp3|wav)$/i.test(src)) {
          const audio = new Audio(src);
          audio.oncanplaythrough = () => {
            loadedCount++;
            setProgress((loadedCount / assets.length) * 100);
            resolve();
          };
          audio.onerror = (event) => {
            handleError(src, event);
            reject();
          };
        } else {
          const img = new Image();
          img.src = src;
          img.onload = () => {
            loadedCount++;
            setProgress((loadedCount / assets.length) * 100);
            resolve();
          };
          img.onerror = (event) => {
            handleError(src, event);
            reject();
          };
        }
      });
    };

    Promise.all(assets.map(loadAsset)).then(() => {
      setTimeout(() => {
        navigate("/home");
      }, 3000);
    }).catch(() => {
      setError("ไม่สามารถโหลด asset ทั้งหมดได้");
    });
  }, [assets, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative bg-black">
      <div className="
              relative flex justify-center items-center 
              w-full h-screen overflow-y-auto bg-black no-scrollbar
              sm:w-[390px] sm:h-[844px]"
              style={{
                  backgroundImage: "url('/image/cover/bg-white.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
              }}
              >
        <motion.div
          className="w-full h-full flex flex-col justify-center items-center px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Title */}
          <motion.h1 
            className="text-4xl font-bold text-white mb-10"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            วิธีการเล่น
          </motion.h1>

          {/* First instruction box */}
          <motion.div 
            className="bg-gray-500 bg-opacity-60 backdrop-blur-sm rounded-xl p-4 px-2 mb-5 w-3/5 mx-auto text-center relative border border-gray-400"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-white mb-2 flex justify-center items-center">แตะที่หน้าจอ</p>
            <div className="flex justify-center items-center">
              <img src="/image/cover/phone.png" className="w-32 h-25" />
    
              <motion.div 
                className="absolute bottom-2 right-10"
                animate={{ 
                  x: [0, 5, 0],
                  y: [0, -5, 0]
                }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <img src="/image/cover/hand.png" className="w-8 h-8" />
              </motion.div>
            </div>
          </motion.div>

          {/* "And" text */}
          <motion.p 
            className="text-xl text-gray-700 my-2 font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            และ
          </motion.p>

          {/* Second instruction box */}
          <motion.div 
            className="bg-gray-500 bg-opacity-60 backdrop-blur-sm rounded-xl p-4 px-2 mb-5 w-3/5 mx-auto text-center relative border border-gray-400 my-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-white font-medium">กดที่ปุ่ม</p>
            <p className="text-white font-medium">ตามวิธีการเล่น</p>
            <motion.div 
              className="absolute bottom-2 right-5"
              animate={{ 
                x: [0, 5, 0],
                y: [0, -5, 0]
              }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <img src="/image/cover/hand.png" className="w-8 h-8" />
            </motion.div>
          </motion.div>

          {/* Error messages */}
          {error && (
            <motion.div
              className="text-red-500 mt-4"
              animate={{ opacity: [0, 1, 0], scale: [0.9, 1, 0.9] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              {error}
            </motion.div>
          )}

          {failedAssets.length > 0 && (
            <motion.div className="text-red-500 mt-4 text-sm">
              <div>ไม่สามารถโหลดไฟล์เหล่านี้ได้:</div>
              <ul className="max-h-20 overflow-y-auto">
                {failedAssets.map((asset, index) => (
                  <li key={index}>{asset}</li>
                ))}
              </ul>
            </motion.div>
          )}

  {/* Loading bar section */}
        <motion.div
          className="absolute bottom-20 w-full px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-gray-700 mb-2 text-sm">กำลังโหลดทรัพยากร...</p>
          <div className="w-full bg-gray-300 rounded-full h-3 mb-4">
            {/* แท่งสีส้มที่จะแสดงการโหลด */}
            <motion.div
              className="bg-orange-700 h-3 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }} 
            />
          </div>
        </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Preloader;