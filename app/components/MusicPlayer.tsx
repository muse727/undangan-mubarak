"use client";
import { useState, useEffect, useRef } from 'react';
import { Disc3, Pause } from 'lucide-react';
import styles from '../page.module.css';

export default function MusicPlayer({ isOpened, url }: { isOpened: boolean, url: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Otomatis nyala pas tombol Buka Undangan diklik
  useEffect(() => {
    if (isOpened && audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch((e) => console.log("Autoplay diblokir browser"));
    }
  }, [isOpened]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  if (!isOpened) return null; // Sembunyiin tombol musik sebelum undangan dibuka

  return (
    <>
      <audio ref={audioRef} src={url} loop />
      <button className={styles.musicBtn} onClick={toggleMusic}>
        {isPlaying ? <Disc3 size={22} className={styles.spin} /> : <Pause size={22} />}
      </button>
    </>
  );
}