import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "../(agency)/globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Indu Ice Cream | Digital E-Card",
  description: "Small batch ice creams & sorbets inspired by Indian roots and nostalgia.",
};

export default function InduLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfair.variable} antialiased`}>
      <body className="bg-gray-100 text-[#4A342E] font-sans antialiased min-h-[100dvh] flex items-center justify-center sm:py-10">
        <script src="https://unpkg.com/@phosphor-icons/web" async />
        {children}
      </body>
    </html>
  );
}
