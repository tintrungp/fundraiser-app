import fundraiserData from '@/data/fundraiser.json';
import { Heart, Sparkles, TrendingUp, ExternalLink } from 'lucide-react';

const TAG_STYLES: Record<string, { bg: string; text: string }> = {
  London: { bg: 'bg-[#FF6B6B]', text: 'text-white' },
  'Hope for SD': { bg: 'bg-[#4ECDC4]', text: 'text-[#2D2D2D]' },
};

const MISSION_COLORS = [
  { from: 'from-[#FF6B6B]', to: 'to-[#FFE66D]', accent: 'text-[#FF6B6B]', hoverBorder: 'hover:border-[#FF6B6B]', hoverShadow: 'hover:shadow-[#FF6B6B]/20' },
  { from: 'from-[#4ECDC4]', to: 'to-[#FFE66D]', accent: 'text-[#4ECDC4]', hoverBorder: 'hover:border-[#4ECDC4]', hoverShadow: 'hover:shadow-[#4ECDC4]/20' },
];

export default function Fundraiser() {
  const { currency, title, description, missions, donationLinks, updates } = fundraiserData;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center mb-10 sm:mb-16">
        <div className="inline-flex items-center gap-2 mb-4">
          <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-[#FF6B6B] fill-current" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D2D2D]">{title}</h1>
        </div>
        <p className="text-base sm:text-lg text-[#6B6B6B] max-w-2xl mx-auto">{description}</p>
      </div>

      {/* Mission Progress Cards — clickable, open in new tab */}
      <div className="mb-10 sm:mb-12">
        <div className="flex items-center gap-2 mb-6 sm:mb-8">
          <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-[#4ECDC4]" />
          <h2 className="text-xl sm:text-2xl font-bold text-[#2D2D2D]">Progress</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {missions.map((mission, index) => {
            const pct = Math.min((mission.current / mission.goal) * 100, 100);
            const colors = MISSION_COLORS[index % MISSION_COLORS.length];
            return (
              <a
                key={mission.id}
                href={mission.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group block bg-white border-2 border-[#E8E8D8] ${colors.hoverBorder} rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer`}
              >
                <div className="flex items-start justify-between mb-4 sm:mb-5">
                  <h3 className={`text-lg sm:text-xl font-bold ${colors.accent}`}>
                    {mission.name}
                  </h3>
                  <ExternalLink className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${colors.accent}`} />
                </div>
                <div className="flex justify-between items-baseline mb-3">
                  <span className={`text-2xl sm:text-3xl font-bold ${colors.accent}`}>
                    {formatCurrency(mission.current)}
                  </span>
                  <span className="text-[#6B6B6B] font-medium text-xs sm:text-sm">
                    of {formatCurrency(mission.goal)}
                  </span>
                </div>
                <div className="relative w-full bg-[#F5F5DC] rounded-full h-4 sm:h-5 overflow-hidden border border-[#E8E8D8] mb-3">
                  <div
                    className={`bg-gradient-to-r ${colors.from} ${colors.to} h-full rounded-full transition-all duration-700 ease-out flex items-center justify-end pr-2`}
                    style={{ width: `${pct}%` }}
                  >
                    {pct > 20 && <Sparkles className="w-3 h-3 text-white" />}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <p className={`font-bold text-sm sm:text-base ${colors.accent}`}>{pct.toFixed(1)}% funded</p>
                  <p className="text-xs sm:text-sm text-[#6B6B6B]">{formatCurrency(mission.goal - mission.current)} to go!</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Decorative wave divider */}
      <div className="text-center text-[#E8E8D8] text-lg mb-0">‿︵‿︵‿︵‿︵‿︵‿</div>

      {/* Donation Links */}
      <div className="mb-10 sm:mb-16 mt-8 sm:mt-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#2D2D2D] mb-6 sm:mb-8 text-center">
          Ways to Give
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {donationLinks.map((link, index) => {
            const colors = [
              { bg: 'bg-[#FFE66D]', hover: 'hover:border-[#FFE66D]' },
              { bg: 'bg-[#FF6B6B]', hover: 'hover:border-[#FF6B6B]' },
              { bg: 'bg-[#4ECDC4]', hover: 'hover:border-[#4ECDC4]' },
            ];
            const color = colors[index % colors.length];
            const hasBadge = 'badge' in link && typeof link.badge === 'string' && link.badge;

            return (
              <div key={link.platform} className="relative">
                {hasBadge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap">
                    <span className="inline-block bg-[#FF6B6B] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      {link.badge}
                    </span>
                  </div>
                )}
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block bg-white border-2 ${hasBadge ? 'border-[#FF6B6B]' : 'border-[#E8E8D8]'} ${color.hover} rounded-2xl p-5 sm:p-6 hover:shadow-lg transition-all duration-300 group h-full ${hasBadge ? 'pt-7 sm:pt-8' : ''}`}
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 ${color.bg} rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform`}>
                    <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-[#2D2D2D]" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#2D2D2D] mb-2">{link.platform}</h3>
                  <p className="text-[#6B6B6B] text-sm mb-4">{link.description}</p>
                  <span className="inline-flex items-center gap-2 text-[#FF6B6B] font-semibold group-hover:gap-3 transition-all text-sm sm:text-base">
                    Donate
                    <span className="text-xl">→</span>
                  </span>
                </a>
              </div>
            );
          })}
        </div>
      </div>

      {/* Updates */}
      {updates.length > 0 && (
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2D2D2D] mb-6 sm:mb-8 text-center">
            Recent Updates
          </h2>
          <div className="space-y-4 sm:space-y-6">
            {updates.map((update, index) => {
              const tagStyle = update.tag
                ? (TAG_STYLES[update.tag] ?? { bg: 'bg-[#E8E8D8]', text: 'text-[#2D2D2D]' })
                : null;
              return (
                <div
                  key={index}
                  className="bg-white border-2 border-[#E8E8D8] rounded-2xl p-5 sm:p-8 hover:border-[#4ECDC4] transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <time className="text-sm text-[#6B6B6B] font-medium">
                      {new Date(update.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    {tagStyle && update.tag && (
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${tagStyle.bg} ${tagStyle.text}`}>
                        {update.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-[#2D2D2D] text-base sm:text-lg leading-relaxed">{update.message}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
