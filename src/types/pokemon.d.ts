// src/types/pokemon.d.ts
export interface Pokemon {
    id: number;
    name: string;  // ← ¡DEBE ESTAR!
    sprites: {
      other: {
        'official-artwork': {
          front_default: string;
        };
      };
    };
    types: Array<{ type: { name: string } }>;
    stats: Array<{ base_stat: number; stat: { name: string } }>;
    height: number;
    weight: number;
    description?: string;
  }