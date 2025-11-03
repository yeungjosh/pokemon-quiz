import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { QuizState, Result } from './types';

interface QuizStore extends QuizState {
  setAnswer: (questionId: string, choiceId: string) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  setResult: (result: Result) => void;
  reset: () => void;
}

const initialState: QuizState = {
  currentQuestion: 0,
  answers: {},
  result: null,
};

export const useQuizStore = create<QuizStore>()(
  persist(
    (set) => ({
      ...initialState,
      setAnswer: (questionId, choiceId) =>
        set((state) => ({
          answers: { ...state.answers, [questionId]: choiceId },
        })),
      nextQuestion: () =>
        set((state) => ({
          currentQuestion: Math.min(state.currentQuestion + 1, 9),
        })),
      prevQuestion: () =>
        set((state) => ({
          currentQuestion: Math.max(state.currentQuestion - 1, 0),
        })),
      setResult: (result) => set({ result }),
      reset: () => set(initialState),
    }),
    {
      name: 'pokemon-quiz-storage',
    }
  )
);
