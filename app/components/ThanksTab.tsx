"use client";
import { motion, Variants } from 'framer-motion';
import { HeartHandshake } from 'lucide-react'; // Icon salam estetik
import styles from '../page.module.css';

const pageVariants: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.3, ease: "easeIn" } }
};

export default function ThanksTab() {
  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={styles.contentWrapper}
      style={{ justifyContent: 'center', paddingBottom: '6rem' }}
    >
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        {/* Icon Emas */}
        <HeartHandshake size={56} color="#facc15" style={{ marginBottom: '1rem', filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.3))' }} />
        
        <h1 className={styles.yayasanTitle} style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>
          Terima Kasih
        </h1>
        
        <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.6, marginBottom: '2rem' }}>
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk menyambung tali silaturahmi bersama Keluarga Besar SIT Al Mubarak.
        </p>
      </div>

      {/* Kotak Pantun (Glassmorphism) */}
      <div className={styles.himbauanBox} style={{ textAlign: 'center', padding: '2rem 1.5rem', border: '1px solid rgba(250, 204, 21, 0.3)' }}>
        <p style={{ fontStyle: 'italic', fontWeight: 600, fontSize: '1.05rem', color: '#a7f3d0', lineHeight: 1.8, margin: 0 }}>
          "Beli takjil es selasih,<br/>
          Diminum segar waktu berbuka.<br/>
          Kami ucapkan banyak terima kasih,<br/>
          Kehadiran Anda sempurnakan acara."
        </p>
      </div>

      <p style={{ marginTop: '2rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', textAlign: 'center', lineHeight: 1.5 }}>
        Wassalamu'alaikum Warahmatullahi Wabarakatuh.<br/>
        <strong style={{ color: '#facc15' }}>Keluarga Besar SIT Al Mubarak</strong>
      </p>

    </motion.div>
  );
}