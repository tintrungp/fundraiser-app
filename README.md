# Fundraiser & Ministry Website

A modern, minimalist Next.js website for managing ministry updates, blog posts, prayer requests, and fundraising.

## Features

- **Home Page**: Blog-style feed displaying MDX posts
- **About Page**: Information about your ministry
- **Prayer Requests**: Form for submitting prayer requests with email notifications
- **Fundraiser**: Visual progress bar with donation links and updates
- **MDX Support**: Write blog posts in Markdown with React components
- **Tailwind CSS**: Clean, minimalist styling

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables (Optional - for Prayer Requests)

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your credentials:

```env
RESEND_API_KEY=your_resend_api_key_here
NOTIFICATION_EMAIL=your-email@example.com
FROM_EMAIL=onboarding@resend.dev
```

To get a Resend API key:
1. Sign up at [resend.com](https://resend.com)
2. Get your API key from the dashboard
3. Add it to your `.env.local` file

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
├── app/
│   ├── page.tsx              # Home page with blog feed
│   ├── about/page.tsx        # About page
│   ├── prayer/page.tsx       # Prayer request form
│   ├── fundraiser/page.tsx   # Fundraiser with progress bar
│   ├── posts/[slug]/page.tsx # Individual blog post pages
│   └── api/
│       └── prayer-request/   # API route for prayer submissions
├── components/
│   └── Navbar.tsx            # Sticky navigation bar
├── content/
│   └── posts/                # MDX blog posts (add your posts here!)
├── data/
│   └── fundraiser.json       # Fundraiser configuration
└── lib/
    └── mdx.ts                # MDX utilities
```

## Managing Content

### Adding Blog Posts

Create new `.mdx` files in the `content/posts/` directory:

**Example: `content/posts/my-new-post.mdx`**

```mdx
---
title: "My New Post Title"
date: "2024-01-20"
excerpt: "A brief summary that appears on the home page"
---

# My Post Heading

Write your content here using Markdown.

## Subheading

- Bullet points work
- Lists are supported
- **Bold** and *italic* text

You can write as much content as you need!
```

**The post will automatically appear on the home page** sorted by date.

### Updating Fundraiser Progress

Edit the `data/fundraiser.json` file:

```json
{
  "goal": 10000,
  "current": 5000,
  "currency": "USD",
  "title": "Support Our Mission",
  "description": "Help us reach our fundraising goal",
  "donationLinks": [
    {
      "platform": "PayPal",
      "url": "https://paypal.me/yourlink",
      "description": "One-time or recurring donations"
    }
  ],
  "updates": [
    {
      "date": "2024-01-20",
      "message": "Thank you for your support! We're at 50%!"
    }
  ]
}
```

**Changes to this file update:**
- Progress bar percentage (automatically calculated from goal/current)
- Donation links
- Fundraiser updates timeline

## Customization

### Update About Page

Edit `app/about/page.tsx` to tell your story and share your mission.

### Styling

All styling uses Tailwind CSS with a minimalist design:
- Edit component classes directly in the files
- Global styles: `app/globals.css`
- Tailwind config: `tailwind.config.js`

### Navigation

Edit `components/Navbar.tsx` to change:
- Logo/home text
- Navigation links
- Styling

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables (if using prayer requests)
5. Deploy

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Import your repository
4. Add environment variables (if using prayer requests)
5. Deploy

## Environment Variables

Only required if you want prayer request email notifications:

- `RESEND_API_KEY`: Your Resend API key for sending emails
- `NOTIFICATION_EMAIL`: Email address to receive prayer requests
- `FROM_EMAIL`: Email address to send from (must be verified in Resend)

## Quick Workflow

### To add a new blog post:
1. Create a new `.mdx` file in `content/posts/`
2. Add frontmatter (title, date, excerpt)
3. Write your content
4. Save the file
5. Refresh the site - it appears automatically!

### To update fundraiser:
1. Edit `data/fundraiser.json`
2. Update `current` amount
3. Add new updates with dates
4. Save the file
5. Refresh the site - progress bar updates!

### To customize pages:
1. Edit the page files in `app/`
2. Change text, add sections, modify layout
3. Save and see changes live!

## Features Overview

### Prayer Request System
- Form validation
- Email notifications via Resend API
- Success/error feedback
- Clean, accessible design

### Fundraiser Progress
- Visual progress bar (auto-calculates percentage)
- Multiple donation platform links
- Updates timeline
- Simple JSON configuration

### Blog with MDX
- Markdown support
- Automatic post listing on homepage
- Date formatting
- SEO-friendly URLs
- Individual post pages

## Next Steps

1. ✏️ Edit `app/about/page.tsx` with your personal story
2. 📝 Create your first blog post in `content/posts/`
3. 💰 Update `data/fundraiser.json` with your real donation links
4. 📧 (Optional) Set up Resend for prayer request emails
5. 🚀 Deploy to Vercel or Netlify

## Support

For issues or questions, refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Resend Documentation](https://resend.com/docs)

---

**Simple workflow: Edit MDX files for posts, edit JSON for fundraiser updates. No CMS needed!**
