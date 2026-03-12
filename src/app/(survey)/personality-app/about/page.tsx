import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const ENNEAGRAM_TYPES = [
    {
        imagePath: "/images/enneagram/type1_reformer_1772179217225.png",
        id: 1,
        name: "The Reformer",
        title: "Type 1 - The Reformer",
        coreDesire: "To be good, to have integrity, to be balanced.",
        coreFear: "To be corrupt/evil, defective.",
        description: "Type Ones are driven by a need to live life the right way, including improving themselves and the world around them. They are ethical, dedicated, and reliable, but can sometimes fall into the trap of perfectionism."
    },
    {
        imagePath: "/images/enneagram/type2_helper_1772179231610.png",
        id: 2,
        name: "The Helper",
        title: "Type 2 - The Helper",
        coreDesire: "To feel loved, needed, and appreciated.",
        coreFear: "To be unwanted, unworthy of being loved.",
        description: "Type Twos are empathetic, sincere, and warm-hearted. They are driven to be close to others and often do things for others to be needed. They can sometimes struggle to acknowledge their own needs."
    },
    {
        imagePath: "/images/enneagram/type3_achiever_1772179245612.png",
        id: 3,
        name: "The Achiever",
        title: "Type 3 - The Achiever",
        coreDesire: "To feel valuable and worthwhile.",
        coreFear: "To be worthless, failing.",
        description: "Type Threes are success-oriented, pragmatic, and highly adaptable. They are driven, highly effective, and excel at everything they do—though they can become overly concerned with their image and what others think of them."
    },
    {
        imagePath: "/images/enneagram/type4_individualist_1772179260457.png",
        id: 4,
        name: "The Individualist",
        title: "Type 4 - The Individualist",
        coreDesire: "To find themselves and their significance.",
        coreFear: "To have no identity or personal significance.",
        description: "Type Fours are self-aware, sensitive, and uniquely expressive. They seek to understand themselves deeply and bring beauty into the world, but can sometimes struggle with melancholy and feeling fundamentally flawed."
    },
    {
        imagePath: "/images/enneagram/type5_investigator_1772179285809.png",
        id: 5,
        name: "The Investigator",
        title: "Type 5 - The Investigator",
        coreDesire: "To be capable and competent.",
        coreFear: "To be useless, helpless, or incapable.",
        description: "Type Fives are perceptive, innovative, and highly secretive. They are intensive thinkers who love to analyze and understand complex information. They fiercely protect their independence and energy."
    },
    {
        imagePath: "/images/enneagram/type6_loyalist_1772179302790.png",
        id: 6,
        name: "The Loyalist",
        title: "Type 6 - The Loyalist",
        coreDesire: "To have security and support.",
        coreFear: "To be without support and guidance.",
        description: "Type Sixes are committed, security-oriented, reliable, and hard-working. They foresee potential problems to keep themselves and their communities safe, but can struggle with anxiety and self-doubt."
    },
    {
        imagePath: "/images/enneagram/type7_enthusiast_1772179320074.png",
        id: 7,
        name: "The Enthusiast",
        title: "Type 7 - The Enthusiast",
        coreDesire: "To be happy and fully satisfied.",
        coreFear: "To be deprived and in pain.",
        description: "Type Sevens are extroverted, optimistic, versatile, and spontaneous. They are constantly seeking new experiences to avoid missing out on life's joys. They can become scattered and unfocused if they avoid processing negative emotions."
    },
    {
        imagePath: "/images/enneagram/type8_challenger_1772179335807.png",
        id: 8,
        name: "The Challenger",
        title: "Type 8 - The Challenger",
        coreDesire: "To protect themselves and be in control of their own life.",
        coreFear: "To be harmed or controlled by others.",
        description: "Type Eights are self-confident, strong, and assertive. They are protective, resourceful, straight-talking, and decisive, but can also be domineering and confrontational to assert their power."
    },
    {
        imagePath: "/images/enneagram/type9_peacemaker_1772179351827.png",
        id: 9,
        name: "The Peacemaker",
        title: "Type 9 - The Peacemaker",
        coreDesire: "To have inner stability and peace of mind.",
        coreFear: "To experience loss or separation/conflict.",
        description: "Type Nines are accepting, trusting, and stable. They are usually creative, optimistic, and supportive, focusing on bringing people together and healing conflicts. At times they can be too willing to go along with others to keep the peace."
    }
];

export default function AboutPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 animate-in fade-in duration-700">

            {/* Hero Section */}
            <div className="max-w-3xl mx-auto text-center mb-24">
                <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 bg-gradient-to-br from-foreground to-foreground/50 bg-clip-text text-transparent">
                    How The Enneagram Works
                </h1>
                <p className="text-xl text-foreground/70 leading-relaxed mb-10">
                    The Enneagram is a system of personality typing that describes patterns in how people interpret the world and manage their emotions. Beyond just describing traits, it maps out nine core motivations that drive human behavior.
                </p>
                <Link
                    href="/per-app/test"
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-4 rounded-full hover:bg-primary/90 transition-all active:scale-95 shadow-xl shadow-primary/20"
                >
                    Discover Your Type
                    <ArrowRight className="w-5 h-5" />
                </Link>
            </div>

            {/* The 9 Types Grid */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">The 9 Personality Types</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {ENNEAGRAM_TYPES.map((type) => (
                        <div
                            key={type.id}
                            className="group relative bg-background border border-foreground/10 p-8 rounded-3xl overflow-hidden hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
                        >
                            {/* Type Number Background */}
                            <div className="absolute -top-10 -right-10 text-[150px] font-black text-foreground/[0.02] group-hover:text-primary/[0.05] transition-colors leading-none pointer-events-none select-none">
                                {type.id}
                            </div>

                            {/* AI Generated Abstract Icon */}
                            <div className="relative w-full aspect-square bg-foreground/[0.02] rounded-2xl mb-8 overflow-hidden flex items-center justify-center p-4 group-hover:bg-foreground/[0.05] transition-colors">
                                <Image
                                    src={type.imagePath}
                                    alt={type.title}
                                    fill
                                    className="object-contain p-4 group-hover:scale-110 transition-transform duration-700"
                                    unoptimized
                                />
                            </div>

                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold mb-4">{type.title}</h3>

                                <div className="space-y-4 mb-6 text-sm">
                                    <div>
                                        <span className="font-semibold text-primary block text-xs tracking-wider uppercase mb-1">Core Desire</span>
                                        <span className="text-foreground/80">{type.coreDesire}</span>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-red-500 block text-xs tracking-wider uppercase mb-1">Core Fear</span>
                                        <span className="text-foreground/80">{type.coreFear}</span>
                                    </div>
                                </div>

                                <p className="text-foreground/70 leading-relaxed text-sm">
                                    {type.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
