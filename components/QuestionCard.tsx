'use client';

import { motion } from 'framer-motion';
import type { Question } from '@/lib/types';

interface QuestionCardProps {
  question: Question;
  selectedChoice?: string;
  onSelect: (choiceId: string) => void;
}

export function QuestionCard({ question, selectedChoice, onSelect }: QuestionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-2xl"
    >
      <h2 className="text-3xl font-bold mb-2 text-center">{question.text}</h2>
      {question.helper && (
        <p className="text-gray-600 dark:text-gray-400 text-center mb-8">{question.helper}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.choices.map((choice, index) => (
          <motion.button
            key={choice.id}
            onClick={() => onSelect(choice.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
              p-6 rounded-2xl border-2 text-left transition-all
              ${selectedChoice === choice.id
                ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-300 dark:border-gray-700 hover:border-blue-400'
              }
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            `}
            tabIndex={0}
            aria-pressed={selectedChoice === choice.id}
          >
            <div className="flex items-center gap-3">
              {choice.emoji && <span className="text-3xl">{choice.emoji}</span>}
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Option {String.fromCharCode(65 + index)}</div>
                <div className="text-lg font-semibold">{choice.label}</div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
