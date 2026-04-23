import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E8E8D8]">
      <div className="max-w-4xl mx-auto px-2 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-center gap-3 sm:gap-8 md:gap-12">

          {/* Updates */}
          <Link href="/" className="flex flex-col items-center gap-0.5 group">
            <div className="p-1.5 sm:p-2 rounded-full bg-white group-hover:bg-[#FFE66D] transition-colors">
              <img src="/updates.svg" alt="Updates" className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-[#2D2D2D] group-hover:text-[#FF6B6B] transition-colors">
              Updates
            </span>
          </Link>

          {/* Donation */}
          <Link href="/fundraiser" className="flex flex-col items-center gap-0.5 group">
            <div className="p-1.5 sm:p-2 rounded-full bg-white group-hover:bg-[#FFE66D] transition-colors">
              <img src="/donate.svg" alt="Donation" className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-[#2D2D2D] group-hover:text-[#FF6B6B] transition-colors">
              Donation
            </span>
          </Link>

          {/* Spinning Sun — center */}
          <Link href="/" className="flex items-center justify-center">
            <img
              src="/sun.svg"
              alt="Home"
              className="w-10 h-10 sm:w-14 sm:h-14 animate-spin-slow hover:[animation-play-state:paused]"
            />
          </Link>

          {/* Prayer */}
          <Link href="/prayer" className="flex flex-col items-center gap-0.5 group">
            <div className="p-1.5 sm:p-2 rounded-full bg-white group-hover:bg-[#FFE66D] transition-colors">
              <img src="/prayer.svg" alt="Prayer" className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-[#2D2D2D] group-hover:text-[#FF6B6B] transition-colors">
              Prayer
            </span>
          </Link>

          {/* About */}
          <Link href="/about" className="flex flex-col items-center gap-0.5 group">
            <div className="p-1.5 sm:p-2 rounded-full bg-white group-hover:bg-[#FFE66D] transition-colors">
              <img src="/about.svg" alt="About" className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-[#2D2D2D] group-hover:text-[#FF6B6B] transition-colors">
              About
            </span>
          </Link>

        </div>
      </div>
    </nav>
  );
}
