'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, Sun, MousePointer2 } from 'lucide-react';
import { NAV_ITEMS } from '@/lib/constants';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className="fixed top-4 md:top-6 left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex justify-center px-4 md:px-6 pointer-events-none"
    >
      <nav
        className="relative flex items-center justify-between mx-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] w-full max-w-6xl bg-white/95 backdrop-blur-xl border border-gold/20 shadow-[0_8px_30px_rgba(197,160,89,0.12)] py-2.5 px-4 sm:px-6 rounded-[2.5rem] pointer-events-auto"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group cursor-pointer transition-opacity duration-300 hover:opacity-100"
        >
          {/* Logo Image */}
          <img
            src="/logo.png"
            alt="Build2Click Logo"
            className="h-14 w-auto object-contain animate-logo-zoom"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1.5 p-[3px] rounded-[2rem] bg-[#FAFAF7] border border-gold/10">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-4 py-[6px] text-[13px] tracking-wide font-bold transition-all duration-300 rounded-[1.5rem] ${isActive ? 'text-charcoal bg-white shadow-sm border border-gold/10' : 'text-muted hover:text-charcoal hover:bg-white/50'
                  }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/contact"
            className="bg-transparent border border-gold/40 text-charcoal text-[13px] font-bold tracking-wide px-5 py-[8px] rounded-full hover:bg-gold hover:border-gold hover:text-white hover:shadow-[0_4px_15px_rgba(197,160,89,0.3)] transition-all duration-300 flex items-center gap-2 group"
          >
            Start Project <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-charcoal hover:text-gold-dark rounded-full hover:bg-gold/10 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div
        className={`absolute top-[calc(100%+1rem)] left-4 right-4 bg-white/95 backdrop-blur-2xl border border-gold/20 rounded-[2rem] p-6 shadow-2xl transition-all duration-500 origin-top md:hidden pointer-events-auto ${mobileMenuOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
          }`}
      >
        <div className="flex flex-col space-y-3">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`block w-full text-left px-5 py-4 text-base font-bold rounded-2xl transition-colors ${isActive
                    ? 'text-gold-dark bg-gold/10'
                    : 'text-charcoal hover:text-gold-dark hover:bg-gold/5'
                  }`}
              >
                {item.name}
              </Link>
            );
          })}
          <div className="h-px w-full bg-gold/20 my-4" />
          <Link
            href="/contact"
            className="block w-full text-center py-4 mt-2 rounded-2xl bg-transparent border border-gold/40 text-charcoal text-base font-bold hover:bg-gold hover:border-gold hover:text-white transition-all duration-300"
          >
            Start Project
          </Link>
        </div>
      </div>
    </header>
  );
}
