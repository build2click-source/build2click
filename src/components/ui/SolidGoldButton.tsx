import React from 'react';
import Link from 'next/link';

interface SolidGoldButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export default function SolidGoldButton({ children, onClick, href, className = "" }: SolidGoldButtonProps) {
  const classes = `px-8 py-4 rounded-full bg-gradient-to-r from-gold to-gold-dark text-white text-base font-bold hover:scale-105 transition-all duration-300 shadow-[0_8px_25px_rgba(197,160,89,0.3)] flex items-center justify-center gap-2 ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
