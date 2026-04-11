import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="font-semibold text-lg text-gray-900">
            Home
          </Link>
          <div className="flex gap-6">
            <Link
              href="/about"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              About
            </Link>
            <Link
              href="/prayer"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Prayer
            </Link>
            <Link
              href="/fundraiser"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Fundraiser
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
