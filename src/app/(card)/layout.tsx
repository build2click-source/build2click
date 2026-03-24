import type { Metadata } from 'next';
import { Poppins, Playfair_Display } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['400', '600', '700'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
    title: 'Build2Click | Digital Business Card',
    description: 'Web Development | Brand Identity | Software Solutions',
};

export default function CardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${poppins.variable} ${playfair.variable} font-sans`}>
            <head>
                {/* FontAwesome for Icons designed in the base template */}
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
            </head>
            <body className="antialiased m-0 p-0 text-gray-900 bg-[#EFEBE1]">
                {children}
            </body>
        </html>
    );
}
