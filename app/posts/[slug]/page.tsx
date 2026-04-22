import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug, getAllPosts, getYouTubeId } from '@/lib/mdx';
import Link from 'next/link';
import { FileText } from 'lucide-react';

const TAG_STYLES: Record<string, { bg: string; text: string }> = {
  London: { bg: 'bg-[#FF6B6B]', text: 'text-white' },
  HFSD: { bg: 'bg-[#4ECDC4]', text: 'text-[#2D2D2D]' },
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
        className="inline-flex items-center gap-2 px-5 py-3 bg-[#F5F5DC] border-2 border-[#E8E8D8] hover:border-[#FF6B6B] rounded-xl text-[#2D2D2D] font-medium transition-colors"
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

  const youtubeId = post.youtubeUrl ? getYouTubeId(post.youtubeUrl) : null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      <Link href="/" className="text-[#6B6B6B] hover:text-[#FF6B6B] mb-6 sm:mb-8 inline-block transition-colors text-sm font-medium">
        ← Back to home
      </Link>

      {/* Featured media (from frontmatter) */}
      {youtubeId && (
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-6 shadow-md">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title={post.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      )}
      {!youtubeId && post.coverImage && (
        <div className="w-full aspect-video rounded-2xl overflow-hidden mb-6 shadow-md">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}

      <article>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#2D2D2D] mb-3">{post.title}</h1>
        <div className="flex items-center gap-2 mb-8 flex-wrap">
          <time className="text-sm text-[#6B6B6B]">
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
