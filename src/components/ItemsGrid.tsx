import { Container, Grid, GridSize } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { LegacyRef } from 'react';
import useGrid, { UseGridOptions } from '../hooks/useGrid';
import useGridStyle from '../hooks/useGridStyle';

export default function ItemsGrid<T, K>({
  ComponentCard,
  useGetAllQuery,
  xs,
  sm,
  md,
  lg,
  xl
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ComponentCard: React.ComponentType<any>;
  useGetAllQuery: UseGridOptions<T, K>['useGetAllQuery'];
  xs: GridSize;
  sm: GridSize;
  md: GridSize;
  lg: GridSize;
  xl: GridSize;
}) {
  const classes = useGridStyle();
  const pageSize = 20;
  const startPage = 1;

  // use hook for handle the fetch api request with infinite loading
  const { page, isLastPage, paginatedData, error, isFetching, isLoading, containerRef } = useGrid({
    pageSize,
    startPage,
    useGetAllQuery
  });

  if (error) {
    return (
      <Container className={classes.cardGrid} maxWidth="md">
        <Alert severity="error">Ops.. Something went wrong! :-(</Alert>
      </Container>
    );
  }

  if (!isFetching && !isLoading && !paginatedData?.length) {
    return (
      <Container className={classes.cardGrid} maxWidth="md">
        <Alert severity="info">There are no data!</Alert>
      </Container>
    );
  }

  return (
    <Container className={classes.cardGrid} maxWidth="xl">
      <Grid container spacing={4}>
        {/* show fake cards with skeleton when loading */}
        {(isFetching || isLoading ? paginatedData.concat(Array.from(new Array(pageSize))) : paginatedData).map(
          (item: T, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Grid item key={index} xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
              <ComponentCard
                // loading only the new cards
                isLoading={(isFetching || isLoading) && index >= (page - 1) * pageSize}
                item={item}
              />
            </Grid>
          )
        )}
      </Grid>
      {/* loading text for known when a user scroll to bottom and load moore data  */}
      {!isLastPage ? (
        <p ref={containerRef as LegacyRef<HTMLParagraphElement>} className={classes.loadingText}>
          loading...
        </p>
      ) : null}
    </Container>
  );
}
