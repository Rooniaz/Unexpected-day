import React, { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react';

interface AudioContextType {
  playAudio: () => void;
  pauseAudio: () => void;
  isPlaying: boolean;
  currentTime: number;
  setCurrentTime: (time: number) => void;
}

const AudioContext2 = createContext<AudioContextType | undefined>(undefined);

// AudioProvider2 สำหรับเพลงที่สอง
export const AudioProvider2: React.FC<{ children: ReactNode }> = ({ children }) => {
  const audioRef2 = useRef<HTMLAudioElement>(new Audio('/Sound/Sound fx/Scene BEFAST.mp3')); // เพลงที่สอง
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const audio2 = audioRef2.current;
    audio2.volume = 0.5;
    audio2.loop = true;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio2.addEventListener('play', handlePlay);
    audio2.addEventListener('pause', handlePause);

    return () => {
      audio2.removeEventListener('play', handlePlay);
      audio2.removeEventListener('pause', handlePause);
    };
  }, []);

  useEffect(() => {
    audioRef2.current.currentTime = currentTime; // เล่นต่อจากเวลาที่ค้างไว้
  }, [currentTime]);

  const playAudio = () => audioRef2.current.play();
  const pauseAudio = () => {
    setCurrentTime(audioRef2.current.currentTime); // เก็บเวลาปัจจุบันก่อนหยุด
    audioRef2.current.pause();
  };

  return (
    <AudioContext2.Provider value={{ playAudio, pauseAudio, isPlaying, currentTime, setCurrentTime }}>
      {children}
    </AudioContext2.Provider>
  );
};

export const useAudio2 = () => {
  const context = useContext(AudioContext2);
  if (!context) throw new Error('useAudio2 must be used within an AudioProvider2');
  return context;
};