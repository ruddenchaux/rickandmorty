import { CardMedia, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import { Character } from '../../models/Character';

// component style
const useStyles = makeStyles((theme) => ({
  cardMedia: {
    height: 'auto',
    [theme.breakpoints.up('sm')]: {
      minWidth: 220
    },
    [theme.breakpoints.down('xs')]: {
      height: 200
    }
  }
}));

export default function CharacterCardMedia({ character, isLoading }: { character: Character; isLoading: boolean }) {
  const classes = useStyles();
  if (isLoading) {
    return <Skeleton variant="rect" className={classes.cardMedia} />;
  }

  return <CardMedia className={classes.cardMedia} image={character.image} title={character.name} />;
}
