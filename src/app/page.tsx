import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold">Welcome to Game Engine</h1>
      <Link href="game/blackjack" passHref>
        <button className="mt-8 rounded bg-green-500 py-2 px-4 text-white hover:bg-green-600 focus:outline-none focus:ring">
          Go to Blackjack Game
        </button>
      </Link>
    </main>
  );
}
