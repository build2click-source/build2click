"use client";
import React, { useState } from 'react';
import { Mail, Sparkles, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Linkedin } from '@/components/ui/Icons';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import ReactMarkdown from 'react-markdown';

const services = [
    { img: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80", title: "Web Architecture", desc: "Architecting performance-first digital storefronts. We build lightning-fast, SEO-optimized web experiences with React and Next.js." },
    { img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80", title: "Custom Software", desc: "Enterprise-grade software solutions. Specializing in scalable backend architectures, cloud integration, and robust security." },
    { img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80", title: "Brand Identity", desc: "Comprehensive brand systems that position you as a market leader. From visual theory to full-scale brand books." },
    { img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80", title: "Targeted Growth", desc: "Data-driven marketing engines. Precision campaigns and conversion funnels designed to maximize your digital ROI." },
    { img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80", title: "App Excellence", desc: "Fluid mobile experiences for iOS and Android. High-performance native interactions that keep users engaged." },
    { img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80", title: "System Support", desc: "24/7 dedicated maintenance and optimization. Secure, reliable, and always evolving to meet your business needs." },
    { img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80", title: "Logo Mastery", desc: "Crafting iconic visual symbols that define your brand at first glance. Timeless designs for modern digital presence." },
    { img: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80", title: "Catalogue Design", desc: "High-impact product showcases designed for both digital-first browsing and premium high-key print quality." },
    { img: "https://images.unsplash.com/photo-1596464716127-f2a82984df30?auto=format&fit=crop&w=800&q=80", title: "Business Cards", desc: "Tactile networking tools that leave an indelible mark of professional superiority. Custom finishes and elite stocks." }
];

export default function Services() {
    const [prompt, setPrompt] = useState("");
    const [strategy, setStrategy] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [used, setUsed] = useState(false);
    const [flipped, setFlipped] = useState<boolean[]>(Array(services.length).fill(false));
    const [mounted, setMounted] = useState(false);
    const router = useRouter();



    React.useEffect(() => {
        setMounted(true);
        if (typeof window !== 'undefined') {
            setUsed(sessionStorage.getItem('strategy_used') === 'true');
        }
    }, []);


    const toggleFlip = (idx: number) => {
        setFlipped(prev => prev.map((v, i) => i === idx ? !v : v));
    };

    const generateStrategy = async () => {
        if (!prompt.trim() || loading || used) return;
        setLoading(true);
        setError(null);
        setStrategy(null);
        try {
            const res = await fetch('/api/strategy', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to generate strategy.');
            setStrategy(data.strategy);
            sessionStorage.setItem('strategy_used', 'true');
            setUsed(true);
        } catch (err: any) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleStartProject = () => {
        if (strategy) {
            sessionStorage.setItem('pending_strategy', strategy);
        }
        router.push('/contact');
    };

    return (
        <div className="pt-24 pb-20 overflow-hidden">
            {/* Services Hero */}
            <ScrollReveal direction="down">
                <div className="max-w-7xl mx-auto px-5 lg:px-8 mb-16">
                    <div className="rounded-[2rem] lg:rounded-[3rem] p-8 sm:p-12 lg:p-24 text-center shadow-xl border border-gray-100 relative overflow-hidden group">
                        <img 
                            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80" 
                            alt="Services Overview" 
                            className="absolute inset-0 w-full h-full object-cover z-0 group-hover:scale-105 transition-transform duration-1000" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/60 z-0"></div>
                        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C8A153]/10 rounded-full blur-3xl z-0 pointer-events-none"></div>
                        
                        <div className="relative z-10 flex flex-col items-center">
                            <Badge text="Engineering Your Digital Advantage" />
                            <h1 className="text-3xl sm:text-4xl lg:text-6xl heading-font uppercase mb-4 mt-4">
                                Let's Turn Your Vision<br />
                                Into A <span className="text-[#C8A153]">Digital Masterpiece.</span>
                            </h1>
                            <p className="text-[#6B7280] text-lg max-w-2xl mx-auto mb-10">
                                Join our roster of elite partners. From visual identity to complex enterprise architecture, we deliver high-performance digital results without compromise.
                            </p>

                        </div>
                    </div>
                </div>
            </ScrollReveal>

            <style dangerouslySetInnerHTML={{ __html: `
                .perspective-1000 { perspective: 1000px; }
                .preserve-3d { transform-style: preserve-3d; }
                .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
                .rotate-y-180 { transform: rotateY(180deg); }
            `}} />

            {/* Services Grid */}
            <div className="max-w-7xl mx-auto px-5 lg:px-8 mb-24">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
                    {services.map((service, idx) => {
                        const dirs = ["left", "up", "right", "left", "up", "right", "left", "up", "right"] as const;
                        return (
                            <ScrollReveal key={idx} direction={dirs[idx]} delay={idx * 100} className="h-full">
                                <div
                                    className="perspective-1000 h-[220px] sm:h-[260px] md:h-[300px] cursor-pointer"
                                    onClick={() => toggleFlip(idx)}
                                >
                                    <div className={`relative w-full h-full transition-transform duration-700 preserve-3d ${flipped[idx] ? 'rotate-y-180' : ''}`}>
                                        {/* Front Side */}
                                        <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-md luxury-card border border-gray-100">
                                            <img src={service.img} alt={service.title} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent"></div>
                                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                                <h3 className="text-white text-xs sm:text-sm font-black heading-font uppercase tracking-widest">{service.title}</h3>
                                                <div className="mt-1.5 w-5 h-[2px] bg-[#C8A153]"></div>
                                            </div>
                                            <div className="absolute top-3 right-3 text-[8px] uppercase tracking-widest text-white/60 font-bold">Tap to flip</div>
                                        </div>

                                        {/* Back Side */}
                                        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#1C1C1C] text-white rounded-2xl p-4 sm:p-6 flex flex-col justify-center items-center text-center shadow-2xl border border-[#C8A153]/40">
                                            <h3 className="text-[#C8A153] text-xs sm:text-sm font-black heading-font uppercase mb-2 tracking-widest">{service.title}</h3>
                                            <p className="text-gray-400 text-[10px] sm:text-xs leading-relaxed flex-1 flex items-center">{service.desc}</p>
                                            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#C8A153]/40 to-transparent mt-3 mb-2"></div>
                                            <span className="text-[8px] uppercase tracking-[0.25em] font-bold text-[#C8A153]">Tap to flip back</span>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        );
                    })}
                </div>
            </div>

            {/* AI Strategy Lead Magnet */}
            {mounted && (
                <ScrollReveal direction="up" delay={200}>
                    <div className="max-w-4xl mx-auto px-5 lg:px-8">
                        <div className="bg-white p-6 sm:p-10 rounded-[2rem] shadow-lg border border-[#C8A153]/20 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-[#C8A153]/5 rounded-full blur-3xl pointer-events-none"></div>
                            <div className="flex items-center text-lg sm:text-xl font-bold mb-2 flex-wrap gap-2">
                                <Sparkles className="text-[#C8A153] shrink-0" />
                                <span>Free AI Digital Strategy</span>
                                <span className="text-[10px] uppercase tracking-widest font-bold text-white bg-[#C8A153] px-2 py-1 rounded-full">AI Powered</span>
                            </div>
                            <p className="text-[#6B7280] mb-6 text-sm">Describe your business or project idea. Our AI-driven strategist will craft a real, custom digital plan just for you.</p>

                            {used && !strategy ? (
                                <div className="bg-[#FAFAF7] rounded-xl p-6 border border-gray-100 text-center">
                                    <Sparkles className="text-[#C8A153] mx-auto mb-3" size={28} />
                                    <p className="text-[#1C1C1C] font-bold mb-1">You've used your free strategy this session.</p>
                                    <p className="text-[#6B7280] text-sm">Ready to take it further? <a href="/contact" className="text-[#C8A153] font-bold hover:underline">Contact our team</a> for a full consultation.</p>
                                </div>
                            ) : (
                                <>
                                    <div className="flex flex-col sm:flex-row gap-3 mb-3">
                                        <input
                                            type="text"
                                            placeholder="e.g., I want to launch an online luxury jewellery store..."
                                            className="flex-1 bg-[#FAFAF7] border border-gray-200 rounded-xl px-5 py-4 focus:outline-none focus:border-[#C8A153] transition-colors text-sm"
                                            value={prompt}
                                            onChange={(e) => setPrompt(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && generateStrategy()}
                                            disabled={loading || used}
                                        />
                                        <Button onClick={generateStrategy} disabled={loading || used || !prompt.trim()} className="whitespace-nowrap shrink-0">
                                            {loading ? <Loader2 className="animate-spin mr-2" size={18} /> : <Sparkles className="mr-2" size={18} />}
                                            {loading ? 'Generating...' : 'Build Strategy'}
                                        </Button>
                                    </div>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">⚡ 1 free strategy per session · AI Powered Advisor</p>
                                </>
                            )}

                            {error && (
                                <div className="mt-4 bg-red-50 rounded-xl p-4 border border-red-100 text-red-600 text-sm">
                                    {error}
                                </div>
                            )}

                            {strategy && (
                                <div className="mt-6 bg-[#FAFAF7] rounded-xl p-6 border border-gray-100 animate-fade-in">
                                    <div className="flex items-center mb-4">
                                        <Sparkles className="text-[#C8A153] mr-2" size={16} />
                                        <h4 className="text-[#C8A153] font-bold text-sm uppercase tracking-widest">Your Custom Strategy:</h4>
                                    </div>
                                    <div className="max-w-none text-[#1C1C1C]/80 leading-relaxed">
                                        <ReactMarkdown components={{
                                            h1: ({...props}) => <h1 className="text-lg font-black uppercase mb-3 text-[#1C1C1C]" {...props} />,
                                            h2: ({...props}) => <h2 className="text-md font-black uppercase mb-2 mt-4 text-[#1C1C1C]" {...props} />,
                                            h3: ({...props}) => <h3 className="text-sm font-bold uppercase mb-2 mt-3 text-[#C8A153]" {...props} />,
                                            p: ({...props}) => <p className="mb-3 text-sm" {...props} />,
                                            ul: ({...props}) => <ul className="list-disc pl-5 mb-4 space-y-1 text-sm text-[#1C1C1C]" {...props} />,
                                            ol: ({...props}) => <ol className="list-decimal pl-5 mb-4 space-y-1 text-sm text-[#1C1C1C]" {...props} />,
                                            li: ({...props}) => <li className="pl-1" {...props} />,
                                            strong: ({...props}) => <strong className="font-black text-[#1C1C1C]" {...props} />,
                                        }}>
                                            {strategy}
                                        </ReactMarkdown>
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                                        <p className="text-xs text-gray-400">Want to implement this plan? Our team is ready.</p>
                                        <button 
                                            onClick={handleStartProject}
                                            className="text-xs font-black uppercase tracking-widest text-[#C8A153] hover:text-[#1C1C1C] transition-colors"
                                        >
                                            Start the project →
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </ScrollReveal>
            )}

        </div>
    );
}

