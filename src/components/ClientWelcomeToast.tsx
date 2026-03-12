"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { X } from "lucide-react";

function WelcomeModalCore() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (searchParams.get("welcome") === "true") {
            setShowModal(true);
        }
    }, [searchParams]);

    const handleClose = () => {
        setShowModal(false);
        // Clean up the URL so reloading doesn't re-trigger the modal
        const params = new URLSearchParams(searchParams.toString());
        params.delete("welcome");
        const newUrl = pathname + (params.toString() ? `?${params.toString()}` : "");
        router.replace(newUrl, { scroll: false });
    };

    if (!showModal) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
            <div className="relative bg-background border border-foreground/10 rounded-3xl shadow-2xl p-8 md:p-12 w-full max-w-lg text-center animate-in zoom-in-95 duration-500">

                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-foreground/5 text-foreground/50 hover:text-foreground transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl">👋</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">Welcome Aboard!</h2>
                <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
                    We're thrilled to have you here. Ready to discover your core entity and true personality motivations?
                </p>

                <button
                    onClick={handleClose}
                    className="w-full bg-primary text-primary-foreground font-bold text-lg py-4 rounded-full transition-all hover:scale-105 hover:shadow-lg active:scale-95"
                >
                    Let's Begin the Assessment
                </button>
            </div>
        </div>
    );
}

export default function ClientWelcomeModal() {
    return (
        <Suspense fallback={null}>
            <WelcomeModalCore />
        </Suspense>
    );
}
