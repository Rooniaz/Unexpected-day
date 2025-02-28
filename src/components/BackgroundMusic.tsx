import { useEffect } from "react";

const BackgroundMusic = () => {
  useEffect(() => {
    const audio = new Audio('/Mice_on_Venus.mp3');
    audio.loop = true;
    audio.volume = 0;

    const playMusic = () => {
      audio.play().catch(error => console.log("Audio play failed:", error));
    };

    document.addEventListener('click', playMusic, { once: true });

    return () => {
      audio.pause();
      audio.currentTime = 0;
      document.removeEventListener('click', playMusic);
    };
  }, []);

  return null;
};

export default BackgroundMusic;
