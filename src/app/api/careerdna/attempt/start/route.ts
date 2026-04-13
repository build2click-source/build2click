import { NextRequest, NextResponse } from "next/server";
import { careerdnaPrisma } from "@/lib/prisma-careerdna";
import { getServerSession } from "next-auth";
import { careerdnaAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { addDays } from "date-fns";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(careerdnaAuthOptions);
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { assessmentId } = await request.json();
    if (!assessmentId) return NextResponse.json({ error: "assessmentId required" }, { status: 400 });

    const userId = (session.user as any).id as string;

    // Re-use an existing incomplete attempt within the 5-day window
    const existing = await careerdnaPrisma.attempt.findFirst({
      where: {
        userId,
        assessmentId,
        isCompleted: false,
        sessionExpiry: { gt: new Date() },
      },
    });

    if (existing) return NextResponse.json({ attemptId: existing.id });

    const isAdmin = (session.user as any).role === "ADMIN";
    if (!isAdmin) {
      const totalAttempts = await careerdnaPrisma.attempt.count({
        where: { userId, assessmentId },
      });
      if (totalAttempts >= 1) {
        return NextResponse.json({ error: "Maximum limit of 1 attempt reached." }, { status: 403 });
      }
    }

    const attempt = await careerdnaPrisma.attempt.create({
      data: { userId, assessmentId, sessionExpiry: addDays(new Date(), 5) },
    });

    return NextResponse.json({ attemptId: attempt.id });
  } catch (error) {
    console.error("POST /api/careerdna/attempt/start error:", error);
    return NextResponse.json({ error: "Failed to start attempt" }, { status: 500 });
  }
}
