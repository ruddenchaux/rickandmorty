import { createApi } from '@rtk-incubator/rtk-query';
import { gql, request } from 'graphql-request';
import { Character } from '../models/Character';

interface WrapperResponse {
  characters: {
    results: Character[];
  };
}

// create a basic `baseQuery` util
const graphqlBaseQuery = ({ baseUrl }: { baseUrl: string }) => async ({ body }: { body: string }) => {
  const result = await request<WrapperResponse>(baseUrl, body);
  return { data: result };
};

// Define a service using a base URL and expected endpoints
export const charactersApi = createApi({
  reducerPath: 'charactersApi',
  // baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  baseQuery: graphqlBaseQuery({
    baseUrl: 'https://rickandmortyapi.com/graphql'
  }),
  endpoints: (builder) => ({
    getAll: builder.query({
      query: () => ({
        body: gql`
          query {
            characters(page: 1) {
              results {
                id
                name
                status
                species
                image
                location {
                  name
                }
                episode {
                  name
                }
              }
            }
          }
        `
      }),
      transformResponse: (response) => {
        return response.characters.results;
      }
    })
  })
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllQuery } = charactersApi;
