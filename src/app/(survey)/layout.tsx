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
  title: "Free Enneagram Test | Discover Your True Personality Type",
  description: "Take our highly accurate, free Enneagram test to discover your unique personality type, core motivations, and deepest fears. Get instant results and start your journey of self-discovery.",
  keywords: ["enneagram", "enneagram test", "free enneagram test", "personality test", "enneagram types", "discover enneagram", "psychology", "self discovery", "enneagram assessment"],
  authors: [{ name: "Build2Click" }],
  creator: "Build2Click",
  publisher: "Build2Click",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://www.build2click.in/enneagram",
  },
  openGraph: {
    title: "Free Enneagram Personality Test",
    description: "Discover your Enneagram type with our comprehensive assessment. Fast, accurate, and completely free.",
    url: "https://www.build2click.in/enneagram",
    siteName: "Build2Click Enneagram",
    images: [
      {
        url: "https://www.build2click.in/icon.png",
        width: 800,
        height: 600,
        alt: "Enneagram Discover Test",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Enneagram Personality Test",
    description: "Take the scientifically-backed Enneagram test to uncover your true self.",
    images: ["https://www.build2click.in/icon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
