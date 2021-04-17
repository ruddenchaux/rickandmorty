/* eslint-disable no-param-reassign */
import { createSelector, createSlice } from '@reduxjs/toolkit';
import { Character } from '../models/Character';
import { Episode } from '../models/Episode';
import { Location } from '../models/Location';

export interface FavoritesState {
  favorites: {
    favoritesCharacters: Character[];
    favoritesEpisodes: Episode[];
    favoritesLocations: Location[];
  };
}

interface BaseModel {
  id: number;
}

/**
 * Check if a item exist on items array
 * @param items
 * @param id
 * @returns true if id exist, false otherwise
 */
const existFavorite = <T extends BaseModel>(items: T[], id: number) => items.findIndex((item) => item.id === id) > -1;

/**
 * Reducer for toggle favorite. If a favorite already exist then remove it else push it
 * @param items
 * @param item
 * @returns the new favorites array
 */
const toggleFavoriteReducer = <T extends BaseModel>(items: T[], item: T) => {
  let favorites = [...items];

  if (!existFavorite<T>(items, item.id)) {
    favorites.push(item);
  } else {
    favorites = favorites.filter((_item) => _item.id !== item.id);
  }

  return favorites;
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favoritesCharacters: [] as Character[],
    favoritesEpisodes: [] as Episode[],
    favoritesLocations: [] as Location[]
  },
  reducers: {
    toggleFavoriteCharacter: (state, action) => {
      state.favoritesCharacters = toggleFavoriteReducer(state.favoritesCharacters, action.payload);
    },
    toggleFavoriteEpisode: (state, action) => {
      state.favoritesEpisodes = toggleFavoriteReducer(state.favoritesEpisodes, action.payload);
    },
    toggleFavoriteLocation: (state, action) => {
      state.favoritesLocations = toggleFavoriteReducer(state.favoritesLocations, action.payload);
    }
  }
});

const idSelector = (_state: FavoritesState, id: number) => id;

export const selectFavoriteCharacter = createSelector(
  (state: FavoritesState) => state.favorites.favoritesCharacters,
  idSelector,
  existFavorite
);

export const selectFavoriteEpisode = createSelector(
  (state: FavoritesState) => state.favorites.favoritesEpisodes,
  idSelector,
  existFavorite
);

export const selectFavoriteLocation = createSelector(
  (state: FavoritesState) => state.favorites.favoritesLocations,
  idSelector,
  existFavorite
);

export default favoritesSlice.reducer;

// Action creators are generated for each case reducer function
export const { toggleFavoriteCharacter, toggleFavoriteEpisode, toggleFavoriteLocation } = favoritesSlice.actions;
