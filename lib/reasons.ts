import type { Vec, PokemonPersona } from './types';

export type Rule = {
  id: string;
  when: (u: Vec) => boolean;
  render: (u: Vec) => string;
};

// Helper to check dominant trait
function isDominant(vec: Vec, trait: keyof Vec, threshold = 0.15): boolean {
  return vec[trait] > threshold;
}

// Trait combo rules
export const RULES: Rule[] = [
  {
    id: 'electric-speed',
    when: u => isDominant(u, 'Electric') && isDominant(u, 'Speed'),
    render: () => 'You move fast and think faster — lightning energy.'
  },
  {
    id: 'water-calm',
    when: u => isDominant(u, 'Water') && isDominant(u, 'Calm'),
    render: () => 'You flow around obstacles with patient focus.'
  },
  {
    id: 'fire-brave',
    when: u => isDominant(u, 'Fire') && isDominant(u, 'Brave'),
    render: () => 'Bold and warm — you charge first.'
  },
  {
    id: 'grass-kind',
    when: u => isDominant(u, 'Grass') && isDominant(u, 'Kind'),
    render: () => 'Nurturing spirit with roots that run deep.'
  },
  {
    id: 'psychic-clever',
    when: u => isDominant(u, 'Psychic') && isDominant(u, 'Clever'),
    render: () => 'Strategic thinker with minds-eye vision.'
  },
  {
    id: 'ghost-night',
    when: u => isDominant(u, 'Ghost') && isDominant(u, 'Night'),
    render: () => 'Late-night strategist with a mischievous streak.'
  },
  {
    id: 'dragon-attack',
    when: u => isDominant(u, 'Dragon') && isDominant(u, 'Attack'),
    render: () => 'Fierce power with legendary presence.'
  },
  {
    id: 'fairy-cute',
    when: u => isDominant(u, 'Fairy') && isDominant(u, 'Cute'),
    render: () => 'Charming exterior with surprising strength.'
  },
  {
    id: 'rock-defense',
    when: u => isDominant(u, 'Rock') && isDominant(u, 'Defense'),
    render: () => 'Unshakeable foundation that protects others.'
  },
  {
    id: 'ice-calm',
    when: u => isDominant(u, 'Ice') && isDominant(u, 'Calm'),
    render: () => 'Cool under pressure with crystal clarity.'
  },
  {
    id: 'team-kind',
    when: u => isDominant(u, 'Team') && isDominant(u, 'Kind'),
    render: () => 'Natural collaborator who lifts everyone up.'
  },
  {
    id: 'solo-clever',
    when: u => isDominant(u, 'Solo') && isDominant(u, 'Clever'),
    render: () => 'Independent problem-solver who thrives alone.'
  },
  {
    id: 'speed-attack',
    when: u => isDominant(u, 'Speed') && isDominant(u, 'Attack'),
    render: () => 'Strike first, strike fast — always on offense.'
  },
  {
    id: 'defense-stamina',
    when: u => isDominant(u, 'Defense') && isDominant(u, 'Stamina'),
    render: () => 'Endurance champion who outlasts any challenge.'
  },
  {
    id: 'day-brave',
    when: u => isDominant(u, 'Day') && isDominant(u, 'Brave'),
    render: () => 'Bright optimist who tackles challenges head-on.'
  },
  {
    id: 'edgy-solo',
    when: u => isDominant(u, 'Edgy') && isDominant(u, 'Solo'),
    render: () => 'Lone wolf with a rebellious edge.'
  },
];

// Generate personalized reasons
export function generateReasons(userVec: Vec, pokemon: PokemonPersona): string[] {
  const picked: string[] = [];

  // Apply rules
  for (const rule of RULES) {
    if (rule.when(userVec)) {
      picked.push(rule.render(userVec));
    }
  }

  // Ensure at least 3 reasons, pad with pokemon flavor
  if (picked.length < 3) {
    const needed = 3 - picked.length;
    picked.push(...pokemon.flavor.slice(0, needed));
  }

  // Return top 4 max
  return picked.slice(0, 4);
}

// Generate tagline
export function generateTagline(pokemon: PokemonPersona): string {
  return `You're ${pokemon.displayName}!`;
}
