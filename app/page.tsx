import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center max-w-2xl">
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Pokemon Quiz
        </h1>
        <p className="text-xl mb-8 text-gray-700 dark:text-gray-300">
          Answer 10 questions and discover which Pokemon matches your personality
        </p>
        <Link
          href="/quiz"
          className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold text-lg hover:shadow-lg transition-all hover:scale-105"
        >
          Start Quiz
        </Link>
      </div>
    </main>
  );
}
