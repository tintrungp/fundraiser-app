import Link from 'next/link';
import { getAllPosts, getYouTubeId } from '@/lib/mdx';
import { Sparkles, FileText } from 'lucide-react';
import SubscribeForm from '@/components/SubscribeForm';

const TAG_STYLES: Record<string, { bg: string; text: string }> = {
  London: { bg: 'bg-[#FF6B6B]', text: 'text-white' },
  HFSD: { bg: 'bg-[#4ECDC4]', text: 'text-[#2D2D2D]' },
};

function PostThumbnail({ post }: { post: { coverImage?: string; youtubeUrl?: string; pdfUrl?: string; title: string } }) {
  if (post.youtubeUrl) {
    const id = getYouTubeId(post.youtubeUrl);
    if (id) {
      return (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
            alt={`Thumbnail for ${post.title}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      );
    }
  }

  if (post.coverImage) {
    return (
      <div className="w-full aspect-video rounded-xl overflow-hidden mb-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.coverImage}
          alt={`Cover for ${post.title}`}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  if (post.pdfUrl) {
    return (
      <div className="w-full rounded-xl bg-[#F5F5DC] border-2 border-[#E8E8D8] flex items-center gap-3 px-5 py-4 mb-5">
        <FileText className="w-7 h-7 text-[#FF6B6B] shrink-0" />
        <span className="text-sm text-[#6B6B6B] font-medium">PDF attachment included</span>
      </div>
    );
  }

  return null;
}

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <div className="mb-10 sm:mb-16 text-center">
        <div className="inline-flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF6B6B]" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D2D2D]">
            Trungy&apos;s Latest Updates!
          </h1>
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#4ECDC4]" />
        </div>
        <p className="text-base sm:text-lg text-[#6B6B6B] max-w-2xl mx-auto mb-6">
          Recent news, updates, and everything in between.
        </p>
        <SubscribeForm />
      </div>

      <div className="space-y-6 sm:space-y-8">
        {posts.length === 0 ? (
          <div className="bg-white border-2 border-[#E8E8D8] rounded-2xl p-8 sm:p-12 text-center">
            <p className="text-[#6B6B6B] text-lg">No posts yet. Check back soon! ✨</p>
          </div>
        ) : (
          posts.map((post) => (
            <article
              key={post.slug}
              className="bg-white border-2 border-[#E8E8D8] rounded-2xl p-5 sm:p-8 hover:border-[#FF6B6B] hover:shadow-lg transition-all duration-300 group"
            >
              <PostThumbnail post={post} />
              <Link href={`/posts/${post.slug}`}>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#2D2D2D] mb-3 group-hover:text-[#FF6B6B] transition-colors">
                  {post.title}
                </h2>
              </Link>
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <time className="text-sm text-[#6B6B6B] font-medium">
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
              {post.excerpt && (
                <p className="text-[#2D2D2D] text-base sm:text-lg mb-6 leading-relaxed">{post.excerpt}</p>
              )}
              <Link
                href={`/posts/${post.slug}`}
                className="inline-flex items-center gap-2 text-[#FF6B6B] font-semibold hover:gap-3 transition-all"
              >
                Read more
                <span className="text-xl">→</span>
              </Link>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
