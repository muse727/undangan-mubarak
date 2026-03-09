"use client";
import { motion, Variants } from 'framer-motion';
import { MessageCircle, Info } from 'lucide-react'; 
import styles from '../page.module.css';

const pageVariants: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.3, ease: "easeIn" } }
};

// FIX NYA DI SINI: Daftarin guestName
export default function RsvpTab({ guestName }: { guestName: string }) {
  
  const handleWA = () => {
    const nomorWA = "6281234567890"; // Ganti nomor panitia
    
    // Nama di WA juga otomatis ngikutin link
    const pesan = `Assalamu'alaikum Warahmatullahi Wabarakatuh.%0A%0ASaya *${guestName}*, InsyaAllah *AKAN HADIR* pada acara Iftar Jama'i Keluarga Besar SIT Al Mubarak pada hari Rabu, 11 Maret 2026.`;
    
    window.open(`https://wa.me/${nomorWA}?text=${pesan}`, '_blank');
  };

  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={styles.contentWrapper}
      style={{ justifyContent: 'flex-start', paddingTop: '3rem' }}
    >
      <h1 className={styles.yayasanTitle} style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>
        Konfirmasi Kehadiran
      </h1>

      <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', textAlign: 'center', marginBottom: '2rem' }}>
        Klik tombol di bawah ini untuk konfirmasi kehadiran Bapak/Ibu/Saudara/i melalui WhatsApp.
      </p>

      <div className={styles.himbauanBox}>
        <h2 className={styles.himbauanTitle}>
          <Info size={20} /> Himbauan Acara
        </h2>
        <ul className={styles.himbauanList}>
          <li>Hadir tepat waktu sebelum rangkaian acara dimulai.</li>
          <li>Membawa Al Quran.</li>
          <li>Menjaga ketertiban dan kebersihan lingkungan sekolah.</li>
          <li>Konfirmasi kehadiran maksimal tanggal <strong>9 Maret 2026</strong>.</li>
        </ul>
      </div>

      <button className={styles.waBtn} onClick={handleWA}>
        <MessageCircle size={22} />
        Konfirmasi via WhatsApp
      </button>

    </motion.div>
  );
}