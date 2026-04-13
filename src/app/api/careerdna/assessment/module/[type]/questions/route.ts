import { NextRequest, NextResponse } from "next/server";
import { careerdnaPrisma } from "@/lib/prisma-careerdna";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  try {
    const { type: moduleId } = await params;

    const module = await careerdnaPrisma.assessmentModule.findUnique({
      where: { id: moduleId },
      include: {
        questions: {
          where: { isArchived: false },
          orderBy: { createdAt: "asc" },
          select: {
            id: true,
            text: true,
            traitDimension: true,
            scoringPolarity: true,
            options: true,
            correctAnswer: true,
            marks: true,
          },
        },
      },
    });

    if (!module) {
      return NextResponse.json({ error: "Module not found" }, { status: 404 });
    }

    const questions = module.questions.map((q) => ({
      ...q,
      options: JSON.parse(q.options) as string[],
    }));

    const maxOrderModule = await careerdnaPrisma.assessmentModule.findFirst({
      where: { assessmentId: module.assessmentId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const isLastModule = module.order >= (maxOrderModule?.order ?? 0);

    return NextResponse.json({
      moduleId: module.id,
      assessmentId: module.assessmentId,
      title: module.title,
      type: module.type,
      order: module.order,
      isLastModule,
      questions,
    });
  } catch (error) {
    console.error("GET /api/careerdna/assessment/module/[type] error:", error);
    return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 });
  }
}
