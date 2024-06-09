import { useState, useEffect, useCallback } from "react";

import { fetchLaunches, type Launch } from "../../api/launches";
import { Launches } from "../../components/Launches";

import { FiltersToolbar, type Filters } from "./Filters";

import styles from "./Main.module.css";

export const Main = () => {
  const [filters, setFilters] = useState<Filters>({});

  return (
    <>
      <FiltersToolbar value={filters} onChange={setFilters} />
      <Content filters={filters} />
    </>
  );
};

const Content = ({ filters }: { filters: Filters }) => {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [launches, setLaunches] = useState<Launch[]>([]);
  const [hasMore, setHasMore] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const data = await fetchLaunches({ page, ...filters });
      setHasMore(data.hasNextPage);
      setLaunches((launches) => [...launches, ...data.launches]);
    } catch {
      setIsError(true);
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

  return (
    <>
      <Launches
        value={launches}
        hasMore={hasMore}
        isLoading={isLoading}
        loadMore={loadMore}
      />
      {isError && <div className={styles.error}>Something went wrong</div>}
      {isLoading && <div className={styles.loader}>Loading</div>}
    </>
  );
};
