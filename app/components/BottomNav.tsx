"use client";
import { motion } from 'framer-motion';
import { Home, CalendarDays, ClipboardList, Send, MapPin, MessageSquare, HeartHandshake } from 'lucide-react';
import styles from '../page.module.css';

export default function BottomNav({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) {
  
  const handleNavClick = (tab: string, e: React.MouseEvent<HTMLDivElement>) => {
    setActiveTab(tab);
    e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  return (
    <motion.nav 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={styles.bottomNav}
    >
      <div className={`${styles.navItem} ${activeTab === 'opening' ? styles.navItemActive : ''}`} onClick={(e) => handleNavClick('opening', e)}>
        <Home size={20} /><span>Opening</span>
      </div>
      
      <div className={`${styles.navItem} ${activeTab === 'event' ? styles.navItemActive : ''}`} onClick={(e) => handleNavClick('event', e)}>
        <CalendarDays size={20} /><span>Event</span>
      </div>
      
      <div className={`${styles.navItem} ${activeTab === 'rundown' ? styles.navItemActive : ''}`} onClick={(e) => handleNavClick('rundown', e)}>
        <ClipboardList size={20} /><span>Rundown</span>
      </div>
      
      <div className={`${styles.navItem} ${activeTab === 'rsvp' ? styles.navItemActive : ''}`} onClick={(e) => handleNavClick('rsvp', e)}>
        <Send size={20} /><span>RSVP</span>
      </div>
      
      {/* INI MENU UCAPANNYA BRO */}
      <div className={`${styles.navItem} ${activeTab === 'wishes' ? styles.navItemActive : ''}`} onClick={(e) => handleNavClick('wishes', e)}>
        <MessageSquare size={20} /><span>Ucapan</span>
      </div>

      <div className={`${styles.navItem} ${activeTab === 'maps' ? styles.navItemActive : ''}`} onClick={(e) => handleNavClick('maps', e)}>
        <MapPin size={20} /><span>Maps</span>
      </div>

      <div className={`${styles.navItem} ${activeTab === 'thanks' ? styles.navItemActive : ''}`} onClick={(e) => handleNavClick('thanks', e)}>
        <HeartHandshake size={20} /><span>Penutup</span>
      </div>
    </motion.nav>
  );
}