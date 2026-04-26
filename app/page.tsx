import { getAllPosts } from '@/lib/mdx';
import { Sparkles } from 'lucide-react';
import SubscribeForm from '@/components/SubscribeForm';
import PostsFilter from '@/components/PostsFilter';

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <div className="mb-10 sm:mb-12 text-center">
        <div className="inline-flex items-center gap-2 mb-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D2D2D]">
            Trungy&apos;s Latest Updates!
          </h1>
        </div>
        <p className="text-base sm:text-lg text-[#6B6B6B] max-w-2xl mx-auto mb-6">
          Recent news, updates, and everything in between.
        </p>
        <SubscribeForm />
      </div>

      <PostsFilter posts={posts} />
    </div>
  );
}
