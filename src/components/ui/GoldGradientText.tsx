import React from 'react';

interface GoldGradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export default function GoldGradientText({ children, className = "" }: GoldGradientTextProps) {
  return (
    <span className={`text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-dark ${className}`}>
      {children}
    </span>
  );
}
