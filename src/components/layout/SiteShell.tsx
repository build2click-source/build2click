'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import PageLoader from '@/components/ui/PageLoader';

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStandalone = pathname === '/card';

  if (isStandalone) {
    return (
      <>
        <PageLoader />
        {children}
      </>
    );
  }

  return (
    <>
      <PageLoader />
      <Header />
      <div className="flex-grow relative z-10">{children}</div>
      <Footer />
    </>
  );
}
