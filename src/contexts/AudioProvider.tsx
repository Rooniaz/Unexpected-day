import React, { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react';

interface AudioContextType {
  playAudio: () => void;
  pauseAudio: () => void;
  isPlaying: boolean;
  currentTime: number;
  setCurrentTime: (time: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement>(new Audio('/Sound/Scene Start/For Education - Full.mp3'));
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = 0.2;
    audio.loop = true;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, []);

  useEffect(() => {
    audioRef.current.currentTime = currentTime; // เล่นต่อจากเวลาที่ค้างไว้
  }, [currentTime]);

  const playAudio = () => audioRef.current.play();
  const pauseAudio = () => {
    setCurrentTime(audioRef.current.currentTime); // เก็บเวลาปัจจุบันก่อนหยุด
    audioRef.current.pause();
  };

  return (
    <AudioContext.Provider value={{ playAudio, pauseAudio, isPlaying, currentTime, setCurrentTime }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) throw new Error('useAudio must be used within an AudioProvider');
  return context;
};
