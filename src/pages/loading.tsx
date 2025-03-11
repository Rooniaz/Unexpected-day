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
      }, 1000);
    }).catch(() => {
      setError("ไม่สามารถโหลด asset ทั้งหมดได้");
    });
  }, [assets, navigate]);

  return (
    <div className="min-h-screen bg-black flex justify-center items-center relative">
      <div
        className="relative flex justify-center items-center w-full h-screen sm:w-[390px] sm:h-[844px]"
        style={{
          backgroundImage: "url('/image/cover.gif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <motion.div
          className="w-full h-full flex flex-col justify-center items-center bg-black text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="text-2xl mb-4"
            animate={{ opacity: [0, 1, 0], scale: [0.9, 1, 0.9] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            กำลังโหลด...
          </motion.div>

          {/* ไอคอนแครอทหมุน 3D */}
          <motion.div
            className="w-24 h-24 flex justify-center items-center mb-4"
            animate={{
              rotate: 360,
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "linear",
            }}
          >
            <motion.img
              src="https://cdn-icons-png.flaticon.com/512/882/882998.png" // ไอคอนแครอท
              alt="Carrot"
              className="w-16 h-16"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "linear",
              }}
            />
          </motion.div>

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
            <motion.div className="text-red-500 mt-4">
              <div>ไม่สามารถโหลดไฟล์เหล่านี้ได้:</div>
              <ul>
                {failedAssets.map((asset, index) => (
                  <li key={index}>{asset}</li>
                ))}
              </ul>
            </motion.div>
          )}

          <motion.div
            className="w-64 h-4 bg-gray-700 rounded-full overflow-hidden"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
          >
            <motion.div
              className="h-full bg-blue-500"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>

          <div className="mt-2 text-lg">
            <span>{progress.toFixed(0)}%</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Preloader;
