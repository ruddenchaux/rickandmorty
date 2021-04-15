import { createApi } from '@rtk-incubator/rtk-query';
import { gql, request } from 'graphql-request';

export interface LocationsWrapperResponse {
  locations: {
    results: Location[];
  };
}

// create a basic `baseQuery` util
const graphqlBaseQuery = ({ baseUrl }: { baseUrl: string }) => async ({ body }: { body: string }) => {
  const result = await request<LocationsWrapperResponse>(baseUrl, body);
  return { data: result };
};

// Define a service using a base URL and expected endpoints
export const locationsApi = createApi({
  reducerPath: 'locationsApi',
  baseQuery: graphqlBaseQuery({
    baseUrl: 'https://rickandmortyapi.com/graphql'
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
                  image
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

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllQuery } = locationsApi;
