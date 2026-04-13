import { NextRequest, NextResponse } from "next/server";
import { careerdnaPrisma } from "@/lib/prisma-careerdna";
import { hash } from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 });
    }

    const existing = await careerdnaPrisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
    }

    const hashedPassword = await hash(password, 10);
    const user = await careerdnaPrisma.user.create({
      data: { email, password: hashedPassword, role: "STUDENT" },
    });

    return NextResponse.json({ message: "Account created successfully.", userId: user.id }, { status: 201 });
  } catch (error) {
    console.error("CareerDNA registration error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
