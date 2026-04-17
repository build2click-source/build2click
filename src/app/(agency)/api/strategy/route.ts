import { NextResponse } from 'next/server';
import { AI_STRATEGY_RESULT } from '@/lib/constants';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { query } = body;

    if (!query || !query.trim()) {
      return NextResponse.json(
        { success: false, message: 'Please provide a business description.' },
        { status: 400 }
      );
    }

    // TODO: Integrate with real AI API (OpenAI, Gemini, etc.)
    // For now, return mock strategy result
    return NextResponse.json(
      { success: true, strategy: AI_STRATEGY_RESULT },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: 'Failed to generate strategy.' },
      { status: 500 }
    );
  }
}
