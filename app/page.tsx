"use client";
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { getMusicUrl } from './actions'; // Wajib import ini bro!
import styles from './page.module.css';

import OpeningTab from './components/OpeningTab';
import EventTab from './components/EventTab';
import RundownTab from './components/RundownTab';
import RsvpTab from './components/RsvpTab';
import WishesTab from './components/WishesTab';
import BottomNav from './components/BottomNav';
import MapsTab from './components/MapsTab';
import MusicPlayer from './components/MusicPlayer';
import ThanksTab from './components/ThanksTab'; // Import tab penutup yang baru dibuat

export default function Undangan() {
  const [isOpened, setIsOpened] = useState(false);
  const [activeTab, setActiveTab] = useState('opening');
  
  // State buat nama tamu
  const [guestName, setGuestName] = useState("Bapak/Ibu/Saudara/i");

  // State buat Musik (Ini yang tadi bikin error karena kehapus bro)
  const [musicUrl, setMusicUrl] = useState("/music.mp3");

  // Efek ini jalan pas pertama kali web dibuka
  useEffect(() => {
    // 1. Ngambil data URL buat nama
    const params = new URLSearchParams(window.location.search);
    const to = params.get('to');
    
    if (to) {
      setGuestName(to); 
    }

    // 2. Ngambil url musik dari database
    getMusicUrl().then(url => {
      if (url) setMusicUrl(url);
    });
  }, []);

  const handleBukaUndangan = () => {
    setIsOpened(true);
    setActiveTab('event');
  };

  return (
    <div className={styles.container}>
      <main className={styles.mobileFrame}>
        <div className={styles.patternOverlay}></div>

        <AnimatePresence mode="wait">
          {activeTab === 'opening' && <OpeningTab key="opening" isOpened={isOpened} handleBukaUndangan={handleBukaUndangan} guestName={guestName} />}
          {activeTab === 'event' && <EventTab key="event" />}
          {activeTab === 'rundown' && <RundownTab key="rundown" />}
          {activeTab === 'rsvp' && <RsvpTab key="rsvp" guestName={guestName} />}
          {activeTab === 'wishes' && <WishesTab key="wishes" guestName={guestName} />}
          {activeTab === 'maps' && <MapsTab key="maps" />}
          {activeTab === 'thanks' && <ThanksTab key="thanks" />}
        </AnimatePresence>

        <AnimatePresence>
          {isOpened && <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />}
        </AnimatePresence>
        
        {/* Panggil Music Player */}
        <MusicPlayer isOpened={isOpened} url={musicUrl} />
      </main>
    </div>
  );
}