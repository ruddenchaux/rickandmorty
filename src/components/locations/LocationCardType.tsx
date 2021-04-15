import { makeStyles, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import { Location } from '../../models/Location';

// component style
const useStyles = makeStyles((theme) => ({
  type: {
    marginTop: theme.spacing(3)
  }
}));

export default function LocationCardType({ location, isLoading }: { location: Location; isLoading: boolean }) {
  const classes = useStyles();

  if (isLoading) {
    return (
      <div className={classes.type}>
        <Skeleton height={20} />
        <Skeleton height={28} />
      </div>
    );
  }

  return (
    <div className={classes.type}>
      <Typography variant="subtitle2" component="label" color="textSecondary">
        Type:
      </Typography>
      <Typography variant="subtitle1" data-cy="location-type">
        {location.type}
      </Typography>
    </div>
  );
}
