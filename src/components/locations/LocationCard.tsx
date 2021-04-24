import { Card, CardContent, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import useCard from '../../hooks/useCard';
import { Location } from '../../models/Location';
import CharactersAvatars from '../characters/CharactersAvatars';
import LocationCardDimension from './LocationCardDimension';
import LocationCardTitle from './LocationCardTitle';
import LocationCardType from './LocationCardType';

// component style
const useStyles = makeStyles((theme) => ({
  card: {
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
      height: '234px'
    },
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      height: '285.3px'
    },
    [theme.breakpoints.down('xs')]: {
      display: 'block',
      height: '430.3px'
    }
  },
  cardDetails: {
    flex: 1
  }
}));

export default function LocationCard({ item, isLoading }: { item: Location; isLoading: boolean }) {
  const classes = useStyles();

  // hook for handle card lazy (only when the card enter in the viewport)
  const [containerRef, isVisible] = useCard();

  return (
    <Card ref={containerRef as React.MutableRefObject<HTMLElement>} className={classes.card} data-cy="location-card">
      {isVisible ? (
        <CardContent className={classes.cardDetails}>
          <LocationCardTitle isLoading={isLoading} location={item} />

          <Grid container>
            <Grid item xs={12} sm={5} md={5} lg={5} xl={5}>
              <Grid container>
                <Grid item xs={6} sm={12}>
                  <LocationCardType isLoading={isLoading} location={item} />
                </Grid>

                <Grid item xs={6} sm={12}>
                  <LocationCardDimension isLoading={isLoading} location={item} />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={7} md={7} lg={7} xl={7}>
              <CharactersAvatars
                label="Characters"
                characters={item?.residents}
                dialogTitle={`Residents of ${item?.name} location`}
                isLoading={isLoading}
              />
            </Grid>
          </Grid>
        </CardContent>
      ) : null}
    </Card>
  );
}
