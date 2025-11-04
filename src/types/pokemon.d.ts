// src/types/pokemon.d.ts
export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  stats: Array<{
    base_stat: number;
    stat: { name: string };
  }>;
  types: Array<{ type: { name: string } }>; // OBLIGATORIO
  description?: string;
}