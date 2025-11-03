import { TRAITS, type Vec, type Question, type PokemonPersona, type Match } from './types';

// Initialize zero vector
export function zeroVec(): Vec {
  return TRAITS.reduce((acc, trait) => ({ ...acc, [trait]: 0 }), {} as Vec);
}

// Compute user vector from answers
export function computeUserVec(answers: Record<string, string>, bank: Question[]): Vec {
  const vec = zeroVec();

  for (const q of bank) {
    const answerId = answers[q.id];
    if (!answerId) continue;

    const choice = q.choices.find(c => c.id === answerId);
    if (!choice) continue;

    // Accumulate deltas
    for (const [trait, value] of Object.entries(choice.delta)) {
      vec[trait as keyof Vec] += value;
    }
  }

  return normalizeVec(vec);
}

// L2 normalization
export function normalizeVec(vec: Vec): Vec {
  const magnitude = Math.sqrt(
    TRAITS.reduce((sum, trait) => sum + vec[trait] ** 2, 0)
  );

  if (magnitude === 0) return vec;

  return TRAITS.reduce(
    (acc, trait) => ({ ...acc, [trait]: vec[trait] / magnitude }),
    {} as Vec
  );
}

// Cosine similarity
export function cosineSimilarity(a: Vec, b: Partial<Vec>): number {
  let dotProduct = 0;
  let magB = 0;

  for (const trait of TRAITS) {
    const bVal = b[trait] ?? 0;
    dotProduct += a[trait] * bVal;
    magB += bVal ** 2;
  }

  if (magB === 0) return 0;
  return dotProduct / Math.sqrt(magB);
}

// Deterministic tie-breaker hash
function hashAnswers(answers: Record<string, string>): number {
  const str = Object.entries(answers)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}:${v}`)
    .join('|');

  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash);
}

// Match user to pokemon
export function match(
  userVec: Vec,
  pokedex: PokemonPersona[],
  answers: Record<string, string>,
  k = 3
): Match[] {
  const scored = pokedex.map(pk => ({
    pokemonId: pk.id,
    score: cosineSimilarity(userVec, pk.vector),
    tieBreak: hashAnswers(answers) % 1000
  }));

  // Sort by score desc, then tieBreak desc
  scored.sort((a, b) => {
    const scoreDiff = b.score - a.score;
    if (Math.abs(scoreDiff) > 0.001) return scoreDiff;
    return b.tieBreak - a.tieBreak;
  });

  return scored.slice(0, k).map(({ pokemonId, score }) => ({ pokemonId, score }));
}
