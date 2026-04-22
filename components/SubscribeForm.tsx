'use client';

import { useState } from 'react';
import { Bell } from 'lucide-react';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error || 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Failed to subscribe. Please try again later.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex items-center justify-center gap-2 text-[#4ECDC4] font-semibold py-2">
        <Bell className="w-4 h-4 fill-current" />
        You&apos;re subscribed! I&apos;ll let you know when I post. 🎉
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 px-4 py-2.5 border-2 border-[#E8E8D8] rounded-xl focus:outline-none focus:border-[#4ECDC4] bg-white text-[#2D2D2D] placeholder:text-[#6B6B6B] text-sm"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#FF6B6B] hover:bg-[#e05555] text-white font-semibold rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm whitespace-nowrap"
        >
          <Bell className="w-4 h-4" />
          {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
        </button>
      </form>
      {status === 'error' && (
        <p className="text-red-600 text-sm mt-2 text-center">{errorMsg}</p>
      )}
    </div>
  );
}
