"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Zap } from 'lucide-react';
import { Instagram, Linkedin, Twitter, WhatsApp } from './ui/Icons';

export const Footer = () => {
    const pathname = usePathname();

    if (pathname === '/card') return null;

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/services', label: 'Services' },
        { href: '/about', label: 'About Us' },
        { href: '/contact', label: 'Contact' },
    ];

    return (
        <footer className="bg-[#1C1C1C] py-8 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-5 lg:px-8 flex flex-col sm:flex-row gap-8">
                {/* Left: Brand */}
                <div className="flex-1">
                    <Link href="/" className="flex items-center gap-3 mb-3 cursor-pointer group w-fit">
                        <img src="/logo.png" alt="Build2Click Logo" className="h-9 w-auto object-contain brightness-110 transition-transform duration-500 group-hover:scale-105" />
                        <span className="font-black uppercase text-lg tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFFACD] to-[#C8A153] drop-shadow-[0_0_15px_rgba(200,161,83,0.5)] transition-all duration-500 group-hover:drop-shadow-[0_0_20px_rgba(229,193,88,0.8)]">
                            BUILD2CLICK
                        </span>
                    </Link>
                    <p className="text-gray-400 max-w-md text-sm leading-relaxed">
                        Elite digital engineering for ambitious brands. We design, we develop, we convert. Partner with us to build the future of your digital presence.
                    </p>
                </div>

                {/* Right: Navigation + Follow Us stacked */}
                <div className="flex flex-col gap-6 sm:items-start">
                    <div>
                        <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-3 text-[#C8A153]">Navigation</h4>
                        <ul className="space-y-1.5">
                            {navLinks.map(link => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-gray-400 hover:text-[#C8A153] transition-colors text-sm font-medium">{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-3 text-[#C8A153]">Follow Us</h4>
                        <div className="flex space-x-3">
                            {[
                                { Icon: Instagram, href: "https://www.instagram.com/build2click?igsh=MW1tMTJxY2RoeXdkMg==" },
                                { Icon: Linkedin, href: "#" },
                                { Icon: Twitter, href: "#" },
                                { Icon: WhatsApp, href: "https://wa.me/917980313975" }
                            ].map(({ Icon, href }, i) => (
                                <a key={i} href={href} target={href !== "#" ? "_blank" : undefined} rel={href !== "#" ? "noopener noreferrer" : undefined} className="shrink-0 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#C8A153] hover:text-white hover:border-[#C8A153] transition-all duration-300">
                                    <Icon size={15} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-6 pt-5 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] tracking-widest text-gray-500 font-bold uppercase">
                <p>© 2026 BUILD2CLICK. ALL RIGHTS RESERVED.</p>
                <div className="flex space-x-6 mt-3 md:mt-0">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};
