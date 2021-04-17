import React from 'react';
import { useDispatch } from 'react-redux';
import CharactersFullScreenDialog from '../components/characters/CharactersFullScreenDialog';
import EpisodeCard from '../components/episodes/EpisodeCard';
import ItemsGrid from '../components/ItemsGrid';
import { Episode } from '../models/Episode';
import { EpisodesWrapperResponse, useGetAllQuery } from '../services/episodes';
import { setHeaderTitle } from '../store/headerTitle';

export default function Episodes() {
  const dispatch = useDispatch();

  dispatch(setHeaderTitle('Episodes'));

  return (
    <>
      <ItemsGrid<Episode, EpisodesWrapperResponse>
        ComponentCard={EpisodeCard}
        useGetAllQuery={useGetAllQuery}
        xs={12}
        sm={12}
        md={12}
        lg={6}
        xl={4}
      />
      <CharactersFullScreenDialog />
    </>
  );
}
