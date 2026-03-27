"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Code2, Smartphone, Palette, TrendingUp, CheckCircle2, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';


export default function Home() {
    const router = useRouter();
    
    return (
        <div className="pb-20 overflow-hidden">
            {/* Hero Section */}
            <div className="relative min-h-[70vh] md:min-h-[85vh] flex items-center mb-16 px-5 lg:px-8">
                <div className="absolute inset-0 z-0 overflow-hidden bg-[#050505]">
                    {/* Background Video (Abstract Technology Network) */}
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity"
                    >
                        <source src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    
                    {/* Gold aura overlay over the video to lock in branding */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(200,161,83,0.15)_0%,transparent_50%)] pointer-events-none"></div>

                    {/* Dark gradient fade for text legibility at the bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[rgba(5,5,5,0.7)] to-[rgba(5,5,5,0.4)] pointer-events-none"></div>
                </div>











                <div className="max-w-7xl mx-auto w-full z-10 relative py-20">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl sm:text-6xl lg:text-[6rem] leading-[1.05] tracking-tight mb-8 mt-6">
                            <span className="block text-outline-gold animate-fade-in font-black italic">BUILDING</span>
                            <span className="block text-white drop-shadow-sm animate-fade-in delay-100 font-black">TO YOUR</span>
                            <span className="block text-[#C8A153] drop-shadow-md animate-fade-in delay-200 font-extrabold text-shadow-glow">FINAL CLICK.</span>
                        </h1>


                        <p className="text-gray-300 text-base lg:text-lg max-w-xl mb-8 animate-fade-in delay-300 leading-relaxed">
                            We build standout solutions designed to grow your business. By combining an intuitive, easy-to-use design with reliable technology, we help you turn casual visitors into loyal customers.
                        </p>


                        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in delay-300">
                            <Button onClick={() => router.push('/contact')} icon={<ArrowRight size={18} />}>Start Project</Button>
                            <Button variant="outline" onClick={() => router.push('/services')}>Our Services</Button>
                        </div>
                    </div>
                </div>
            </div>


            {/* Capabilities Grid */}
            <div className="max-w-7xl mx-auto px-5 lg:px-8 mt-16 mb-20">
                <ScrollReveal>
                    <div className="mb-12">
                        <h2 className="text-[#C8A153] tracking-widest uppercase text-sm font-bold mb-2">Our Capabilities</h2>
                        <h3 className="text-4xl lg:text-5xl text-[#1C1C1C] heading-font">Engineering Luxury<br />Digital Solutions.</h3>
                    </div>
                </ScrollReveal>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { icon: <Code2 />, title: "High-End Web Dev", desc: "Architecting performance-first digital storefronts that turn browsers into buyers.", features: ["Custom UI/UX", "SEO Optimization", "Headless CMS"] },
                        { icon: <Smartphone />, title: "Mobile App Strategy", desc: "Seamless, fluid mobile applications designed for retention and high-frequency engagement.", features: ["iOS & Android", "Real-Time Sync", "Push Strategy"] },
                        { icon: <Palette />, title: "Premium Branding", desc: "Strategic visual storytelling that positions your business at the top of its market tier.", features: ["Logo Systems", "Style Guides", "Brand Voice"] },
                        { icon: <TrendingUp />, title: "Performance Marketing", desc: "Data-driven growth engines built to scale your conversions and maximize return on spend.", features: ["PPC Management", "Funnel Design", "Analytics"] }
                    ].map((card, idx) => {
                        const directions = ["left", "up", "down", "right"] as const;
                        return (
                            <ScrollReveal key={idx} delay={idx * 150} direction={directions[idx % 4]} className="h-full">
                                <div className="h-full bg-white p-8 rounded-3xl shadow-sm border border-gray-100 luxury-card relative group overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#C8A153] to-transparent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                                    <div className="w-12 h-12 rounded-xl bg-[#FAFAF7] text-[#C8A153] flex items-center justify-center mb-6">{card.icon}</div>
                                    <h4 className="text-xl font-bold mb-4">{card.title}</h4>
                                    <p className="text-[#6B7280] text-sm mb-6">{card.desc}</p>
                                    <ul className="space-y-2 mt-auto">
                                        {card.features.map((f, i) => (
                                            <li key={i} className="flex items-center text-xs font-bold text-[#1C1C1C] uppercase tracking-wider">
                                                <CheckCircle2 size={14} className="text-[#C8A153] mr-2" /> {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </ScrollReveal>
                        );
                    })}
                </div>
            </div>

            {/* Operational Software Solutions */}
            <div className="bg-[#1C1C1C] text-white py-24 mb-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <ScrollReveal>
                        <div className="text-center mb-16 max-w-3xl mx-auto">
                            <h3 className="text-4xl lg:text-5xl heading-font mb-6">Beyond the Browser. We Build Engines for Growth.</h3>
                            <p className="text-gray-400">We don't just design beautiful websites; we architect specialized internal tools to streamline your operations, automate workflows, and elevate your bottom line.</p>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        <ScrollReveal delay={100} direction="up" className="h-full">
                            <div className="relative rounded-3xl overflow-hidden group h-96 luxury-card warm-overlay">
                                <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Billing" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute bottom-0 left-0 p-8 z-10 bg-gradient-to-t from-black/90 to-transparent w-full">
                                    <h4 className="text-xl font-bold mb-2 heading-font text-white">Billing & Invoicing</h4>
                                    <p className="text-gray-300 text-xs">Automate your cash flow, generate professional invoices, and track your revenue in real-time with our custom financial dashboards.</p>
                                </div>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal delay={200} direction="up" className="h-full">
                            <div className="relative rounded-3xl overflow-hidden group h-96 luxury-card warm-overlay">
                                <img src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80" alt="Inventory" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute bottom-0 left-0 p-8 z-10 bg-gradient-to-t from-black/90 to-transparent w-full">
                                    <h4 className="text-xl font-bold mb-2 heading-font text-white">Inventory Management</h4>
                                    <p className="text-gray-300 text-xs">Keep perfect track of your stock levels, automate reordering processes, and optimize your entire supply chain logistics.</p>
                                </div>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal delay={300} direction="up" className="h-full">
                            <div className="relative rounded-3xl overflow-hidden group h-96 luxury-card warm-overlay">
                                <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80" alt="Employee Payroll" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute bottom-0 left-0 p-8 z-10 bg-gradient-to-t from-black/90 to-transparent w-full">
                                    <h4 className="text-xl font-bold mb-2 heading-font text-white">Employee & Payroll</h4>
                                    <p className="text-gray-300 text-xs">Manage your team efficiently with integrated HR solutions, automated payroll processing, and detailed performance tracking.</p>
                                </div>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal delay={400} direction="up" className="h-full">
                            <div className="relative rounded-3xl overflow-hidden group h-96 luxury-card warm-overlay">
                                <img src="https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80" alt="Brand Design" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute bottom-0 left-0 p-8 z-10 bg-gradient-to-t from-black/90 to-transparent w-full">
                                    <h4 className="text-xl font-bold mb-2 heading-font text-white">Brand Identity & Design</h4>
                                    <p className="text-gray-300 text-xs">Make a lasting impression with premium logo creation, custom business cards, and dynamic e-card solutions for your networking.</p>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </div>

            {/* Bottom CTA */}
            <ScrollReveal delay={200} direction="in">
                <div className="text-center px-6 mb-12 flex flex-col items-center">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl heading-font mb-4">Ready to Grow Your Business Online?</h2>
                    <p className="text-[#6B7280] mb-8 max-w-2xl mx-auto">Whether you're launching a new brand, redesigning your website, or looking for reliable maintenance services, Build2Click is your digital partner.</p>
                    <Button onClick={() => router.push('/contact')} icon={<ChevronRight />}>Start Project</Button>

                </div>
            </ScrollReveal>
        </div>
    );
}