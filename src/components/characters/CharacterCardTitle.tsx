import { Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import useCardTitleEllipsisStyle from '../../hooks/useCardTitleEllipsisStyle';
import { Character } from '../../models/Character';

export default function CharacterCardTitle({ character, isLoading }: { character: Character; isLoading: boolean }) {
  const classes = useCardTitleEllipsisStyle('320px')();

  if (isLoading) {
    return (
      <>
        <Skeleton height={44} />
        <Skeleton height={20} />
      </>
    );
  }

  return (
    <>
      <Typography className={classes.ellipsis} component="h2" variant="h5" data-cy="character-name">
        {character.name}
      </Typography>

      <Typography variant="subtitle2" data-cy="character-status-species">
        {character.status} - {character.species}
      </Typography>
    </>
  );
}
