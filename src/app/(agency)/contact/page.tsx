import type { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import ContactCards from '@/components/sections/ContactCards';
import ContactForm from '@/components/features/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Start the dialogue. Get in touch with Build2Click for your next digital project.',
};

export default function ContactPage() {
  return (
    <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto relative z-10 animate-slide-up">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-12 w-full">
        
        {/* Left Column (Info) */}
        <div className="w-full lg:w-[45%] flex flex-col pt-8 md:pt-12">
          {/* Header */}
          <div className="mb-12 text-left">
            <h1 className="premium-headline font-black uppercase mb-5 md:mb-6 flex flex-col">
              <span
                className="block text-4xl md:text-5xl lg:text-[4rem] text-transparent tracking-widest mb-1 md:mb-2"
                style={{ WebkitTextStroke: '1.5px #CBA461' }}
              >
                INITIATE
              </span>
              <span className="block text-[2rem] md:text-[2.75rem] lg:text-[3.25rem] tracking-tight leading-[1] whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-gold-dark via-gold to-gold-light drop-shadow-sm">
                THE PROJECT.
              </span>
            </h1>
          </div>
          
          {/* Contact Cards */}
          <ContactCards />
          
          {/* Visit our Hub Card */}
          <div className="mt-8 bg-white border border-[#EAEAEA] rounded-[2rem] p-8 md:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.04)] relative overflow-hidden group hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(197,160,89,0.1)] hover:border-gold transition-all duration-500">
            <h3 className="text-charcoal text-xl font-bold mb-4 flex items-center gap-3 tracking-wide uppercase transition-colors duration-500 group-hover:text-gold-dark">
              Visit Our Hub
            </h3>
            <p className="text-muted mb-6 font-medium leading-relaxed font-sans">
              Headquartered in Kolkata, India. Operating globally.
            </p>
            <p className="text-gold-dark font-sans font-bold tracking-[0.15em] text-[15px] uppercase flex items-center gap-2 group-hover:text-gold transition-colors duration-500">
              <MapPin size={18} strokeWidth={2.5}/> KOLKATA, INDIA
            </p>
          </div>
        </div>

        {/* Right Column (Form) */}
        <div className="w-full lg:w-[55%] pt-8 md:pt-12">
          <ContactForm />
        </div>

      </div>
    </main>
  );
}
