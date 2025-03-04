import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAudio } from "../../contexts/AudioProvider";

const Braindetail = () => {
  const navigate = useNavigate();
  const [videoEnded, setVideoEnded] = useState(false);
  const [isSecondVideoPlaying, setIsSecondVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const secondVideoRef = useRef<HTMLVideoElement>(null);
  const { playAudio, pauseAudio } = useAudio();

  useEffect(() => {
    playAudio("/Sound/Sound fx/Scene BEFAST.mp3", 0.2);
    return () => pauseAudio();
  }, []);

  const handlePicEnd = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = videoRef.current.duration;
    }
    setVideoEnded(true);
  };

  const handleSecondPicEnd = () => {
    navigate("/Friendbrain");
  };

  const handleClick = () => {
    if (videoEnded && !isSecondVideoPlaying && secondVideoRef.current) {
      setIsSecondVideoPlaying(true);

      // ทำให้วิดีโอแรกจางลงอย่างนุ่มนวล
      if (videoRef.current) {
        videoRef.current.style.transition = "opacity 0.5s ease-out";
        videoRef.current.style.opacity = "0";
      }

      // รอให้วิดีโอแรกหายไป แล้วค่อยแสดงวิดีโอที่สอง
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.style.visibility = "hidden";
        }
        if (secondVideoRef.current) {
          secondVideoRef.current.style.visibility = "visible";
          secondVideoRef.current.style.opacity = "1";
          secondVideoRef.current.play();
        }
      }, 500); // 500ms เท่ากับเวลา transition
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-black" onClick={handleClick}>
      <div className="relative w-[390px] h-[844px] overflow-hidden">
        {/* วิดีโอแรก */}
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={handlePicEnd}
          className="absolute inset-0 w-[390px] h-[844px]  "
        >
          <source src="/video/brain_video/fact.webm" type="video/webm" />
          <source src="/video/brain_video/fact.mp4" type="video/mp4" />
          <source src="/video/brain_video/fact.mov" type="video/quicktime" />
          Your browser does not support the video tag.
        </video>

        {/* วิดีโอที่สอง (ซ่อนไว้ก่อน) */}
        <video
          ref={secondVideoRef}
          muted
          playsInline
          preload="auto"
          onEnded={handleSecondPicEnd}
          className="absolute inset-0 w-[390px] h-[844px] invisible "
        >
          <source src="/video/brain_video/factclose.webm" type="video/webm" />
          <source src="/video/brain_video/factclose.mp4" type="video/mp4" />
          <source src="/video/brain_video/factclose.mov" type="video/quicktime" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default Braindetail;
