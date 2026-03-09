"use client";
import { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { CalendarDays, Clock, MapPin } from 'lucide-react';
import styles from '../page.module.css';

const pageVariants: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.3, ease: "easeIn" } }
};

export default function EventTab() {
  const [timeLeft, setTimeLeft] = useState({ d: '00', h: '00', m: '00', s: '00' });

  useEffect(() => {
    const targetDate = new Date("2026-03-11T16:30:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        d: String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0'),
        h: String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0'),
        m: String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0'),
        s: String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0')
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={styles.contentWrapper}
      style={{ justifyContent: 'flex-start', paddingTop: '4rem' }}
    >
      <h1 className={styles.yayasanTitle} style={{ fontSize: '1.5rem', marginBottom: '3rem' }}>
        SIT Al Mubarak
      </h1>

      <div className={styles.eventContainer}>
        <div className={styles.eventRow}>
          <div className={styles.iconBox}><CalendarDays size={24} /></div>
          <div>
            <p className={styles.eventTextPrimary}>Rabu, 11 Maret 2026</p>
            <p className={styles.eventTextSecondary}>21 Ramadhan 1447H</p>
          </div>
        </div>

        <div className={styles.eventRow}>
          <div className={styles.iconBox}><Clock size={24} /></div>
          <div>
            <p className={styles.eventTextPrimary}>Pukul 16.30 WIB - Selesai</p>
            <p className={styles.eventTextSecondary}>Waktu setempat</p>
          </div>
        </div>

        <div className={styles.eventRow}>
          <div className={styles.iconBox}><MapPin size={24} /></div>
          <div>
            <p className={styles.eventTextPrimary}>Lapangan SIT Al Mubarak</p>
            <p className={styles.eventTextSecondary}>Area Terbuka Utama</p>
          </div>
        </div>

        <div className={styles.countdownContainer}>
          <div className={styles.countBox}>
            <span className={styles.countNum}>{timeLeft.d}</span>
            <span className={styles.countLabel}>Hari</span>
          </div>
          <div className={styles.countBox}>
            <span className={styles.countNum}>{timeLeft.h}</span>
            <span className={styles.countLabel}>Jam</span>
          </div>
          <div className={styles.countBox}>
            <span className={styles.countNum}>{timeLeft.m}</span>
            <span className={styles.countLabel}>Menit</span>
          </div>
          <div className={styles.countBox}>
            <span className={styles.countNum}>{timeLeft.s}</span>
            <span className={styles.countLabel}>Detik</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}