import { careerdnaPrisma as prisma } from "@/lib/prisma-careerdna";

export async function finalizeAttempt(attemptId: string) {
  try {
    const attempt = await prisma.attempt.findUnique({
      where: { id: attemptId },
      include: {
        responses: {
          include: {
            question: true,
          },
        },
      },
    });

    if (!attempt || attempt.isCompleted || attempt.responses.length === 0) return;

    const moduleIds = [...new Set(attempt.responses.map((r) => r.question.moduleId))];
    const modules = await prisma.assessmentModule.findMany({
      where: { id: { in: moduleIds } },
      select: { id: true, type: true },
    });
    const moduleTypeMap: Record<string, string> = {};
    for (const m of modules) moduleTypeMap[m.id] = m.type;

    const dimensionBuckets: Record<string, { sum: number; count: number }> = {};
    for (const resp of attempt.responses) {
      const q = resp.question;
      const dim = q.traitDimension ?? moduleTypeMap[q.moduleId] ?? "Unknown";
      const score = resp.scoreValue ?? 3;
      const polarity = q.scoringPolarity ?? "Positive (+)";
      const adjusted = polarity === "Negative (-)" ? 6 - score : score;

      if (!dimensionBuckets[dim]) dimensionBuckets[dim] = { sum: 0, count: 0 };
      dimensionBuckets[dim].sum += adjusted;
      dimensionBuckets[dim].count += 1;
    }

    const profileVector: Record<string, number> = {};
    for (const [dim, { sum, count }] of Object.entries(dimensionBuckets)) {
      const avg = sum / count;
      profileVector[dim] = Math.round(((avg - 1) / 4) * 100);
    }

    const occupationalProfiles = await prisma.occupationalProfile.findMany();
    const vectorKeys = [
      "Extraversion", "Agreeableness", "Conscientiousness", "Neuroticism", "Openness",
      "Realistic", "Investigative", "Artistic", "Social", "Enterprising", "Conventional",
      "Numerical Reasoning", "Verbal Reasoning", "Logical Reasoning",
      // Values (10)
      "Stability", "Material Reward", "Learning", "Creativity", "Altruism", 
      "Influence", "Recognition", "Autonomy", "Teamwork", "Intellectual Challenge",
      // SJT (17)
      "Leadership", "Conflict Resolution", "Team Dynamics", "Integrity", "Professionalism", 
      "Accountability", "Client Management", "Decision Making", "Resilience", "Time Management", 
      "Collaboration", "Learning Agility", "Proactivity", "Prioritization", "Stakeholder Management", 
      "Communication", "Self-Awareness",
      // VARK (1)
      "VARK"
    ];

    const getWeight = (key: string) => {
      // High importance on cognitive aptitude
      if (["Numerical Reasoning", "Verbal Reasoning", "Logical Reasoning"].includes(key)) return 1.5;
      // Standard importance on Big 5 and RIASEC
      if (vectorKeys.indexOf(key) < 11) return 1.0; 
      // Secondary importance on Values, SJT, and VARK
      return 0.8; 
    };

    const userVector = vectorKeys.map((k) => (profileVector[k] ?? 50) / 20);

    const seenTitles = new Set<string>();
    const careerMatches = occupationalProfiles
      .map((profile) => {
        const target = JSON.parse(profile.targetVector) as number[];
        
        let sumWeightedSquaredDiff = 0;
        let maxPossibleSum = 0;

        userVector.forEach((userVal, i) => {
          const targetVal = target[i] ?? 2.5; // Fallback to neutral for 14-dim legacy profiles
          const weight = getWeight(vectorKeys[i]);
          
          sumWeightedSquaredDiff += weight * Math.pow(userVal - targetVal, 2);
          maxPossibleSum += weight * Math.pow(4, 2); // Max possible difference is 4 (e.g. 5 vs 1)
        });

        const distance = Math.sqrt(sumWeightedSquaredDiff);
        const maxDist = Math.sqrt(maxPossibleSum);
        
        const fitmentPct = Math.round((1 - distance / maxDist) * 100);
        
        return {
          id: profile.id,
          title: profile.title,
          fitment: Math.max(fitmentPct, 30),
        };
      })
      .sort((a, b) => b.fitment - a.fitment)
      .filter((m) => {
        if (seenTitles.has(m.title)) return false;
        seenTitles.add(m.title);
        return true;
      })
      .slice(0, 5);

    await prisma.$transaction(async (tx) => {
      await tx.attempt.update({
        where: { id: attempt.id },
        data: { isCompleted: true, endTime: new Date() },
      });

      await tx.fitmentScore.createMany({
        data: careerMatches.map((match) => ({
          attemptId: attempt.id,
          occupationalProfileId: match.id,
          euclideanDistance: 0,
          fitmentPercentage: match.fitment,
          matchedTags: "[]",
        })),
      });
    });
  } catch (error) {
    console.error("Error finalizing attempt:", error);
  }
}
