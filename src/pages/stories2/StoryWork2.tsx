import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatedText, AnimatedText2 } from "../../components/AnimatedText";

const StoryWork2: React.FC = () => {
  const navigate = useNavigate();
  const storedName = localStorage.getItem("userName") || "???";
  const [showTextBox, setShowTextBox] = useState(false);
  const [index, setIndex] = useState(0);
  const [isClickable] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [inputValue, setInputValue] = useState(""); // เก็บค่าที่พิมพ์
  const [typingTimeout, setTypingTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  const texts = [
    `เจน : ${storedName}`,
    `${storedName} : อ.. เอ่ออ`,
    `เจน : ${storedName} ไม่ไปจริงหรอ`,
    `${storedName} : อ..อะ %^&8#`,
    "เจน : พูดอะไรอะ",
    "เจน : เห้ย!! ทำไมแกปากเบี้ยวอะ ไม่แกล้งดิ!",
    `${storedName} : อ..อะ อั่ก เหิกก..`,
  ];

  useEffect(() => {
    let interval: ReturnType<typeof setTimeout>;
    if (isLocked && !showTextBox && index >= 3) {
      interval = setInterval(() => {
        setIndex((prev) => {
          if (prev < texts.length - 1) {
            return prev + 1;
          } else {
            clearInterval(interval);
            navigate("/StoryWork3");
            return prev;
          }
        });
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isLocked, index, showTextBox, navigate]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);

    // ล้าง timeout เดิมแล้วสร้างใหม่
    if (typingTimeout) clearTimeout(typingTimeout);

    const newTimeout = setTimeout(() => {
      setShowTextBox(false); // ปิด Textbox
      setIsLocked(true); // ล็อกคลิก
      setIndex((prev) => prev + 1); // ไปข้อความถัดไป
    }, 4000); // 2 วินาที

    setTypingTimeout(newTimeout);
  };

  const nextText = () => {
    if (showTextBox || isLocked) return;
  
    // กรณีที่คลิกไปข้อความถัดไป
    if (index < texts.length - 1) {
      if (index === 2) {
        setShowTextBox(true);  // ตั้งค่าให้แสดง TextBox เมื่อ index = 2
      } else {
        setIndex((prev) => prev + 1);
      }
  
      // ตั้งค่าการล็อกคลิกหลังจากแสดงข้อความ
      setIsLocked(true);
  
      // หลังจาก 3 วินาทีให้ปลดล็อกการคลิก
      setTimeout(() => {
        setIsLocked(false); // เปิดให้กดได้หลังจากหน่วงเวลา
      }, 1500);
    } else {
      navigate("/StoryWork3");
    }
  };
  
  useEffect(() => {
    // เมื่อเริ่มข้อความใหม่ ให้หน่วงเวลา 3 วินาทีจากนั้นสามารถคลิกได้
    if (index === 0) {
      setIsLocked(true); // เริ่มล็อกคลิกตั้งแต่ข้อความแรก
      setTimeout(() => {
        setIsLocked(false); // เปิดให้กดไปข้อความถัดไปหลังจาก 3 วินาที
      }, 3000);
    } else if (index > 0 && !isLocked) {
      setIsLocked(true);
      setTimeout(() => {
        setIsLocked(false); // เปิดให้กดไปข้อความถัดไปหลังจากหน่วงเวลา
      }, 3000);
    }
  }, [index]);
  


  const backgroundGif = () => {
    if (index >= 4) {
      return "/gif/26-27/office.gif";  // ใช้ GIF นี้ค้างไว้
    }
    return "/gif/18-21/jane_office_18-21.gif";  // ค่า default
  };

  // Refs สำหรับเสียง
  const audioRef2 = useRef<HTMLAudioElement>(null);
  const audioRef3 = useRef<HTMLAudioElement>(null);
  const audioRef4 = useRef<HTMLAudioElement>(null);  
  const audioRef5 = useRef<HTMLAudioElement>(null);  

  // กำหนดการตั้งค่าเสียงเมื่อโหลด
  if (audioRef2.current) {
    audioRef2.current.volume = 0.5;
    audioRef2.current.playbackRate = 1;

    setTimeout(() => {
      if (audioRef2.current) {
        audioRef2.current.playbackRate = 2;
      }
    }, 3000);

    setTimeout(() => {
      if (audioRef2.current) {
        audioRef2.current.playbackRate = 3;
      }
    }, 6000);

    if (audioRef3.current) {
      audioRef3.current.volume = 0.5;
    }

    if (audioRef4.current) {
      audioRef4.current.volume = 0.5;
    }
    if (audioRef5.current) {
      audioRef5.current.volume = 0.3;
    }
  }

  // การเล่นเพลงใหม่เมื่อถึงข้อความที่ต้องการ
    useEffect(() => {
      if (index === 0) {
        // หยุดเสียง 4 ทันทีที่เริ่มข้อความแรก
        if (audioRef4.current) {
          audioRef4.current.pause();
          audioRef4.current.currentTime = 0;
        }
      }
    
      if (index === 3) { // เมื่อถึงข้อความ "เจน : เห้ย!! ทำไมแกปากเบี้ยวอะ ไม่แกล้งดิ!"
        if (audioRef2.current) {
          audioRef2.current.pause();
        }
        if (audioRef3.current) {
          audioRef3.current.pause();
        }
        if (audioRef4.current) {
          audioRef4.current.play().catch((error) => {
            console.log("ไม่สามารถเล่นเสียงใหม่ได้:", error);
          });
        }
      }
    
      if (index === 3 || index === 6) { // เล่นเสียงใหม่ที่บรรทัด 4 และ 7
        if (audioRef5.current) {
          audioRef5.current.play().catch((error) => {
            console.log("ไม่สามารถเล่นเสียงใหม่ได้:", error);
          });
        }
      }
    
    }, [index]);
    
  
  

  return (
    <div className="w-full min-h-screen bg-black flex justify-center items-center">
      <audio
        ref={audioRef2}
        src="/Sound/Scene Working/Scene Working.mp3"
        autoPlay
        loop
      />
      <audio ref={audioRef3} src="/Sound/Sound fx/heart-beat-nol.mp3" autoPlay loop />
      <audio ref={audioRef4} src="/Sound/Sound fx/heart-beat-friend.m4a" autoPlay loop /> {/* เพลงใหม่ที่ต้องการเล่น */}
      <audio ref={audioRef5} src="/Sound/Sound fx/EEFECT-STROKE-HELP.mp3"  />

      <div
        className="relative flex justify-center items-center 
        w-full h-screen 
        sm:w-[390px] sm:h-[844px]"        
        onClick={!showTextBox && isClickable && !isLocked ? nextText : undefined}
      >
        <img
          src={backgroundGif()}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

         {!showTextBox ? (index === 1 || index === 3 ? (
          // แสดงข้อความที่เป็นสีเหลือง
          <div className="absolute bottom-20 my-20 left-1/2 -translate-x-1/2 w-[90%] z-10">
            <div className="px-6 py-4 bg-black/50 rounded-lg">
              <AnimatedText2 key={index} text={texts[index]} color="yellow" />
            </div>
          </div>
        ) : (
          // แสดงข้อความปกติ
          <div className="absolute bottom-20 my-20 left-1/2 -translate-x-1/2 w-[90%] z-10">
            <div className="px-6 py-4 bg-black/50 rounded-lg">
              <AnimatedText key={index} text={texts[index]} className="text-white break-words"/>
            </div>
          </div>
        )) : (
          // แสดง TextBox
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] z-10">
            <div className="bg-white rounded-lg p-4 cursor-pointer shadow-lg w-full">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="พิมพ์ข้อความ..."
                className="w-full py-10 px-4 text-center text-xl bg-transparent text-black border-none outline-none"/>
            </div>
          </div>
        )}

        <div className="absolute bottom-[9%] right-6 text-white/80 text-4xl z-20">
          <button onClick={nextText} className="text-2xl rounded text-white">
            {/* {'>>'} */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryWork2;
