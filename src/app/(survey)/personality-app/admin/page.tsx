import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Users, Shield, Calendar, Hash, Clock } from "lucide-react";
import AdminRow from "./AdminRow";

export default async function AdminDashboard() {
    const supabase = await createClient();

    // 1. Verify Authentication
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect("/per-app/login");
    }

    // 2. Verify ADMIN Role
    const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    if (!profile || profile.role !== "ADMIN") {
        redirect("/per-app");
    }

    // 3. Fetch all questions so we can map IDs to text
    const { data: questions } = await supabase.from("questions").select("*");

    // 4. Fetch all submissions merged with user profiles (now including username)
    const { data: submissions, error } = await supabase
        .from("submissions")
        .select(`
            id,
            raw_answers,
            calculated_type,
            duration_seconds,
            created_at,
            profiles (
                email,
                username
            )
        `)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching admin data:", error);
    }

    return (
        <div className="max-w-6xl mx-auto py-8 lg:py-16 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 border-b border-foreground/10 pb-8">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-md bg-red-500/10 text-red-500 text-sm font-bold tracking-widest uppercase border border-red-500/20">
                        <Shield className="w-4 h-4" />
                        Admin Data Center
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight">System Overview</h1>
                    <p className="text-foreground/60 mt-2 text-lg">Strictly Protected View ~ All System Submissions</p>
                </div>

                <div className="flex gap-4">
                    <div className="bg-foreground/[0.03] p-6 rounded-2xl border border-foreground/5 min-w-32 flex flex-col items-center justify-center shadow-sm">
                        <Users className="w-6 h-6 text-primary mb-2" />
                        <span className="text-3xl font-black">{submissions?.length || 0}</span>
                        <span className="text-xs text-foreground/50 uppercase tracking-wider font-semibold mt-1">Total Tests</span>
                    </div>
                </div>
            </div>

            {/* Data Table */}
            <div className="bg-background border border-foreground/10 rounded-3xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-foreground/[0.02] border-b border-foreground/10 text-sm tracking-wider uppercase text-foreground/50">
                                <th className="p-6 font-semibold"><div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Date</div></th>
                                <th className="p-6 font-semibold"><div className="flex items-center gap-2"><Users className="w-4 h-4" /> Username</div></th>
                                <th className="p-6 font-semibold text-center"><div className="flex items-center justify-center gap-2"><Clock className="w-4 h-4" /> Duration</div></th>
                                <th className="p-6 font-semibold text-center"><div className="flex items-center justify-center gap-2"><Hash className="w-4 h-4" /> Enneagram Type</div></th>
                                <th className="p-6 font-semibold text-right">Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-foreground/5 text-sm md:text-base">
                            {submissions?.map((sub: any) => (
                                <AdminRow key={sub.id} sub={sub} questions={questions || []} />
                            ))}

                            {(!submissions || submissions.length === 0) && (
                                <tr>
                                    <td colSpan={5} className="p-12 text-center text-foreground/50 text-lg">
                                        No test submissions found in the system yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
