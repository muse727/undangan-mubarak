import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

// Kita load font Montserrat biar mirip desain BNI
const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Undangan Yayasan Al Mubarak",
  description: "Undangan Digital Gala Dinner",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${montserrat.className} antialiased bg-gray-900`}>
        {children}
      </body>
    </html>
  );
}