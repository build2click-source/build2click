import { Mail, Phone, MessageSquare, Clock } from 'lucide-react';

export default function ContactCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <a
        href="mailto:build2click@gmail.com"
        className="p-6 bg-white rounded-2xl border border-gray-100 shadow-[0_5px_15px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-gold/30 hover:-translate-y-1 transition-all duration-300 flex items-start gap-4 group"
      >
        <div className="mt-1 text-gold group-hover:scale-110 transition-transform duration-300">
          <Mail size={22} strokeWidth={2} />
        </div>
        <div>
          <div className="font-black text-gold tracking-widest uppercase text-[10px] mb-1">EMAIL</div>
          <div className="font-bold text-sm text-charcoal">build2click@gmail.com</div>
        </div>
      </a>

      <a
        href="tel:+917980313975"
        className="p-6 bg-white rounded-2xl border border-gray-100 shadow-[0_5px_15px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-gold/30 hover:-translate-y-1 transition-all duration-300 flex items-start gap-4 group"
      >
        <div className="mt-1 text-gold group-hover:scale-110 transition-transform duration-300">
          <Phone size={22} strokeWidth={2} />
        </div>
        <div>
          <div className="font-black text-gold tracking-widest uppercase text-[10px] mb-1">CALL</div>
          <div className="font-bold text-sm text-charcoal">+91 7980313975</div>
        </div>
      </a>

      <a
        href="https://wa.me/917980313975"
        target="_blank"
        rel="noreferrer"
        className="p-6 bg-white rounded-2xl border border-gray-100 shadow-[0_5px_15px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-gold/30 hover:-translate-y-1 transition-all duration-300 flex items-start gap-4 group"
      >
        <div className="mt-1 text-gold group-hover:scale-110 transition-transform duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"></path><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"></path></svg>
        </div>
        <div>
          <div className="font-black text-gold tracking-widest uppercase text-[10px] mb-1">WHATSAPP</div>
          <div className="font-bold text-sm text-charcoal">Instant Message</div>
        </div>
      </a>

      <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-[0_5px_15px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-gold/30 hover:-translate-y-1 transition-all duration-300 flex items-start gap-4 group cursor-default">
        <div className="mt-1 text-gold group-hover:scale-110 transition-transform duration-300">
          <Clock size={22} strokeWidth={2} />
        </div>
        <div>
          <div className="font-black text-gold tracking-widest uppercase text-[10px] mb-1">AVAILABILITY</div>
          <div className="font-bold text-sm text-charcoal">24/7 Elite Support</div>
        </div>
      </div>
    </div>
  );
}
