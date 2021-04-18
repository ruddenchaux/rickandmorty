import { CardActions, Grid, IconButton, Typography } from '@material-ui/core';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import useCardTitle from '../../hooks/useCardTitle';
import { Character } from '../../models/Character';
import { selectFavoriteCharacter, toggleFavoriteCharacter } from '../../store/favorites';

export default function CharacterCardTitle({ character, isLoading }: { character: Character; isLoading: boolean }) {
  const { classes, toggleFavorite, isFavorite } = useCardTitle<Character>({
    entityType: 'character',
    entity: character,
    favoritePath: '/favorites',
    selectFavorite: selectFavoriteCharacter,
    toggleFavoriteAction: toggleFavoriteCharacter
  });

  if (isLoading) {
    return (
      <>
        <Skeleton height={44} />
        <Skeleton height={20} />
      </>
    );
  }

  return (
    <Grid container justify="space-between" alignItems="center">
      <Grid item xs={10}>
        <Typography className={classes.ellipsis} component="h2" variant="h5" data-cy="character-name">
          {character.name}
        </Typography>
        <Typography variant="subtitle2" component="span" data-cy="character-status-species">
          {character.status} - {character.species}
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
              data-cy="character-favorite-action"
              onClick={() => toggleFavorite()}
            >
              {isFavorite ? (
                <Favorite data-cy="character-favorite-icon" />
              ) : (
                <FavoriteBorder data-cy="character-not-favorite-icon" />
              )}
            </IconButton>
          )}
        </CardActions>
      </Grid>
    </Grid>
  );
}
