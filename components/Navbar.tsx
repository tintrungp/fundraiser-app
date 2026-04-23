import Link from 'next/link';
import { Newspaper, Heart, MessageCircleHeart, Info } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-2 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-center gap-3 sm:gap-8 md:gap-12">
          <Link href="/" className="flex flex-col items-center gap-0.5 group">
            <div className="p-1.5 sm:p-2 rounded-full bg-gray-50 group-hover:bg-gray-100 transition-colors">
              <Newspaper className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-600 group-hover:text-[#FF6B6B] transition-colors">
              Updates
            </span>
          </Link>

          <Link href="/fundraiser" className="flex flex-col items-center gap-0.5 group">
            <div className="p-1.5 sm:p-2 rounded-full bg-gray-50 group-hover:bg-gray-100 transition-colors">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-600 group-hover:text-[#FF6B6B] transition-colors">
              Donation
            </span>
          </Link>

          <Link href="/" className="flex items-center justify-center group">
            <div className="text-3xl sm:text-5xl animate-spin-slow hover:animate-spin">
              ☺︎
            </div>
          </Link>

          <Link href="/prayer" className="flex flex-col items-center gap-0.5 group">
            <div className="p-1.5 sm:p-2 rounded-full bg-gray-50 group-hover:bg-gray-100 transition-colors">
              <MessageCircleHeart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-600 group-hover:text-[#FF6B6B] transition-colors">
              Prayer
            </span>
          </Link>

          <Link href="/about" className="flex flex-col items-center gap-0.5 group">
            <div className="p-1.5 sm:p-2 rounded-full bg-gray-50 group-hover:bg-gray-100 transition-colors">
              <Info className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-600 group-hover:text-[#FF6B6B] transition-colors">
              About
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
