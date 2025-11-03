'use client';

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = ((current + 1) / total) * 100;

  return (
    <div className="w-full mb-8" role="progressbar" aria-valuenow={current + 1} aria-valuemin={1} aria-valuemax={total}>
      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
        <span>Question {current + 1} of {total}</span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
