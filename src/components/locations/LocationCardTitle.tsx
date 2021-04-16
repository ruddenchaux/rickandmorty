import { Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import { Location } from '../../models/Location';

export default function LocationCardTitle({ location, isLoading }: { location: Location; isLoading: boolean }) {
  if (isLoading) {
    return <Skeleton height={44} />;
  }

  return (
    <Typography component="h2" variant="h5" data-cy="location-name">
      {location.name}
    </Typography>
  );
}
