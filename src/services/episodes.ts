import { createApi } from '@rtk-incubator/rtk-query';
import { gql, request } from 'graphql-request';
import { Episode } from '../models/Episode';

const BASE_URL = 'https://rickandmortyapi.com/graphql';

export interface EpisodesWrapperResponse {
  episodes: {
    results: Episode[];
  };
}

// create a basic `baseQuery` util
const graphqlBaseQuery = <T>({ baseUrl }: { baseUrl: string }) => async ({ body }: { body: string }) => {
  const result = await request<T>(baseUrl, body);
  return { data: result };
};

// Define a service using a base URL and expected endpoints
export const episodesApi = createApi({
  reducerPath: 'episodesApi',
  baseQuery: graphqlBaseQuery<EpisodesWrapperResponse>({
    baseUrl: BASE_URL
  }),
  endpoints: (builder) => ({
    getAll: builder.query({
      query: (page = 1) => ({
        body: gql`
          query {
            episodes(page: ${page}) {
              results {
                id
                name
                episode
                air_date
                characters {
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
          }
        `
      }),
      transformResponse: (response) => {
        return response.episodes.results;
      }
    })
  })
});

export const { useGetAllQuery } = episodesApi;
