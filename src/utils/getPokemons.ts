import { PokemonList, Pokemon } from "../models/pokemon";

export const getPokemonList = async (url:string): Promise<PokemonList> => {
  const listResp = await fetch(url);
  return await listResp.json();
};

export const getPokemon = async (url: string): Promise<Pokemon> => {
  const dataResp = await fetch(url);
  return await dataResp.json();
};

export const getLocalStorage = (key: string): Pokemon[] | [] => {
  let list = localStorage.getItem(key);
  if (list) {
    return (list = JSON.parse(localStorage.getItem(key) || ""));
  } else {
    return [];
  }
};