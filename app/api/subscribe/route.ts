import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Add to Resend audience if an audience ID is configured
    if (process.env.RESEND_AUDIENCE_ID) {
      await resend.contacts.create({
        email,
        audienceId: process.env.RESEND_AUDIENCE_ID,
        unsubscribed: false,
      });
    }

    // Notify the site owner of the new subscriber
    if (process.env.NOTIFICATION_EMAIL) {
      await resend.emails.send({
        from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
        to: process.env.NOTIFICATION_EMAIL,
        subject: `New subscriber: ${email}`,
        html: `<p>A new visitor subscribed to your updates: <strong>${email}</strong></p>`,
      });
    }

    return NextResponse.json({ message: 'Subscribed successfully' }, { status: 200 });
  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}
