import { NextResponse } from "next/server";
import { careerdnaPrisma } from "@/lib/prisma-careerdna";

export async function GET() {
  try {
    const assessments = await careerdnaPrisma.assessment.findMany({
      where: { isArchived: false },
      orderBy: { createdAt: "asc" },
      include: {
        modules: {
          orderBy: { order: "asc" },
          select: {
            id: true,
            title: true,
            type: true,
            order: true,
            _count: { select: { questions: true } },
          },
        },
      },
    });

    if (!assessments || assessments.length === 0) {
      return NextResponse.json({ error: "No assessments found" }, { status: 404 });
    }

    return NextResponse.json(assessments);
  } catch (error) {
    console.error("GET /api/careerdna/assessment error:", error);
    return NextResponse.json({ error: "Failed to fetch assessment" }, { status: 500 });
  }
}
