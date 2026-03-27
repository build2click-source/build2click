"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();

    if (pathname === '/card') return null;

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // close mobile menu on route change
    useEffect(() => { setMobileOpen(false); }, [pathname]);

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/services', label: 'Services' },
        { href: '/about', label: 'About Us' },
        { href: '/contact', label: 'Contact' },
    ];

    const isDarkNavBg = scrolled || mobileOpen || pathname === '/';
    const textColor = isDarkNavBg ? 'text-white' : 'text-[#1C1C1C]';

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled || mobileOpen ? 'bg-[#1C1C1C] shadow-[0_2px_20px_rgba(0,0,0,0.3)] py-3' : 'bg-transparent py-5'}`}>
            <div className="max-w-7xl mx-auto px-5 lg:px-8 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-4 cursor-pointer group mb-1">
                    <img src="/logo.png" alt="Build2Click Logo" className="h-[3.5rem] lg:h-[4.5rem] w-auto object-contain transition-transform duration-500 group-hover:scale-105" />
                    <span className={`font-black uppercase text-lg lg:text-xl tracking-widest text-transparent bg-clip-text transition-all duration-500 ${

                        isDarkNavBg 
                            ? 'bg-gradient-to-r from-[#D4AF37] via-[#FFFACD] to-[#C8A153] drop-shadow-[0_0_15px_rgba(200,161,83,0.5)]' 
                            : 'bg-gradient-to-r from-[#B8860B] via-[#a67c00] to-[#8C6D23] drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]'
                    }`}>
                        BUILD2CLICK
                    </span>
                </Link>




                {/* Desktop nav links */}
                <div className="hidden md:flex items-center space-x-10">
                    {navLinks.map(link => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 relative group/link ${isActive ? 'text-[#C8A153]' : `${textColor} hover:text-[#C8A153]`}`}
                            >
                                {link.label}
                                <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#C8A153] transition-all duration-300 group-hover/link:w-full ${isActive ? 'w-full' : 'w-0'}`}></span>
                            </Link>
                        );
                    })}
                </div>

                {/* Hamburger button (mobile only) */}
                <button
                    className={`md:hidden p-2 rounded-lg focus:outline-none ${textColor}`}
                    onClick={() => setMobileOpen(prev => !prev)}
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>


            {/* Mobile dropdown menu */}
            {mobileOpen && (
                <div className="md:hidden bg-[#1C1C1C] border-t border-white/10 px-5 py-6 flex flex-col space-y-5">
                    {navLinks.map(link => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-sm font-black uppercase tracking-[0.2em] transition-colors ${isActive ? 'text-[#C8A153]' : 'text-white hover:text-[#C8A153]'}`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </div>

            )}
        </nav>
    );
};
