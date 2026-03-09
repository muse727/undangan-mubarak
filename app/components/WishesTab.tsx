"use client";
import { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { getWishes, addWish } from '../actions'; // Import fungsi backend
import styles from '../page.module.css';

const pageVariants: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.3, ease: "easeIn" } }
};

export default function WishesTab({ guestName }: { guestName: string }) {
  const [name, setName] = useState(guestName || "");
  const [message, setMessage] = useState("");
  const [comments, setComments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fungsi buat ngambil data komentar dari database
  const fetchComments = async () => {
    try {
      const data = await getWishes();
      setComments(data);
    } catch (error) {
      console.error("Gagal mengambil ucapan:", error);
    }
  };

  // Ambil data pas tab Ucapan pertama kali dibuka
  useEffect(() => {
    fetchComments();
  }, []);

  // Fungsi pas tombol kirim ditekan
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;

    setIsLoading(true);
    try {
      await addWish(name, message); // Simpan ke database
      setMessage(""); // Kosongin kolom teks
      await fetchComments(); // Refresh daftar komentar
    } catch (error) {
      alert("Gagal mengirim ucapan, coba lagi bro!");
    } finally {
      setIsLoading(false);
    }
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
        Ucapan & Do'a
      </h1>

      <div className={styles.wishesContainer}>
        {/* Form Kirim Ucapan */}
        <form onSubmit={handleSubmit} className={styles.formBox}>
          <input 
            type="text" 
            placeholder="Nama Anda" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.inputField}
            required
          />
          <textarea 
            placeholder="Tulis ucapan dan doa Anda..." 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={styles.textareaField}
            required
          />
          <button type="submit" className={styles.submitBtn} disabled={isLoading}>
            {isLoading ? "Mengirim..." : "Kirim Ucapan"}
          </button>
        </form>

        {/* Daftar Komentar dari Database */}
        <div className={styles.commentList}>
          {comments.length === 0 ? (
            <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginTop: '1rem' }}>
              Belum ada ucapan. Jadilah yang pertama!
            </p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className={styles.commentItem}>
                <div className={styles.commentHeader}>
                  <p className={styles.commentName}>{comment.name}</p>
                  <span className={styles.commentTime}>
                    {new Date(comment.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                    })}
                  </span>
                </div>
                <p className={styles.commentText}>{comment.message}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
}