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

    const tryPlay = () => {
      if (videoRef.current) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log(" วิดีโอแรกเริ่มเล่นอัตโนมัติ");
            })
            .catch((err) => {
              console.warn(" วิดีโอแรกถูกบล็อก autoplay:", err);
            });
        }
      }
    };

    tryPlay();

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

      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.style.visibility = "hidden";
        }
        if (secondVideoRef.current) {
          secondVideoRef.current.style.visibility = "visible";
          secondVideoRef.current.style.opacity = "1";
          secondVideoRef.current.play().catch((err) =>
            console.warn(" เล่นวิดีโอที่สองไม่สำเร็จ", err)
          );
        }
      }, 500);
    }
  };

  return (
    <div
      className="w-full min-h-screen flex justify-center items-center bg-black"
      onClick={handleClick}
    >
      <div
        className="relative justify-center items-center 
        w-full h-screen 
        sm:w-[390px] sm:h-[844px] overflow-hidden"
      >
        {/* วิดีโอแรก */}
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={handlePicEnd}
          onLoadedData={() => {
            if (videoRef.current?.paused) {
              videoRef.current
                .play()
                .then(() => console.log("🎥 เล่นอัตโนมัติหลังโหลดสำเร็จ"))
                .catch((err) =>
                  console.warn(" play หลัง onLoadedData ไม่สำเร็จ", err)
                );
            }
          }}
          style={{ visibility: "visible" }}
          className="absolute inset-0 
        w-full h-screen 
        sm:w-[390px] sm:h-[844px]"
        >
          <source src="/video/brain_video/Factopen.webm" type="video/webm" />
          <source src="/video/brain_video/Factopen.mp4" type="video/mp4" />
          <source src="/video/brain_video/Factopen.mov" type="video/quicktime" />
          Your browser does not support the video tag.
        </video>

        {/* วิดีโอที่สอง (ซ่อนไว้ก่อน) */}
        <video
          ref={secondVideoRef}
          muted
          playsInline
          preload="auto"
          onEnded={handleSecondPicEnd}
          style={{ visibility: "hidden", opacity: 0, transition: "opacity 0.5s" }}
          className="absolute inset-0 w-full h-screen 
        sm:w-[390px] sm:h-[844px]"
        >
          <source src="/video/brain_video/Factcloses.webm" type="video/webm" />
          <source src="/video/brain_video/Factcloses.mp4" type="video/mp4" />
          <source src="/video/brain_video/Factcloses.mov" type="video/quicktime" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default Braindetail;
