import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, request: prayerRequest } = body;

    if (!name || !email || !prayerRequest) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    if (!process.env.NOTIFICATION_EMAIL) {
      console.error('NOTIFICATION_EMAIL is not set');
      return NextResponse.json(
        { error: 'Notification email not configured' },
        { status: 500 }
      );
    }

    await resend.emails.send({
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: process.env.NOTIFICATION_EMAIL,
      subject: `New Prayer Request from ${name}`,
      html: `
        <h2>New Prayer Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <h3>Prayer Request:</h3>
        <p>${prayerRequest}</p>
      `,
    });

    return NextResponse.json(
      { message: 'Prayer request submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing prayer request:', error);
    return NextResponse.json(
      { error: 'Failed to process prayer request' },
      { status: 500 }
    );
  }
}
