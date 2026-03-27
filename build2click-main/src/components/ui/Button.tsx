"use client";
import React from 'react';

export const Button = ({ children, variant = 'primary', className = '', onClick, icon, disabled }: { children: React.ReactNode, variant?: 'primary' | 'secondary' | 'outline', className?: string, onClick?: (e: any) => void, icon?: React.ReactNode, disabled?: boolean }) => {
    const baseStyle = "inline-flex items-center justify-center font-bold px-6 py-3 rounded-full transition-all duration-300 disabled:opacity-50";
    const variants = {
        primary: "bg-[#C8A153] text-white hover:bg-[#b08c46] hover:shadow-lg hover:-translate-y-0.5",
        secondary: "bg-[#1C1C1C] text-white hover:bg-[#333] hover:shadow-lg hover:-translate-y-0.5",
        outline: "border-2 border-[#C8A153] text-[#C8A153] hover:bg-[#C8A153] hover:text-white"
    };

    return (
        <button onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${className}`}>
            {children}
            {icon && <span className="ml-2">{icon}</span>}
        </button>
    );
};
