import { makeStyles, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import { Episode } from '../../models/Episode';

// component style
const useStyles = makeStyles((theme) => ({
  episode: {
    marginTop: theme.spacing(3)
  }
}));

export default function EpisodeCardEpisode({ episode, isLoading }: { episode: Episode; isLoading: boolean }) {
  const classes = useStyles();

  if (isLoading) {
    return (
      <div className={classes.episode}>
        <Skeleton height={20} />
        <Skeleton height={28} />
      </div>
    );
  }

  return (
    <div className={classes.episode}>
      <Typography variant="subtitle2" component="label" color="textSecondary">
        Episode:
      </Typography>
      <Typography variant="subtitle1" data-cy="episode-episode">
        {episode.episode}
      </Typography>
    </div>
  );
}
