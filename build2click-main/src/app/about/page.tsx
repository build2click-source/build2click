import React from 'react';
import { Layers, Users, MessageSquare, RefreshCw } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

export default function About() {
    return (
        <div className="pt-24 pb-20 overflow-hidden">
            {/* Hero Section */}
            <ScrollReveal direction="down">
                <div className="max-w-4xl mx-auto px-5 lg:px-8 text-center mb-14 lg:mb-20">
                    <h1 className="text-3xl sm:text-4xl lg:text-6xl heading-font mb-4 leading-[1.1] uppercase">
                        <span className="block text-outline-gold animate-fade-in">Builders,</span>
                        <div className="block animate-fade-in delay-100">
                            <span className="text-[#1C1C1C]">Thinkers, </span>
                            <span className="text-[#C8A153]">Innovators.</span>
                        </div>
                    </h1>
                    <p className="text-lg lg:text-xl text-[#6B7280] leading-relaxed max-w-2xl mx-auto">
                        We are a collective of engineers and designers passionate about pushing the boundaries of what's possible on the web.
                    </p>
                </div>
            </ScrollReveal>

            {/* Complex Systems Section */}
            <div className="max-w-7xl mx-auto px-5 lg:px-8 mb-14 lg:mb-20">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
                    <ScrollReveal direction="left">
                        <div className="rounded-[2.5rem] overflow-hidden group luxury-card aspect-[4/3]">
                            <img 
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80" 
                                alt="Team collaborating" 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                            />
                        </div>
                    </ScrollReveal>
                    
                    <ScrollReveal direction="right">
                        <div>
                            <h2 className="text-3xl sm:text-4xl lg:text-6xl heading-font mb-6 leading-[1.1]">Complex Systems, Simple Experiences.</h2>
                            <p className="text-[#6B7280] text-lg mb-6 leading-relaxed">
                                Our mission is simple: deliver both great design and enterprise-level engineering without compromise. For too long, companies had to choose between creative agencies that couldn't code, or dev shops that couldn't design.
                            </p>
                            <p className="text-[#6B7280] text-lg leading-relaxed">
                                We bridge that gap. We believe the best digital products are born when rigorous system architecture meets obsessive user-centric design.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </div>

            {/* Stats / Countdown Section */}
            <div className="bg-white border-y border-gray-200 py-8 mb-14 shadow-sm animate-fade-in max-w-7xl mx-auto rounded-[2rem]">
                <div className="px-4 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
                    <div className="p-4">
                        <div className="text-5xl lg:text-6xl font-black text-[#1C1C1C] heading-font mb-2">
                            <AnimatedCounter end={160} suffix="+" />
                        </div>
                        <div className="text-[#C8A153] uppercase tracking-widest font-bold text-sm mt-3">Happy Clients</div>
                    </div>
                    <div className="p-4">
                        <div className="text-5xl lg:text-6xl font-black text-[#1C1C1C] heading-font mb-2">
                            <AnimatedCounter end={250} suffix="+" />
                        </div>
                        <div className="text-[#C8A153] uppercase tracking-widest font-bold text-sm mt-3">Completed Projects</div>
                    </div>
                    <div className="p-4">
                        <div className="text-5xl lg:text-6xl font-black text-[#1C1C1C] heading-font mb-2">
                            <AnimatedCounter end={99} suffix="%" />
                        </div>
                        <div className="text-[#C8A153] uppercase tracking-widest font-bold text-sm mt-3">Client Satisfaction</div>
                    </div>
                </div>
            </div>


            {/* Core Values Section */}
            <ScrollReveal direction="up" delay={200}>
                <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-20">
                    <h2 className="text-3xl lg:text-4xl font-bold heading-font text-center mb-16">Our Core Values</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {[
                            { icon: <Layers size={28} />, title: "Resilience by Design", desc: "We build fault-tolerant systems meant to last." },
                            { icon: <Users size={28} />, title: "User-Centricity", desc: "Every pixel and line of code serves the end-user." },
                            { icon: <MessageSquare size={28} />, title: "Transparent Collaboration", desc: "No black boxes. You see what we see." },
                            { icon: <RefreshCw size={28} />, title: "Continuous Evolution", desc: "We iterate, improve, and stay ahead of the curve." }
                        ].map((value, idx) => {
                            const dirs = ["in", "left", "right", "in"] as const;
                            return (
                                <ScrollReveal key={idx} direction={dirs[idx]} delay={idx * 150} className={`bg-[#1C1C1C] text-white p-8 lg:p-10 rounded-[2.5rem] luxury-card flex flex-col h-full`}>
                                    <div className="text-[#C8A153] mb-8">{value.icon}</div>
                                    <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{value.desc}</p>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                </div>
            </ScrollReveal>
        </div>
    );
}
