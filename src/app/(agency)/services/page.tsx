import type { Metadata } from 'next';
import ServiceFlipCard from '@/components/ui/ServiceFlipCard';
import AIStrategyGenerator from '@/components/features/AIStrategyGenerator';
import { SERVICES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Services',
  description: 'From web architecture to performance marketing. Engineering your digital advantage with premium solutions.',
};

export default function ServicesPage() {
  return (
    <main className="w-full relative z-10 animate-slide-up">

      {/* --- SERVICES HERO --- */}
      <div className="px-4 md:px-6 w-full max-w-5xl mx-auto mt-32 md:mt-40 mb-20 relative">
        <div className="relative w-full flex flex-col items-center justify-center text-center overflow-hidden bg-white rounded-[2rem] shadow-[0_15px_50px_rgba(0,0,0,0.06)] border border-[#F5F5F5] py-16 md:py-20 px-6 md:px-12">

          {/* High-Key Faded Background Image Layer */}
          <div className="absolute inset-0 z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1920&q=80"
              alt="Services Overview"
              className="w-full h-full object-cover opacity-[0.4] grayscale-[10%]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-white opacity-100"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/70 to-white opacity-100"></div>
          </div>

          {/* Content Layer */}
          <div className="relative z-30 max-w-3xl mx-auto">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-[#EAEAEA] text-gold-accent text-[9px] font-bold mb-6 tracking-[0.15em] uppercase">
              <div className="w-1.5 h-1.5 rounded-full bg-gold-accent" />
              Engineering Your Digital Advantage
            </div>

            <h1 className="premium-headline text-2xl md:text-3xl lg:text-[2.75rem] font-[family-name:var(--font-montserrat)] font-black drop-shadow-sm leading-tight tracking-tighter text-[#181818] mb-4 uppercase">
              LET&apos;S TURN YOUR VISION<br />
              INTO A <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-dark">DIGITAL MASTERPIECE.</span>
            </h1>

            <p className="text-sm md:text-base text-muted max-w-2xl mx-auto leading-relaxed font-medium">
              Join our roster of elite partners. From visual identity to complex enterprise architecture, we deliver high-performance digital results without compromise.
            </p>
          </div>
        </div>
      </div>

      {/* --- SERVICE FLIP CARDS GRID --- */}
      <div className="px-6 max-w-7xl mx-auto mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto">
          {SERVICES.map((service, i) => (
            <ServiceFlipCard key={i} title={service.title} desc={service.desc} img={service.img} />
          ))}
        </div>

        {/* --- AI STRATEGY SECTION --- */}
        <AIStrategyGenerator />
      </div>
    </main>
  );
}
