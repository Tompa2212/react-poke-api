import { Pokemon } from "../models/pokemon";

export const findPokemon = (
  pokemons: Map<number, Pokemon[]>,
  id: number
): Pokemon | undefined => {
  for (const page of pokemons.keys()) {
    const pokemon = pokemons.get(page)?.find((p) => p.id === id);

    if (pokemon) return pokemon;
  }

  return undefined;
};

export const capitalize = (str:string):string => {
  return str.slice(0,1).toUpperCase() + str.slice(1);
}