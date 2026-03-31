"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

type Answer = {
    question_id: number;
    value: number; // 1 to 5
};

export async function submitAssessment(answers: Answer[], durationSeconds: number) {
    const supabase = await createClient('personality');

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect("/enneagram/login");
    }

    // 1. Fetch all questions to map them to their Enneagram type
    const { data: questions } = await supabase.from("questions").select("*");
    if (!questions) throw new Error("Could not score: missing questions from DB");

    // 2. Tally the scores
    // Initialize scores object { "1": 0, "2": 0, ... "9": 0 }
    const scores: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };

    answers.forEach((ans) => {
        // Find the question matching this ID
        const q = questions.find((quest) => quest.id === ans.question_id);
        if (q) {
            scores[q.type_associated] += ans.value;
        }
    });

    // 3. Find the highest scoring type
    let maxScore = -1;
    let calculatedType = 1;

    for (const [typeStr, score] of Object.entries(scores)) {
        if (score > maxScore) {
            maxScore = score;
            calculatedType = parseInt(typeStr);
        }
    }

    const typeNames: Record<number, string> = {
        1: "Type 1 - The Reformer",
        2: "Type 2 - The Helper",
        3: "Type 3 - The Achiever",
        4: "Type 4 - The Individualist",
        5: "Type 5 - The Investigator",
        6: "Type 6 - The Loyalist",
        7: "Type 7 - The Enthusiast",
        8: "Type 8 - The Challenger",
        9: "Type 9 - The Peacemaker"
    };

    const calculatedString = typeNames[calculatedType] || "Unknown Type";

    // 4. Save the submission
    const { error } = await supabase.from("submissions").insert({
        user_id: user.id,
        raw_answers: answers,
        calculated_type: calculatedString,
        duration_seconds: durationSeconds,
    });

    if (error) {
        console.error("Submission error:", error);
    }

    // 5. Redirect to results
    redirect("/enneagram/results");
}
