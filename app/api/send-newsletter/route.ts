import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getPostBySlug } from '@/lib/mdx';

function buildEmailHtml(opts: {
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  postUrl: string;
}) {
  const tagPills = opts.tags
    .map(
      (t) =>
        `<span style="display:inline-block;padding:2px 10px;border-radius:99px;font-size:12px;font-weight:700;margin-right:6px;background:${t === 'London' ? '#FF6B6B' : '#4ECDC4'};color:${t === 'London' ? '#fff' : '#111827'}">${t}</span>`
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:system-ui,-apple-system,sans-serif">
  <div style="max-width:600px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb">
    <!-- Header bar -->
    <div style="background:linear-gradient(135deg,#FF6B6B,#4ECDC4);padding:24px 32px">
      <p style="margin:0;color:#fff;font-size:13px;font-weight:600;letter-spacing:0.05em;text-transform:uppercase">New update from Trungy</p>
    </div>

    <!-- Body -->
    <div style="padding:32px">
      <h1 style="margin:0 0 8px;font-size:28px;font-weight:800;color:#111827;line-height:1.25">${opts.title}</h1>
      <p style="margin:0 0 16px;font-size:13px;color:#6b7280">${opts.date}</p>
      ${tagPills ? `<div style="margin-bottom:20px">${tagPills}</div>` : ''}
      ${opts.excerpt ? `<p style="margin:0 0 28px;font-size:16px;color:#374151;line-height:1.7">${opts.excerpt}</p>` : ''}
      <a href="${opts.postUrl}" style="display:inline-block;background:#FF6B6B;color:#fff;text-decoration:none;padding:14px 28px;border-radius:10px;font-weight:700;font-size:15px">
        Read the full post →
      </a>
    </div>

    <!-- Footer -->
    <div style="padding:24px 32px;border-top:1px solid #e5e7eb;background:#f9fafb">
      <p style="margin:0;font-size:12px;color:#9ca3af">
        You received this because you subscribed to updates on Trungy's fundraiser site.
        If you no longer want these emails, just reply and let me know!
      </p>
    </div>
  </div>
</body>
</html>`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, secret } = body;

    if (!secret || secret !== process.env.NEWSLETTER_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!slug || typeof slug !== 'string') {
      return NextResponse.json({ error: 'slug is required' }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: 'RESEND_API_KEY not configured' }, { status: 500 });
    }

    if (!process.env.RESEND_AUDIENCE_ID) {
      return NextResponse.json({ error: 'RESEND_AUDIENCE_ID not configured' }, { status: 500 });
    }

    const post = getPostBySlug(slug);
    if (!post) {
      return NextResponse.json({ error: `Post "${slug}" not found` }, { status: 404 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? '';

    // Fetch all subscribers from the Resend audience
    const contactsRes = await resend.contacts.list({ audienceId: process.env.RESEND_AUDIENCE_ID });
    if (contactsRes.error) {
      return NextResponse.json({ error: contactsRes.error.message }, { status: 500 });
    }

    const contacts = (contactsRes.data?.data ?? []).filter((c) => !c.unsubscribed);

    if (contacts.length === 0) {
      return NextResponse.json({ message: 'No subscribers yet', sent: 0 }, { status: 200 });
    }

    const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const html = buildEmailHtml({
      title: post.title,
      date: formattedDate,
      tags: post.tags,
      excerpt: post.excerpt,
      postUrl: `${siteUrl}/posts/${post.slug}`,
    });

    // Send to each subscriber (suitable for small-to-medium lists)
    const results = await Promise.allSettled(
      contacts.map((contact) =>
        resend.emails.send({
          from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
          to: contact.email,
          subject: post.title,
          html,
        })
      )
    );

    const sent = results.filter((r) => r.status === 'fulfilled').length;
    const failed = results.length - sent;

    return NextResponse.json({ message: 'Newsletter sent', sent, failed }, { status: 200 });
  } catch (error) {
    console.error('Newsletter error:', error);
    return NextResponse.json({ error: 'Failed to send newsletter' }, { status: 500 });
  }
}
