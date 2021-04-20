import { Container, Grid, Link } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useFavoritesSelector } from '../../hooks/store';
import useGridStyle from '../../hooks/useGridStyle';
import { Character } from '../../models/Character';
import { Episode } from '../../models/Episode';
import { Location } from '../../models/Location';

declare type T = Character | Location | Episode;

export default function FavoritesGrid({
  CardComponent,
  favoriteStateKey,
  label,
  entityPath
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  CardComponent: React.ComponentType<any>;
  favoriteStateKey: 'favoritesCharacters' | 'favoritesLocations' | 'favoritesEpisodes';
  label: string;
  entityPath: string;
}) {
  const gridClasses = useGridStyle();
  const favoritesItems = useFavoritesSelector((state) => state.favorites[favoriteStateKey]);

  if (!favoritesItems.length) {
    return (
      <Container className={gridClasses.cardGrid} maxWidth="md">
        <Alert severity="info" variant="outlined">
          <div>You haven&apos;t favorites {label}!</div>
          <div>
            Go to the{' '}
            <Link component={RouterLink} to={entityPath} data-cy="favorite-entity-path">
              {label}
            </Link>{' '}
            for select your favorites!
          </div>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className={gridClasses.cardGrid} maxWidth="xl">
      <Grid container spacing={4}>
        {favoritesItems?.map((item: T) => (
          <Grid item key={item.id} xs={12} sm={12} md={12} lg={6} xl={4}>
            <CardComponent isLoading={false} item={item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
