// Core trait system
export const TRAITS = [
  "Fire", "Water", "Grass", "Electric", "Psychic", "Ghost", "Rock", "Ice", "Dragon", "Fairy",
  "Attack", "Defense", "Speed", "Stamina", "Brave", "Calm", "Clever", "Kind",
  "Solo", "Team", "Day", "Night", "Cute", "Edgy"
] as const;

export type Trait = typeof TRAITS[number];
export type Vec = Record<Trait, number>;

// Question system
export type Choice = {
  id: string;
  label: string;
  delta: Partial<Vec>;
  emoji?: string;
};

export type Question = {
  id: string;
  text: string;
  helper?: string;
  choices: Choice[];
};

// Pokemon data
export type PokemonPersona = {
  id: string;
  displayName: string;
  vector: Partial<Vec>;
  tags?: string[];
  color?: string;
  art: {
    kind: "emoji" | "silhouette" | "custom";
    src: string;
  };
  flavor: string[];
};

// Results
export type Match = {
  pokemonId: string;
  score: number;
};

export type Result = {
  top1: Match;
  top3: Match[];
  userVec: Vec;
  reasons: string[];
  tagline: string;
};

// Quiz state
export type QuizState = {
  currentQuestion: number;
  answers: Record<string, string>;
  result: Result | null;
};
