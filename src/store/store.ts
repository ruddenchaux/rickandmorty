import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@rtk-incubator/rtk-query';
import { charactersApi } from '../services/characters';
import { headerTitleSlice } from './headerTitleStore';

const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [charactersApi.reducerPath]: charactersApi.reducer,
    headerTitle: headerTitleSlice.reducer
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(charactersApi.middleware)
});

export default store;

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
