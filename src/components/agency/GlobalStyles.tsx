"use client";
export const GlobalStyles = () => (
    <style>{`
    :root {
      --cream: #FAFAF7;
      --charcoal: #1C1C1C;
      --gold: #C8A153;
      --slate: #6B7280;
    }
    
    body {
      background-color: var(--cream);
      color: var(--charcoal);
      font-family: var(--font-inter), system-ui, sans-serif;
    }

    /* Typography Overrides */
    h1, h2, h3, .heading-font {
      font-family: var(--font-montserrat), system-ui, sans-serif;
      font-weight: 900;
      letter-spacing: -0.02em;
    }

    /* Hollow Text Effect */
    .text-outline-gold {
      color: transparent;
      -webkit-text-stroke: 1.5px var(--gold);
    }

    /* Infinite Marquee */
    .marquee-container {
      overflow: hidden;
      white-space: nowrap;
      display: flex;
      width: 100%;
      background-color: var(--charcoal);
      padding: 1rem 0;
    }
    
    .marquee-content {
      display: flex;
      animation: marquee 30s linear infinite;
    }
    
    .marquee-content:hover {
      animation-play-state: paused;
    }

    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); } 
    }

    /* Custom Fade-In Animation */
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .animate-fade-in {
      animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      opacity: 0;
    }
    
    .delay-100 { animation-delay: 0.1s; }
    .delay-200 { animation-delay: 0.2s; }
    .delay-300 { animation-delay: 0.3s; }

    /* Luxury Card Hover */
    .luxury-card {
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .luxury-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 40px -15px rgba(200, 161, 83, 0.15);
      border-color: rgba(200, 161, 83, 0.3);
    }
    
    /* Image Warm Overlay */
    .warm-overlay::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(to bottom, transparent, rgba(28, 28, 28, 0.8));
      mix-blend-mode: multiply;
    }
  `}</style>
);
