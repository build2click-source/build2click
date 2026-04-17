'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function PageLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<'in' | 'out'>('in');

  useEffect(() => {
    // Reset on every route change
    setVisible(true);
    setPhase('in');

    // After zoom-in (400ms), switch to zoom-out phase
    const outTimer = setTimeout(() => setPhase('out'), 400);

    // After full animation (800ms total), hide the overlay
    const hideTimer = setTimeout(() => setVisible(false), 800);

    return () => {
      clearTimeout(outTimer);
      clearTimeout(hideTimer);
    };
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(252,251,248,0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        animation: phase === 'out' ? 'loaderFadeOut 0.4s ease-in forwards' : 'loaderFadeIn 0.2s ease-out forwards',
        pointerEvents: 'none',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt="Loading"
        style={{
          width: 'auto',
          height: '100px',
          objectFit: 'contain',
          animation: phase === 'in'
            ? 'logoPopIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both'
            : 'logoPopOut 0.4s cubic-bezier(0.55,0,1,0.45) both',
        }}
      />
    </div>
  );
}
