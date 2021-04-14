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
  const promise = (function a(): Promise<WrapperResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        request<WrapperResponse>(baseUrl, body).then(resolve, reject);
      }, 5000);
    });
  })();

  const result = await promise;
  return { data: result };
};

// Define a service using a base URL and expected endpoints
export const charactersApi = createApi({
  reducerPath: 'charactersApi',
  baseQuery: graphqlBaseQuery({
    baseUrl: 'https://rickandmortyapi.com/graphql'
  }),
  endpoints: (builder) => ({
    getAll: builder.query({
      query: (page = 1) => ({
        body: gql`
          query {
            characters(page: ${page}) {
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
