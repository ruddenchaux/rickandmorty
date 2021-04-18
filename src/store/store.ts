import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@rtk-incubator/rtk-query';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { charactersApi } from '../services/characters';
import { episodesApi } from '../services/episodes';
import { locationsApi } from '../services/locations';
import { charactersDialogSlice } from './charactersDialog';
import { favoritesSlice } from './favorites';
import { headerTitleSlice } from './headerTitle';

// persist reducer
const persistConfig = {
  key: 'favorites',
  version: 1,
  storage,
  whitelist: ['favorites']
};

// reducer
const rootReducer = combineReducers({
  [charactersApi.reducerPath]: charactersApi.reducer,
  [locationsApi.reducerPath]: locationsApi.reducer,
  [episodesApi.reducerPath]: episodesApi.reducer,
  headerTitle: headerTitleSlice.reducer,
  charactersDialog: charactersDialogSlice.reducer,
  favorites: favoritesSlice.reducer
});

const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
      .concat(charactersApi.middleware)
      .concat(locationsApi.middleware)
      .concat(episodesApi.middleware)
});

export const persistor = persistStore(store);

export default store;

setupListeners(store.dispatch);
