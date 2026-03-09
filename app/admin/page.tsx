"use client";
import { useState, useEffect } from 'react';
import { Copy, Trash2 } from 'lucide-react'; 
// Import getMusicUrl & updateMusicUrl ditambahin di sini
import { addBulkGuests, getGuests, deleteGuest, getMusicUrl, updateMusicUrl } from '../actions';
import styles from './admin.module.css';

export default function AdminPage() {
  const [guests, setGuests] = useState<any[]>([]);
  const [bulkText, setBulkText] = useState("");
  
  // State baru buat nyimpen link musik
  const [musicLink, setMusicLink] = useState("");

  const fetchGuests = async () => {
    const data = await getGuests();
    setGuests(data);
  };

  useEffect(() => {
    fetchGuests();
    // Ambil link musik dari DB pas halaman admin dibuka
    getMusicUrl().then(url => {
      if (url) setMusicLink(url);
    });
  }, []);

  const handleBulkAdd = async () => {
    if (!bulkText.trim()) return;
    await addBulkGuests(bulkText);
    setBulkText("");
    fetchGuests(); 
  };

  const handleDelete = async (id: string) => {
    await deleteGuest(id);
    fetchGuests();
  };

  // Fungsi simpan musik ke database
  const handleSaveMusic = async () => {
    if (!musicLink.trim()) return;
    await updateMusicUrl(musicLink);
    alert("Musik berhasil diupdate!");
  };

  const handleCopyLink = (name: string) => {
    const baseUrl = window.location.origin; 
    const encodedName = encodeURIComponent(name);
    const invitationLink = `${baseUrl}/?to=${encodedName}`;

    navigator.clipboard.writeText(invitationLink)
      .then(() => {
        alert(`Link untuk ${name} berhasil disalin!\n${invitationLink}`);
      })
      .catch((err) => {
        console.error('Gagal copy: ', err);
        alert('Gagal menyalin link bro.');
      });
  };

  return (
    <div className={styles.adminContainer}>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>Admin Panel - Al Mubarak</h1>
      </header>

      <div className={styles.mainLayout}>
        
        {/* KOLOM KIRI: SETTING & IMPORT */}
        <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div className={styles.formSection}>
            <h2 className={styles.sectionTitle}>Import Daftar Tamu</h2>
            <textarea 
              className={styles.textArea}
              placeholder="Ketik/Paste nama di sini (Satu nama per baris)...&#10;Agus Sugandi&#10;Keluarga Pak Budi"
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
            />
            <button className={styles.btnAction} onClick={handleBulkAdd}>
              Simpan Tamu
            </button>
          </div>

          <div className={styles.formSection}>
            <h2 className={styles.sectionTitle}>Setting Musik Background</h2>
            <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.5rem' }}>
              Masukkan link file MP3 (contoh: https://domain.com/lagu.mp3 atau /music.mp3)
            </p>
            <input 
              type="text" 
              className={styles.textArea} 
              style={{ height: '45px', marginBottom: '1rem' }}
              value={musicLink}
              onChange={(e) => setMusicLink(e.target.value)}
            />
            <button className={styles.btnAction} onClick={handleSaveMusic}>
              Simpan Musik
            </button>
          </div>

        </div>

        {/* KOLOM KANAN: DAFTAR TAMU */}
        <div className={styles.listSection}>
          <h2 className={styles.sectionTitle}>Daftar Tamu ({guests.length})</h2>
          <ul className={styles.guestList}>
            {guests.map((guest) => (
              <li key={guest.id} className={styles.guestItem}>
                <div>
                  <p className={styles.guestName}>{guest.name}</p>
                  <span className={styles.guestDate}>Ditambahkan: {new Date(guest.createdAt).toLocaleDateString('id-ID')}</span>
                </div>
                <div className={styles.actionButtons}>
                  <button className={styles.btnCopy} onClick={() => handleCopyLink(guest.name)}>
                    <Copy size={16} /> Salin Link
                  </button>
                  <button className={styles.btnDelete} onClick={() => handleDelete(guest.id)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}