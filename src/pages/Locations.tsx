import React from 'react';
import { useDispatch } from 'react-redux';
import ItemsGrid from '../components/ItemsGrid';
import LocationCard from '../components/locations/LocationCard';
import { LocationsWrapperResponse, useGetAllQuery } from '../services/locations';
import { setHeaderTitle } from '../store/headerTitleStore';

export default function Locations() {
  const dispatch = useDispatch();

  dispatch(setHeaderTitle('Locations'));

  return (
    <ItemsGrid<Location, LocationsWrapperResponse>
      ComponentCard={LocationCard}
      useGetAllQuery={useGetAllQuery}
      xs={12}
      sm={6}
      md={6}
      lg={4}
      xl={3}
    />
  );
}
