'use client';

import { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface ServiceFlipCardProps {
  title: string;
  desc: string;
  img: string;
}

export default function ServiceFlipCard({ title, desc, img }: ServiceFlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="group relative h-[250px] md:h-[260px] w-full [perspective:1500px] cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`relative w-full h-full transition-all duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] [transform-style:preserve-3d] shadow-[0_8px_20px_rgba(0,0,0,0.06)] rounded-2xl ${isFlipped ? '[transform:rotateY(180deg)]' : 'group-hover:[transform:rotateY(180deg)]'}`}>

        {/* FRONT SIDE */}
        <div className="absolute inset-0 [backface-visibility:hidden] rounded-2xl overflow-hidden bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img} alt={title} className={`w-full h-full object-cover transition-transform duration-1000 ease-out ${isFlipped ? 'scale-105' : 'group-hover:scale-105'}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/95 via-[#111111]/30 to-transparent"></div>
          <div className="absolute bottom-5 left-5 right-5 z-20 flex flex-col justify-end">
            <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-wide mb-2 drop-shadow-md">{title}</h3>
            <div className="w-6 h-1 bg-gold rounded-full mb-2.5"></div>
            <p className="text-gold-light text-[9px] font-bold uppercase tracking-widest flex items-center gap-1.5 opacity-90">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"></span> Tap to flip
            </p>
          </div>
        </div>

        {/* BACK SIDE */}
        <div className="absolute inset-0 h-full w-full rounded-2xl bg-[#FAF7F0] [transform:rotateY(180deg)] [backface-visibility:hidden] p-6 flex flex-col justify-center items-center text-center shadow-2xl border border-gold/20">
          <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center text-gold-dark mb-4">
            <Sparkles size={18} />
          </div>
          <h3 className="text-lg font-black text-charcoal mb-3 uppercase tracking-wide">{title}</h3>
          <p className="text-charcoal/70 text-xs md:text-sm leading-relaxed font-medium mb-4 flex-grow flex items-center">{desc}</p>
          <p className="text-gold-dark text-[9px] font-bold uppercase tracking-widest mt-auto">
            Tap to flip back
          </p>
        </div>

      </div>
    </div>
  );
}
