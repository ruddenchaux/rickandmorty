import React from 'react';
import ItemsGrid from '../components/ItemsGrid';
import CharacterCard from '../components/characters/CharacterCard';
import { Character } from '../models/Character';
import { CharactersWrapperResponse, useGetAllQuery } from '../services/characters';

export default function Characters() {
  return (
    <ItemsGrid<Character, CharactersWrapperResponse> ComponentCard={CharacterCard} useGetAllQuery={useGetAllQuery} />
  );
}
