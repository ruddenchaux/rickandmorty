import { Card, CardContent, makeStyles } from '@material-ui/core';
import React from 'react';
import useCard from '../../hooks/useCard';
import { Character } from '../../models/Character';
import CharacterCardFirstSeenIn from './CharacterCardFirstSeenIn';
import CharacterCardLastLocation from './CharacterCardLastLocation';
import CharacterCardMedia from './CharacterCardMedia';
import CharacterCardTitle from './CharacterCardTitle';

// component style
const useStyles = makeStyles((theme) => ({
  card: {
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      height: '239px'
    },
    [theme.breakpoints.down('xs')]: {
      display: 'block',
      height: '439px'
    }
  },
  cardDetails: {
    flex: 1
  }
}));

export default function CharacterCard({ item, isLoading }: { item: Character; isLoading: boolean }) {
  const classes = useStyles();

  // hook for handle card lazy (only when the card enter in the viewport)
  const [containerRef, isVisible] = useCard();

  return (
    <Card ref={containerRef as React.MutableRefObject<HTMLElement>} className={classes.card} data-cy="character-card">
      {isVisible ? (
        <>
          <CharacterCardMedia isLoading={isLoading} character={item} />

          <div className={classes.cardDetails}>
            <CardContent>
              <CharacterCardTitle isLoading={isLoading} character={item} />

              <CharacterCardLastLocation isLoading={isLoading} character={item} />

              <CharacterCardFirstSeenIn isLoading={isLoading} character={item} />
            </CardContent>
          </div>
        </>
      ) : null}
    </Card>
  );
}
