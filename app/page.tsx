import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';
import { Sparkles } from 'lucide-react';

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Playful header */}
      <div className="mb-16 text-center">
        <div className="inline-flex items-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-[#FF6B6B]" />
          <h1 className="text-5xl font-bold text-[#2D2D2D]">
            Latest Updates
          </h1>
          <Sparkles className="w-6 h-6 text-[#4ECDC4]" />
        </div>
        <p className="text-lg text-[#6B6B6B] max-w-2xl mx-auto">
          Stay updated with our journey and ministry adventures
        </p>
      </div>

      {/* Decorative wave divider */}
      <div className="wave-divider">
        ‿︵‿︵‿︵‿︵‿︵‿
      </div>

      {/* Posts grid */}
      <div className="space-y-8 mt-12">
        {posts.length === 0 ? (
          <div className="bg-white border-2 border-[#E8E8D8] rounded-2xl p-12 text-center">
            <p className="text-[#6B6B6B] text-lg">No posts yet. Check back soon! ✨</p>
          </div>
        ) : (
          posts.map((post, index) => (
            <article
              key={post.slug}
              className="bg-white border-2 border-[#E8E8D8] rounded-2xl p-8 hover:border-[#FF6B6B] hover:shadow-lg transition-all duration-300 group"
            >
              <Link href={`/posts/${post.slug}`}>
                <h2 className="text-3xl font-bold text-[#2D2D2D] mb-3 group-hover:text-[#FF6B6B] transition-colors">
                  {post.title}
                </h2>
              </Link>
              <time className="text-sm text-[#6B6B6B] mb-4 block font-medium">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              {post.excerpt && (
                <p className="text-[#2D2D2D] text-lg mb-6 leading-relaxed">{post.excerpt}</p>
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
