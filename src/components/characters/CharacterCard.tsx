import { Card, CardContent, CardMedia, Typography, makeStyles } from '@material-ui/core';

import React from 'react';
import { Character } from '../../models/Character';

// component style
const useStyles = makeStyles((theme) => ({
  card: {
    [theme.breakpoints.up('sm')]: {
      display: 'flex'
    },
    [theme.breakpoints.down('xs')]: {
      display: 'block'
    }
  },
  cardDetails: {
    flex: 1
  },
  cardMedia: {
    [theme.breakpoints.up('sm')]: {
      width: 220
    },
    [theme.breakpoints.down('xs')]: {
      height: 300
    }
  },
  lastLocation: {
    marginTop: theme.spacing(3)
  }
}));

function Title({ character }: { character: Character }) {
  return (
    <>
      <Typography component="h2" variant="h4" data-cy="character-name">
        {character.name}
      </Typography>

      <Typography variant="subtitle2" data-cy="character-status-species">
        {character.status} - {character.species}
      </Typography>
    </>
  );
}

function LastLocation({ character, className }: { character: Character; className: string }) {
  return (
    <div className={className}>
      <Typography variant="subtitle2" color="textSecondary">
        Last known location:
      </Typography>
      <Typography variant="subtitle1" paragraph data-cy="character-last-known-position">
        {character.location.name}
      </Typography>
    </div>
  );
}

function FirstSeenIn({ character }: { character: Character }) {
  return (
    <>
      <Typography variant="subtitle2" color="textSecondary">
        First seen in:
      </Typography>
      <Typography variant="subtitle1" data-cy="character-first-seen-in">
        {character.episode[0].name}
      </Typography>
    </>
  );
}

export default function CharacterCard({ character }: { character: Character }) {
  const classes = useStyles();

  return (
    <Card className={classes.card} data-cy="character-card">
      <CardMedia className={classes.cardMedia} image={character.image} title={character.name} />

      <div className={classes.cardDetails}>
        <CardContent>
          <Title character={character} />

          <LastLocation className={classes.lastLocation} character={character} />

          <FirstSeenIn character={character} />
        </CardContent>
      </div>
    </Card>
  );
}
