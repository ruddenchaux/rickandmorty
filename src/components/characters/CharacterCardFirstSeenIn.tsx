import { Typography, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import { Character } from '../../models/Character';

// component style
const useStyles = makeStyles((theme) => ({
  firstSeenIn: {
    marginTop: theme.spacing(3)
  }
}));

export default function CharacterCardFirstSeenIn({
  character,
  isLoading
}: {
  character: Character;
  isLoading: boolean;
}) {
  const classes = useStyles();

  if (isLoading) {
    return (
      <div className={classes.firstSeenIn}>
        <Skeleton height={20} />
        <Skeleton height={28} />
      </div>
    );
  }

  return (
    <div className={classes.firstSeenIn}>
      <Typography variant="subtitle2" component="label" color="textSecondary">
        First seen in:
      </Typography>
      <Typography variant="subtitle1" component="div" data-cy="character-first-seen-in">
        {character.episode[0].name}
      </Typography>
    </div>
  );
}
