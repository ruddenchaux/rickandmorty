import { Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import useCardTitleEllipsisStyle from '../../hooks/useCardTitleEllipsisStyle';
import { Location } from '../../models/Location';

export default function LocationCardTitle({ location, isLoading }: { location: Location; isLoading: boolean }) {
  const classes = useCardTitleEllipsisStyle()();

  if (isLoading) {
    return <Skeleton height={44} />;
  }

  return (
    <Typography className={classes.ellipsis} component="h2" variant="h5" data-cy="location-name">
      {location.name}
    </Typography>
  );
}
