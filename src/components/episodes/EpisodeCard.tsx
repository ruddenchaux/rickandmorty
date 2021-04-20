import { Card, CardContent, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import useCard from '../../hooks/useCard';
import { Episode } from '../../models/Episode';
import CharactersAvatars from '../characters/CharactersAvatars';
import EpisodeCardAirDate from './EpisodeCardAirDate';
import EpisodeCardEpisode from './EpisodeCardEpisode';
import EpisodeCardTitle from './EpisodeCardTitle';

// component style
const useStyles = makeStyles((theme) => ({
  card: {
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      height: '234px'
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

export default function EpisodeCard({ item, isLoading }: { item: Episode; isLoading: boolean }) {
  const classes = useStyles();

  // hook for handle card lazy (only when the card enter in the viewport)
  const [containerRef, isVisible] = useCard();

  return (
    <Card ref={containerRef as React.MutableRefObject<HTMLElement>} className={classes.card} data-cy="episode-card">
      {isVisible ? (
        <CardContent className={classes.cardDetails}>
          <EpisodeCardTitle isLoading={isLoading} episode={item} />

          <Grid container>
            <Grid item xs={12} sm={5} md={5} lg={5} xl={5}>
              <Grid container>
                <Grid item xs={6} sm={12}>
                  <EpisodeCardEpisode isLoading={isLoading} episode={item} />
                </Grid>

                <Grid item xs={6} sm={12}>
                  <EpisodeCardAirDate isLoading={isLoading} episode={item} />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={7} md={7} lg={7} xl={7}>
              <CharactersAvatars
                label="Characters"
                characters={item?.characters}
                dialogTitle={`Characters in ${item?.name} episode`}
                isLoading={isLoading}
              />
            </Grid>
          </Grid>
        </CardContent>
      ) : null}
    </Card>
  );
}
