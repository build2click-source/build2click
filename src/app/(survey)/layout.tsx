import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ClientWelcomeToast from "@/components/ClientWelcomeToast";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Enneagram Discover | Premium Personality Test",
  description: "Discover your true self with our comprehensive Enneagram test.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body
        className={`${outfit.variable} font-sans relative`}
      >
        <div className="fixed inset-0 z-[-1] overflow-hidden">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
          <div className="absolute bottom-1/2 right-1/4 w-96 h-96 bg-blue-300/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        </div>

        <Navbar />
        <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 z-0">
          {children}
        </main>
        <ClientWelcomeToast />
      </body>
    </html>
  );
}
