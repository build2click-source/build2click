'use client';

import React, { useState, useEffect } from 'react';

export default function InduPage() {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const toggleShareModal = () => setIsShareModalOpen(!isShareModalOpen);

  const getShareLink = () => {
    if (typeof window !== 'undefined') {
      return window.location.origin + "/induicecream";
    }
    return "";
  };

  const shareViaWhatsApp = () => {
    const link = getShareLink();
    const text = encodeURIComponent(`Check out Indu Ice Cream's E-Card! 🍨✨\n${link}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const nativeShare = async () => {
    const link = getShareLink();
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Indu Ice Cream',
          text: "Check out Indu Ice Cream's E-Card! 🍨✨",
          url: link,
        });
      } catch (err) {
        console.log('Share canceled or failed', err);
      }
    }
  };

  const copyLink = () => {
    const linkToCopy = getShareLink();
    navigator.clipboard.writeText(linkToCopy).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  return (
    <>
      <style jsx global>{`
        .texture-bg {
            background-color: #FDFBF7;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
        }

        .glass-card {
            background: rgba(253, 251, 247, 0.7);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.6);
        }

        .hide-scrollbar::-webkit-scrollbar {
            display: none;
        }

        .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }

        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes blobFloat {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(252, 128, 25, 0.4); }
            70% { box-shadow: 0 0 0 10px rgba(252, 128, 25, 0); }
            100% { box-shadow: 0 0 0 0 rgba(252, 128, 25, 0); }
        }

        .animate-fade-in-up {
            animation: fadeInUp 0.8s ease-out forwards;
        }

        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.3s; }
        .delay-4 { animation-delay: 0.4s; }
        .delay-5 { animation-delay: 0.5s; }

        .blob-animate {
            animation: blobFloat 20s infinite ease-in-out;
        }

        .cta-pulse {
            animation: pulse 2s infinite;
        }
      `}</style>

      {/* Mobile Container (E-Card Wrapper) */}
      <main className="w-full h-[100dvh] max-w-[430px] texture-bg sm:rounded-[2.5rem] sm:shadow-2xl relative sm:h-auto sm:max-h-[850px] sm:aspect-[9/19] sm:border-[8px] border-white flex flex-col overflow-hidden mx-auto shadow-xl">
        
        {/* Top Action Buttons */}
        <div className="absolute top-4 left-4 right-4 z-50 flex justify-between items-center pointer-events-none">
          {/* Build2Click Logo (Top Left) */}
          <a href="/card" title="Made by Build2Click"
            className="pointer-events-auto w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-md shadow-lg hover:scale-110 active:scale-95 transition-all rounded-md border border-white overflow-hidden group">
            <img src="/logo_b2c.png" alt="Build2Click Logo"
              className="w-full h-full object-contain group-hover:rotate-6 transition-transform" />
          </a>

          {/* Share Button (Top Right) */}
          <button onClick={toggleShareModal}
            className="pointer-events-auto w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-md rounded-md border border-white shadow-lg hover:scale-110 active:scale-95 transition-all text-[#937341]">
            <i className="ph-bold ph-share-network text-lg"></i>
          </button>
        </div>

        {/* Decorative Background Blobs */}
        <div className="absolute top-[-5%] left-[-15%] w-72 h-72 bg-[#94A684] rounded-full mix-blend-multiply filter blur-3xl opacity-40 blob-animate"></div>
        <div className="absolute top-[25%] right-[-15%] w-64 h-64 bg-[#F3D2C3] rounded-full mix-blend-multiply filter blur-3xl opacity-40 blob-animate" style={{ animationDelay: '-5s' }}></div>
        <div className="absolute bottom-[-10%] left-[10%] w-80 h-80 bg-[#94A684] rounded-full mix-blend-multiply filter blur-3xl opacity-30 blob-animate" style={{ animationDelay: '-10s' }}></div>

        {/* Main Scrollable Content Area */}
        <div className="flex-1 flex flex-col justify-evenly w-full relative z-10 overflow-y-auto hide-scrollbar pt-16 pb-14 px-5">
          
          {/* Header / Profile Section */}
          <header className="flex flex-col items-center text-center shrink-0 opacity-0 animate-fade-in-up delay-1">
            <div className="w-[96px] h-[96px] rounded-full border-[3px] border-[#94A684] shadow-xl bg-[#FDFBF7] overflow-hidden flex items-center justify-center relative mb-4 hover:rotate-3 transition-transform">
              <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="46" stroke="#94A684" strokeWidth="2" strokeDasharray="4 4" />
                <circle cx="50" cy="50" r="40" fill="#FDFBF7" />
                <path d="M30 60 C30 75, 40 80, 50 80 C60 80, 70 75, 70 60 Z" fill="#94A684" />
                <path d="M28 60 C28 55, 72 55, 72 60" stroke="#94A684" strokeWidth="3" strokeLinecap="round" />
                <circle cx="42" cy="48" r="12" fill="#F3D2C3" />
                <circle cx="58" cy="48" r="12" fill="#D2E3C6" />
                <circle cx="50" cy="40" r="14" fill="#FDFBF7" stroke="#94A684" strokeWidth="2" />
                <path d="M44 40 Q50 48 56 40" stroke="#94A684" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M25 35 L28 40 L25 45 L22 40 Z" fill="#7A8C6A" />
                <path d="M75 25 L77 30 L75 35 L73 30 Z" fill="#F3D2C3" />
                <text x="50" y="73" fontFamily="'Playfair Display', serif" fontSize="14" fontWeight="bold" fill="#FDFBF7" textAnchor="middle">INDU</text>
              </svg>
            </div>
            <h1 className="font-[family-name:var(--font-playfair)] text-[26px] leading-tight font-bold tracking-tight mb-1 text-[#7A8C6A]">Indu Ice Cream</h1>
            <p className="text-[10px] font-bold text-[#4A342E]/70 mb-3 tracking-widest uppercase">By Saloni Kukreja</p>
            <p className="text-[14px] leading-relaxed max-w-[280px] text-[#4A342E]/80">
              Small batch ice creams & sorbets inspired by Indian roots and nostalgia. 🍨✨
            </p>
          </header>

          {/* Links Section */}
          <section className="flex flex-col gap-3 w-full max-w-[320px] mx-auto shrink-0 mt-4 opacity-0 animate-fade-in-up delay-2">
            <a href="https://www.swiggy.com/city/mumbai/indu-ice-cream-5aa-pali-hill-bandra-w--rest703629"
              target="_blank" rel="noopener noreferrer"
              className="group relative w-full flex items-center justify-center gap-2.5 bg-[#FC8019] text-white py-3.5 px-6 rounded-2xl font-semibold text-[14px] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-[0.98] cta-pulse">
              <i className="ph-fill ph-plus-circle text-lg"></i>
              Order on Swiggy
            </a>

            <a href="https://www.zomato.com/mumbai/indu-ice-cream-pali-hill-bandra-west" target="_blank" rel="noopener noreferrer"
              className="group relative w-full flex items-center justify-center gap-2.5 bg-[#E23744] text-white py-3.5 px-6 rounded-2xl font-semibold text-[14px] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-[0.98]">
              <i className="ph-fill ph-tag text-lg"></i>
              Order on Zomato
            </a>

            <a href="https://www.instagram.com/induicecream/" target="_blank" rel="noopener noreferrer"
              className="group relative w-full flex items-center justify-center gap-2.5 bg-[#94A684] text-white py-3.5 px-6 rounded-2xl font-semibold text-[14px] shadow-md hover:shadow-lg hover:-translate-y-0.5 hover:bg-[#7A8C6A] transition-all active:scale-[0.98]">
              <i className="ph-fill ph-instagram-logo text-lg"></i>
              Follow on Instagram
            </a>

            <a href="https://www.google.com/maps?q=Shop+No.2,+Indu+Ice+cream,+New+Silver+Sands+CHS,+Pali+Rd,+Bandra+West,+Mumbai,+Maharashtra+400050"
              target="_blank" rel="noopener noreferrer"
              className="group relative w-full flex items-center justify-center gap-2.5 bg-white/80 backdrop-blur-sm border border-white text-[#4A342E] py-3.5 px-6 rounded-2xl font-semibold text-[14px] shadow-md hover:bg-white hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-[0.98]">
              <i className="ph-fill ph-map-pin text-lg text-[#7A8C6A]"></i>
              Visit Pali Hill Shop
            </a>
          </section>

          {/* Highlights / Bestsellers */}
          <section className="w-full max-w-[320px] mx-auto shrink-0 mt-6 opacity-0 animate-fade-in-up delay-3">
            <h2 className="font-[family-name:var(--font-playfair)] text-[20px] font-bold mb-4 text-center">Our Classics</h2>
            <div className="grid grid-cols-3 gap-3">
              {[
                { name: 'Filter Kaapi', desc: 'with hazelnut', icon: 'ph-coffee', bg: 'bg-[#94A684]/20', iconColor: 'text-[#7A8C6A]' },
                { name: 'Kokum Sorbet', desc: 'tangy summer', icon: 'ph-flower-tulip', bg: 'bg-[#F3D2C3]/40', iconColor: 'text-[#D9B8A9]' },
                { name: 'Pista Baklava', desc: 'rose water', icon: 'ph-plant', bg: 'bg-[#94A684]/20', iconColor: 'text-[#7A8C6A]' }
              ].map((item, i) => (
                <div key={i} className="glass-card p-3 rounded-[1.25rem] flex flex-col items-center text-center shadow-sm hover:shadow-md hover:bg-white/80 transition-all group">
                  <div className={`w-10 h-10 ${item.bg} rounded-full mb-2 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <i className={`ph-fill ${item.icon} text-xl ${item.iconColor}`}></i>
                  </div>
                  <h3 className="font-bold text-[11px] leading-tight mb-1">{item.name}</h3>
                  <p className="text-[9px] text-[#4A342E]/60 leading-tight">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Fixed Footer */}
        <footer className="absolute bottom-0 left-0 right-0 py-4 text-center z-20 bg-white/60 backdrop-blur-lg border-t border-white/40 opacity-0 animate-fade-in-up delay-4">
          <p className="text-[11px] font-bold tracking-[0.15em] text-[#4A342E]/60 flex items-center justify-center gap-2 uppercase">
            <i className="ph-fill ph-heart text-[#D9B8A9] text-sm animate-pulse"></i> Crafted by <a href="/" className="hover:text-[#4A342E] transition-colors">Build2Click.in</a>
          </p>
        </footer>

        {/* Share Modal */}
        <div className={`fixed inset-0 z-[60] bg-[#FDFBF7]/80 backdrop-blur-sm transition-opacity duration-300 flex items-center justify-center p-4 ${isShareModalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className={`bg-white w-full max-w-[340px] rounded-[2rem] shadow-2xl p-6 relative transition-transform duration-300 border border-[#4A342E]/10 ${isShareModalOpen ? 'scale-100' : 'scale-95'}`}>
            <button onClick={toggleShareModal} className="absolute top-5 right-5 text-[#4A342E]/50 hover:text-[#4A342E] transition-colors">
              <i className="ph-bold ph-x text-2xl"></i>
            </button>
            <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold mb-5 text-center">Share E-Card</h3>
            <div className="w-40 h-40 mx-auto bg-white rounded-2xl shadow-sm border border-[#4A342E]/10 p-3 mb-6">
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(getShareLink())}&color=4A342E&bgcolor=FFFFFF`}
                alt="Scan to Share" className="w-full h-full rounded-xl" />
            </div>
            <div className="flex flex-col gap-3">
              <button onClick={shareViaWhatsApp}
                className="w-full bg-[#25D366] text-white py-3 rounded-xl font-semibold text-[14px] hover:bg-[#128C7E] transition-colors flex items-center justify-center gap-2 shadow-sm">
                <i className="ph-fill ph-whatsapp-logo text-xl"></i> Share on WhatsApp
              </button>
              <div className="flex gap-2.5">
                <button onClick={nativeShare}
                  className="flex-1 bg-white border border-[#4A342E]/10 text-[#4A342E] py-3 rounded-xl font-semibold text-[14px] hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 shadow-sm">
                  <i className="ph-bold ph-export text-xl"></i> Share
                </button>
                <button onClick={copyLink}
                  className={`flex-1 ${copySuccess ? 'bg-[#7A8C6A]' : 'bg-[#94A684]'} text-white py-3 rounded-xl font-semibold text-[14px] hover:bg-[#7A8C6A] transition-colors flex items-center justify-center gap-2 shadow-sm`}>
                  <i className={`ph-bold ${copySuccess ? 'ph-check' : 'ph-link'} text-xl`}></i> {copySuccess ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
