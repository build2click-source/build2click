'use client';

import { useState, FormEvent } from 'react';
import { ChevronDown } from 'lucide-react';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      mobile: formData.get('mobile'),
      email: formData.get('email'),
      projectType: formData.get('projectType'),
      message: formData.get('message'),
    };

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setSubmitted(true);
    } catch {
      // silently handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="md:col-span-3 relative z-10 flex flex-col items-center justify-center text-center py-16">
        <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mb-6">
          <span className="text-4xl">✉️</span>
        </div>
        <h3 className="text-2xl font-black text-charcoal mb-3">Message Sent!</h3>
        <p className="text-muted font-medium">We&apos;ll get back to you within 24 hours.</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_15px_50px_rgba(0,0,0,0.04)] p-8 md:p-12 relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-gold/5 rounded-full blur-[60px] pointer-events-none"></div>
      
      <h3 className="text-3xl font-sans font-bold text-charcoal mb-8 tracking-tight">Start A Project</h3>
      
      <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-name" className="text-[13px] font-sans font-medium text-charcoal/80 ml-1">Name</label>
            <input
              id="contact-name"
              name="name"
              type="text"
              className="w-full px-5 py-4 rounded-xl bg-[#FAFAF7] border border-transparent focus:border-gold/30 focus:ring-2 focus:ring-gold/20 outline-none transition-all duration-300 text-charcoal text-[15px] font-medium"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-mobile" className="text-[13px] font-sans font-medium text-charcoal/80 ml-1">Mobile No. *</label>
            <input
              id="contact-mobile"
              name="mobile"
              type="tel"
              required
              className="w-full px-5 py-4 rounded-xl bg-[#FAFAF7] border border-transparent focus:border-gold/30 focus:ring-2 focus:ring-gold/20 outline-none transition-all duration-300 text-charcoal text-[15px] font-medium"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-email" className="text-[13px] font-sans font-medium text-charcoal/80 ml-1">Email ID *</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              className="w-full px-5 py-4 rounded-xl bg-[#FAFAF7] border border-transparent focus:border-gold/30 focus:ring-2 focus:ring-gold/20 outline-none transition-all duration-300 text-charcoal text-[15px] font-medium"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-project-type" className="text-[13px] font-sans font-medium text-charcoal/80 ml-1">Project Type</label>
            <div className="relative">
              <select
                id="contact-project-type"
                name="projectType"
                defaultValue=""
                className="w-full px-5 py-4 rounded-xl bg-[#FAFAF7] border border-transparent focus:border-gold/30 focus:ring-2 focus:ring-gold/20 outline-none appearance-none cursor-pointer text-charcoal text-[15px] font-medium transition-all duration-300"
              >
                <option value="" disabled>Select project type</option>
                <option value="web">Web Development</option>
                <option value="app">Mobile App</option>
                <option value="design">UI/UX Design</option>
                <option value="brand">Brand Identity</option>
                <option value="enterprise">Enterprise Architecture</option>
                <option value="ecard">E-Card</option>
                <option value="catalogue">Catalogue</option>
                <option value="designing">Designing</option>
                <option value="maintenance">Maintenance</option>
                <option value="other">Other</option>
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gold/50 pointer-events-none" size={20} />
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-message" className="text-[13px] font-sans font-medium text-charcoal/80 ml-1">Message</label>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            className="w-full px-5 py-4 rounded-xl bg-[#FAFAF7] border border-transparent focus:border-gold/30 focus:ring-2 focus:ring-gold/20 outline-none resize-none text-charcoal text-[15px] font-medium transition-all duration-300"
          ></textarea>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-5 rounded-full border border-gold/40 text-gold-accent text-[15px] font-bold tracking-widest hover:bg-gold hover:text-white hover:border-gold hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(197,160,89,0.2)] transition-all duration-500 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'SEND'}
        </button>
      </form>
    </div>
  );
}
