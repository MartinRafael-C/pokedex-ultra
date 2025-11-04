// src/services/pokeapi.ts
import { Pokemon } from '../types/pokemon';

const BASE = 'https://pokeapi.co/api/v2';

// BUSCAR UNO
export const searchPokemon = async (query: string): Promise<Pokemon> => {
  const q = query.toLowerCase().trim();
  const res = await fetch(`${BASE}/pokemon/${q}`);
  if (!res.ok) throw new Error('No encontrado');
  const data = await res.json();

  let description = 'No description.';
  try {
    const speciesRes = await fetch(`${BASE}/pokemon-species/${q}`);
    if (speciesRes.ok) {
      const species = await speciesRes.json();
      const entry = species.flavor_text_entries?.find((e: any) => e.language.name === 'en');
      if (entry) description = entry.flavor_text.replace(/\f|\n/g, ' ');
    }
  } catch {}

  return {
    id: data.id,
    name: data.name,
    sprites: data.sprites,
    stats: data.stats,
    types: data.types,
    description,
  };
};

// LISTA DE 20
export const getPokemonList = async (limit = 20, offset = 0): Promise<Pokemon[]> => {
  const res = await fetch(`${BASE}/pokemon?limit=${limit}&offset=${offset}`);
  if (!res.ok) return [];
  const { results } = await res.json();

  return Promise.all(
    results.map((p: { name: string }) => searchPokemon(p.name))
  );
};