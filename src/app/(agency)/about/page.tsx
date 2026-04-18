import type { Metadata } from 'next';
import StatsSection from '@/components/sections/StatsSection';
import CoreValuesSection from '@/components/sections/CoreValuesSection';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'We are builders, thinkers, and innovators. A collective of engineers and designers pushing boundaries on the web.',
};

export default function AboutPage() {
  return (
    <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto relative z-10 animate-slide-up">

      {/* Hero Typography */}
      <div className="text-center mb-16">
        <h1 className="premium-headline font-black uppercase text-center mb-5 md:mb-6">
          <span
            className="block text-[2.5rem] sm:text-3xl md:text-4xl lg:text-[3.25rem] text-transparent tracking-widest mb-1 md:mb-2 break-words leading-none"
            style={{ WebkitTextStroke: '1.5px #CBA461' }}
          >
            BUILDERS,
          </span>
          <span className="block text-[2.75rem] sm:text-4xl md:text-5xl lg:text-[4.25rem] tracking-tight leading-[1.1] break-words">
            <span className="block md:inline text-charcoal mr-0 md:mr-4 mb-1 md:mb-0">THINKERS,</span>
            <span className="block md:inline text-gold-accent">INNOVATORS.</span>
          </span>
        </h1>
        <p className="text-sm md:text-base text-muted max-w-xl mx-auto mb-12 md:mb-16 leading-relaxed font-medium">
          We are a collective of engineers and designers passionate about pushing the boundaries of what&apos;s possible on the web.
        </p>
      </div>

      {/* Mission Statement: Image Left, Content Right */}
      <AnimateOnScroll animation="fade-up" duration={1000} delay={100}>
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14 max-w-5xl mx-auto mb-16 md:mb-20 px-4">
          {/* Left Side: Image */}
          <div className="w-full md:w-1/2 relative p-1.5 md:p-2 bg-white rounded-[2rem] border border-[#EAEAEA] shadow-[0_15px_40px_rgba(0,0,0,0.06)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
              alt="Team collaborating"
              className="w-full h-[300px] md:h-[450px] object-cover rounded-[1.5rem]"
            />
          </div>

          {/* Right Side: Content */}
          <div className="w-full md:w-1/2 text-left">
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-[family-name:var(--font-montserrat)] font-black text-transparent bg-clip-text bg-gradient-to-r from-charcoal to-gold drop-shadow-sm leading-tight tracking-tighter mb-6 md:mb-8">
              Complex Systems, Simple Experiences.
            </h2>
            <p className="text-[14px] md:text-[15px] text-muted mb-6 leading-[1.8] font-medium">
              Our mission is simple: deliver both great design and enterprise-level engineering without compromise. For too long, companies had to choose between creative agencies that couldn&apos;t code, or dev shops that couldn&apos;t design.
            </p>
            <p className="text-[14px] md:text-[15px] text-muted leading-[1.8] font-medium">
              We bridge that gap. We believe the best digital products are born when rigorous system architecture meets obsessive user-centric design.
            </p>
          </div>
        </div>
      </AnimateOnScroll>

      {/* Stats Section */}
      <StatsSection />

      {/* Core Values Section */}
      <CoreValuesSection />
    </main>
  );
}
