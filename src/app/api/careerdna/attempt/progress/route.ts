import { NextResponse } from "next/server";
import { careerdnaPrisma } from "@/lib/prisma-careerdna";
import { getServerSession } from "next-auth";
import { careerdnaAuthOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(careerdnaAuthOptions);
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const attemptId = searchParams.get("attemptId");
    const moduleId = searchParams.get("moduleId");

    if (!attemptId || !moduleId) {
      return NextResponse.json({ error: "attemptId and moduleId are required" }, { status: 400 });
    }

    const responses = await careerdnaPrisma.response.findMany({
      where: {
        attemptId,
        question: { moduleId, isArchived: false },
      },
      select: { questionId: true, scoreValue: true },
    });

    const answeredMap: Record<string, number> = {};
    for (const r of responses) {
      if (r.scoreValue !== null) answeredMap[r.questionId] = r.scoreValue;
    }

    return NextResponse.json({ answeredMap, totalAnswered: Object.keys(answeredMap).length });
  } catch (error) {
    console.error("GET /api/careerdna/attempt/progress error:", error);
    return NextResponse.json({ error: "Failed to fetch progress" }, { status: 500 });
  }
}
