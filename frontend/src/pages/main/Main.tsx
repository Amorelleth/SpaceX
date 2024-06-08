import { useState, useEffect, useCallback } from "react";

import { fetchLaunches, type Response, type Launch } from "../../api/launches";
import { Launches } from "../../components/Launches";

import { FiltersToolbar, type Filters } from "./Filters";

import { getParams } from "./getParams";

export const Main = () => {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [launches, setLaunches] = useState<Launch[]>([]);
  const [hasMore, setHasMore] = useState(false);

  const [filters, setFilters] = useState<Filters>({});

  // const [isError, setIsError] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const data = (await fetchLaunches(getParams(page, filters))) as Response;
      setHasMore(data.hasNextPage);
      setLaunches((launches) => [...launches, ...data.launches]);
    } catch {
      // setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [page, filters]);

  useEffect(() => {
    if (isLoading) {
      fetchData();
    }
  }, [isLoading, fetchData]);

  useEffect(() => {
    setLaunches([]);
    setPage(1);
    setIsLoading(true);
  }, [filters]);

  const loadMore = useCallback(() => {
    setPage((page) => page + 1);
    setIsLoading(true);
  }, []);

  // if (isLoading) return "Loading...";
  // if (isError) return "Error...";

  // if (!launches.length) return "Empty";

  return (
    <>
      <FiltersToolbar value={filters} onChange={setFilters} />
      <Launches
        value={launches}
        hasMore={hasMore}
        isLoading={isLoading}
        loadMore={loadMore}
      />
    </>
  );
};
