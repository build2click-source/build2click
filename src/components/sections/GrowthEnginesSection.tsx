import { GROWTH_BLOCKS } from '@/lib/constants';
import SolidGoldButton from '@/components/ui/SolidGoldButton';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

export default function GrowthEnginesSection() {
  return (
    <div className="text-left max-w-5xl mx-auto px-6">
      <AnimateOnScroll animation="fade-up">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl lg:text-[2.5rem] font-[family-name:var(--font-montserrat)] font-black text-transparent bg-clip-text bg-gradient-to-r from-charcoal to-gold drop-shadow-sm leading-tight tracking-tighter mb-4">
            Beyond the Browser.<br />We Build Engines for Growth.
          </h3>
          <p className="text-[15px] text-muted max-w-2xl mx-auto leading-relaxed">
            We don&apos;t just design beautiful websites; we architect specialized internal tools to streamline your operations, automate workflows, and elevate your bottom line.
          </p>
        </div>
      </AnimateOnScroll>

      <div className="flex flex-col gap-6 md:gap-10 mb-24 max-w-5xl mx-auto">
        {GROWTH_BLOCKS.map((block, i) => (
          <AnimateOnScroll key={i} animation={block.reverse ? 'fade-left' : 'fade-right'} duration={900}>
            <div
              className="group relative bg-[#fafafa] rounded-[2rem] p-4 flex flex-col md:flex-row items-center gap-6 lg:gap-12 hover:bg-white transition-all duration-500 hover:shadow-[0_20px_50px_rgba(197,160,89,0.08)] border border-transparent hover:border-gold/20"
            >
            <div className={`w-full md:w-[45%] relative overflow-hidden rounded-[1.5rem] ${block.reverse ? 'md:order-last' : ''}`}>
              <div className="absolute inset-0 bg-gold/10 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-500 z-10 pointer-events-none" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={block.img}
                alt={block.title}
                className="w-full h-[260px] md:h-[320px] object-cover transform group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              />
            </div>
            <div className="w-full md:w-[55%] text-left px-4 pb-4 md:px-6 md:py-8">
              <h4 className="text-2xl md:text-[1.75rem] font-bold text-charcoal mb-4 leading-tight">{block.title}</h4>
              <p className="text-[15px] md:text-base text-muted leading-relaxed max-w-lg">{block.desc}</p>
            </div>
            </div>
          </AnimateOnScroll>
        ))}
      </div>

      {/* CTA Banner */}
      <AnimateOnScroll animation="fade-up" delay={200}>
        <div className="text-center bg-white p-10 md:p-16 rounded-[2.5rem] border border-gold/20 shadow-[0_20px_60px_rgba(197,160,89,0.06)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-light rounded-full mix-blend-multiply filter blur-[80px] opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold rounded-full mix-blend-multiply filter blur-[80px] opacity-15"></div>

          <h2 className="relative z-10 text-3xl md:text-4xl font-extrabold text-charcoal mb-4 tracking-tight">
            Ready to Grow Your Business Online?
          </h2>
          <p className="relative z-10 text-[15px] text-muted max-w-2xl mx-auto mb-8 leading-relaxed">
            Whether you&apos;re launching a new brand, redesigning your website, or looking for reliable maintenance services, Build2Click is your digital partner.
          </p>
          <div className="relative z-10 flex justify-center">
            <SolidGoldButton href="/contact" className="text-sm">
              Start Project
            </SolidGoldButton>
          </div>
        </div>
      </AnimateOnScroll>
    </div>
  );
}
