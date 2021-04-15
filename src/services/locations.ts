import { createApi } from '@rtk-incubator/rtk-query';
import { gql, request } from 'graphql-request';

const BASE_URL = 'https://rickandmortyapi.com/graphql';

export interface LocationsWrapperResponse {
  locations: {
    results: Location[];
  };
}

// create a basic `baseQuery` util
const graphqlBaseQuery = <T>({ baseUrl }: { baseUrl: string }) => async ({ body }: { body: string }) => {
  const result = await request<T>(baseUrl, body);
  return { data: result };
};

// Define a service using a base URL and expected endpoints
export const locationsApi = createApi({
  reducerPath: 'locationsApi',
  baseQuery: graphqlBaseQuery<LocationsWrapperResponse>({
    baseUrl: BASE_URL
  }),
  endpoints: (builder) => ({
    getAll: builder.query({
      query: (page = 1) => ({
        body: gql`
          query {
            locations(page: ${page}) {
              results {
                id
                name
                type
                dimension
                residents {
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
        return response.locations.results;
      }
    })
  })
});

export const { useGetAllQuery } = locationsApi;
