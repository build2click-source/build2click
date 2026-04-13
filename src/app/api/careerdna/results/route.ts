import { NextResponse } from "next/server";
import { careerdnaPrisma } from "@/lib/prisma-careerdna";
import { getServerSession } from "next-auth";
import { careerdnaAuthOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(careerdnaAuthOptions);
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const userId = (session.user as any).id as string;
    const url = new URL(request.url);
    const attemptId = url.searchParams.get("attemptId");

    const attempt = await careerdnaPrisma.attempt.findFirst({
      where: attemptId ? { id: attemptId, userId } : { userId },
      orderBy: attemptId ? undefined : { createdAt: "desc" },
      include: {
        responses: { include: { question: true } },
      },
    });

    if (!attempt || attempt.responses.length === 0) {
      return NextResponse.json(
        { error: "No results found. Please complete at least one module first." },
        { status: 404 }
      );
    }

    const moduleIds = [...new Set(attempt.responses.map((r) => r.question.moduleId))];
    const modules = await careerdnaPrisma.assessmentModule.findMany({
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
      profileVector[dim] = Math.round(((sum / count - 1) / 4) * 100);
    }

    const occupationalProfiles = await careerdnaPrisma.occupationalProfile.findMany();
    const vectorKeys = [
      "Extraversion", "Agreeableness", "Conscientiousness", "Neuroticism", "Openness",
      "Realistic", "Investigative", "Artistic", "Social", "Enterprising", "Conventional",
      "Numerical Reasoning", "Verbal Reasoning", "Logical Reasoning",
    ];
    const userVector = vectorKeys.map((k) => (profileVector[k] ?? 50) / 20);

    const seenTitles = new Set<string>();
    const careerMatches = occupationalProfiles
      .map((profile) => {
        const target = JSON.parse(profile.targetVector) as number[];
        const distance = Math.sqrt(
          userVector.reduce((acc, v, i) => acc + Math.pow(v - (target[i] ?? 2.5), 2), 0)
        );
        const maxDist = Math.sqrt(vectorKeys.length * 25);
        return {
          id: profile.id,
          title: profile.title,
          description: profile.description,
          fitment: Math.max(Math.round((1 - distance / maxDist) * 100), 30),
        };
      })
      .sort((a, b) => b.fitment - a.fitment)
      .filter((m) => { if (seenTitles.has(m.title)) return false; seenTitles.add(m.title); return true; })
      .slice(0, 5);

    const radarData = [
      { subject: "Extraversion",      score: profileVector["Extraversion"] ?? 50 },
      { subject: "Openness",           score: profileVector["Openness"] ?? 50 },
      { subject: "Conscientiousness",  score: profileVector["Conscientiousness"] ?? 50 },
      { subject: "Agreeableness",      score: profileVector["Agreeableness"] ?? 50 },
      { subject: "Stability",          score: 100 - (profileVector["Neuroticism"] ?? 50) },
      { subject: "Investigative",      score: profileVector["Investigative"] ?? 50 },
      { subject: "Enterprising",       score: profileVector["Enterprising"] ?? 50 },
      { subject: "Social",             score: profileVector["Social"] ?? 50 },
    ];

    const big5 = {
      Extraversion:      profileVector["Extraversion"] ?? 0,
      Agreeableness:     profileVector["Agreeableness"] ?? 0,
      Conscientiousness: profileVector["Conscientiousness"] ?? 0,
      Neuroticism:       profileVector["Neuroticism"] ?? 0,
      Openness:          profileVector["Openness"] ?? 0,
    };

    const cognitiveBreakdown = [
      { area: "Numerical Reasoning", pct: profileVector["Numerical Reasoning"] ?? 0 },
      { area: "Verbal Reasoning",    pct: profileVector["Verbal Reasoning"] ?? 0 },
      { area: "Logical Reasoning",   pct: profileVector["Logical Reasoning"] ?? 0 },
    ];

    if (!attempt.isCompleted) {
      await careerdnaPrisma.$transaction(async (tx) => {
        await tx.attempt.update({
          where: { id: attempt.id },
          data: { isCompleted: true, endTime: new Date() },
        });
        await tx.fitmentScore.createMany({
          data: careerMatches.map((m) => ({
            attemptId: attempt.id,
            occupationalProfileId: m.id,
            euclideanDistance: 0,
            fitmentPercentage: m.fitment,
            matchedTags: "[]",
          })),
        });
      });
    }

    return NextResponse.json({
      attemptId: attempt.id,
      assessmentId: attempt.assessmentId,
      totalAnswered: attempt.responses.length,
      big5,
      radarData,
      cognitiveBreakdown,
      careerMatches,
    });
  } catch (error) {
    console.error("GET /api/careerdna/results error:", error);
    return NextResponse.json({ error: "Failed to compute results" }, { status: 500 });
  }
}
