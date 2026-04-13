import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { careerdnaAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { careerdnaPrisma } from "@/lib/prisma-careerdna";

export async function GET() {
  const session = await getServerSession(careerdnaAuthOptions);
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const totalStudents = await careerdnaPrisma.user.count({ where: { role: "STUDENT" } });
    const completedAttempts = await careerdnaPrisma.attempt.count({ where: { isCompleted: true } });
    const inProgressAttempts = await careerdnaPrisma.attempt.count({ where: { isCompleted: false } });

    const recentAttempts = await careerdnaPrisma.attempt.findMany({
      orderBy: { updatedAt: "desc" },
      take: 15,
      include: {
        user: { select: { email: true, id: true } },
        assessment: { select: { title: true } },
        fitmentScores: {
          orderBy: { fitmentPercentage: "desc" },
          take: 1,
          include: { occupationalProfile: { select: { title: true } } },
        },
        _count: { select: { responses: true } },
      },
    });

    const assessments = await careerdnaPrisma.assessment.findMany({
      select: {
        id: true,
        modules: {
          select: { _count: { select: { questions: { where: { isArchived: false } } } } },
        },
      },
    });

    const questionCountsByAssessment: Record<string, number> = {};
    for (const a of assessments) {
      questionCountsByAssessment[a.id] = a.modules.reduce((sum, m) => sum + m._count.questions, 0);
    }

    const candidates = recentAttempts.map((attempt) => {
      let status = "Not Started";
      let topMatch = "Pending";
      const totalQuestions = questionCountsByAssessment[attempt.assessmentId] || 0;

      if (attempt.isCompleted) {
        status = "Completed";
        const topFit = attempt.fitmentScores[0];
        if (topFit) topMatch = `${topFit.occupationalProfile.title} (${Math.round(topFit.fitmentPercentage)}%)`;
      } else {
        const answered = attempt._count.responses;
        const progress = totalQuestions > 0 ? Math.round((answered / totalQuestions) * 100) : 0;
        status = answered > 0 ? `In Progress (${progress}%)` : "Not Started";
      }

      return {
        id: attempt.id,
        attemptId: attempt.id,
        email: attempt.user.email,
        assessmentName: attempt.assessment.title,
        status,
        topMatch,
        lastActive: attempt.updatedAt.toISOString(),
      };
    });

    return NextResponse.json({ totalStudents, completedAttempts, inProgressAttempts, candidates });
  } catch (error) {
    console.error("GET /api/careerdna/admin/stats error:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
