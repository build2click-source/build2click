'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export default function CardPage() {
    const [saved, setSaved] = useState(false);

    const downloadVCard = () => {
        const vcard = `BEGIN:VCARD
VERSION:3.0
N:;Build2Click;;;
FN:Build2Click
ORG:Build2Click
TITLE:Web Development | Brand Identity | Software Solutions
TEL;TYPE=WORK,VOICE:+917980313975
TEL;TYPE=CELL,VOICE:+917980313975
EMAIL;TYPE=WORK:build2click@gmail.com
URL:https://www.build2click.in
NOTE:We Build You Grow 🌱
END:VCARD`;

        const blob = new Blob([vcard], { type: 'text/vcard' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        
        a.setAttribute('href', url);
        a.setAttribute('download', 'Build2Click.vcf');
        document.body.appendChild(a);
        
        a.click();
        
        // Clean up
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        // Visual feedback
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="e-card mx-auto">
            {/* Inner Gold Border Frame */}
            <div className="absolute inset-3 border-[1px] border-gold/40 rounded-lg pointer-events-none z-10"></div>
            <div className="absolute inset-[15px] border-[0.5px] border-gold/20 rounded-lg pointer-events-none z-10"></div>

            {/* Decorative Gold Dust Background */}
            <div className="gold-dust dust-1"></div>
            <div className="gold-dust dust-2"></div>

            <div className="relative z-20 px-8 py-10 h-full flex flex-col">
                
                {/* Logo Section */}
                <div className="flex flex-col items-center justify-center mt-2 mb-4 w-full relative z-20">
                    <div className="relative w-80 h-36 mb-4 drop-shadow-xl">
                        <Image 
                            src="/logo copy.png" 
                            alt="Build2Click Logo" 
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>

                    {/* Services */}
                    <p className="font-serif text-brown text-[11.5px] leading-relaxed px-4 tracking-wide font-bold text-center">
                        Web Development <span className="text-gold mx-1">|</span> Brand Identity <span className="text-gold mx-1">|</span> Software Solutions
                    </p>
                </div>

                {/* Contact & Social Grid */}
                <div className="flex flex-col space-y-4 w-full mt-2 mb-24 relative z-20">
                    
                    {/* Phone */}
                    <a href="tel:+917980313975" className="contact-btn flex items-center p-4 border border-gold/30 rounded-xl bg-cream/70 backdrop-blur-md group shadow-sm hover:shadow-md">
                        <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold mr-4 border border-gold/20 shrink-0">
                            <i className="fas fa-phone action-icon"></i>
                        </div>
                        <div className="flex-1">
                            <p className="text-xs text-gray-500 mb-0.5">Call Us</p>
                            <p className="text-brown font-medium text-sm">+91 7980313975</p>
                        </div>
                        <i className="fas fa-chevron-right text-gold/40 text-xs"></i>
                    </a>

                    {/* WhatsApp */}
                    <a href="https://wa.me/917980313975?text=Hello%20Build2Click,%20I%20would%20like%20to%20discuss%20a%20project." target="_blank" rel="noopener noreferrer" className="contact-btn flex items-center p-4 border border-gold/30 rounded-xl bg-cream/70 backdrop-blur-md group shadow-sm hover:shadow-md">
                        <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-[#25D366] mr-4 border border-green-200 shrink-0">
                            <i className="fab fa-whatsapp action-icon text-lg"></i>
                        </div>
                        <div className="flex-1">
                            <p className="text-xs text-gray-500 mb-0.5">WhatsApp</p>
                            <p className="text-brown font-medium text-sm">Chat with us</p>
                        </div>
                        <i className="fas fa-chevron-right text-gold/40 text-xs"></i>
                    </a>

                    {/* Website */}
                    <a href="https://www.build2click.in" target="_blank" rel="noopener noreferrer" className="contact-btn flex items-center p-4 border border-gold/30 rounded-xl bg-cream/70 backdrop-blur-md group shadow-sm hover:shadow-md">
                        <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold mr-4 border border-gold/20 shrink-0">
                            <i className="fas fa-globe action-icon"></i>
                        </div>
                        <div className="flex-1">
                            <p className="text-xs text-gray-500 mb-0.5">Website</p>
                            <p className="text-brown font-medium text-sm">www.build2click.in</p>
                        </div>
                        <i className="fas fa-chevron-right text-gold/40 text-xs"></i>
                    </a>

                    {/* Email */}
                    <a href="mailto:build2click@gmail.com" className="contact-btn flex items-center p-4 border border-gold/30 rounded-xl bg-cream/70 backdrop-blur-md group shadow-sm hover:shadow-md">
                        <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold mr-4 border border-gold/20 shrink-0">
                            <i className="fas fa-envelope action-icon"></i>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-500 mb-0.5">Email</p>
                            <p className="text-brown font-medium text-sm truncate">build2click@gmail.com</p>
                        </div>
                        <i className="fas fa-chevron-right text-gold/40 text-xs"></i>
                    </a>

                    {/* Instagram */}
                    <a href="https://www.instagram.com/build2click?igsh=MW1tMTJxY2RoeXdkMg==" target="_blank" rel="noopener noreferrer" className="contact-btn flex items-center p-4 border border-gold/30 rounded-xl bg-cream/70 backdrop-blur-md group shadow-sm hover:shadow-md">
                        <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-[#E1306C] mr-4 border border-pink-200 shrink-0">
                            <i className="fab fa-instagram action-icon text-lg"></i>
                        </div>
                        <div className="flex-1">
                            <p className="text-xs text-gray-500 mb-0.5">Instagram</p>
                            <p className="text-brown font-medium text-sm">Follow us</p>
                        </div>
                        <i className="fas fa-chevron-right text-gold/40 text-xs"></i>
                    </a>

                </div>

            </div>

            {/* Floating Save to Contacts Button */}
            <div className="save-btn-container flex flex-col items-center">
                <button onClick={downloadVCard} className="gold-bg w-full py-4 rounded-xl text-white font-semibold shadow-lg shadow-gold/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2">
                    {saved ? (
                        <>
                            <i className="fas fa-check text-lg"></i>
                            <span>Saved!</span>
                        </>
                    ) : (
                        <>
                            <i className="fas fa-address-card text-lg"></i>
                            <span>Save to Contacts</span>
                        </>
                    )}
                </button>
                <div className="mt-4 flex items-center justify-center w-full pb-2">
                    <span className="font-serif italic text-gold-dark bg-gold/10 px-4 py-1.5 rounded-full text-[13px] font-bold tracking-wide border border-gold/20 shadow-sm">
                        We Build You Grow 🌱
                    </span>
                </div>
            </div>
        </div>
    );
}
