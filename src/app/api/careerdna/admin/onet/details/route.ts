import { NextRequest, NextResponse } from "next/server";
import { onetClient } from "@/lib/careerdna/ONetClient";
import { ONetMapper } from "@/lib/careerdna/ONetMapper";
import { getServerSession } from "next-auth";
import { careerdnaAuthOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(careerdnaAuthOptions);
    if (!session?.user || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const socCode = searchParams.get("code");

    if (!socCode) {
      return NextResponse.json({ error: "SOC Code is required" }, { status: 400 });
    }

    // 1. Fetch all detailed components from O*NET
    const [details, interests, workStyles, abilities, workValues] = await Promise.all([
      onetClient.getOccupationDetails(socCode),
      onetClient.getInterests(socCode),
      onetClient.getWorkStyles(socCode),
      onetClient.getAbilities(socCode),
      onetClient.getWorkValues(socCode)
    ]);

    // 2. Map to our internal vector
    const scores = ONetMapper.mapToVector(interests, workStyles, abilities, workValues);
    const targetVector = ONetMapper.toTargetVector(scores);

    return NextResponse.json({
      title: details.title || details.occupation?.title,
      description: details.description || details.occupation?.description,
      scores,
      targetVector
    });
  } catch (error: any) {
    console.error("GET /api/careerdna/admin/onet/details error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch O*NET details" }, { status: 500 });
  }
}
