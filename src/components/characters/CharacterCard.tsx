import { Card, CardContent, makeStyles } from '@material-ui/core';
import React from 'react';
import { Character } from '../../models/Character';
import CharacterCardFirstSeenIn from './CharacterCardFirstSeenIn';
import CharacterCardLastLocation from './CharacterCardLastLocation';
import CharacterCardMedia from './CharacterCardMedia';
import CharacterCardTitle from './CharacterCardTitle';

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
  }
}));

export default function CharacterCard({ character, isLoading }: { character: Character; isLoading: boolean }) {
  const classes = useStyles();

  return (
    <Card className={classes.card} data-cy="character-card">
      <CharacterCardMedia isLoading={isLoading} character={character} />

      <div className={classes.cardDetails}>
        <CardContent>
          <CharacterCardTitle isLoading={isLoading} character={character} />

          <CharacterCardLastLocation isLoading={isLoading} character={character} />

          <CharacterCardFirstSeenIn isLoading={isLoading} character={character} />
        </CardContent>
      </div>
    </Card>
  );
}
