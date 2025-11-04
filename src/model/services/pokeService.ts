const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

export async function fetchPokemonList(limit = 10) {
  const response = await fetch(`${BASE_URL}?limit=${limit}`);
  const data = await response.json();
  return data.results;
}

export async function fetchPokemonDetailByUrl(url: string) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
