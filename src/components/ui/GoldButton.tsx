import React from 'react';
import Link from 'next/link';

interface GoldButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export default function GoldButton({ children, onClick, href, className = "" }: GoldButtonProps) {
  const inner = (
    <>
      <span className="absolute inset-0 bg-gradient-to-r from-gold-light via-gold to-gold-dark opacity-90 group-hover:opacity-100 transition-opacity duration-300"></span>
      <div className="relative px-8 py-4 bg-white rounded-full transition-all duration-300 group-hover:bg-opacity-90 flex items-center justify-center">
        <span className="relative z-10 flex items-center gap-2 text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-dark">
          {children}
        </span>
      </div>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`relative group p-[1px] rounded-full overflow-hidden shadow-[0_8px_20px_rgba(197,160,89,0.2)] hover:shadow-[0_12px_25px_rgba(197,160,89,0.3)] transition-all duration-300 ${className}`}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`relative group p-[1px] rounded-full overflow-hidden shadow-[0_8px_20px_rgba(197,160,89,0.2)] hover:shadow-[0_12px_25px_rgba(197,160,89,0.3)] transition-all duration-300 ${className}`}
    >
      {inner}
    </button>
  );
}
