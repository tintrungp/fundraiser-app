# Fundraiser & Ministry Website

A modern, minimalist Next.js website for managing ministry updates, blog posts, prayer requests, and fundraising.

## Features

- **Home Page**: Blog-style feed displaying MDX posts
- **About Page**: Information about your ministry
- **Prayer Requests**: Form for submitting prayer requests with email notifications
- **Fundraiser**: Visual progress bar with donation links and updates
- **Decap CMS**: Visual admin portal for managing content
- **MDX Support**: Write blog posts in Markdown with React components
- **Tailwind CSS**: Clean, minimalist styling

## Getting Started

### 1. Install Dependencies

The project is already initialized. Make sure all dependencies are installed:

```bash
npm install
```

### 2. Set Up Environment Variables

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
│   └── posts/                # MDX blog posts
├── data/
│   └── fundraiser.json       # Fundraiser configuration
├── lib/
│   └── mdx.ts               # MDX utilities
└── public/
    └── admin/               # Decap CMS admin portal
```

## Managing Content

### Blog Posts

Add new blog posts by creating `.mdx` files in `content/posts/`:

```mdx
---
title: "Your Post Title"
date: "2024-01-15"
excerpt: "A brief summary of your post"
---

# Your content here

Write your post content using Markdown.
```

### Fundraiser Updates

Edit `data/fundraiser.json` to update:
- Goal and current amounts
- Donation platform links
- Updates and messages

### Using Decap CMS

Access the admin portal at `/admin` when the site is deployed. You'll need to:

1. Set up Netlify Identity or another authentication provider
2. Configure Git Gateway in your Netlify settings
3. Access `/admin` to manage content visually

For local development, you can use the local backend mode by adding to `public/admin/config.yml`:

```yaml
local_backend: true
```

Then run: `npx decap-server`

## Customization

### Update Fundraiser Data

Edit `data/fundraiser.json`:
- Change goal and current amounts
- Update donation links
- Add updates

### Modify About Page

Edit `app/about/page.tsx` to customize your story and mission.

### Styling

All styling uses Tailwind CSS. The design is intentionally minimal and clean. Customize by:
- Editing component classes
- Modifying `tailwind.config.js`
- Updating `app/globals.css`

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

### Deploy to Netlify

1. Push your code to GitHub
2. Import your repository in [Netlify](https://netlify.com)
3. Add environment variables in Netlify dashboard
4. Enable Netlify Identity for Decap CMS
5. Deploy

## Environment Variables

Required for production:

- `RESEND_API_KEY`: Your Resend API key for sending emails
- `NOTIFICATION_EMAIL`: Email address to receive prayer requests
- `FROM_EMAIL`: Email address to send from (must be verified in Resend)

## Features Overview

### Prayer Request System

- Form validation
- Email notifications via Resend API
- Success/error feedback
- Clean, accessible design

### Fundraiser Progress

- Visual progress bar
- Automatic percentage calculation
- Multiple donation platform links
- Updates timeline
- JSON-based configuration (easy to update via CMS)

### Blog with MDX

- Markdown support with React components
- Automatic post listing
- Date formatting
- SEO-friendly URLs

### Decap CMS Integration

- Visual editor for blog posts
- JSON file editing for fundraiser
- Git-based workflow
- No database required

## Next Steps

1. Add your actual donation links in `data/fundraiser.json`
2. Write your personal story in the About page
3. Create your first blog posts
4. Set up Resend and add environment variables
5. Deploy to Vercel or Netlify
6. Configure Decap CMS authentication

## Support

For issues or questions, refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Decap CMS Documentation](https://decapcms.org/docs/)
- [Resend Documentation](https://resend.com/docs)
