'use client';

import { useState } from 'react';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { STATS } from '@/lib/constants';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

export default function StatsSection() {
  const [activeStat, setActiveStat] = useState<number | null>(null);

  return (
    <div className="w-full mb-12 md:mb-16 px-4 max-w-5xl mx-auto">
      <AnimateOnScroll animation="fade-up">
        <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-[#F0F0F0] shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex flex-col md:flex-row items-center justify-between py-6 md:py-8 px-6 md:px-10 relative">
          {STATS.map((stat, i) => (
            <div
              key={i}
              onClick={() => setActiveStat(activeStat === i ? null : i)}
              className={`flex-1 w-full flex flex-col items-center justify-center relative group py-8 md:py-0 ${i !== STATS.length - 1 ? 'border-b md:border-b-0 md:border-r border-[#EEEEEE]' : ''} cursor-pointer`}
            >
              {/* 3D Emoji Popup Animation */}
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30 transition-all duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${activeStat === i ? 'opacity-100 scale-[1.4] -translate-y-[80%]' : 'opacity-0 group-hover:opacity-100 group-hover:scale-[1.4] group-hover:-translate-y-[80%]'}`}>
                <span className={`text-[3rem] md:text-[3.5rem] drop-shadow-[0_15px_20px_rgba(0,0,0,0.15)] inline-block transform transition-transform duration-[600ms] ${stat.float}`}>
                  {stat.emoji}
                </span>
              </div>

              {/* Stat Content */}
              <div className={`relative z-10 transform transition-transform duration-500 ease-out bg-transparent text-center px-4 w-full ${activeStat === i ? 'scale-[0.98] translate-y-1' : 'group-hover:scale-[0.98] group-hover:translate-y-1'}`}>
                <div className={`text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] font-bold text-charcoal mb-2 leading-none tracking-tight transition-opacity duration-500 ${activeStat === i ? 'opacity-10' : 'group-hover:opacity-10'}`}>
                  <AnimatedCounter endValue={stat.endNum} suffix={stat.suffix} />
                </div>
                <div className="text-gold-accent font-[family-name:var(--font-montserrat)] font-bold uppercase tracking-[0.2em] text-[10px] md:text-[11px]">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </AnimateOnScroll>
    </div>
  );
}
