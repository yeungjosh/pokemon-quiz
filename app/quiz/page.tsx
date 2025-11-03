'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuizStore } from '@/lib/store';
import { ProgressBar } from '@/components/ProgressBar';
import { QuestionCard } from '@/components/QuestionCard';
import questions from '@/data/questions.json';
import pokemon from '@/data/pokemon.json';
import { computeUserVec, match } from '@/lib/scoring';
import { generateReasons, generateTagline } from '@/lib/reasons';
import type { Question, PokemonPersona } from '@/lib/types';

const QUESTIONS = questions as Question[];
const POKEDEX = pokemon as PokemonPersona[];

export default function QuizPage() {
  const router = useRouter();
  const { currentQuestion, answers, setAnswer, nextQuestion, prevQuestion, setResult } = useQuizStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentQ = QUESTIONS[currentQuestion];
  const selectedChoice = answers[currentQ?.id];
  const isLastQuestion = currentQuestion === QUESTIONS.length - 1;

  const handleSelect = (choiceId: string) => {
    setAnswer(currentQ.id, choiceId);
  };

  const handleNext = () => {
    if (!selectedChoice) return;

    if (isLastQuestion) {
      // Compute result
      const userVec = computeUserVec(answers, QUESTIONS);
      const matches = match(userVec, POKEDEX, answers, 3);
      const topPokemon = POKEDEX.find(p => p.id === matches[0].pokemonId)!;
      const reasons = generateReasons(userVec, topPokemon);
      const tagline = generateTagline(topPokemon);

      const result = {
        top1: matches[0],
        top3: matches,
        userVec,
        reasons,
        tagline,
      };

      setResult(result);
      router.push(`/result/${matches[0].pokemonId}`);
    } else {
      nextQuestion();
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      prevQuestion();
    }
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-2xl">
        <ProgressBar current={currentQuestion} total={QUESTIONS.length} />
        <QuestionCard
          question={currentQ}
          selectedChoice={selectedChoice}
          onSelect={handleSelect}
        />

        <div className="flex gap-4 mt-8 justify-between">
          <button
            onClick={handlePrev}
            disabled={currentQuestion === 0}
            className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-500 transition-all"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={!selectedChoice}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
          >
            {isLastQuestion ? 'See Results' : 'Next'}
          </button>
        </div>
      </div>
    </main>
  );
}
