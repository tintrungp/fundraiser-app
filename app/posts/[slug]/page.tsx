import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug, getAllPosts } from '@/lib/mdx';
import { getYouTubeId } from '@/lib/utils';
import Link from 'next/link';
import { FileText } from 'lucide-react';

const TAG_STYLES: Record<string, { bg: string; text: string }> = {
  London: { bg: 'bg-[#FF6B6B]', text: 'text-white' },
  'Hope for SD': { bg: 'bg-[#4ECDC4]', text: 'text-gray-900' },
};

function YouTubeEmbed({ url, id }: { url?: string; id?: string }) {
  const videoId = id ?? (url ? getYouTubeId(url) : null);
  if (!videoId) return null;
  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden my-6 shadow-md">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}

function PDFEmbed({ url, label }: { url: string; label?: string }) {
  return (
    <div className="my-6">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-3 bg-gray-50 border-2 border-gray-200 hover:border-[#FF6B6B] rounded-xl text-gray-900 font-medium transition-colors"
      >
        <FileText className="w-5 h-5 text-[#FF6B6B]" />
        {label || 'View PDF'}
      </a>
    </div>
  );
}

const mdxComponents = { YouTubeEmbed, PDFEmbed };

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      <Link
        href="/"
        className="text-gray-500 hover:text-[#FF6B6B] mb-6 sm:mb-8 inline-block transition-colors text-sm font-medium"
      >
        ← Back to home
      </Link>

      {/* Cover image from frontmatter (not shown for YouTube — use <YouTubeEmbed> in body) */}
      {post.coverImage && (
        <div className="w-full aspect-video rounded-2xl overflow-hidden mb-6 shadow-md">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}

      <article>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">{post.title}</h1>
        <div className="flex items-center gap-2 mb-8 flex-wrap">
          <time className="text-sm text-gray-500">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          {post.tags.map((tag) => {
            const style = TAG_STYLES[tag] ?? { bg: 'bg-gray-200', text: 'text-gray-900' };
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
        <div className="prose prose-gray max-w-none">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>
        {post.pdfUrl && (
          <PDFEmbed url={post.pdfUrl} label="Download PDF" />
        )}
      </article>
    </div>
  );
}
