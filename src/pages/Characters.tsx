import React from 'react';
import { useDispatch } from 'react-redux';
import CharacterCard from '../components/characters/CharacterCard';
import ItemsGrid from '../components/ItemsGrid';
import { Character } from '../models/Character';
import { CharactersWrapperResponse, useGetAllQuery } from '../services/characters';
import { set } from '../store/headerTitleStore';

export default function Characters() {
  const dispatch = useDispatch();

  dispatch(set('Characters'));

  return (
    <ItemsGrid<Character, CharactersWrapperResponse> ComponentCard={CharacterCard} useGetAllQuery={useGetAllQuery} />
  );
}
