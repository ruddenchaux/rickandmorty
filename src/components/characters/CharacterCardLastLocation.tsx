import { makeStyles, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import { Character } from '../../models/Character';

// component style
const useStyles = makeStyles((theme) => ({
  lastLocation: {
    marginTop: theme.spacing(3)
  }
}));

export default function CharacterCardLastLocation({
  character,
  isLoading
}: {
  character: Character;
  isLoading: boolean;
}) {
  const classes = useStyles();

  if (isLoading) {
    return (
      <div className={classes.lastLocation}>
        <Skeleton height={20} />
        <Skeleton height={28} />
      </div>
    );
  }

  return (
    <div className={classes.lastLocation}>
      <Typography variant="subtitle2" component="label" color="textSecondary">
        Last known location:
      </Typography>
      <Typography variant="subtitle1" data-cy="character-last-known-position">
        {character.location.name}
      </Typography>
    </div>
  );
}
