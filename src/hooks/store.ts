/* eslint-disable import/prefer-default-export */
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { CharactersDialogState } from '../store/charactersDialog';
import { FavoritesState } from '../store/favorites';
import { HeaderTitleState } from '../store/headerTitle';

/**
 * Typed hook for the charactersDialog store selector
 */
export const useCharactersDialogSelector: TypedUseSelectorHook<{
  charactersDialog: CharactersDialogState;
}> = useSelector;

/**
 * Typed hook for the favorites store selector
 */
export const useFavoritesSelector: TypedUseSelectorHook<{
  favorites: FavoritesState;
}> = useSelector;

/**
 * Typed hook for the headerTitle store selector
 */
export const useHeaderTitleSelector: TypedUseSelectorHook<{
  headerTitle: HeaderTitleState;
}> = useSelector;
