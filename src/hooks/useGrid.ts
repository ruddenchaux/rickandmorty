import { QueryDefinition } from '@rtk-incubator/rtk-query/dist';
import { UseQuery } from '@rtk-incubator/rtk-query/dist/ts/react-hooks/buildHooks';
import { useEffect, useState } from 'react';
import useIntersectionObserver from './useIntersectionObserver';

export interface UseGridOptions<T, K> {
  pageSize: number;
  startPage: number;
  useGetAllQuery: UseQuery<
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
}

/**
 * Hook for handle api request and infinite loading
 */
export default <T, K>({ pageSize, startPage, useGetAllQuery }: UseGridOptions<T, K>) => {
  // current page number state
  const [page, setPage] = useState(startPage);

  // state for indicate if the current page is the last
  const [isLastPage, setIsLastPage] = useState(false);

  // list of loaded pages state
  const [loadedPages, setLoadedPages] = useState<number[]>([]);

  // list of loaded characters state
  const [paginatedData, setPaginatedData] = useState<T[]>([]);

  // fetch data and get the status
  const { data, error, isFetching, isLoading, isSuccess } = useGetAllQuery(page);

  // hook for handle infinite loading
  const [containerRef, loadMore] = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 1.0
  });

  /**
   * Watch the loadMore flag and set the next page if not yet loaded
   */
  useEffect(() => {
    if (loadMore && !isFetching && !isLoading && !loadedPages.includes(page + 1)) {
      setPage(page + 1);
    }
  }, [loadMore]);

  /**
   * Watch the data form api and set the paginated data, the loaded pages and the last page flag
   */
  useEffect(() => {
    if (data && Array.isArray(data)) {
      // set paginated characters
      setPaginatedData((_paginatedData) => _paginatedData.concat(data));

      // set the current page in loaded pages state
      setLoadedPages((_loadedPages) => [..._loadedPages, page]);

      // set is last page flag state
      setIsLastPage(data.length < pageSize);
    }
  }, [data]);

  return {
    page,
    setPage,
    isLastPage,
    setIsLastPage,
    loadedPages,
    setLoadedPages,
    paginatedData,
    setPaginatedData,
    data,
    error,
    isFetching,
    isLoading,
    isSuccess,
    containerRef,
    loadMore
  };
};
