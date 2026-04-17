import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, mobile, email, projectType, message } = body;

    // Log the contact form submission
    console.log('Contact form submission:', { name, mobile, email, projectType, message });

    // TODO: Integrate with email service (Resend, Nodemailer, etc.)
    // TODO: Or save to database

    return NextResponse.json(
      { success: true, message: 'Message received successfully.' },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: 'Failed to process your message.' },
      { status: 500 }
    );
  }
}
