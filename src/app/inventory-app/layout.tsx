import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AppShell from '@/components/inventory/AppShell';
import './inventory-globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Inventory Pro',
  description: 'Admin Inventory Management System',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`inventory-theme ${inter.className}`}>
      <AppShell>{children}</AppShell>
    </div>
  );
}
