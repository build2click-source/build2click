import { createClient } from "@/utils/supabase/server";
import Questionnaire from "./Questionnaire";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function TestPage() {
    const supabase = await createClient('personality');

    // Basic check: we don't strictly require login to *see* the test, 
    // but to submit we do. For now, let's just make sure they are logged in so
    // we can save their submission securely.
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/enneagram/login?message=Please sign in to take the assessment.");
    }

    // Fetch user profile for role
    const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    const isAdmin = profile?.role === "ADMIN";

    // Check if user already took the test
    const { data: submissions } = await supabase
        .from("submissions")
        .select("calculated_type")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1);

    const existingSubmission = submissions?.[0];

    if (existingSubmission && !isAdmin) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 animate-in fade-in duration-700">
                <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4">
                    <span className="text-4xl">🎉</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">You&apos;ve Already Taken the Assessment!</h1>
                <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
                    Your Enneagram type is:
                </p>
                <div className="mt-8 p-8 rounded-3xl bg-gradient-to-br from-primary/10 to-purple-600/10 border border-primary/20 shadow-lg relative overflow-hidden group">
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600 relative z-10">
                        {existingSubmission.calculated_type}
                    </h2>
                </div>
                <div className="mt-12">
                    <Link
                        href="/enneagram/results"
                        className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(99,102,241,0.4)] active:scale-95"
                    >
                        View Details
                    </Link>
                </div>
            </div >
        );
    }

    // Fetch questions
    const { data: questions, error } = await supabase
        .from("questions")
        .select("*")
        .order("id", { ascending: true });

    if (error || !questions) {
        console.error("Questions loading error:", error);
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-4">
                <h2 className="text-2xl font-bold text-red-500">Failed to load questions</h2>
                <p className="text-foreground/70">Please try again later or contact support.</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-8 lg:py-16">
            <div className="text-center mb-12 animate-in slide-in-from-bottom-4 duration-500">
                <h1 className="text-4xl font-extrabold mb-4 tracking-tight">The Core Assessment</h1>
                <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
                    Answer the following questions as honestly as possible. Don&apos;t overthink it—your first instinct is usually the most accurate reflection of your true self.
                </p>
            </div>

            <Questionnaire questions={questions} />
        </div>
    );
}
