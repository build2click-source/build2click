import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import SiteShell from "@/components/layout/SiteShell";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  weight: ["900"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: {
    default: "Build2Click | Building To Your Final Click",
    template: "%s | Build2Click",
  },
  description:
    "Elite digital engineering for ambitious brands. We design, develop, and convert. Partner with us to build the future of your digital presence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${montserrat.variable} antialiased`}
    >
      <body className="min-h-screen bg-ivory text-charcoal font-sans flex flex-col">
        {/* Ambient gold glow */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[600px] bg-gradient-to-b from-gold/10 via-gold-dark/5 to-transparent blur-[120px] pointer-events-none rounded-full z-0" />

        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
