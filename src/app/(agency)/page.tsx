import { MousePointer2 } from 'lucide-react';
import InteractiveHeroBackground from '@/components/ui/InteractiveHeroBackground';
import CapabilitiesSection from '@/components/sections/CapabilitiesSection';
import GrowthEnginesSection from '@/components/sections/GrowthEnginesSection';

export default function HomePage() {
  return (
    <main className="w-full relative z-10 animate-fade-in">

      {/* --- HERO SECTION WITH VIDEO BANNER --- */}
      <div className="relative w-full min-h-[75vh] flex flex-col items-center justify-center pt-28 pb-16 px-6 text-center overflow-hidden border-b border-gold/20 mb-16">

        {/* Video Banner Backdrop */}
        <video
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/video_background.mp4" type="video/mp4" />
        </video>

        {/* Ivory overlay — keeps text readable while video is visible */}
        <div className="absolute inset-0 bg-ivory/45 z-10 pointer-events-none" />

        {/* Edge gradients to blend into page */}
        <div className="absolute inset-0 bg-gradient-to-b from-ivory/70 via-transparent to-ivory z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-ivory/30 via-transparent to-ivory/30 z-10 pointer-events-none" />

        {/* Interactive floating canvas (subtle layer on top) */}
        <div className="absolute inset-0 z-10 pointer-events-none opacity-30">
          <InteractiveHeroBackground />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-6xl mx-auto">
          <h1 className="premium-headline text-4xl md:text-5xl lg:text-[4rem] font-black tracking-[-0.04em] text-charcoal mb-6 uppercase leading-[1.05] drop-shadow-[0_2px_4px_rgba(0,0,0,0.05)] group cursor-default transition-transform duration-700 ease-out hover:scale-[1.02]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-dark font-black">BUILDING TO YOUR</span><br />
            <span className="inline-flex items-end">
              <span className="text-[1.1em] text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-dark font-black px-1 mt-1 md:mt-2 pb-2 block overflow-visible">
                FINAL CLICK
              </span>
              <MousePointer2
                strokeWidth={3}
                className="text-gold-dark fill-gold-light ml-1.5 md:ml-2 mb-3 md:mb-4 w-5 h-5 md:w-7 md:h-7 scale-x-[-1] group-hover:translate-x-1.5 group-hover:-translate-y-1.5 transition-transform duration-500 ease-out drop-shadow-sm"
              />
            </span>
          </h1>

          <p className="text-base md:text-lg text-muted mb-10 max-w-2xl mx-auto leading-relaxed font-bold">
            We build standout solutions designed to grow your business. By combining an intuitive, easy-to-use design with reliable technology, we help you turn casual visitors into loyal customers.
          </p>
        </div>
      </div>

      {/* --- CAPABILITIES SECTION --- */}
      <CapabilitiesSection />

      {/* --- GROWTH ENGINES SECTION --- */}
      <GrowthEnginesSection />
    </main>
  );
}
