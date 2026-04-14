# Simplified Workflow - No CMS Required!

All Decap CMS components have been removed. Your site now uses a simple, direct workflow:

## How to Update Content

### 1. Add a New Blog Post

Create a new `.mdx` file in `content/posts/`:

```bash
# Example: content/posts/my-new-post.mdx
```

```mdx
---
title: "My Amazing Post"
date: "2024-04-12"
excerpt: "This is a short summary"
---

# My Post Content

Write your content here using **Markdown**.

- Lists work
- Images work
- Everything markdown does!
```

**Save the file** → Post appears automatically on homepage!

### 2. Update Fundraiser Progress

Edit `data/fundraiser.json`:

```json
{
  "goal": 10000,
  "current": 7500,
  "currency": "USD",
  "title": "Support Our Mission",
  "description": "Help us reach our goal",
  "donationLinks": [
    {
      "platform": "PayPal",
      "url": "https://paypal.me/yourlink",
      "description": "One-time or recurring"
    }
  ],
  "updates": [
    {
      "date": "2024-04-12",
      "message": "We're at 75% - thank you!"
    }
  ]
}
```

**Save the file** → Progress bar updates automatically!

## What Was Removed

- ✓ Decap CMS admin portal (`/admin`)
- ✓ decap-server package
- ✓ CMS configuration files
- ✓ Admin documentation

## What You Have Now

✓ **Simple MDX files** for blog posts
✓ **Simple JSON file** for fundraiser data
✓ **Direct file editing** - no admin interface needed
✓ **Automatic updates** - just save and refresh

## Quick Reference

| To Update... | Edit This File... |
|-------------|-------------------|
| Blog posts | `content/posts/*.mdx` |
| Fundraiser progress | `data/fundraiser.json` |
| About page | `app/about/page.tsx` |
| Prayer page | `app/prayer/page.tsx` |
| Navigation | `components/Navbar.tsx` |

## Running the Site

**One terminal, one command:**

```bash
npm run dev
```

That's it! No second terminal, no CMS server needed.

---

**Super simple: Edit files directly, save, refresh browser. Done!**
