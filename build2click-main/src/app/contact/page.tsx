"use client";
import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, Clock, MapPin, Send, AlertCircle } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

type FormFields = {
    name: string;
    mobile: string;
    email: string;
    projectType: string;
    message: string;
};

type FormErrors = Partial<Record<keyof FormFields, string>>;

const validate = (fields: FormFields): FormErrors => {
    const errors: FormErrors = {};
    if (!fields.mobile.trim())
        errors.mobile = 'Mobile number is required.';
    else if (!/^[6-9]\d{9}$/.test(fields.mobile.replace(/\s/g, '')))
        errors.mobile = 'Enter a valid 10-digit Indian mobile number (starts with 6–9).';
    if (!fields.email.trim())
        errors.email = 'Email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
        errors.email = 'Enter a valid email address (e.g. name@domain.com).';
    return errors;
};


export default function Contact() {
    const [status, setStatus] = useState('idle');
    const [serverError, setServerError] = useState('');
    const [fields, setFields] = useState<FormFields>({
        name: '', mobile: '', email: '', projectType: '', message: '',
    });

    React.useEffect(() => {
        const pending = sessionStorage.getItem('pending_strategy');
        if (pending) {
            setFields(prev => ({ ...prev, message: pending }));
            sessionStorage.removeItem('pending_strategy');
        }
    }, []);

    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<Partial<Record<keyof FormFields, boolean>>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const updated = { ...fields, [name]: value };
        setFields(updated);
        if (touched[name as keyof FormFields]) {
            const newErrors = validate(updated);
            setErrors(prev => ({ ...prev, [name]: newErrors[name as keyof FormFields] }));
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        const newErrors = validate(fields);
        setErrors(prev => ({ ...prev, [name]: newErrors[name as keyof FormFields] }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const allTouched = Object.keys(fields).reduce((acc, k) => ({ ...acc, [k]: true }), {});
        setTouched(allTouched);
        const newErrors = validate(fields);
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        setStatus('loading');
        setServerError('');
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(fields),
            });
            const data = await res.json();
            if (res.ok) {
                setStatus('success');
                setFields({ name: '', mobile: '', email: '', projectType: '', message: '' });
                setTouched({});
                setErrors({});
            } else {
                setStatus('error');
                setServerError(data.error || 'Failed to send message.');
            }
        } catch {
            setStatus('error');
            setServerError('Network error occurred. Please try again.');
        }
    };

    const inputBase = "w-full bg-[#FAFAF7] rounded-2xl px-6 py-4 focus:outline-none text-sm placeholder-gray-400 transition-all duration-200";
    const inputOk = `${inputBase} focus:ring-2 focus:ring-[#C8A153]/50 border border-transparent`;
    const inputErr = `${inputBase} ring-2 ring-red-400 border border-red-200 bg-red-50`;

    const field = (key: keyof FormFields) => errors[key] ? inputErr : inputOk;

    return (
        <div className="pt-24 pb-16 overflow-hidden">
            <div className="max-w-7xl mx-auto px-5 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

                    {/* Left side */}
                    <div className="flex flex-col justify-between h-full">
                        <ScrollReveal direction="down">
                            <div className="mb-10 lg:mb-12">
                                <h1 className="text-3xl sm:text-5xl lg:text-7xl heading-font leading-[1.1] max-w-3xl uppercase">
                                    <span className="block text-[#1C1C1C] animate-fade-in">START THE</span>
                                    <span className="block text-[#C8A153] animate-fade-in delay-100">DIALOGUE.</span>
                                </h1>
                            </div>
                        </ScrollReveal>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                            <ScrollReveal direction="left" delay={100} className="h-full">
                                <a href="mailto:hello@build2click.com" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start space-x-4 luxury-card group cursor-pointer h-full">
                                    <div className="text-[#C8A153] mt-1 group-hover:scale-110 transition-transform"><Mail size={20} strokeWidth={2.5} /></div>
                                    <div>
                                        <div className="text-[10px] font-bold text-[#C8A153] uppercase tracking-widest mb-1">Email</div>
                                        <div className="text-[#1C1C1C] font-bold text-sm group-hover:text-[#C8A153] transition-colors">hello@build2click.com</div>
                                    </div>
                                </a>
                            </ScrollReveal>
                            <ScrollReveal direction="right" delay={200} className="h-full">
                                <a href="tel:+917980313975" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start space-x-4 luxury-card group cursor-pointer h-full">
                                    <div className="text-[#C8A153] mt-1 group-hover:scale-110 transition-transform"><Phone size={20} strokeWidth={2.5} /></div>
                                    <div>
                                        <div className="text-[10px] font-bold text-[#C8A153] uppercase tracking-widest mb-1">Call</div>
                                        <div className="text-[#1C1C1C] font-bold text-sm group-hover:text-[#C8A153] transition-colors">+91 7980313975</div>
                                    </div>
                                </a>
                            </ScrollReveal>
                            <ScrollReveal direction="left" delay={300} className="h-full">
                                <a href="https://wa.me/917980313975" target="_blank" rel="noopener noreferrer" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start space-x-4 luxury-card group cursor-pointer h-full">
                                    <div className="text-[#C8A153] mt-1 group-hover:scale-110 transition-transform"><MessageSquare size={20} strokeWidth={2.5} /></div>
                                    <div>
                                        <div className="text-[10px] font-bold text-[#C8A153] uppercase tracking-widest mb-1">WhatsApp</div>
                                        <div className="text-[#1C1C1C] font-bold text-sm group-hover:text-[#C8A153] transition-colors">Instant Message</div>
                                    </div>
                                </a>
                            </ScrollReveal>
                            <ScrollReveal direction="right" delay={400} className="h-full">
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start space-x-4 luxury-card h-full">
                                    <div className="text-[#C8A153] mt-1"><Clock size={20} strokeWidth={2.5} /></div>
                                    <div>
                                        <div className="text-[10px] font-bold text-[#C8A153] uppercase tracking-widest mb-1">Availability</div>
                                        <div className="text-[#1C1C1C] font-bold text-sm">24/7 Elite Support</div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                        <ScrollReveal direction="up" delay={500}>
                            <div className="bg-[#1C1C1C] rounded-3xl p-8 md:p-10 shadow-xl border-b-[12px] border-[#C8A153] luxury-card h-full">
                                <h3 className="text-white text-3xl heading-font uppercase mb-3">Visit Our Hub</h3>
                                <p className="text-gray-400 text-sm mb-10">Headquartered in the Kolkata-India, operating globally.</p>
                                <div className="flex items-center text-[#C8A153]">
                                    <MapPin size={16} className="mr-2" />
                                    <span className="text-[11px] font-bold uppercase tracking-widest">Kolkata , India</span>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Right Side: Form */}
                    <ScrollReveal direction="right" delay={200} className="w-full h-full">
                        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 md:p-12 relative overflow-hidden flex flex-col h-full">
                            <h3 className="text-2xl font-black heading-font uppercase mb-6 text-[#1C1C1C]">Direct Briefing</h3>


                            <form className="space-y-4 flex flex-col flex-1" onSubmit={handleSubmit} noValidate>
                                {/* Row 1 */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest mb-1 block">Name</label>

                                        <input name="name" type="text" placeholder="Your full name" value={fields.name}
                                            onChange={handleChange} onBlur={handleBlur}
                                            className={field('name')} />
                                        {errors.name && <p className="flex items-center gap-1 text-red-500 text-[10px] mt-1"><AlertCircle size={10} />{errors.name}</p>}
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest mb-1 block">Mobile No. <span className="text-red-500">*</span></label>
                                        <input name="mobile" type="tel" placeholder="10-digit mobile number" value={fields.mobile}
                                            onChange={handleChange} onBlur={handleBlur} maxLength={10}
                                            className={field('mobile')} />
                                        {errors.mobile && <p className="flex items-center gap-1 text-red-500 text-[10px] mt-1"><AlertCircle size={10} />{errors.mobile}</p>}
                                    </div>
                                </div>

                                {/* Row 2 */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest mb-1 block">Email ID <span className="text-red-500">*</span></label>
                                        <input name="email" type="email" placeholder="your@email.com" value={fields.email}
                                            onChange={handleChange} onBlur={handleBlur}
                                            className={field('email')} />
                                        {errors.email && <p className="flex items-center gap-1 text-red-500 text-[10px] mt-1"><AlertCircle size={10} />{errors.email}</p>}
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest mb-1 block">Project Type</label>

                                        <select name="projectType" value={fields.projectType}
                                            onChange={handleChange} onBlur={handleBlur}
                                            className={`${field('projectType')} ${!fields.projectType ? 'text-gray-400' : 'text-[#1C1C1C]'}`}>
                                            <option value="" disabled>Select project type</option>
                                            <option value="Web Development">Web Development</option>
                                            <option value="Mobile App">Mobile App</option>
                                            <option value="UI/UX Design">UI/UX Design</option>
                                            <option value="Brand Identity">Brand Identity</option>
                                            <option value="Enterprise Architecture">Enterprise Architecture</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        {errors.projectType && <p className="flex items-center gap-1 text-red-500 text-[10px] mt-1"><AlertCircle size={10} />{errors.projectType}</p>}
                                    </div>
                                </div>

                                {/* Message */}
                                <div className="flex-1 flex flex-col">
                                    <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest mb-1 block">Message</label>

                                    <textarea name="message" placeholder="Describe your project, goals, or any questions..." value={fields.message}
                                        onChange={handleChange} onBlur={handleBlur} rows={5}
                                        className={`${field('message')} resize-none flex-1`} />
                                    <div className="flex justify-between mt-1">
                                        {errors.message
                                            ? <p className="flex items-center gap-1 text-red-500 text-[10px]"><AlertCircle size={10} />{errors.message}</p>
                                            : <span />
                                        }
                                    </div>
                                </div>

                                {/* Status messages */}
                                {status === 'success' && <div className="text-sm font-bold text-green-600 bg-green-50 px-4 py-3 rounded-xl">✓ Message sent! We'll get back to you shortly.</div>}
                                {status === 'error' && <div className="text-sm font-bold text-red-600 bg-red-50 px-4 py-3 rounded-xl">{serverError}</div>}

                                <button disabled={status === 'loading'} className="disabled:opacity-75 w-full bg-[#C8A153] hover:bg-[#b08c46] text-white font-bold py-5 rounded-2xl flex justify-center items-center uppercase tracking-widest transition-all duration-300 mt-4 group shadow-lg shadow-[#C8A153]/20 hover:shadow-[#C8A153]/40">
                                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                                    <Send size={18} className="ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </button>
                            </form>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </div>
    );
};

