/* eslint-disable no-param-reassign */
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BaseEntity } from '../models/BaseEntity';
import { Character } from '../models/Character';
import { Episode } from '../models/Episode';
import { Location } from '../models/Location';

export interface FavoritesState {
  /**
   * array of favorites Characters
   */
  favoritesCharacters: Character[];

  /**
   * array of favorites Episodes
   */
  favoritesEpisodes: Episode[];

  /**
   * array of favorites Locations
   */
  favoritesLocations: Location[];

  /**
   * state of the favorite snackbar
   */
  snackbar: {
    /**
     * indicate if open the favorite snackbar
     */
    open: boolean;

    /**
     * indicate if show add or remove favorite message
     */
    action: 'add' | 'remove' | '';

    /**
     * the name of the item added to the favorite (can be the name
     * of the character or location or episode)
     */
    entityName: string;

    /**
     * Character or Location or Episode model
     */
    entityType: string;

    /**
     * Router path of the favorite page
     */
    favoritePath: string;
  };
}

const initialState: FavoritesState = {
  favoritesCharacters: [],
  favoritesEpisodes: [],
  favoritesLocations: [],
  snackbar: {
    open: false,
    action: '',
    entityName: '',
    entityType: '',
    favoritePath: ''
  }
};

/**
 * Check if a item exist on items array
 * @param items
 * @param id
 * @returns true if id exist, false otherwise
 */
const existFavorite = <T extends BaseEntity>(items: T[], id: number) => items.findIndex((item) => item.id === id) > -1;

/**
 * Reducer for toggle favorite. If a favorite already exist then remove it else push it
 * @param items
 * @param item
 * @returns the new favorites array
 */
const toggleFavoriteReducer = <T extends BaseEntity>(items: T[], item: T) => {
  if (!existFavorite<T>(items, item.id)) {
    items.push(item);
  } else {
    items = items.filter((_item) => _item.id !== item.id);
  }

  return items;
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavoriteCharacter: (state: FavoritesState, action: PayloadAction<Character>) => {
      state.favoritesCharacters = toggleFavoriteReducer(state.favoritesCharacters, action.payload);
    },
    toggleFavoriteEpisode: (state: FavoritesState, action: PayloadAction<Episode>) => {
      state.favoritesEpisodes = toggleFavoriteReducer(state.favoritesEpisodes, action.payload);
    },
    toggleFavoriteLocation: (state: FavoritesState, action: PayloadAction<Location>) => {
      state.favoritesLocations = toggleFavoriteReducer(state.favoritesLocations, action.payload);
    },
    setSnackbar: (state: FavoritesState, action: PayloadAction<Partial<FavoritesState['snackbar']>>) => {
      state.snackbar.open = action.payload.open || initialState.snackbar.open;
      state.snackbar.action = action.payload.action || initialState.snackbar.action;
      state.snackbar.entityName = action.payload.entityName || initialState.snackbar.entityName;
      state.snackbar.entityType = action.payload.entityType || initialState.snackbar.entityType;
      state.snackbar.favoritePath = action.payload.favoritePath || initialState.snackbar.favoritePath;
    }
  }
});

const idSelector = (_state: { favorites: FavoritesState }, id: number) => id;

// selector for character selector by id
export const selectFavoriteCharacter = createSelector(
  (state: { favorites: FavoritesState }) => state.favorites.favoritesCharacters,
  idSelector,
  existFavorite
);

// selector for episode selector by id
export const selectFavoriteEpisode = createSelector(
  (state: { favorites: FavoritesState }) => state.favorites.favoritesEpisodes,
  idSelector,
  existFavorite
);

// selector for location selector by id
export const selectFavoriteLocation = createSelector(
  (state: { favorites: FavoritesState }) => state.favorites.favoritesLocations,
  idSelector,
  existFavorite
);

export default favoritesSlice.reducer;

// Action creators are generated for each case reducer function
export const {
  toggleFavoriteCharacter,
  toggleFavoriteEpisode,
  toggleFavoriteLocation,
  setSnackbar
} = favoritesSlice.actions;
