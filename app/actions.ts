// app/actions.ts
"use server"

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// --- FUNGSI UNTUK TAMU (ADMIN) ---
export async function addBulkGuests(namesText: string) {
  const names = namesText.split('\n').map(n => n.trim()).filter(n => n !== "");
  
  // Masukin semua nama, kalau ada yang kembar di-skip
  for (const name of names) {
    try {
      await prisma.guest.create({ data: { name } });
    } catch (error) {
      // Abaikan kalau duplikat
    }
  }
  revalidatePath('/admin');
}

export async function getGuests() {
  return await prisma.guest.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function deleteGuest(id: string) {
  await prisma.guest.delete({ where: { id } });
  revalidatePath('/admin');
}

// --- FUNGSI UNTUK UCAPAN (BUKU TAMU) ---
export async function getWishes() {
  return await prisma.wish.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function addWish(name: string, message: string) {
  await prisma.wish.create({ data: { name, message } });
  revalidatePath('/');
}

// --- FUNGSI UNTUK SETTING MUSIK ---
export async function getMusicUrl() {
  const setting = await prisma.setting.findUnique({ where: { key: 'music_url' } });
  // Kalau belum ada di DB, pake default musik (lu bisa siapin file music.mp3 di folder public)
  return setting ? setting.value : '/music.mp3'; 
}

export async function updateMusicUrl(url: string) {
  await prisma.setting.upsert({
    where: { key: 'music_url' },
    update: { value: url },
    create: { key: 'music_url', value: url }
  });
  revalidatePath('/');
  revalidatePath('/admin');
}