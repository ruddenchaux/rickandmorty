import { makeStyles, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import { Location } from '../../models/Location';

// component style
const useStyles = makeStyles(() => ({
  cardTitle: {
    width: '320px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
}));

export default function LocationCardTitle({ location, isLoading }: { location: Location; isLoading: boolean }) {
  const classes = useStyles();

  if (isLoading) {
    return (
      <>
        <Skeleton height={44} />
        <Skeleton height={20} />
      </>
    );
  }

  return (
    <>
      <Typography className={classes.cardTitle} component="h2" variant="h4" data-cy="location-name">
        {location.name}
      </Typography>
    </>
  );
}
