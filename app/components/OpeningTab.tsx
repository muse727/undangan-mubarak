"use client";
import { motion, Variants } from 'framer-motion';
import styles from '../page.module.css';

// Animasi untuk kontainer utama (ngatur jeda antar elemen)
const containerVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
};

// Animasi untuk masing-masing item (muncul dari bawah)
const itemVariants: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function OpeningTab({ isOpened, handleBukaUndangan, guestName }: { isOpened: boolean; handleBukaUndangan: () => void; guestName: string; }) {
  return (
    <motion.div 
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={styles.contentWrapper}
    >
      <motion.p variants={itemVariants} className={styles.invitedText}>You're Invited to</motion.p>
      
      <motion.h1 variants={itemVariants} className={styles.yayasanTitle}>SIT Al Mubarak</motion.h1>
      
      <motion.div variants={itemVariants} className={styles.eventTitleBlock}>
        <h2 className={styles.eventTitleText}>Iftar Jama'i</h2>
        <p className={styles.eventSubtitleText}>Keluarga Besar SIT Al Mubarak</p>
        <p className={styles.themeTitleText}>Ramadhan, Bulan Kebaikan Penuh Keberkahan</p>
      </motion.div>

      <motion.div variants={itemVariants} className={styles.card}>
        <p className={styles.cardSubtitle}>Kepada Yth. Bapak/ Ibu/ Saudara/ i</p>
        <h3 className={styles.guestName}>{guestName}</h3>
        {/* VIP Guest udah dihapus bro! */}
        <p className={styles.locationText} style={{ marginTop: '0.5rem' }}>di Tempat</p>
      </motion.div>

      {!isOpened && (
        <motion.button variants={itemVariants} className={styles.btn} onClick={handleBukaUndangan}>
          Buka Undangan
        </motion.button>
      )}
    </motion.div>
  );
}