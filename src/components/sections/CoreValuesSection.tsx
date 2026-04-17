import { Layers, Users, MessageSquare, RefreshCw } from 'lucide-react';
import { CORE_VALUES } from '@/lib/constants';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

const iconMap = {
  Layers: <Layers size={32} strokeWidth={1.5} />,
  Users: <Users size={32} strokeWidth={1.5} />,
  MessageSquare: <MessageSquare size={32} strokeWidth={1.5} />,
  RefreshCw: <RefreshCw size={32} strokeWidth={1.5} />,
};

export default function CoreValuesSection() {
  return (
    <div className="max-w-7xl mx-auto mb-32">
      <AnimateOnScroll animation="fade-up">
        <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] mb-16 text-center font-[family-name:var(--font-montserrat)] font-black text-transparent bg-clip-text bg-gradient-to-r from-charcoal to-gold drop-shadow-sm leading-tight tracking-tighter">
          Our Core Values
        </h2>
      </AnimateOnScroll>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {CORE_VALUES.map((val, i) => (
          <AnimateOnScroll key={i} animation="fade-up" delay={i * 150} duration={800} className="h-full">
            <div
              className="group relative rounded-[2.5rem] overflow-hidden cursor-pointer h-full shadow-[0_15px_40px_rgba(0,0,0,0.06)] min-h-[300px]"
            >
            {/* Default Off-White Background */}
            <div className="absolute inset-0 bg-ivory border border-[#EAEAEA] transition-opacity duration-500 group-hover:opacity-0"></div>
            {/* Gold Gradient Hover Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gold-accent to-gold-dark opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

            {/* Content */}
            <div className="relative z-10 p-8 md:p-10 flex flex-col h-full text-left">
              <div className="mb-12 text-gold-accent group-hover:text-white transition-colors duration-500">
                {iconMap[val.iconName]}
              </div>
              <h3 className="text-[22px] font-black text-charcoal group-hover:text-white transition-colors duration-500 mb-6 leading-[1.2] whitespace-pre-line">
                {val.title}
              </h3>
              <p className="text-muted group-hover:text-white/90 text-[15px] leading-relaxed whitespace-pre-line transition-colors duration-500">
                {val.desc}
              </p>
            </div>
          </div>
          </AnimateOnScroll>
        ))}
      </div>
    </div>
  );
}
