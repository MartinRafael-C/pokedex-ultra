import { Pokemon } from '../types/pokemon';

const BASE = 'https://pokeapi.co/api/v2';

export const searchPokemon = async (query: string): Promise<Pokemon> => {
  const q = query.toLowerCase().trim();
  const res = await fetch(`${BASE}/pokemon/${q}`);
  if (!res.ok) throw new Error('No encontrado');
  const poke = await res.json() as Pokemon;

  const speciesRes = await fetch(`${BASE}/pokemon-species/${q}`);
  const species = await speciesRes.json();
  const entry = species.flavor_text_entries.find((e: any) => e.language.name === 'en');
  poke.description = entry?.flavor_text.replace(/\n/g, ' ').trim() || 'No description.';

  return poke;
};

export const getPokemonList = async (limit = 20, offset = 0): Promise<Pokemon[]> => {
  const res = await fetch(`${BASE}/pokemon?limit=${limit}&offset=${offset}`);
  const { results } = await res.json();
  return Promise.all(
    results.map(async (p: any) => {
      const res = await fetch(p.url);
      const data = await res.json() as Pokemon;
      const speciesRes = await fetch(`${BASE}/pokemon-species/${p.name}`);
      const species = await speciesRes.json();
      const entry = species.flavor_text_entries.find((e: any) => e.language.name === 'en');
      data.description = entry?.flavor_text.replace(/\n/g, ' ').trim() || 'A wild Pokémon.';
      return data;
    })
  );
};