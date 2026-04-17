import Link from 'next/link';
import { NAV_ITEMS } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="mt-auto py-12 px-6 bg-white border-t-2 border-gold/30 shadow-[0_-10px_30px_rgba(0,0,0,0.02)] relative z-10">
      <div className="max-w-[90rem] mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-12">
        
        {/* Left: Logo Block */}
        <div className="flex-shrink-0 lg:max-w-xs flex flex-col items-center lg:items-start text-center lg:text-left">
          <Link href="/" className="flex items-center gap-3 group cursor-pointer mb-4">
            <img
              src="/logo.png"
              alt="Build2Click Logo"
              className="h-16 w-auto object-contain animate-logo-zoom"
            />
            <div className="flex flex-col text-left">
              <span className="font-black tracking-widest uppercase text-[16px] leading-tight text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-dark drop-shadow-sm">
                BUILD2CLICK
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] font-black text-muted leading-tight mt-0.5">
                Digital Solution
              </span>
            </div>
          </Link>
          <p className="font-serif italic text-charcoal/80 text-[14px] leading-relaxed tracking-wide px-4 lg:px-0 mt-3 hover:text-gold-dark transition-colors duration-300">
            We build premium digital experiences that turn clicks into measurable growth.
          </p>
        </div>

        {/* Expanded Feature Space: Core Services */}
        <div className="hidden lg:flex flex-col flex-grow justify-center items-center px-4 xl:px-12">
           <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gold-dark drop-shadow-sm mb-4">Our Expertise</span>
           <div className="flex flex-col items-center gap-y-3 text-[10px] font-black text-charcoal/80 uppercase tracking-[0.25em] transition-all duration-500 cursor-default">
              
              {/* Row 1 */}
              <div className="flex justify-center items-center">
                 <span className="hover:text-gold-dark hover:-translate-y-0.5 transition-all drop-shadow-sm">Web Architecture</span>
                 <span className="text-gold mx-4 text-[13px] opacity-60">✦</span>
                 <span className="hover:text-gold-dark hover:-translate-y-0.5 transition-all drop-shadow-sm">Mobile Platforms</span>
                 <span className="text-gold mx-4 text-[13px] opacity-60">✦</span>
                 <span className="hover:text-gold-dark hover:-translate-y-0.5 transition-all drop-shadow-sm">Brand Identity</span>
              </div>
              
              {/* Row 2 */}
              <div className="flex justify-center items-center">
                 <span className="hover:text-gold-dark hover:-translate-y-0.5 transition-all drop-shadow-sm">Maintenance</span>
                 <span className="text-gold mx-4 text-[13px] opacity-60">✦</span>
                 <span className="hover:text-gold-dark hover:-translate-y-0.5 transition-all drop-shadow-sm">Custom Software</span>
                 <span className="text-gold mx-4 text-[13px] opacity-60">✦</span>
                 <span className="hover:text-gold-dark hover:-translate-y-0.5 transition-all drop-shadow-sm">Cloud Hosting</span>
              </div>
              
              {/* Row 3 */}
              <div className="flex justify-center items-center">
                 <span className="hover:text-gold-dark hover:-translate-y-0.5 transition-all drop-shadow-sm">Enterprise Systems</span>
                 <span className="text-gold mx-4 text-[13px] opacity-60">✦</span>
                 <span className="hover:text-gold-dark hover:-translate-y-0.5 transition-all drop-shadow-sm">E-Card</span>
                 <span className="text-gold mx-4 text-[13px] opacity-60">✦</span>
                 <span className="hover:text-gold-dark hover:-translate-y-0.5 transition-all drop-shadow-sm">Catalogue Design</span>
              </div>
              
           </div>
        </div>

        {/* Right: Social & Legal Block */}
        <div className="flex flex-col items-center lg:items-start gap-4 flex-shrink-0">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gold-dark drop-shadow-sm">Follow Us</span>
          
          <div className="flex items-center gap-3">
            <a 
              href="https://www.instagram.com/build2click?igsh=MW1tMTJxY2RoeXdkMg==" 
              target="_blank" 
              rel="noreferrer"
              aria-label="Instagram" 
              className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center text-muted hover:text-white hover:border-gold hover:bg-gold transition-all duration-300 transform hover:-translate-y-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a 
              href="#" 
              target="_blank" 
              rel="noreferrer"
              aria-label="LinkedIn" 
              className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center text-muted hover:text-white hover:border-gold hover:bg-gold transition-all duration-300 transform hover:-translate-y-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a 
              href="#" 
              target="_blank" 
              rel="noreferrer"
              aria-label="Twitter" 
              className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center text-muted hover:text-white hover:border-gold hover:bg-gold transition-all duration-300 transform hover:-translate-y-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
            </a>
            <a 
              href="https://wa.me/917980313975?text=Hello%20Build2Click,%20I%20would%20like%20to%20discuss%20a%20project." 
              target="_blank" 
              rel="noreferrer"
              aria-label="WhatsApp" 
              className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center text-muted hover:text-white hover:border-gold hover:bg-gold transition-all duration-300 transform hover:-translate-y-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"></path><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"></path></svg>
            </a>
            <a 
              href="https://www.build2click.in/card" 
              target="_blank" 
              rel="noreferrer"
              aria-label="eCard" 
              className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center text-muted hover:text-white hover:border-gold hover:bg-gold transition-all duration-300 transform hover:-translate-y-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><circle cx="9" cy="12" r="3"></circle><path d="M15 11h4"></path><path d="M15 15h4"></path></svg>
            </a>
          </div>

          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-2 mt-4">
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-x-2 gap-y-2 text-[11px] font-bold text-charcoal uppercase tracking-wider">
               <Link href="#" className="hover:text-gold-dark transition-colors">Privacy Notice</Link>
               <span className="text-gold/40 px-1">|</span>
               <Link href="#" className="hover:text-gold-dark transition-colors">Cookie Policy</Link>
               <span className="text-gold/40 px-1">|</span>
               <Link href="#" className="hover:text-gold-dark transition-colors">Terms of Service</Link>
            </div>
            <p className="text-muted text-[11px] font-black tracking-wide uppercase">© 2026 BUILD2CLICK. ALL RIGHTS RESERVED.</p>
          </div>
        </div>

      </div>
    </footer>
  );
}
