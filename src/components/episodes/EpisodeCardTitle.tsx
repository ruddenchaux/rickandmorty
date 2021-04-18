import { CardActions, Grid, IconButton, Typography } from '@material-ui/core';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import useCardTitle from '../../hooks/useCardTitle';
import { Episode } from '../../models/Episode';
import { selectFavoriteEpisode, toggleFavoriteEpisode } from '../../store/favorites';

export default function EpisodeCardTitle({ episode, isLoading }: { episode: Episode; isLoading: boolean }) {
  const { classes, toggleFavorite, isFavorite } = useCardTitle<Episode>({
    entityType: 'episode',
    entity: episode,
    favoritePath: '/favorites/episodes',
    selectFavorite: selectFavoriteEpisode,
    toggleFavoriteAction: toggleFavoriteEpisode
  });

  if (isLoading) {
    return <Skeleton height={44} />;
  }

  return (
    <Grid container justify="space-between" alignItems="center">
      <Grid item xs={10}>
        <Typography className={classes.ellipsis} component="h2" variant="h5" data-cy="episode-name">
          {episode.name}
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
              data-cy="episode-favorite-action"
              onClick={() => toggleFavorite()}
            >
              {isFavorite ? (
                <Favorite data-cy="episode-favorite-icon" />
              ) : (
                <FavoriteBorder data-cy="episode-not-favorite-icon" />
              )}
            </IconButton>
          )}
        </CardActions>
      </Grid>
    </Grid>
  );
}
