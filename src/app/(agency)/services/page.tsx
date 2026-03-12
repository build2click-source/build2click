"use client";

import React from "react";

export default function AgencyServices() {
    const toggleFlip = (e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => {
        e.currentTarget.classList.toggle("flipped");
    };

    const preventAndToggle = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            e.currentTarget.classList.toggle("flipped");
        }
    };

    const closeFlip = (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        const card = e.currentTarget.closest(".flip-card");
        if (card) {
            card.classList.toggle("flipped");
        }
    };

    const preventAndClose = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === "Enter" || e.key === " ") {
            e.stopPropagation();
            const card = e.currentTarget.closest(".flip-card");
            if (card) {
                card.classList.toggle("flipped");
            }
        }
    };

    return (
        <section className="py-5">
            <div className="container">
                <h2 className="text-center mb-5">
                    <b>Our Services</b>
                </h2>
                <div className="row g-4">
                    {[
                        {
                            title: "Website Design & Development",
                            img: "/design3.jpg",
                            desc: "We build conversion-focused websites that prioritize UX, speed, and SEO. Our process includes user research, wireframes, responsive development, and performance optimization to increase engagement and leads."
                        },
                        {
                            title: "Logo & Brand Identity Design",
                            img: "/designLo.webp",
                            desc: "Custom logos and brand systems that make your business memorable across touchpoints — from color and typography to usage guidelines."
                        },
                        {
                            title: "Software Development",
                            img: "/software20.jpg",
                            desc: "Custom software solutions — web apps, APIs, and integrations built with maintainability and scale in mind."
                        },
                        {
                            title: "Website Maintenance",
                            img: "/maintenance.jpg",
                            desc: "Ongoing care — regular updates, security monitoring, backups, and performance tuning so your site stays healthy and secure."
                        },
                        {
                            title: "Catalogue & Brochure Design",
                            img: "/brochure.jpg",
                            desc: "Print and digital brochures crafted for clarity and brand alignment — layouts ready for print or digital distribution."
                        },
                        {
                            title: "Business Card Design",
                            img: "/Business Card.jpg",
                            desc: "Premium, print-ready business card designs that make a polished first impression and stay consistent with your brand identity."
                        }
                    ].map((service, idx) => (
                        <div key={idx} className="col-md-4 flex justify-content-center">
                            <div
                                className="flip-card"
                                onClick={toggleFlip}
                                onKeyDown={preventAndToggle}
                                tabIndex={0}
                            >
                                <div className="flip-card-inner">
                                    {/* Front side */}
                                    <div className="flip-card-front text-center p-4">
                                        <img src={service.img} loading="lazy" className="img-fluid rounded mb-3" alt={service.title} />
                                        <h5>{service.title}</h5>
                                    </div>

                                    {/* Back side */}
                                    <div className="flip-card-back p-4">
                                        <div className="flip-content">
                                            <h5 className="flip-title">{service.title}</h5>
                                            <p>{service.desc}</p>
                                            <button
                                                type="button"
                                                className="flip-close"
                                                aria-label="Close"
                                                onClick={closeFlip}
                                                onKeyDown={preventAndClose}
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
