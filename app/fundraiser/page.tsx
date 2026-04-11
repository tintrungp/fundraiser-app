import fundraiserData from '@/data/fundraiser.json';

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
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
      <p className="text-lg text-gray-600 mb-12">{description}</p>

      <div className="bg-white border border-gray-200 rounded-lg p-8 mb-12">
        <div className="mb-6">
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-2xl font-bold text-gray-900">
              {formatCurrency(current)}
            </span>
            <span className="text-gray-600">
              raised of {formatCurrency(goal)} goal
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-gray-900 h-full rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {percentage.toFixed(1)}% funded
          </p>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Support Our Mission
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {donationLinks.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {link.platform}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{link.description}</p>
              <span className="text-gray-900 font-medium hover:underline">
                Donate →
              </span>
            </a>
          ))}
        </div>
      </div>

      {updates.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Recent Updates
          </h2>
          <div className="space-y-4">
            {updates.map((update, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6"
              >
                <time className="text-sm text-gray-500 block mb-2">
                  {new Date(update.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <p className="text-gray-700">{update.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
