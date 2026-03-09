"use client";
import { motion, Variants } from 'framer-motion';
import styles from '../page.module.css';

const pageVariants: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.3, ease: "easeIn" } }
};

// Data jadwal acara lu bro
const rundownData = [
  { time: "15.00-15.30", duration: "30 Menit", title: "Persiapan", items: ["Absensi", "Sholat Ashar Berjama'ah"] },
  { time: "15.30-15.45", duration: "15 Menit", title: "Pembukaan", items: ["Pembukaan oleh MC", "Tilawah (Ustadz Kamil)", "Sholawat (Ustadzah Zizi)"] },
  { time: "15.45-16.00", duration: "15 Menit", title: "Sambutan", items: ["Sambutan Komite Sekolah", "Sambutan Direktur SIT", "Sambutan Pengurus Yayasan"] },
  { time: "16.00-16.50", duration: "50 Menit", title: "Sesi Interaktif", items: ["Games Bonding", "Door prize"] },
  { time: "16.50-17.10", duration: "20 Menit", title: "Materi", items: ["Taujih"] },
  { time: "17.10-17.20", duration: "10 Menit", title: "Silaturahmi", items: ["Mushofaha (Bersalam-salaman)", "Foto bersama"] },
  { time: "17.20-17.50", duration: "30 Menit", title: "Khotmul Qur'an", items: ["Khotmul Qur'an (setiap peserta 1 juz)", "Membaca do'a Khotmul Qur'an"] },
  { time: "17.50-18.10", duration: "20 Menit", title: "Menjelang Berbuka", items: ["Al Ma'tsurat", "Do'a menjelang berbuka puasa", "Persiapan Ifthar"] },
  { time: "18.10-18.25", duration: "15 Menit", title: "Berbuka", items: ["Ifthar Jama'i"] },
  { time: "18.25-18.45", duration: "25 Menit", title: "Ibadah", items: ["Sholat Maghrib Berjamaah"] },
  { time: "18.45-19.15", duration: "30 Menit", title: "Ramah Tamah", items: ["Makan malam"] },
  { time: "19.15-19.30", duration: "15 Menit", title: "Penutup", items: ["Pembersihan Lokasi dan Pulang"] },
];

export default function RundownTab() {
  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={styles.contentWrapper}
      style={{ justifyContent: 'flex-start', paddingTop: '3rem' }}
    >
      <h1 className={styles.yayasanTitle} style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
        Rundown Acara
      </h1>

      <div className={styles.rundownContainer}>
        {rundownData.map((event, index) => (
          <div key={index} className={styles.rundownItem}>
            <div className={styles.rundownHeader}>
              <p className={styles.rundownTime}>{event.time}</p>
              <span className={styles.rundownDuration}>{event.duration}</span>
            </div>
            <p className={styles.rundownTitle}>{event.title}</p>
            <ul className={styles.rundownList}>
              {event.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </motion.div>
  );
}