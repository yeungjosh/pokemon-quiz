# Pokemon Personality Quiz

A modern personality quiz that matches you with a Pokemon based on your answers. Built with Next.js 15 and designed for performance and accessibility.

## Features

- **10-question quiz** with personality-driven matching
- **16 Pokemon matches** using cosine similarity scoring
- **Real-time results** with personalized reasons
- **Social sharing** with OG image generation
- **Fully accessible** with keyboard navigation and screen reader support
- **Privacy-first** - no accounts, no tracking, client-side computation

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State**: Zustand with persistence
- **Deployment**: Vercel
- **OG Images**: @vercel/og (Satori)

## Architecture

### Trait System

The quiz uses 24 traits across three categories:

- **Types**: Fire, Water, Grass, Electric, Psychic, Ghost, Rock, Ice, Dragon, Fairy
- **Stats**: Attack, Defense, Speed, Stamina
- **Personality**: Brave, Calm, Clever, Kind, Solo, Team, Day, Night, Cute, Edgy

### Matching Algorithm

1. User answers accumulate trait deltas into a vector
2. Vector normalized using L2 norm
3. Cosine similarity computed against all Pokemon vectors
4. Deterministic tie-breaking via answer hash
5. Top 3 matches returned with scores

### Copy Generation

Personalized reasons generated via rule engine:
- Rules check dominant trait combinations
- Fallback to Pokemon-specific flavor text
- 3-4 reasons per result

## Project Structure

```
pokemon-quiz/
├── app/
│   ├── page.tsx              # Landing page
│   ├── quiz/page.tsx         # Quiz flow
│   ├── result/[id]/page.tsx  # Result display
│   └── api/og/route.tsx      # OG image generation
├── components/
│   ├── ProgressBar.tsx
│   ├── QuestionCard.tsx
│   ├── ResultCard.tsx
│   └── ShareRow.tsx
├── lib/
│   ├── types.ts              # Type definitions
│   ├── scoring.ts            # Matching algorithm
│   ├── reasons.ts            # Copy generation
│   ├── store.ts              # Zustand state
│   └── analytics.ts          # Event tracking
└── data/
    ├── questions.json        # Quiz questions
    └── pokemon.json          # Pokemon data
```

## Local Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Performance

- **Target TTI**: < 2.5s on 4G
- **Lighthouse Score**: ≥ 90
- **JS Bundle**: < 160KB gzipped
- **Static JSON**: < 50KB

## Accessibility

- AA contrast ratios
- Full keyboard navigation
- Semantic HTML landmarks
- ARIA labels and live regions
- Reduced motion support

## IP & Attribution

All Pokemon representations use emoji/text to avoid IP issues. No official sprites or artwork used. This is a fan project for educational purposes.

## Future Enhancements

- [ ] A/B testing framework
- [ ] Internationalization (i18n)
- [ ] Friend match comparison
- [ ] Seasonal Pokemon rotations
- [ ] Unit tests with Vitest
- [ ] E2E tests with Playwright

## License

MIT

---

Built by [Josh Yeung](https://github.com/yeungjosh)
