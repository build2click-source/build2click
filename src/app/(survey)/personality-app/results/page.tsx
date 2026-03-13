import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Award, RefreshCcw } from "lucide-react";
import Link from "next/link";

const ENNEAGRAM_TYPES: Record<number, { title: string; description: string }> = {
    1: { title: "The Reformer", description: "Rational, idealistic, principled, purposeful, self-controlled, and perfectionistic." },
    2: { title: "The Helper", description: "Caring, interpersonal, demonstrative, generous, people-pleasing, and possessive." },
    3: { title: "The Achiever", description: "Success-oriented, pragmatic, adaptive, excelling, driven, and image-conscious." },
    4: { title: "The Individualist", description: "Sensitive, withdrawn, expressive, dramatic, self-absorbed, and temperamental." },
    5: { title: "The Investigator", description: "Intense, cerebral, perceptive, innovative, secretive, and isolated." },
    6: { title: "The Loyalist", description: "Committed, security-oriented, engaging, responsible, anxious, and suspicious." },
    7: { title: "The Enthusiast", description: "Busy, fun-loving, spontaneous, versatile, distractible, and scattered." },
    8: { title: "The Challenger", description: "Powerful, dominating, self-confident, decisive, willful, and confrontational." },
    9: { title: "The Peacemaker", description: "Easygoing, self-effacing, receptive, reassuring, agreeable, and complacent." },
};

export default async function ResultsPage() {
    const supabase = await createClient();

    // Ensure user is logged in
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect("/enneagram/login");
    }

    // Fetch the user's most recent submission
    const { data: submissions } = await supabase
        .from("submissions")
        .select("calculated_type, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1);

    const latestSubmission = submissions?.[0];

    if (!latestSubmission) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 animate-in fade-in duration-500">
                <div className="bg-foreground/5 p-4 rounded-full mb-4">
                    <Award className="w-12 h-12 text-foreground/40" />
                </div>
                <h2 className="text-3xl font-bold">No Results Found</h2>
                <p className="text-foreground/60 max-w-md">You haven&apos;t taken the assessment yet. Discover your true Enneagram type today.</p>
                <Link
                    href="/enneagram/test"
                    className="bg-primary text-primary-foreground font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform"
                >
                    Take the Test
                </Link>
            </div>
        );
    }

    const calculatedString = latestSubmission.calculated_type;

    // Default fallback in case data is malformed
    let typeId = 0;
    let typeName = calculatedString;

    // Try to parse out the number if it matches "Type X - Name"
    const match = calculatedString.match(/Type (\d+) - (.*)/);
    if (match) {
        typeId = parseInt(match[1]);
        typeName = match[2];
    } else if (!isNaN(parseInt(calculatedString))) {
        // Fallback for old data before the Phase 6 update
        typeId = parseInt(calculatedString);
        typeName = ENNEAGRAM_TYPES[typeId]?.title || `Type ${typeId}`;
    }

    const typeData = ENNEAGRAM_TYPES[typeId] || { title: typeName, description: "Your core motivations and fears dictate your actions." };

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center animate-in fade-in zoom-in duration-700">
            <div className="w-full max-w-3xl text-center space-y-8">

                <p className="text-primary font-semibold tracking-wider uppercase text-sm">Your Assessment Results</p>

                <div className="relative inline-block w-64 h-64 md:w-80 md:h-80 my-8">
                    {/* Aesthetic Background Glows */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary to-purple-500 rounded-full blur-2xl opacity-40 animate-pulse"></div>

                    <div className="relative z-10 w-full h-full bg-background border-2 border-foreground/10 rounded-full flex flex-col items-center justify-center shadow-2xl p-6">
                        <span className="text-foreground/50 font-medium mb-1">Type {typeId !== 0 ? typeId : ''}</span>
                        <span className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br from-primary to-purple-600 leading-tight">
                            {typeName}
                        </span>
                    </div>
                </div>

                <div className="bg-foreground/[0.02] border border-foreground/5 p-8 rounded-3xl backdrop-blur-sm mx-4 shadow-xl">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{typeData.title}</h1>
                    <p className="text-xl text-foreground/70 leading-relaxed max-w-xl mx-auto">
                        {typeData.description}
                    </p>
                </div>

                <div className="pt-8 flex flex-col sm:flex-row justify-center gap-4">
                    <p className="text-foreground/40 text-sm mt-4">
                        Test taken on {new Date(latestSubmission.created_at).toLocaleDateString()}
                    </p>
                </div>

            </div>
        </div>
    );
}
