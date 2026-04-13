import { NextResponse } from "next/server";
import { careerdnaPrisma } from "@/lib/prisma-careerdna";
import { getServerSession } from "next-auth";
import { careerdnaAuthOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(careerdnaAuthOptions);
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const userId = (session.user as any).id as string;
    const { searchParams } = new URL(req.url);
    const assessmentId = searchParams.get("assessmentId") || undefined;

    const attempts = await careerdnaPrisma.attempt.findMany({
      where: { userId, assessmentId },
      include: { _count: { select: { responses: true } } },
      orderBy: { createdAt: "desc" },
    });

    if (attempts.length === 0) return NextResponse.json({ moduleProgress: {} });

    const activeAttempt = attempts.find((a) => !a.isCompleted);
    const attempt = activeAttempt || attempts.sort((a, b) => b._count.responses - a._count.responses)[0];

    const responses = await careerdnaPrisma.response.findMany({
      where: { attemptId: attempt.id },
      select: { question: { select: { moduleId: true } } },
    });

    const modules = await careerdnaPrisma.assessmentModule.findMany({
      where: { assessmentId: attempt.assessmentId },
      select: {
        id: true,
        _count: { select: { questions: { where: { isArchived: false } } } },
      },
    });

    const answeredPerModule: Record<string, number> = {};
    for (const r of responses) {
      const mid = r.question.moduleId;
      answeredPerModule[mid] = (answeredPerModule[mid] || 0) + 1;
    }

    const moduleProgress: Record<string, { answered: number; total: number }> = {};
    for (const m of modules) {
      moduleProgress[m.id] = {
        answered: answeredPerModule[m.id] || 0,
        total: m._count.questions,
      };
    }

    return NextResponse.json({ moduleProgress, attemptId: attempt.id });
  } catch (error) {
    console.error("GET /api/careerdna/attempt/module-progress error:", error);
    return NextResponse.json({ error: "Failed to fetch progress" }, { status: 500 });
  }
}
