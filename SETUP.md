# Quick Setup Guide

## You're Almost Ready!

Your Next.js fundraiser website has been created. Here's what you need to do next:

### 1. Start the Development Server (Already Running!)

The server is currently running at: http://localhost:3000

To start it in the future:
```bash
npm run dev
```

### 2. Set Up Email Notifications (Required for Prayer Requests)

Create a `.env.local` file:
```bash
cp .env.example .env.local
```

Get a free Resend API key:
1. Go to https://resend.com
2. Sign up for a free account
3. Copy your API key
4. Add it to `.env.local`:

```
RESEND_API_KEY=re_your_api_key_here
NOTIFICATION_EMAIL=youremail@example.com
FROM_EMAIL=onboarding@resend.dev
```

### 3. Customize Your Content

#### Update Your About Page
Edit: `app/about/page.tsx`
- Add your personal story
- Explain your mission
- Share your vision

#### Update Fundraiser Details
Edit: `data/fundraiser.json`
- Set your fundraising goal
- Update current amount raised
- Add your real donation links (PayPal, Venmo, etc.)
- Add updates and milestones

#### Create Blog Posts
Add MDX files to: `content/posts/`
- Two sample posts are already there
- Copy the format to create new posts

### 4. Test the Site

Visit these pages:
- Home: http://localhost:3000
- About: http://localhost:3000/about
- Prayer: http://localhost:3000/prayer
- Fundraiser: http://localhost:3000/fundraiser
- Admin CMS: http://localhost:3000/admin

### 5. Update Navigation (Optional)

The navbar is in: `components/Navbar.tsx`
- Change the logo/home text
- Adjust styling
- Reorder links

### 6. Styling (Optional)

The site uses Tailwind CSS with a minimalist design:
- Global styles: `app/globals.css`
- Tailwind config: `tailwind.config.js`
- All components use Tailwind utility classes

### 7. When Ready to Deploy

#### Option A: Vercel (Recommended)
1. Push your code to GitHub
2. Go to https://vercel.com
3. Import your repository
4. Add environment variables
5. Deploy!

#### Option B: Netlify
1. Push your code to GitHub
2. Go to https://netlify.com
3. Import your repository
4. Add environment variables
5. Enable Netlify Identity for CMS
6. Deploy!

### 8. Using Decap CMS

After deploying, you can access `/admin` to:
- Create blog posts visually
- Update fundraiser progress
- Edit donation links
- Add updates

For local CMS testing:
1. Add `local_backend: true` to `public/admin/config.yml`
2. Run: `npx decap-server` in a separate terminal
3. Visit: http://localhost:3000/admin

## Next Steps

1. Customize the content to match your ministry
2. Add your real donation platform links
3. Set up Resend for email notifications
4. Write your first blog post
5. Test everything locally
6. Deploy to production

## Need Help?

Check the main README.md for detailed documentation on:
- Project structure
- Customization options
- Deployment guides
- Troubleshooting

---

**Your site is ready to go! Start by visiting http://localhost:3000**
