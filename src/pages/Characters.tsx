import React from 'react';
import { useDispatch } from 'react-redux';
import CharacterCard from '../components/characters/CharacterCard';
import ItemsGrid from '../components/ItemsGrid';
import { Character } from '../models/Character';
import { CharactersWrapperResponse, useGetAllQuery } from '../services/characters';
import { setHeaderTitle } from '../store/headerTitle';

export default function Characters() {
  const dispatch = useDispatch();

  dispatch(setHeaderTitle('Characters'));

  return (
    <ItemsGrid<Character, CharactersWrapperResponse>
      ComponentCard={CharacterCard}
      useGetAllQuery={useGetAllQuery}
      xs={12}
      sm={12}
      md={12}
      lg={6}
      xl={4}
    />
  );
}
