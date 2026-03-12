"use client";

import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, Loader2 } from "lucide-react";
import { submitAssessment } from "./actions";

type Question = {
    id: number;
    text: string;
    type_associated: number;
};

export default function Questionnaire({ questions }: { questions: Question[] }) {
    const [currentPage, setCurrentPage] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [elapsedSeconds, setElapsedSeconds] = useState(0);

    const QUESTIONS_PER_PAGE = 10;
    const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);
    const startIndex = currentPage * QUESTIONS_PER_PAGE;
    const currentQuestions = questions.slice(startIndex, startIndex + QUESTIONS_PER_PAGE);

    // Check completion criteria early for hooks
    const isEntireTestComplete = questions.every((q) => answers[q.id] !== undefined);
    const isCurrentPageComplete = currentQuestions.every((q) => answers[q.id] !== undefined);

    // Timer logic
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isSubmitting && !isEntireTestComplete) {
                setElapsedSeconds((prev) => prev + 1);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [isSubmitting, isEntireTestComplete]);

    const formatTime = (totalSeconds: number) => {
        const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
        const s = (totalSeconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const handleAnswerSelect = (questionId: number, value: number) => {
        setAnswers((prev) => ({ ...prev, [questionId]: value }));
    };

    const handleNext = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage((prev) => prev + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage((prev) => prev - 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        // Convert answers dictionary into an array format for the backend Action
        const rawAnswers = Object.entries(answers).map(([qId, val]) => ({
            question_id: parseInt(qId),
            value: val,
        }));

        await submitAssessment(rawAnswers, elapsedSeconds);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">

            {/* Progress Bar */}
            <div className="sticky top-20 z-40 bg-background/80 backdrop-blur-md py-4 border-b border-foreground/5 mb-8">
                <div className="flex justify-between items-center text-sm font-medium text-foreground/60 mb-2">
                    <span>Page {currentPage + 1} of {totalPages}</span>
                    <div className="flex items-center gap-4">
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded-md tracking-wider font-mono">
                            {formatTime(elapsedSeconds)}
                        </span>
                        <span>{Object.keys(answers).length} / {questions.length} Answered</span>
                    </div>
                </div>
                <div className="w-full h-2 bg-foreground/10 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-primary to-purple-500 transition-all duration-500 ease-out"
                        style={{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }}
                    ></div>
                </div>
            </div>

            {/* Questions */}
            <div className="space-y-6">
                {currentQuestions.map((q, idx) => (
                    <div
                        key={q.id}
                        className="p-6 sm:p-8 rounded-3xl bg-foreground/[0.02] border border-foreground/5 shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                        <p className="text-xl font-medium mb-8">
                            <span className="text-primary font-bold mr-3">{startIndex + idx + 1}.</span>
                            {q.text}
                        </p>

                        {/* The 1-5 Custom Scale UI */}
                        <div className="flex flex-row items-center justify-between sm:justify-center gap-1 sm:gap-8 w-full mt-6">

                            {/* Disagree Label */}
                            <span className="text-[10px] sm:text-sm font-semibold text-foreground/50 sm:text-foreground/40 text-center sm:text-left w-12 sm:w-auto leading-tight shrink-0">
                                <span className="sm:hidden">Strongly<br />Disagree</span>
                                <span className="hidden sm:inline">Disagree</span>
                            </span>

                            <div className="flex justify-center items-center gap-1.5 sm:gap-4 md:gap-6">
                                {[1, 2, 3, 4, 5].map((val) => {
                                    const isSelected = answers[q.id] === val;

                                    // Make buttons even tighter to fit the labels on the side
                                    const sizeClass = "w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 text-sm sm:text-lg md:text-xl";

                                    // Colors: 1 = red, 2 = orange, 3 = neutral, 4 = green-light, 5 = green-dark
                                    const colorClass = val === 1 ? "border-red-500 text-red-500 hover:bg-red-500/10" :
                                        val === 2 ? "border-orange-500 text-orange-500 hover:bg-orange-500/10" :
                                            val === 3 ? "border-foreground/30 text-foreground/50 hover:bg-foreground/10" :
                                                val === 4 ? "border-green-400 text-green-400 hover:bg-green-400/10" :
                                                    "border-green-700 text-green-700 hover:bg-green-700/10";

                                    const selectedColorClass = val === 1 ? "bg-red-500 border-red-500 text-white" :
                                        val === 2 ? "bg-orange-500 border-orange-500 text-white" :
                                            val === 3 ? "bg-foreground/50 border-foreground/50 text-white" :
                                                val === 4 ? "bg-green-400 border-green-400 text-white" :
                                                    "bg-green-700 border-green-700 text-white";

                                    return (
                                        <button
                                            key={val}
                                            onClick={() => handleAnswerSelect(q.id, val)}
                                            className={`flex items-center justify-center font-bold rounded-full border-2 shrink-0 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background active:scale-95 ${sizeClass} ${isSelected ? selectedColorClass + ' scale-110 shadow-lg' : colorClass}`}
                                            aria-label={`Rate ${val} out of 5`}
                                        >
                                            {val}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Agree Label */}
                            <span className="text-[10px] sm:text-sm font-semibold text-foreground/50 sm:text-foreground/40 text-center sm:text-right w-12 sm:w-auto leading-tight shrink-0">
                                <span className="sm:hidden">Strongly<br />Agree</span>
                                <span className="hidden sm:inline">Agree</span>
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination / Submit Controls */}
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-foreground/10">
                <button
                    onClick={handlePrev}
                    disabled={currentPage === 0}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${currentPage === 0 ? "opacity-50 cursor-not-allowed" : "bg-foreground/5 hover:bg-foreground/10 active:scale-95"}`}
                >
                    <ChevronLeft className="w-5 h-5" />
                    Previous
                </button>

                {currentPage < totalPages - 1 ? (
                    <button
                        onClick={handleNext}
                        disabled={!isCurrentPageComplete}
                        className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all ${!isCurrentPageComplete ? "opacity-50 cursor-not-allowed bg-foreground/10" : "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg active:scale-95"}`}
                    >
                        Next Page
                        <ChevronRight className="w-5 h-5" />
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        disabled={!isEntireTestComplete || isSubmitting}
                        className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all ${!isEntireTestComplete || isSubmitting ? "opacity-50 cursor-not-allowed bg-foreground/10" : "bg-foreground text-background hover:scale-105 hover:shadow-xl active:scale-95"}`}
                    >
                        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Complete Assessment"}
                    </button>
                )}
            </div>

        </div>
    );
}
