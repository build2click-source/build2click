import Link from "next/link";
import { ArrowRight, Brain, Shield, Zap } from "lucide-react";
import ParticleBackground from "@/components/ParticleBackground";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Build2Click Enneagram Test",
    "description": "A highly accurate, free Enneagram test to discover your unique personality type, core motivations, and deepest fears. Instant results.",
    "applicationCategory": "LifestyleApplication",
    "operatingSystem": "All",
    "url": "https://www.build2click.in/enneagram",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-center items-center text-center space-y-12 animate-in fade-in zoom-in duration-700 relative z-10">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Immersive Particle JS Background */}
      <ParticleBackground />

      {/* Hero Badge */}
      <Link href="/enneagram/about" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 hover:bg-primary/20 transition-colors">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
        </span>
        Discover Your Core Motivations
      </Link>

      {/* Main Headline */}
      <div className="max-w-4xl space-y-6">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          Unveil Your True <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">Enneagram</span> Type
        </h1>
        <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
          More than a personality test. A journey into your deepest fears, desires, and the unique lens through which you see the world.
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-8">
        <Link
          href="/enneagram/test"
          className="group relative flex items-center justify-center gap-2 bg-foreground text-background px-8 py-4 rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(99,102,241,0.4)] active:scale-95"
        >
          <span className="relative z-10 flex items-center gap-2">
            Start Free Assessment
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-purple-600/80 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </Link>
      </div>

      {/* Feature highlight */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 pt-12 border-t border-foreground/10 w-full max-w-5xl">
        <FeatureCard
          icon={<Brain className="w-6 h-6 text-primary" />}
          title="Deep Science"
          description="Based on decades of psychological research into core human motivations."
        />
        <FeatureCard
          icon={<Zap className="w-6 h-6 text-yellow-500" />}
          title="Instant Results"
          description="Advanced scoring algorithm provides your true type instantly upon completion."
        />
        <FeatureCard
          icon={<Shield className="w-6 h-6 text-emerald-500" />}
          title="Private & Secure"
          description="Your intimate psychological profile is secured with end-to-end encryption."
        />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-3xl bg-foreground/[0.02] border border-foreground/5 hover:bg-foreground/[0.04] transition-colors">
      <div className="p-3 rounded-2xl bg-background shadow-sm border border-foreground/5 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-foreground/70">{description}</p>
    </div>
  )
}
