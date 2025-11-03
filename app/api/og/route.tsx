import { ImageResponse } from '@vercel/og';
import pokemon from '@/data/pokemon.json';
import type { PokemonPersona } from '@/lib/types';

export const runtime = 'edge';

const POKEDEX = pokemon as PokemonPersona[];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  const pk = POKEDEX.find((p) => p.id === id);
  if (!pk) {
    return new Response('Pokemon not found', { status: 404 });
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: pk.color || '#3498DB',
          padding: '40px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: '32px',
            padding: '60px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          }}
        >
          <div style={{ fontSize: 120, marginBottom: 20 }}>{pk.art.src}</div>
          <div style={{ fontSize: 48, fontWeight: 'bold', marginBottom: 10 }}>
            You&apos;re {pk.displayName}!
          </div>
          <div style={{ fontSize: 24, color: '#666', textAlign: 'center', maxWidth: 600 }}>
            {pk.flavor[0]}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
