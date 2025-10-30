const BASE = 'https://pokeapi.co/api/v2';

export const searchPokemon = async (query) => {
  const q = query.toLowerCase().trim();
  const res = await fetch(`${BASE}/pokemon/${q}`);
  if (!res.ok) throw new Error('No encontrado');
  return res.json();
};

export const getRandomPokemon = async () => {
  const id = Math.floor(Math.random() * 1010) + 1;
  const res = await fetch(`${BASE}/pokemon/${id}`);
  return res.json();
};

export const getEvolutionChain = async (id) => {
  const species = await fetch(`${BASE}/pokemon-species/${id}`).then(r => r.json());
  const chain = await fetch(species.evolution_chain.url).then(r => r.json());
  return parseChain(chain.chain);
};

const parseChain = (node, arr = []) => {
  arr.push(node.species.name);
  if (node.evolves_to.length > 0) {
    node.evolves_to.forEach(child => parseChain(child, arr));
  }
  return arr;
};