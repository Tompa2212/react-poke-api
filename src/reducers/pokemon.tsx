import { Action, PokemonsState } from "../models/pokemon";

const pokemon_reducer = (state: PokemonsState, action: Action): PokemonsState => {
  switch (action.type) {
    case "GET_POKEMONS_BEGIN":
      return { ...state, pokemons_loading: true };
    case "GET_POKEMONS_SUCCESS": {
      const { pokemons, pokemons_count } = action.payload;
      const newMap = new Map(state.pokemons);

      newMap.set(state.pokemons_page, [...pokemons]);

      return { ...state, pokemons: newMap, pokemons_count };
    }

    case "GET_POKEMONS_ERROR":
      return { ...state, pokemons_error: true, pokemons_loading: false };

    case "FETCH_NEW_PAGE": {
      let wantedPage = action.payload;
      if (wantedPage < 0) wantedPage = 0;

      if (state.pokemons.get(wantedPage)) {
        return {
          ...state,
          pokemons_page: wantedPage,
          need_to_fetch: false,
        };
      }

      return {
        ...state,
        pokemons_page: wantedPage,
        need_to_fetch: true,
      };
    }

    case "SET_FAV_POK_PAGE": {
      let wantedPage = action.payload;
      const max_pages = Math.ceil(state.favorite_pokemons.length / 10);
      if (wantedPage < 0) wantedPage = 0;

      if (wantedPage >= max_pages) {
        wantedPage = max_pages - 1;
      }

      return { ...state, fav_pok_page: wantedPage };
    }

    case "TOGGLE_FAVORITES":
      const { pokemon, toAdd } = action.payload;

      const newMap = new Map(state.pokemons);
      let found = false;

      //adding pokemon to favorites
      if (toAdd) {
        for (const page of newMap.keys()) {
          // eslint-disable-next-line no-loop-func
          const items = newMap.get(page)?.map((p) => {
            if (p.id === pokemon.id) {
              p.favorite = true;
              found = true;
            }
            return p;
          });

          if (found) newMap.set(page, items!);
        }

        return {
          ...state,
          pokemons: newMap,
          favorite_pokemons: [
            ...state.favorite_pokemons,
            { ...pokemon, favorite: true },
          ],
        };
      }

      for (const page of newMap.keys()) {
        // eslint-disable-next-line no-loop-func
        const items = newMap.get(page)?.map((p) => {
          if (p.id === pokemon.id) {
            p.favorite = false;
            found = true;
          }
          return p;
        });

        if (found) newMap.set(page, items!);
      }

      const newFavPokemons = [...state.favorite_pokemons].filter(
        (p) => p.id !== pokemon.id
      );
      return { ...state, pokemons: newMap, favorite_pokemons: newFavPokemons };
  }

  throw new Error(`No action with type - ${action.type}`);
};

export default pokemon_reducer;
