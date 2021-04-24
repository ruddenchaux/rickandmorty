import { Container, Grid, GridSize } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { QueryDefinition } from '@rtk-incubator/rtk-query/dist';
import { UseQuery } from '@rtk-incubator/rtk-query/dist/ts/react-hooks/buildHooks';
import React, { LegacyRef, useEffect, useState } from 'react';
import useGridStyle from '../hooks/useGridStyle';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

type UseGetAllQuery<T, K> = UseQuery<
  QueryDefinition<
    unknown,
    ({
      body
    }: {
      body: string;
    }) => Promise<{
      data: K;
    }>,
    never,
    T[],
    string,
    Record<string, unknown>
  >
>;

export default function ItemsGrid<T, K>({
  CardComponent,
  useGetAllQuery,
  xs,
  sm,
  md,
  lg,
  xl
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  CardComponent: React.ComponentType<any>;
  useGetAllQuery: UseGetAllQuery<T, K>;
  xs: GridSize;
  sm: GridSize;
  md: GridSize;
  lg: GridSize;
  xl: GridSize;
}) {
  const classes = useGridStyle();
  const pageSize = 20;
  const startPage = 1;

  // current page number state
  const [page, setPage] = useState(startPage);

  // state for indicate if the current page is the last
  const [isLastPage, setIsLastPage] = useState(false);

  // list of loaded pages state
  const [loadedPages, setLoadedPages] = useState<number[]>([]);

  // list of loaded characters state
  const [paginatedData, setPaginatedData] = useState<T[]>(Array.from(new Array(pageSize)));

  // fetch data and get the status
  const { data: fetchedItems, error, isFetching, isLoading } = useGetAllQuery(page);

  // hook for handle infinite loading
  const [containerRef, loadMore] = useIntersectionObserver({
    root: null,
    rootMargin: '600px',
    threshold: 1.0
  });

  /**
   * Watch the loadMore flag and set the next page if not yet loaded
   */
  useEffect(() => {
    if (loadMore && !loadedPages.includes(page + 1)) {
      // added empty item for skeleton loading
      setPaginatedData((_paginatedData) => _paginatedData.concat(Array.from(new Array(pageSize))));

      // set next page number for fetch new page
      setPage(page + 1);
    }
  }, [loadMore]);

  /**
   * Watch the data form api and set the paginated data, the loaded pages and the last page flag
   */
  useEffect(() => {
    if (fetchedItems && Array.isArray(fetchedItems)) {
      // set paginated items with: remove the skeleton element and  append the last page on tail
      setPaginatedData((_paginatedData) => [..._paginatedData.slice(0, (page - 1) * 20), ...fetchedItems]);

      // set the current page in loaded pages state
      setLoadedPages((_loadedPages) => [..._loadedPages, page]);

      // set is last page flag state
      setIsLastPage(fetchedItems.length < pageSize);
    }
  }, [fetchedItems]);

  if (error) {
    return (
      <Container className={classes.cardGrid} maxWidth="md">
        <Alert severity="error">Ops.. Something went wrong! :-(</Alert>
      </Container>
    );
  }

  if (!isFetching && !isLoading && !paginatedData?.length && !fetchedItems?.length) {
    return (
      <Container className={classes.cardGrid} maxWidth="md">
        <Alert severity="info">There are no data!</Alert>
      </Container>
    );
  }

  return (
    <Container className={classes.cardGrid} maxWidth="xl">
      <Grid container spacing={4}>
        {paginatedData.map((item: T, index: number) => (
          // eslint-disable-next-line react/no-array-index-key
          <Grid item key={index} xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
            <CardComponent
              // loading only the new cards
              isLoading={!item}
              item={item}
            />
          </Grid>
        ))}
      </Grid>
      {/* loading text for known when a user scroll to bottom and load moore data  */}
      {!isLastPage && !isFetching ? (
        <p ref={containerRef as LegacyRef<HTMLParagraphElement>} className={classes.loadingText}>
          loading...
        </p>
      ) : null}
    </Container>
  );
}
