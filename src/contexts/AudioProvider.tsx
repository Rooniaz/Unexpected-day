import React, { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react';

interface AudioContextType {
  playAudio: (track: string, volume?: number) => void; // เพิ่ม volume เป็น optional
  pauseAudio: () => void;
  isPlaying: boolean;
  currentTime: number;
  setCurrentTime: (time: number) => void;
  currentTrack: string;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [currentVolume, setCurrentVolume] = useState(0.3); // เริ่มต้นที่ 30%

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.volume = currentVolume;
      audioRef.current.loop = true;

      audioRef.current.addEventListener('play', () => setIsPlaying(true));
      audioRef.current.addEventListener('pause', () => setIsPlaying(false));
    }
  }, []);

  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.src = currentTrack;
      audioRef.current.currentTime = currentTime;
      audioRef.current.volume = currentVolume; // ตั้งค่า volume ตามค่าที่กำหนด
      audioRef.current.play();
    }
  }, [currentTrack, currentVolume]);

  const playAudio = (track: string, volume: number = 0.3) => {
    if (audioRef.current) {
      if (currentTrack !== track) {
        setCurrentTrack(track);
        setCurrentTime(0); // รีเซ็ตเวลาเมื่อเปลี่ยนเพลง
      } else {
        audioRef.current.play();
      }
      setCurrentVolume(volume); // อัปเดต volume ใหม่
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime); // บันทึกเวลาปัจจุบัน
      audioRef.current.pause();
    }
  };

  return (
    <AudioContext.Provider value={{ playAudio, pauseAudio, isPlaying, currentTime, setCurrentTime, currentTrack: currentTrack || '' }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) throw new Error('useAudio must be used within an AudioProvider');
  return context;
};
