import fundraiserData from '@/data/fundraiser.json';
import { Heart, Sparkles, TrendingUp } from 'lucide-react';

export default function Fundraiser() {
  const { goal, current, currency, title, description, donationLinks, updates } =
    fundraiserData;
  const percentage = Math.min((current / goal) * 100, 100);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 mb-4">
          <Heart className="w-8 h-8 text-[#FF6B6B] fill-current" />
          <h1 className="text-5xl font-bold text-[#2D2D2D]">{title}</h1>
        </div>
        <p className="text-lg text-[#6B6B6B] max-w-2xl mx-auto">{description}</p>
      </div>

      {/* Progress Card */}
      <div className="bg-white border-2 border-[#E8E8D8] rounded-3xl p-10 mb-12 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-6 h-6 text-[#4ECDC4]" />
          <h2 className="text-2xl font-bold text-[#2D2D2D]">Progress</h2>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-baseline mb-4">
            <span className="text-4xl font-bold text-[#FF6B6B]">
              {formatCurrency(current)}
            </span>
            <span className="text-[#6B6B6B] font-medium">
              of {formatCurrency(goal)}
            </span>
          </div>

          {/* Playful progress bar */}
          <div className="relative w-full bg-[#F5F5DC] rounded-full h-6 overflow-hidden border-2 border-[#E8E8D8]">
            <div
              className="bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] h-full rounded-full transition-all duration-700 ease-out flex items-center justify-end pr-2"
              style={{ width: `${percentage}%` }}
            >
              {percentage > 15 && (
                <Sparkles className="w-4 h-4 text-white" />
              )}
            </div>
          </div>

          <div className="flex justify-between items-center mt-3">
            <p className="text-lg font-bold text-[#4ECDC4]">
              {percentage.toFixed(1)}% funded
            </p>
            <p className="text-sm text-[#6B6B6B]">
              {formatCurrency(goal - current)} to go!
            </p>
          </div>
        </div>
      </div>

      {/* Decorative wave divider */}
      <div className="wave-divider">
        ‿︵‿︵‿︵‿︵‿︵‿
      </div>

      {/* Donation Links */}
      <div className="mb-16 mt-12">
        <h2 className="text-3xl font-bold text-[#2D2D2D] mb-8 text-center">
          Ways to Give
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {donationLinks.map((link, index) => {
            const colors = [
              { bg: 'bg-[#FFE66D]', hover: 'hover:border-[#FFE66D]' },
              { bg: 'bg-[#FF6B6B]', hover: 'hover:border-[#FF6B6B]' },
              { bg: 'bg-[#4ECDC4]', hover: 'hover:border-[#4ECDC4]' }
            ];
            const color = colors[index % colors.length];

            return (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-white border-2 border-[#E8E8D8] ${color.hover} rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group`}
              >
                <div className={`w-12 h-12 ${color.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Heart className="w-6 h-6 text-[#2D2D2D]" />
                </div>
                <h3 className="text-2xl font-bold text-[#2D2D2D] mb-2">
                  {link.platform}
                </h3>
                <p className="text-[#6B6B6B] text-sm mb-4">{link.description}</p>
                <span className="inline-flex items-center gap-2 text-[#FF6B6B] font-semibold group-hover:gap-3 transition-all">
                  Donate
                  <span className="text-xl">→</span>
                </span>
              </a>
            );
          })}
        </div>
      </div>

      {/* Updates */}
      {updates.length > 0 && (
        <div>
          <h2 className="text-3xl font-bold text-[#2D2D2D] mb-8 text-center">
            Recent Updates
          </h2>
          <div className="space-y-6">
            {updates.map((update, index) => (
              <div
                key={index}
                className="bg-white border-2 border-[#E8E8D8] rounded-2xl p-8 hover:border-[#4ECDC4] transition-colors"
              >
                <time className="text-sm text-[#6B6B6B] block mb-3 font-medium">
                  {new Date(update.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <p className="text-[#2D2D2D] text-lg leading-relaxed">{update.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
