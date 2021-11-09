import React, { FC, Reducer, useContext, useReducer } from "react";
import { Movie, data, MovieType } from "../data";
import _orderBy from "lodash/orderBy";

function intersection<T>(arrayA: T[], arrayB: T[]) {
  return [arrayA, arrayB].reduce((a, b) => a.filter((c) => b.includes(c)));
}

type MovieContextType = {
  movies: Movie[];
  cart: Movie[];
  searchResults: Movie[];
  addToCart: (movie: Movie) => void;
  removeFromCart: (movie: Movie) => void;
  sortMovie: (by: keyof Movie, desc?: boolean) => void;
  search: (searchOption: {
    title?: string;
    movieType?: MovieType[];
    kind?: string[];
    includeAlreadyAdded?: boolean;
  }) => void;
};

const MovieContext = React.createContext<MovieContextType>({
  movies: [],
  searchResults: [],
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  sortMovie: () => {},
  search: () => {},
});

export const useMovies: () => MovieContextType = () => {
  return useContext<MovieContextType>(MovieContext);
};

type ReducerState = { movies: Movie[]; cart: Movie[]; searchResults: Movie[] };
type ActionType =
  | { type: "ADD_TO_CART"; movie: Movie }
  | { type: "REMOVE_FROM_CART"; movie: Movie }
  | { type: "SORT_MOVIES"; by: keyof Movie; desc: boolean }
  | {
      type: "SEARCH";
      title?: string;
      movieType?: MovieType[];
      kind?: string[];
      includeAlreadyAdded?: boolean;
    };

const movieReducers = (state: ReducerState, action: ActionType) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      if (state.cart.find((it) => it.title === action.movie.title)) {
        return state;
      }
      const nextCart = [...state.cart, action.movie];
      return { ...state, cart: nextCart };
    }
    case "REMOVE_FROM_CART": {
      const nextCart = state.cart.filter(
        (it) => it.title !== action.movie.title
      );
      return { ...state, cart: nextCart };
    }
    case "SORT_MOVIES": {
      let nextMovies = _orderBy(
        state.searchResults,
        action.by,
        action.desc ? "desc" : "asc"
      );
      return { ...state, searchResults: nextMovies };
    }
    case "SEARCH": {
      const baseSearchData = action.includeAlreadyAdded
        ? state.movies
        : state.movies.filter(
            (it) => !state.cart.find((c) => c.title === it.title)
          );

      const search = baseSearchData.filter((movie) => {
        if (
          action.title &&
          !movie.title.toLowerCase().includes(action.title.toLowerCase())
        ) {
          return false;
        }
        if (action.movieType && !action.movieType.includes(movie.type)) {
          return false;
        }
        if (action.kind) {
          const commonKind = intersection<string>(action.kind, movie.genres);
          return commonKind.length > 0;
        }
        return true;
      });
      return { ...state, searchResults: search };
    }
    default:
      throw new Error();
  }
};

export const MoviesProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer<Reducer<ReducerState, ActionType>>(
    movieReducers,
    {
      movies: data,
      cart: [],
      searchResults: _orderBy(data, "score", "asc"),
    }
  );

  const moviesContext: MovieContextType = {
    movies: state.movies,
    cart: state.cart,
    searchResults: state.searchResults,
    addToCart: (movie) => dispatch({ type: "ADD_TO_CART", movie }),
    removeFromCart: (movie) => dispatch({ type: "REMOVE_FROM_CART", movie }),
    sortMovie: (by, desc = false) =>
      dispatch({ type: "SORT_MOVIES", by, desc }),
    search: (options) => dispatch({ type: "SEARCH", ...options }),
  };

  return (
    <MovieContext.Provider value={moviesContext}>
      {children}
    </MovieContext.Provider>
  );
};
