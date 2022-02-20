export interface PokemonList {
  count: number;
  next: string;
  previous?: any;
  results: {
    name: string;
    url: string;
  }[];
}

export interface Pokemon {
  id: number;
  name: string;
  favorite: boolean;
  base_experience?: number;
  height?: number;
  weight?: number;
  sprites?: {
    front_default: string;
  };
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
}
export interface PokemonsState {
  pokemons_loading: boolean;
  pokemons: Map<number, Pokemon[]>;
  pokemons_page: number;
  pokemons_error: boolean;
  // favorite_pokemons_loading: boolean;
  favorite_pokemons: Pokemon[];
  fav_pok_page: number;
  // favorite_pokemons_error: boolean;
  pokemons_count: number;
  need_to_fetch: boolean;
  setPage(wantedPage: number): void;
  setFavPokPage(wantedPage: number): void;
  toggleFavorites(pokemon: Pokemon, toAdd: boolean): void;
}

export interface SinglePokemonState {
  single_pokemon_loading: boolean;
  single_pokemon: Pokemon;
  single_pokemon_error: boolean;
  path: string;
  setPath(path: string): void;
}

export type Action =
  | { type: "GET_POKEMONS_BEGIN" }
  | {
      type: "GET_POKEMONS_SUCCESS";
      payload: { pokemons: Pokemon[]; pokemons_count: number };
    }
  | { type: "GET_POKEMONS_ERROR" }
  | { type: "GET_FAV_POKEMONS_BEGIN" }
  | { type: "GET_FAV_POKEMONS_SUCCESS"; payload: Pokemon[] }
  | { type: "GET_FAV_POKEMONS_ERROR" }
  | { type: "GET_SINGLE_POKEMON_BEGIN" }
  | { type: "GET_SINGLE_POKEMON_SUCCESS"; payload: Pokemon }
  | { type: "GET_SINGLE_POKEMON_ERROR"; error: string }
  | { type: "FETCH_NEW_PAGE"; payload: number }
  | { type: "SET_FAV_POK_PAGE"; payload: number }
  | { type: "TOGGLE_FAVORITES"; payload: { pokemon: Pokemon; toAdd: boolean } }
  | { type: "SET_SINGLE_POKEMON_PATH"; payload: string };
