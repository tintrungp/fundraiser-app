import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug, getAllPosts } from '@/lib/mdx';
import Link from 'next/link';

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
      <Link
        href="/"
        className="text-gray-600 hover:text-gray-900 mb-8 inline-block"
      >
        ← Back to home
      </Link>
      <article className="prose prose-gray max-w-none">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <time className="text-sm text-gray-500 mb-8 block">
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
        <div className="mt-8">
          <MDXRemote source={post.content} />
        </div>
      </article>
    </div>
  );
}
