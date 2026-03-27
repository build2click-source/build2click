"use client";
import React, { useState, useEffect, useRef } from 'react';

export const ScrollReveal = ({ children, delay = 0, className = "", direction = "up" }: { children: React.ReactNode, delay?: number, className?: string, direction?: "up" | "down" | "left" | "right" | "in" }) => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                    if (domRef.current) observer.unobserve(domRef.current);
                }
            },
            { threshold: 0.1 }
        );

        const currentRef = domRef.current;
        if (currentRef) observer.observe(currentRef);
        return () => {
            if (currentRef) observer.unobserve(currentRef);
        };
    }, []);

    const getInitialTransform = () => {
        if (direction === 'up') return 'translate-y-12';
        if (direction === 'down') return '-translate-y-12';
        if (direction === 'left') return '-translate-x-12';
        if (direction === 'right') return 'translate-x-12';
        if (direction === 'in') return 'scale-90 opacity-0';
        return '';
    };

    const getFinalTransform = () => {
        if (direction === 'up') return 'translate-y-0';
        if (direction === 'down') return 'translate-y-0';
        if (direction === 'left') return 'translate-x-0';
        if (direction === 'right') return 'translate-x-0';
        if (direction === 'in') return 'scale-100 opacity-100';
        return '';
    };

    return (
        <div
            ref={domRef}
            className={`transition-all duration-1000 ease-out ${isVisible ? `opacity-100 ${getFinalTransform()}` : `opacity-0 ${getInitialTransform()}`} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};
