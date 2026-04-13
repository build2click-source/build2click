import { NextRequest, NextResponse } from "next/server";
import { careerdnaPrisma } from "@/lib/prisma-careerdna";
import { getServerSession } from "next-auth";
import { careerdnaAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { addDays } from "date-fns";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(careerdnaAuthOptions);
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if ((session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { assessmentId, userId: targetUserId } = await request.json();
    if (!assessmentId) return NextResponse.json({ error: "assessmentId required" }, { status: 400 });

    const userId = targetUserId || (session.user as any).id as string;

    // 1. Finalize any existing incomplete attempts for this user/assessment
    await careerdnaPrisma.attempt.updateMany({
      where: {
        userId,
        assessmentId,
        isCompleted: false,
      },
      data: { isCompleted: true },
    });

    // 2. Create a fresh attempt
    const attempt = await careerdnaPrisma.attempt.create({
      data: {
        userId,
        assessmentId,
        sessionExpiry: addDays(new Date(), 5),
      },
    });

    return NextResponse.json({ attemptId: attempt.id });
  } catch (error) {
    console.error("POST /api/careerdna/admin/reset-attempt error:", error);
    return NextResponse.json({ error: "Failed to reset attempt" }, { status: 500 });
  }
}
