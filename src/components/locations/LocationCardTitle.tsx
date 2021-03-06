import { CardActions, Grid, IconButton, Typography } from '@material-ui/core';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import useCardTitle from '../../hooks/useCardTitle';
import { Location } from '../../models/Location';
import { selectFavoriteLocation, toggleFavoriteLocation } from '../../store/favorites';

export default function LocationCardTitle({ location, isLoading }: { location: Location; isLoading: boolean }) {
  const { classes, toggleFavorite, isFavorite } = useCardTitle<Location>({
    entityType: 'location',
    entity: location,
    favoritePath: '/favorites/locations',
    selectFavorite: selectFavoriteLocation,
    toggleFavoriteAction: toggleFavoriteLocation
  });

  if (isLoading) {
    return <Skeleton height={44} />;
  }

  return (
    <Grid container justify="space-between" alignItems="center">
      <Grid item xs={10}>
        <Typography className={classes.ellipsis} component="h2" variant="h5" data-cy="location-name">
          {location.name}
        </Typography>
      </Grid>

      <Grid item xs={2}>
        <CardActions className={classes.favoriteActions}>
          {isLoading ? (
            <Skeleton variant="circle" width={30} height={30} />
          ) : (
            <IconButton
              color="primary"
              aria-label="toggle favorite"
              data-cy="location-favorite-action"
              onClick={() => toggleFavorite()}
            >
              {isFavorite ? (
                <Favorite data-cy="location-favorite-icon" />
              ) : (
                <FavoriteBorder data-cy="location-not-favorite-icon" />
              )}
            </IconButton>
          )}
        </CardActions>
      </Grid>
    </Grid>
  );
}
