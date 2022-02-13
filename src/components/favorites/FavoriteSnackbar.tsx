/* eslint-disable react/jsx-props-no-spreading */
import { Link, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { useFavoritesSelector } from '../../hooks/store';
import { setDialogOpen } from '../../store/charactersDialog';
import { FavoritesState, setSnackbar } from '../../store/favorites';
import Logo from '../Logo';

// component for handle the snackbar message
function SnackbarMessage({ action, entityName, entityType, favoritePath }: FavoritesState['snackbar']) {
  const dispatch = useDispatch();

  if (action === 'add') {
    return (
      <span data-cy="favorite-snackbar-message">
        {entityName} {entityType} added to the{' '}
        <Link
          component={RouterLink}
          to={favoritePath}
          onClick={() => {
            dispatch(setDialogOpen(false));
            dispatch(setSnackbar({ open: false }));
          }}
        >
          favorites
        </Link>
      </span>
    );
  }

  return (
    <span data-cy="favorite-snackbar-message">
      {entityName} {entityType} removed to the favorites
    </span>
  );
}

export default function FavoriteSnackbar() {
  const dispatch = useDispatch();
  const snackbar = useFavoritesSelector((state) => state.favorites.snackbar);

  const handleClose = (_event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(setSnackbar({ open: false }));
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      open={snackbar.open}
      onClose={handleClose}
      autoHideDuration={6000}
    >
      <Alert severity="info" icon={<Logo width={20} height={20} />} onClose={handleClose}>
        <SnackbarMessage {...snackbar} />
      </Alert>
    </Snackbar>
  );
}
