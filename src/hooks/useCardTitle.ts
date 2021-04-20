/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch } from 'react-redux';
import { BaseEntity } from '../models/BaseEntity';
import { FavoritesState, setSnackbar } from '../store/favorites';
import { useFavoritesSelector } from './store';
import useCardTitleEllipsisStyle from './useCardTitleEllipsisStyle';

/**
 * Hook used on card title. The hook handle the style and the favorite
 */
export default <T extends BaseEntity>({
  entityType,
  entity,
  favoritePath,
  selectFavorite,
  toggleFavoriteAction
}: {
  entityType: string;
  entity: T;
  favoritePath: string;
  selectFavorite: (state: { favorites: FavoritesState }, props: any) => boolean;
  toggleFavoriteAction: (
    payload: any
  ) => {
    payload: any;
    type: string;
  };
}) => {
  const classes = useCardTitleEllipsisStyle()();
  const dispatch = useDispatch();
  const isFavorite = useFavoritesSelector((state) => selectFavorite(state, entity?.id));

  const toggleFavorite = () => {
    dispatch(toggleFavoriteAction(entity));
    dispatch(
      setSnackbar({
        open: true,
        action: isFavorite ? 'remove' : 'add',
        entityName: entity.name,
        entityType,
        favoritePath
      })
    );
  };

  return { classes, toggleFavorite, isFavorite };
};
