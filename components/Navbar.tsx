import Link from 'next/link';
import { Newspaper, Heart, MessageCircleHeart, Info } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#FFFFED]/95 backdrop-blur-sm border-b border-[#E8E8D8]">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-center gap-8 md:gap-12">
          {/* Updates */}
          <Link
            href="/"
            className="flex flex-col items-center gap-1 group"
          >
            <div className="p-2 rounded-full bg-white group-hover:bg-[#FFE66D] transition-colors">
              <Newspaper className="w-5 h-5 text-[#2D2D2D]" />
            </div>
            <span className="text-sm font-medium text-[#2D2D2D] group-hover:text-[#FF6B6B] transition-colors">
              Updates
            </span>
          </Link>

          {/* Donation */}
          <Link
            href="/fundraiser"
            className="flex flex-col items-center gap-1 group"
          >
            <div className="p-2 rounded-full bg-white group-hover:bg-[#FFE66D] transition-colors">
              <Heart className="w-5 h-5 text-[#2D2D2D]" />
            </div>
            <span className="text-sm font-medium text-[#2D2D2D] group-hover:text-[#FF6B6B] transition-colors">
              Donation
            </span>
          </Link>

          {/* Spinning Smiley Face - Center */}
          <Link
            href="/"
            className="flex items-center justify-center group"
          >
            <div className="text-5xl animate-spin-slow hover:animate-spin">
              ☺︎
            </div>
          </Link>

          {/* Prayer */}
          <Link
            href="/prayer"
            className="flex flex-col items-center gap-1 group"
          >
            <div className="p-2 rounded-full bg-white group-hover:bg-[#FFE66D] transition-colors">
              <MessageCircleHeart className="w-5 h-5 text-[#2D2D2D]" />
            </div>
            <span className="text-sm font-medium text-[#2D2D2D] group-hover:text-[#FF6B6B] transition-colors">
              Prayer
            </span>
          </Link>

          {/* About */}
          <Link
            href="/about"
            className="flex flex-col items-center gap-1 group"
          >
            <div className="p-2 rounded-full bg-white group-hover:bg-[#FFE66D] transition-colors">
              <Info className="w-5 h-5 text-[#2D2D2D]" />
            </div>
            <span className="text-sm font-medium text-[#2D2D2D] group-hover:text-[#FF6B6B] transition-colors">
              About
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
