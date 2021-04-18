import { Container, Grid } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import useGridStyle from '../../hooks/useGridStyle';
import { Character } from '../../models/Character';
import { FavoritesState } from '../../store/favorites';
import CharacterCard from '../characters/CharacterCard';

export default function FavoritesCharacters() {
  const gridClasses = useGridStyle();
  const favoritesCharacters = useSelector<FavoritesState, Character[]>((state) => state.favorites.favoritesCharacters);

  return (
    <Container className={gridClasses.cardGrid} maxWidth="xl">
      <Grid container spacing={4}>
        {favoritesCharacters?.map((item: Character) => (
          <Grid item key={item.id} xs={12} sm={12} md={12} lg={6} xl={4}>
            <CharacterCard isLoading={false} item={item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
