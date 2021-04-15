import { Card, CardContent, makeStyles } from '@material-ui/core';
import React from 'react';
import { Location } from '../../models/Location';
import LocationCardDimension from './LocationCardDimension';
import LocationCardTitle from './LocationCardTitle';
import LocationCardType from './LocationCardType';

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

export default function LocationCard({ item, isLoading }: { item: Location; isLoading: boolean }) {
  const classes = useStyles();

  return (
    <Card className={classes.card} data-cy="location-card">
      <CardContent className={classes.cardDetails}>
        <LocationCardTitle isLoading={isLoading} location={item} />

        <LocationCardType isLoading={isLoading} location={item} />

        <LocationCardDimension isLoading={isLoading} location={item} />
      </CardContent>
    </Card>
  );
}
