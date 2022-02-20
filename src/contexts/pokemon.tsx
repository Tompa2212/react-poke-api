import React, { useReducer, useEffect, useCallback } from "react";
import reducer from "../reducers/pokemon";
import { PokemonsState, PokemonList, Pokemon } from "../models/pokemon";
import { getPokemonList, getPokemon, getLocalStorage } from "../utils/getPokemons";

// import useFetch from "../hooks/useFetch";

const initialState: PokemonsState = {
  pokemons_loading: false,
  pokemons: new Map<number, Pokemon[]>(),
  pokemons_page: 0,
  pokemons_error: false,
  favorite_pokemons: getLocalStorage("fav_pokemons"),
  pokemons_count: 0,
  need_to_fetch: true,
  setPage: (wantedPage = 0) => undefined,
  fav_pok_page: 0,
  setFavPokPage: (wantedPage = 0) => undefined,
  // eslint-disable-next-line no-empty-pattern
  toggleFavorites: ({}: Pokemon, toAdd = true) => undefined,
};

export const per_page = 20;
export const base_url = "https://pokeapi.co/api/v2/pokemon/";

const PokemonContext = React.createContext<PokemonsState>(initialState);

export const PokemonProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchPokemons = useCallback(async (url: string) => {
    try {
      dispatch({ type: "GET_POKEMONS_BEGIN" });
      const pokemons: Pokemon[] = [];
      const pokemonList: PokemonList = await getPokemonList(url);

      const favorite_pokemons = getLocalStorage("fav_pokemons");

      for (const listItem of pokemonList.results) {
        const pokemon = await getPokemon(listItem.url);

        if (favorite_pokemons.find((fav) => fav.id === pokemon.id)) {
          pokemon.favorite = true;
        } else {
          pokemon.favorite = false;
        }
        pokemons.push(pokemon);
      }

      const pokemons_count = pokemonList.count;

      dispatch({
        type: "GET_POKEMONS_SUCCESS",
        payload: { pokemons, pokemons_count },
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: "GET_POKEMONS_ERROR" });
    }
  }, []);

  const setPage = (wantedPage: number): void => {
    dispatch({ type: "FETCH_NEW_PAGE", payload: wantedPage });
  };

  const setFavPokPage = (wantedPage: number): void => {
    dispatch({ type: "SET_FAV_POK_PAGE", payload: wantedPage });
  };

  const toggleFavorites = (pokemon: Pokemon, toAdd: boolean): void => {
    dispatch({ type: "TOGGLE_FAVORITES", payload: { pokemon, toAdd } });
  };

  useEffect(() => {
    const needToFetch = state.need_to_fetch;
    if (needToFetch) {
      fetchPokemons(
        `${base_url}?offset=${state.pokemons_page * per_page}&limit=${per_page}`
      );
    }
  }, [state.pokemons_page, fetchPokemons, state.need_to_fetch]);

  useEffect(() => {
    localStorage.setItem("fav_pokemons", JSON.stringify(state.favorite_pokemons));
  }, [state.favorite_pokemons]);

  return (
    <PokemonContext.Provider
      value={{ ...state, setPage, toggleFavorites, setFavPokPage }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemonContext = () => {
  return React.useContext(PokemonContext);
};
