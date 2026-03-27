"use client";
import React from 'react';
import { WhatsApp } from './Icons';

export const FloatingWhatsApp = () => {
    return (
        <a 
            href="https://wa.me/917980313975" 
            target="_blank" 
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-green-500/30 shadow-2xl hover:scale-110 hover:shadow-green-500/50 transition-all duration-300 flex items-center justify-center cursor-pointer group"
            aria-label="Chat on WhatsApp"
        >
            <WhatsApp size={28} />
            <span className="absolute right-full mr-4 bg-white text-gray-800 text-xs font-bold px-3 py-2 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none mb-1">
                Chat with us!
            </span>
        </a>
    );
};
