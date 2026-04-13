import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "@/components/careerdna/AuthProvider";
import Navbar from "@/components/careerdna/Navbar";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CareerDNA | Advanced Assessment Platform",
  description: "Discover your professional identity with psychometric mapping and O*NET career fitting.",
};

export default function CareerDNALayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen bg-[#F4F7F6] font-sans">
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
