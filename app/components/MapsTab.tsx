"use client";
import { motion, Variants } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';
import styles from '../page.module.css';

const pageVariants: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.3, ease: "easeIn" } }
};

export default function MapsTab() {
  
  // Fungsi buka aplikasi Google Maps
  const handleOpenMaps = () => {
    // Kalau lu punya link rute spesifik, ganti URL di bawah ini
    window.open("https://maps.google.com/?q=SIT+Al+Mubarak", "_blank");
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
        Lokasi Acara
      </h1>

      {/* Kotak Peta (Glassmorphism) */}
      <div className={styles.himbauanBox} style={{ padding: '1rem', marginBottom: '1.5rem' }}>
        
        {/* IFRAME GOOGLE MAPS */}
        <div style={{ width: '100%', height: '250px', borderRadius: '12px', overflow: 'hidden', marginBottom: '1rem' }}>
          <iframe 
            src="https://www.google.com/maps?q=SIT+Al+Mubarak&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <h3 style={{ fontSize: '1.1rem', color: '#facc15', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <MapPin size={18} /> Lapangan SIT Al Mubarak
        </h3>
        
        <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', margin: 0, lineHeight: 1.5 }}>
          Area Terbuka Utama.<br/>
          (Silakan gunakan petunjuk arah di bawah untuk rute terbaik menuju lokasi).
        </p>
      </div>

      {/* Tombol Arahkan ke Google Maps */}
      <button className={styles.btn} onClick={handleOpenMaps} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
        <Navigation size={20} />
        Petunjuk Ke Lokasi
      </button>

    </motion.div>
  );
}