'use client';

import { useCallback, useState, useEffect } from 'react';
import { Phone, Mail, Globe, Download, Share2, X, Copy, Check, Home, Heart, Star, Gift, User, Filter, ShoppingCart, Award, Truck, Headphones, CreditCard, Percent, MapPin } from 'lucide-react';

const CONTACTS = [
  { label: 'CALL', icon: <Phone size={20} strokeWidth={1.5} />, action: 'tel:+917980313975' },
  { label: 'EMAIL', icon: <Mail size={20} strokeWidth={1.5} />, action: 'mailto:build2click@gmail.com' },
  { label: 'WEB', icon: <Globe size={20} strokeWidth={1.5} />, action: 'https://www.build2click.in', external: true },
];

const VCARD = `BEGIN:VCARD
VERSION:3.0
FN:Build2Click
ORG:Build2Click
TITLE:Digital Solution
TEL;TYPE=CELL:+917980313975
EMAIL:build2click@gmail.com
URL:https://www.build2click.in
NOTE:Web Development | Brand Identity | Software Solutions
END:VCARD`;

const FLOATING_ICONS = [
  { left: '10%', size: 28, delay: '0s', duration: '12s', Icon: Home },
  { left: '25%', size: 24, delay: '4s', duration: '15s', Icon: Heart },
  { left: '45%', size: 30, delay: '2s', duration: '10s', Icon: Star },
  { left: '60%', size: 28, delay: '6s', duration: '18s', Icon: Gift },
  { left: '85%', size: 32, delay: '1s', duration: '14s', Icon: User },
  { left: '15%', size: 22, delay: '8s', duration: '20s', Icon: Filter },
  { left: '75%', size: 34, delay: '3s', duration: '11s', Icon: ShoppingCart },
  { left: '90%', size: 20, delay: '5s', duration: '13s', Icon: Award },
  { left: '35%', size: 30, delay: '7s', duration: '16s', Icon: Truck },
  { left: '55%', size: 28, delay: '9s', duration: '19s', Icon: Headphones },
  { left: '5%', size: 24, delay: '2.5s', duration: '17s', Icon: CreditCard },
  { left: '68%', size: 22, delay: '4.5s', duration: '14s', Icon: Percent },
  { left: '40%', size: 28, delay: '1.5s', duration: '12s', Icon: MapPin },
];

export default function CardPage() {
  const [mounted, setMounted] = useState(false);
  const [isShareModalOpen, setShareModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const cardUrl = 'https://www.build2click.in/card';

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSave = useCallback(() => {
    const blob = new Blob([VCARD], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Build2Click.vcf';
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Build2Click | Digital Business Card',
          text: 'Connect with Build2Click — Premium Digital Solutions',
          url: cardUrl,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  }, []);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(cardUrl).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  }, []);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center p-3 sm:p-6 bg-ivory overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #FCFBF8 0%, #F5F4F0 100%)' }}
    >
      <div className="w-full max-w-[380px] h-full sm:h-auto sm:max-h-[90vh] rounded-[2.5rem] relative overflow-hidden bg-white shadow-[0_25px_80px_rgba(0,0,0,0.06),0_0_40px_rgba(197,160,89,0.03)] border border-gold/10 flex flex-col"
        style={{ transition: 'transform 0.3s ease-out' }}>

        {/* 3D Floating Symbols INSIDE Card */}
        {mounted && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {FLOATING_ICONS.map(({ Icon, ...s }, idx) => (
              <div
                key={idx}
                className="absolute flex items-center justify-center text-gold-dark/40 animate-float-rise"
                style={{
                  left: s.left,
                  bottom: '-10%',
                  width: s.size + 'px',
                  height: s.size + 'px',
                  animationDelay: s.delay,
                  animationDuration: s.duration,
                }}
              >
                <Icon size={s.size} strokeWidth={1.5} />
              </div>
            ))}
          </div>
        )}

        {/* Internal Glows for depth */}
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-gold/5 blur-[40px] rounded-full"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-gold/5 blur-[40px] rounded-full"></div>

        {/* Share Button (Top Right) */}
        <button onClick={() => setShareModalOpen(true)} aria-label="Share"
          className="absolute top-6 right-6 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 bg-[#FAFAF7] border border-gold/20 text-gold hover:bg-gold hover:text-white z-20 shadow-sm"
        >
          <Share2 size={16} strokeWidth={2} />
        </button>

        <div className="flex flex-col items-center px-6 pt-10 pb-6 text-center relative z-10 flex-grow justify-evenly">

          {/* Logo + Title grouped together */}
          <div className="flex flex-col items-center gap-2">
            <div className="relative animate-logo-zoom origin-center">
              <div className="w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] flex items-center justify-center bg-transparent">
                <img src="/logo.png" alt="Build2Click" className="w-[90%] h-[90%] object-contain scale-110" />
              </div>
            </div>

            {/* Title and Branding */}
            <div className="space-y-3 group cursor-default">
            <h1 className="text-2xl sm:text-3xl font-black tracking-[0.1em] uppercase 
                           text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-dark drop-shadow-sm select-none transition-transform duration-500 group-hover:scale-105">
              BUILD2CLICK
            </h1>
            <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-gold-dark/70 whitespace-nowrap pt-1 transition-all duration-500 group-hover:text-gold group-hover:-translate-y-1 group-hover:tracking-[0.25em] relative">
              WEBSITE <span className="opacity-30 mx-1">|</span> BRAND IDENTITY <span className="opacity-30 mx-1">|</span> SOFTWARE SOLUTION
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none"></span>
            </p>
            </div>
          </div>

          {/* Description - strictly two rows with air */}
          <div className="py-2 w-full">
            <p className="text-[11px] sm:text-[12px] font-serif italic font-medium leading-[1.6] text-charcoal/50 w-full border-y border-gold/5 py-3 px-2">
              Pioneering the next generation of intuitive digital<br />experiences and seamless web architecture.
            </p>
          </div>

          <div className="w-full space-y-5">
            {/* Contacts Grid */}
            <div className="grid grid-cols-4 gap-3 w-full">
              {CONTACTS.map((c) => (
                <a key={c.label} href={c.action} target={c.external ? '_blank' : undefined}
                  className="flex flex-col items-center gap-1.5 group transition-all duration-300 transform hover:-translate-y-1.5">
                  <div className="w-full aspect-square rounded-[1.2rem] flex items-center justify-center text-gold bg-[#FAFAF7] border border-gold/15 transition-all duration-300 group-hover:bg-gold group-hover:text-white group-hover:border-gold group-hover:shadow-[0_10px_20px_rgba(197,160,89,0.25)]">
                    {c.icon}
                  </div>
                  <span className="text-[8px] font-black tracking-widest text-muted uppercase group-hover:text-gold-dark transition-colors">
                    {c.label}
                  </span>
                </a>
              ))}
              <button onClick={handleSave} className="flex flex-col items-center gap-1.5 group transition-all duration-300 transform hover:-translate-y-1.5 w-full">
                <div className="w-full aspect-square rounded-[1.2rem] flex items-center justify-center text-gold bg-[#FAFAF7] border border-gold/15 transition-all duration-300 group-hover:bg-gold group-hover:text-white group-hover:border-gold group-hover:shadow-[0_10px_20px_rgba(197,160,89,0.25)]">
                  <Download size={20} strokeWidth={1.5} />
                </div>
                <span className="text-[8px] font-black tracking-widest text-muted uppercase group-hover:text-gold-dark transition-colors">
                  SAVE
                </span>
              </button>
            </div>

            <div className="w-full flex-col flex items-center gap-4">
              <div className="w-[80%] h-[1px] bg-gradient-to-r from-transparent via-gold/10 to-transparent"></div>

              {/* Social Links Row */}
              <div className="flex justify-center gap-5">
                {[
                  { label: 'WhatsApp', href: 'https://wa.me/917980313975', svg: '<path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"></path><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"></path>' },
                  { label: 'Instagram', href: 'https://www.instagram.com/build2click', svg: '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>' },
                  { label: 'LinkedIn', href: '#', svg: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>' }
                ].map((social) => (
                  <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label}
                    className="w-9 h-9 rounded-full border border-gold/30 flex items-center justify-center text-muted hover:text-white hover:bg-gold transition-all duration-300 transform hover:-translate-y-1 bg-[#FAFAF7] shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: social.svg }} />
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Share Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-charcoal/20 backdrop-blur-sm animate-fade-in" onClick={() => setShareModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-[340px] rounded-[2rem] p-8 shadow-2xl animate-logo-zoom flex flex-col items-center">
            <button onClick={() => setShareModalOpen(false)} className="absolute top-5 right-5 text-muted hover:text-charcoal"><X size={20} /></button>
            <h2 className="text-lg font-black text-charcoal mb-6 tracking-widest uppercase">SHARE PROFILE</h2>
            <div className="w-[160px] h-[160px] bg-white border border-gold/10 p-2 rounded-[1.5rem] mb-6 flex items-center justify-center">
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(cardUrl)}&color=8D6220&bgcolor=FFFFFF`} alt="QR Code" className="w-full h-full object-contain" />
            </div>
            <div className="w-full space-y-3">
              <button onClick={copyToClipboard} className="w-full py-3.5 rounded-xl border border-gold/20 flex items-center justify-center gap-2 font-bold text-xs tracking-wide transition-all hover:bg-gold/5">
                {isCopied ? <><Check size={16} className="text-green-600" /><span className="text-green-600 uppercase">Copied!</span></> : <><Copy size={16} className="text-gold" /><span className="text-charcoal/80">COPY LINK</span></>}
              </button>
              {typeof navigator !== 'undefined' && (navigator as any).share && (
                <button onClick={handleShare} className="w-full py-3.5 rounded-xl bg-gold text-white flex items-center justify-center gap-2 font-black text-xs tracking-widest uppercase shadow-md active:scale-95">
                  <Share2 size={16} /> SEND VIA APPS
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Copyright info */}
      <p className="mt-4 text-[9px] font-bold text-gold/40 tracking-widest uppercase text-center">
        &copy; 2026 BUILD2CLICK &middot; Digital Solution
      </p>
    </div>
  );
}
