"use client";
import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export const HeroCarousel = () => {
    const [current, setCurrent] = useState(0);
    const slides = [
        {
            tag: "PHASE 1: ENGINEERING",
            title: "The Build.",
            desc: "Robust, scalable system architecture designed for enterprise excellence.",
            img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80"
        },
        {
            tag: "PHASE 2: DESIGN",
            title: "The Journey.",
            desc: "Obsessive user-centric interfaces bridging the gap between brand and user.",
            img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80"
        },
        {
            tag: "PHASE 3: CONVERSION",
            title: "The Final Click.",
            desc: "Performance-driven digital funnels resulting in maximum return on investment.",
            img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
        }
    ];

    const nextSlide = () => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full h-[450px] lg:h-[600px] rounded-[2rem] overflow-hidden shadow-2xl group bg-[#1C1C1C] z-20">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C] via-[#1C1C1C]/40 to-transparent z-10 mix-blend-multiply"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C] via-transparent to-transparent z-10"></div>

                    <img src={slide.img} alt={slide.title} className="w-full h-full object-cover" />

                    <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                        <div className="flex flex-col gap-6">
                            <div className="max-w-md">
                                <span className="inline-block px-3 py-1 rounded-full border border-[#C8A153] text-[#C8A153] text-[10px] font-bold tracking-widest uppercase mb-4 shadow-sm backdrop-blur-md bg-[#1C1C1C]/30">
                                    {slide.tag}
                                </span>
                                <h3 className="text-3xl lg:text-4xl text-white heading-font mb-2 leading-tight">{slide.title}</h3>
                                <p className="text-gray-300 text-sm">{slide.desc}</p>
                            </div>

                            <div className="flex items-center justify-between w-full mt-2">
                                <div className="flex space-x-2 items-center">
                                    {slides.map((_, dotIdx) => (
                                        <button
                                            key={dotIdx}
                                            onClick={() => setCurrent(dotIdx)}
                                            className={`h-1 rounded-full transition-all duration-300 ${dotIdx === current ? 'w-8 bg-[#C8A153]' : 'w-3 bg-[#C8A153]/30 hover:bg-[#C8A153]/60'}`}
                                        />
                                    ))}
                                </div>

                                <div className="flex space-x-3">
                                    <button onClick={prevSlide} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#C8A153] hover:border-[#C8A153] transition-all backdrop-blur-sm">
                                        <ChevronLeft size={18} />
                                    </button>
                                    <button onClick={nextSlide} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#C8A153] hover:border-[#C8A153] transition-all backdrop-blur-sm">
                                        <ChevronRight size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
