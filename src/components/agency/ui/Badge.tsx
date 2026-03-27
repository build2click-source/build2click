import React from 'react';

export const Badge = ({ text }: { text: string }) => (
    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm mb-6 animate-fade-in">
        <span className="w-2 h-2 rounded-full bg-[#C8A153] mr-2"></span>
        <span className="text-xs font-bold tracking-widest text-[#C8A153] uppercase">{text}</span>
    </div>
);
