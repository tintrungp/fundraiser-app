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
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF6B6B]" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            Trungy&apos;s Latest Updates!
          </h1>
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#4ECDC4]" />
        </div>
        <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto mb-6">
          Recent news, updates, and everything in between.
        </p>
        <SubscribeForm />
      </div>

      <PostsFilter posts={posts} />
    </div>
  );
}
