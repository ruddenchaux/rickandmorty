import { Avatar, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import { Character } from '../../models/Character';

// component style
const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    margin: theme.spacing(1)
  }
}));

export default function CharacterAvatar({ character, isLoading }: { character: Character; isLoading: boolean }) {
  const classes = useStyles();

  if (isLoading) {
    return <Skeleton className={classes.large} variant="circle" />;
  }

  return <Avatar alt={character.name} src={character.image} className={classes.large} />;
}
