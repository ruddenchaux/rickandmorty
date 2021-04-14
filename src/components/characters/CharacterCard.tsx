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

export default function CharacterCard({ item, isLoading }: { item: Character; isLoading: boolean }) {
  const classes = useStyles();

  return (
    <Card className={classes.card} data-cy="character-card">
      <CharacterCardMedia isLoading={isLoading} character={item} />

      <div className={classes.cardDetails}>
        <CardContent>
          <CharacterCardTitle isLoading={isLoading} character={item} />

          <CharacterCardLastLocation isLoading={isLoading} character={item} />

          <CharacterCardFirstSeenIn isLoading={isLoading} character={item} />
        </CardContent>
      </div>
    </Card>
  );
}
