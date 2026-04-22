import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
  coverImage?: string;
  youtubeUrl?: string;
  pdfUrl?: string;
}

function parsePost(slug: string, fileContents: string): Post {
  const { data, content } = matter(fileContents);
  return {
    slug,
    title: data.title || slug,
    date: data.date || new Date().toISOString(),
    excerpt: data.excerpt || '',
    content,
    tags: Array.isArray(data.tags) ? data.tags : data.tags ? [data.tags] : [],
    coverImage: data.coverImage || undefined,
    youtubeUrl: data.youtubeUrl || undefined,
    pdfUrl: data.pdfUrl || undefined,
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) return [];

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((f) => f.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fileContents = fs.readFileSync(
        path.join(postsDirectory, fileName),
        'utf8'
      );
      return parsePost(slug, fileContents);
    });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    return parsePost(slug, fileContents);
  } catch {
    return null;
  }
}
