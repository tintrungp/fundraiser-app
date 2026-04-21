import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug, getAllPosts } from '@/lib/mdx';
import Link from 'next/link';

const TAG_STYLES: Record<string, { bg: string; text: string }> = {
  London: { bg: 'bg-[#FF6B6B]', text: 'text-white' },
  HFSD: { bg: 'bg-[#4ECDC4]', text: 'text-[#2D2D2D]' },
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/" className="text-gray-600 hover:text-gray-900 mb-8 inline-block">
        ← Back to home
      </Link>
      <article className="prose prose-gray max-w-none">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <div className="flex items-center gap-2 mb-8 flex-wrap">
          <time className="text-sm text-gray-500">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          {post.tags.map((tag) => {
            const style = TAG_STYLES[tag] ?? { bg: 'bg-[#E8E8D8]', text: 'text-[#2D2D2D]' };
            return (
              <span
                key={tag}
                className={`text-xs font-bold px-2 py-0.5 rounded-full ${style.bg} ${style.text}`}
              >
                {tag}
              </span>
            );
          })}
        </div>
        <div className="mt-8">
          <MDXRemote source={post.content} />
        </div>
      </article>
    </div>
  );
}
