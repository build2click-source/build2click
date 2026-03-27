import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI((process.env.GEMINI_API_KEY || '').trim());

export async function POST(req: NextRequest) {
    try {
        const { prompt } = await req.json();

        if (!prompt || typeof prompt !== 'string' || prompt.trim().length < 5) {
            return NextResponse.json({ error: 'Please provide a valid business description.' }, { status: 400 });
        }

        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

const systemPrompt = `You are an elite digital strategy consultant at Build2Click. 
Provide a high-precision, actionable digital roadmap for the business idea below.

Formatting Guidelines:
- Use clear, bold headings for major sections.
- Use bullet points for specific action items and technical recommendations.
- Keep the tone professional, premium, and concise.
- Limit the total response to under 300 words.
- Do NOT provide any timelines, durations, or deadline estimates.
- Format with clean Markdown for optimal rendering.


Client's business idea: "${prompt.trim()}"`;

        const result = await model.generateContent(systemPrompt);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ strategy: text });
    } catch (error: any) {
        console.error('AI API error details:', error);
        
        // Handle specific API error responses
        const status = error.status || 500;
        const message = error.message || 'Failed to generate strategy. Please try again later.';
        
        return NextResponse.json(
            { error: message, details: error.errorDetails },
            { status: status }
        );

    }
}

