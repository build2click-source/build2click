"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function AdminRow({ sub, questions }: { sub: any, questions: any[] }) {
    const [isOpen, setIsOpen] = useState(false);

    // Parse the answers safely if they are a string or already an object
    let parsedAnswers: any[] = [];
    try {
        parsedAnswers = typeof sub.raw_answers === 'string'
            ? JSON.parse(sub.raw_answers)
            : sub.raw_answers;
    } catch (e) {
        console.error("Failed to parse answers", e);
    }

    const formatDuration = (seconds?: number) => {
        if (seconds === undefined || seconds === null) return "--";
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}m ${s}s`;
    };

    return (
        <>
            <tr
                onClick={() => setIsOpen(!isOpen)}
                className="hover:bg-foreground/[0.03] transition-colors cursor-pointer border-b border-foreground/5"
            >
                <td className="p-6 whitespace-nowrap text-foreground/70">
                    {new Date(sub.created_at).toLocaleString()}
                </td>
                <td className="p-6 font-medium">
                    {sub.profiles?.username || sub.profiles?.email || "Unknown User"}
                </td>
                <td className="p-6 text-center text-foreground/70 font-mono">
                    {formatDuration(sub.duration_seconds)}
                </td>
                <td className="p-6 text-center">
                    <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm border border-primary/20 whitespace-nowrap">
                        {sub.calculated_type}
                    </span>
                </td>
                <td className="p-6 text-right">
                    <button className="text-foreground/40 hover:text-foreground transition-colors p-2 rounded-full hover:bg-foreground/5">
                        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                </td>
            </tr>

            {/* Expanded Row Content */}
            {isOpen && (
                <tr className="bg-foreground/[0.01]">
                    <td colSpan={5} className="p-6 bg-gradient-to-b from-transparent to-foreground/[0.02]">
                        <div className="rounded-2xl border border-foreground/10 bg-background overflow-hidden shadow-inner">
                            <div className="bg-foreground/5 px-6 py-3 border-b border-foreground/10 flex justify-between items-center text-sm font-semibold text-foreground/70">
                                <span>Detailed Question Responses</span>
                                <span>{parsedAnswers.length} Questions Answered</span>
                            </div>
                            <div className="divide-y divide-foreground/5 max-h-[400px] overflow-y-auto">
                                {parsedAnswers.map((ans: any, idx: number) => {
                                    const qText = questions.find(q => q.id === ans.question_id)?.text || "Unknown Question Text";
                                    return (
                                        <div key={idx} className="flex justify-between items-start gap-4 p-4 hover:bg-foreground/[0.01]">
                                            <p className="text-sm font-medium leading-relaxed max-w-3xl">
                                                <span className="text-foreground/40 mr-2">{idx + 1}.</span>
                                                {qText}
                                            </p>

                                            {/* Visual representations of their 1-5 answer */}
                                            <div className="flex gap-1 shrink-0">
                                                {[1, 2, 3, 4, 5].map(val => (
                                                    <div
                                                        key={val}
                                                        className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold border
                              ${ans.value === val
                                                                ? (val <= 2 ? 'bg-red-500 text-white border-red-600' : val === 3 ? 'bg-foreground/60 text-white border-foreground/70' : 'bg-emerald-500 text-white border-emerald-600')
                                                                : 'bg-transparent border-foreground/10 text-transparent'
                                                            }`}
                                                    >
                                                        {ans.value === val ? val : ''}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
}
