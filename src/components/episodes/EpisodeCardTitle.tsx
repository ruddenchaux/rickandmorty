import { Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import { Episode } from '../../models/Episode';
import useCardTitleEllipsisStyle from '../../hooks/useCardTitleEllipsisStyle';

export default function EpisodeCardTitle({ episode, isLoading }: { episode: Episode; isLoading: boolean }) {
  const classes = useCardTitleEllipsisStyle()();

  if (isLoading) {
    return <Skeleton height={44} />;
  }

  return (
    <Typography className={classes.ellipsis} component="h2" variant="h5" data-cy="episode-name">
      {episode.name}
    </Typography>
  );
}
