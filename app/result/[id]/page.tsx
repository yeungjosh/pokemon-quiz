'use client';

import { useEffect, useState } from 'react';
import { useQuizStore } from '@/lib/store';
import { ResultCard } from '@/components/ResultCard';
import { ShareRow } from '@/components/ShareRow';
import pokemon from '@/data/pokemon.json';
import type { PokemonPersona } from '@/lib/types';

const POKEDEX = pokemon as PokemonPersona[];

export default function ResultPage({ params }: { params: { id: string } }) {
  const { result } = useQuizStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !result) {
    return (
      <main className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <p className="text-xl mb-4">No quiz results found</p>
          <a href="/" className="text-blue-600 hover:underline">Take the quiz</a>
        </div>
      </main>
    );
  }

  const topPokemon = POKEDEX.find(p => p.id === result.top1.pokemonId);
  if (!topPokemon) return null;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <ResultCard pokemon={topPokemon} result={result} />

      <div className="mt-8 w-full max-w-2xl">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold mb-4">Your Top Matches</h3>
          <div className="flex gap-3 justify-center flex-wrap">
            {result.top3.map((match, i) => {
              const p = POKEDEX.find(pk => pk.id === match.pokemonId);
              return (
                <div
                  key={match.pokemonId}
                  className="px-4 py-2 bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700"
                >
                  <span className="mr-2">{p?.art.src}</span>
                  <span className="font-semibold">{p?.displayName}</span>
                  <span className="text-sm text-gray-500 ml-2">{(match.score * 100).toFixed(0)}%</span>
                </div>
              );
            })}
          </div>
        </div>

        <ShareRow pokemonId={result.top1.pokemonId} />
      </div>
    </main>
  );
}
