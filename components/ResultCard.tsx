'use client';

import { motion } from 'framer-motion';
import type { PokemonPersona, Result } from '@/lib/types';

interface ResultCardProps {
  pokemon: PokemonPersona;
  result: Result;
}

export function ResultCard({ pokemon, result }: ResultCardProps) {
  const isSprite = pokemon.art.kind === 'sprite';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
      style={{ borderTop: `8px solid ${pokemon.color || '#3498DB'}` }}
    >
      <div className="p-8 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="flex justify-center mb-4"
        >
          {isSprite ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={pokemon.art.src}
              alt={pokemon.displayName}
              width={200}
              height={200}
              className="object-contain"
            />
          ) : (
            <span className="text-8xl">{pokemon.art.src}</span>
          )}
        </motion.div>

        <h1 className="text-4xl font-bold mb-2">{result.tagline}</h1>
        <div className="text-gray-600 dark:text-gray-400 mb-6">
          Match Score: {(result.top1.score * 100).toFixed(0)}%
        </div>

        <div className="space-y-3 mb-8">
          {result.reasons.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl text-left"
            >
              <p className="text-gray-800 dark:text-gray-200">{reason}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
