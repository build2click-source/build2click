'use client';

import { useState } from 'react';
import { Code, Smartphone, Palette, TrendingUp, CheckCircle2 } from 'lucide-react';
import { CAPABILITIES } from '@/lib/constants';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

const iconMap = {
  Code: <Code strokeWidth={1.5} size={20} />,
  Smartphone: <Smartphone strokeWidth={1.5} size={20} />,
  Palette: <Palette strokeWidth={1.5} size={20} />,
  TrendingUp: <TrendingUp strokeWidth={1.5} size={20} />,
};

export default function CapabilitiesSection() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <div className="max-w-6xl mx-auto px-6 mb-16">
      <AnimateOnScroll animation="fade-up">
        <div className="text-left mb-10">
          <h3 className="text-3xl md:text-4xl lg:text-[2.5rem] font-[family-name:var(--font-montserrat)] font-black text-transparent bg-clip-text bg-gradient-to-r from-charcoal to-gold drop-shadow-sm leading-tight tracking-tighter">
            Engineering Luxury Digital Solutions.
          </h3>
        </div>
      </AnimateOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {CAPABILITIES.map((service, i) => (
          <AnimateOnScroll key={i} delay={i * 150} duration={800} className="h-full">
            <div
              onClick={() => setActiveCard(activeCard === i ? null : i)}
              className={`relative bg-white rounded-[1.5rem] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-500 group flex flex-col h-full overflow-hidden cursor-pointer ${activeCard === i ? 'border-gold shadow-[0_20px_50px_rgba(197,160,89,0.1)] -translate-y-2' : 'border-[#f0f0f0] hover:shadow-[0_20px_50px_rgba(197,160,89,0.1)] hover:border-gold hover:-translate-y-2'}`}
            >
            <div className={`absolute bottom-0 left-0 w-full h-1 bg-gold origin-left transition-transform duration-500 ease-out ${activeCard === i ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 ${activeCard === i ? 'scale-110 bg-gold text-white border-transparent' : 'bg-ivory border border-gold-light/50 text-gold-accent group-hover:scale-110 group-hover:bg-gold group-hover:text-white group-hover:border-transparent'}`}>
              {iconMap[service.iconName]}
            </div>
            <h4 className="text-[18px] font-extrabold text-charcoal mb-3 leading-tight">{service.title}</h4>
            <p className="text-muted text-[14px] leading-relaxed mb-6 flex-grow">{service.desc}</p>
            <ul className="space-y-3 mt-auto">
              {service.tags.map((tag, j) => (
                <li key={j} className="flex items-center gap-2.5">
                  <CheckCircle2 size={14} strokeWidth={2.5} className="text-gold-accent" />
                  <span className="text-[12px] font-semibold tracking-wider text-charcoal/80 uppercase">{tag}</span>
                </li>
              ))}
              </ul>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </div>
  );
}
