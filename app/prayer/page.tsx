'use client';

import { useState } from 'react';

export default function Prayer() {
  const [formData, setFormData] = useState({ name: '', email: '', request: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');
    try {
      const response = await fetch('/api/prayer-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus('success');
        setMessage('Thank you for your prayer request. We will be praying for you.');
        setFormData({ name: '', email: '', request: '' });
      } else {
        setStatus('error');
        setMessage('Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Failed to submit request. Please try again later.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-[#2D2D2D] mb-3 sm:mb-4">Prayer Requests</h1>
      <p className="text-base sm:text-lg text-[#6B6B6B] mb-6 sm:mb-8">
        Hi!! Prayer has been a huge component of my life this season, and I don't want to stop with prayer for just me.
        So I would love to hear your prayer requests, so I can support you too!  Feel free to share any prayer request 
        with me here! I get an email each time one is sent, and so I will be sure to pray over it and check in with you.
      </p>

      <div className="bg-white border-2 border-[#E8E8D8] rounded-2xl p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#2D2D2D] mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 border-2 border-[#E8E8D8] rounded-xl focus:outline-none focus:border-[#4ECDC4] text-[#2D2D2D]"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#2D2D2D] mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2.5 border-2 border-[#E8E8D8] rounded-xl focus:outline-none focus:border-[#4ECDC4] text-[#2D2D2D]"
            />
          </div>

          <div>
            <label htmlFor="request" className="block text-sm font-medium text-[#2D2D2D] mb-2">
              Prayer Request
            </label>
            <textarea
              id="request"
              required
              rows={6}
              value={formData.request}
              onChange={(e) => setFormData({ ...formData, request: e.target.value })}
              className="w-full px-4 py-2.5 border-2 border-[#E8E8D8] rounded-xl focus:outline-none focus:border-[#4ECDC4] text-[#2D2D2D] resize-none"
            />
          </div>

          {message && (
            <div
              className={`p-4 rounded-xl text-sm ${
                status === 'success'
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-[#FF6B6B] hover:bg-[#e05555] text-white py-3 px-6 rounded-xl font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Submitting…' : 'Submit Prayer Request'}
          </button>
        </form>
      </div>
    </div>
  );
}
