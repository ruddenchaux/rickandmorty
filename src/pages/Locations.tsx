import React from 'react';
import { useDispatch } from 'react-redux';
import CharactersFullScreenDialog from '../components/characters/CharactersFullScreenDialog';
import ItemsGrid from '../components/ItemsGrid';
import LocationCard from '../components/locations/LocationCard';
import { LocationsWrapperResponse, useGetAllQuery } from '../services/locations';
import { setHeaderTitle } from '../store/headerTitleStore';

export default function Locations() {
  const dispatch = useDispatch();

  dispatch(setHeaderTitle('Locations'));

  return (
    <>
      <ItemsGrid<Location, LocationsWrapperResponse>
        ComponentCard={LocationCard}
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
