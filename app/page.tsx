import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome
        </h1>
        <p className="text-lg text-gray-600">
          Stay updated with our latest posts and ministry updates.
        </p>
      </div>

      <div className="space-y-8">
        {posts.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
            <p className="text-gray-600">No posts yet. Check back soon!</p>
          </div>
        ) : (
          posts.map((post) => (
            <article
              key={post.slug}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <Link href={`/posts/${post.slug}`}>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2 hover:text-gray-700">
                  {post.title}
                </h2>
              </Link>
              <time className="text-sm text-gray-500 mb-4 block">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              {post.excerpt && (
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
              )}
              <Link
                href={`/posts/${post.slug}`}
                className="text-gray-900 font-medium hover:underline"
              >
                Read more →
              </Link>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
