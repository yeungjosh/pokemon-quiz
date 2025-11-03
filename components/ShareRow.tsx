'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ShareRowProps {
  pokemonId: string;
}

export function ShareRow({ pokemonId }: ShareRowProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/result/${pokemonId}`
    : '';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="flex gap-3 justify-center">
      <button
        onClick={handleCopy}
        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
      >
        {copied ? 'Copied!' : 'Share Result'}
      </button>
      <Link
        href="/"
        className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl font-semibold hover:border-blue-500 transition-all"
      >
        Try Again
      </Link>
    </div>
  );
}
