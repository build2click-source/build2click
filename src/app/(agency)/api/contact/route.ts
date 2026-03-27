import { NextResponse } from 'next/server';
import { supabase } from '@/lib/agency/supabase';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy');

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    let body;
    try {
      body = JSON.parse(rawBody);
    } catch (parseError) {
      console.error('JSON Parse Error. Raw body received:', rawBody);
      return NextResponse.json({ error: 'Invalid JSON payload received', details: rawBody }, { status: 400 });
    }

    const { name, mobile, email, projectType, message } = body;

    if (!email || !mobile) {
      return NextResponse.json({ error: 'Mobile and Email are required' }, { status: 400 });
    }


    // Split name for legacy schema compatibility
    const safeName = (name || 'Lead').trim();
    const nameParts = safeName.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : ' ';


    // 1. Save to Supabase (append extra fields to message to avoid schema migrations)
    const { error: dbError } = await supabase
      .from('contact_messages')
      .insert([
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
          message: `Mobile: ${mobile}\nProject Type: ${projectType || 'None'}\n\n${message || 'No message provided'}`,

        },
      ]);

    if (dbError) {
      console.error('Supabase error:', dbError);
      return NextResponse.json({ error: 'Failed to save message to database' }, { status: 500 });
    }



    // 2. Email Notifications via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        const adminEmail = process.env.CONTACT_EMAIL_TO || 'hello@build2click.com';
        const brandColor = '#C8A153';

        // A. Notify Build2Click Admin
        const { error: adminAuthError } = await resend.emails.send({
          from: 'Build2Click <onboarding@resend.dev>',
          to: adminEmail,
          subject: `New Lead: ${safeName} - ${projectType || 'General Inquiry'}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #1C1C1C; color: #FFFFFF; padding: 40px; border-radius: 20px;">
              <h2 style="color: ${brandColor}; text-transform: uppercase;">New Project Briefing</h2>
              <div style="margin-bottom: 10px;"><strong>Client:</strong> ${safeName}</div>
              <div style="margin-bottom: 10px;"><strong>Mobile:</strong> ${mobile}</div>
              <div style="margin-bottom: 10px;"><strong>Email:</strong> ${email}</div>
              <div style="margin-bottom: 10px;"><strong>Project Type:</strong> ${projectType || 'Not specified'}</div>
              <div style="margin-top: 30px; border-top: 1px solid #333; padding-top: 20px;">
                <strong style="color: ${brandColor};">Briefing Message:</strong>
                <p style="line-height: 1.6; color: #DDD;">${(message || 'No message provided').replace(/\n/g, '<br/>')}</p>
              </div>
            </div>
          `,
        });

        if (adminAuthError) {
          console.error('RESEND ADMIN ALERT FAILED:', adminAuthError);
        }

        // B. Send Acknowledgment to User (Will inherently fail on Resend Free Tier without a verified domain, but structured safely to not crash)
        const { error: userAckError } = await resend.emails.send({
          from: 'Build2Click <onboarding@resend.dev>',
          to: email, // Free tier onboarding@resend.dev rejects sending to arbitrary emails
          subject: 'We have received your briefing - Build2Click',
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #FFFFFF; color: #1C1C1C; padding: 40px; border: 1px solid #EEE; border-radius: 20px;">
              <h2 style="color: ${brandColor}; text-transform: uppercase;">Build2Click</h2>
              <p>Hello ${safeName.split(' ')[0]},</p>
              <p>We have received your project briefing. Our strategists will respond within 24 business hours.</p>
              <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #EEE; font-size: 12px; color: #999;">
                <strong>Build2Click Digital</strong>
              </div>
            </div>
          `,
        });

        if (userAckError) {
          console.error('RESEND USER ACKNOWLEDGMENT FAILED (Likely free tier limitation):', userAckError);
        }

      } catch (emailException) {
        console.error('Critical Resend exception:', emailException);
      }
    }

    return NextResponse.json({ success: true, message: 'Message saved to database and email dispatch attempted.' }, { status: 200 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
