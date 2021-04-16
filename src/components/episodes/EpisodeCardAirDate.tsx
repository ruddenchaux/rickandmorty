import { makeStyles, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import { Episode } from '../../models/Episode';

// component style
const useStyles = makeStyles((theme) => ({
  airDate: {
    marginTop: theme.spacing(3)
  }
}));

export default function EpisodeCardAirDate({ episode, isLoading }: { episode: Episode; isLoading: boolean }) {
  const classes = useStyles();

  if (isLoading) {
    return (
      <div className={classes.airDate}>
        <Skeleton height={20} />
        <Skeleton height={28} />
      </div>
    );
  }

  return (
    <div className={classes.airDate}>
      <Typography variant="subtitle2" component="label" color="textSecondary">
        Air date:
      </Typography>
      <Typography variant="subtitle1" data-cy="episode-air-date">
        {episode.air_date}
      </Typography>
    </div>
  );
}
