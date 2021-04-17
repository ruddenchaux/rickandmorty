import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@rtk-incubator/rtk-query';
import { charactersApi } from '../services/characters';
import { episodesApi } from '../services/episodes';
import { locationsApi } from '../services/locations';
import { charactersDialogSlice } from './charactersDialog';
import { favoritesSlice } from './favorites';
import { headerTitleSlice } from './headerTitle';

const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [charactersApi.reducerPath]: charactersApi.reducer,
    [locationsApi.reducerPath]: locationsApi.reducer,
    [episodesApi.reducerPath]: episodesApi.reducer,
    headerTitle: headerTitleSlice.reducer,
    charactersDialog: charactersDialogSlice.reducer,
    favorites: favoritesSlice.reducer
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(charactersApi.middleware)
      .concat(locationsApi.middleware)
      .concat(episodesApi.middleware)
});

export default store;

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
