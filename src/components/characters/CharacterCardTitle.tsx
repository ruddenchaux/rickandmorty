import { Typography, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import { Character } from '../../models/Character';

// component style
const useStyles = makeStyles(() => ({
  cardTitle: {
    width: '320px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
}));

export default function CharacterCardTitle({ character, isLoading }: { character: Character; isLoading: boolean }) {
  const classes = useStyles();

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
      <Typography className={classes.cardTitle} component="h2" variant="h4" data-cy="character-name">
        {character.name}
      </Typography>

      <Typography variant="subtitle2" data-cy="character-status-species">
        {character.status} - {character.species}
      </Typography>
    </>
  );
}
