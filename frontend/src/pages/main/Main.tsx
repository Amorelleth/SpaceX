import { useState, useEffect, useCallback } from "react";

import { fetchLaunches, type Launch } from "../../api/launches";
import { Launches } from "../../components/Launches";

import { FiltersToolbar, type Filters } from "./Filters";

import { getParams } from "./getParams";

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

  const [launches, setLaunches] = useState<Launch[]>([]);
  const [hasMore, setHasMore] = useState(false);

  const fetchData = useCallback(async () => {
    const data = await fetchLaunches(getParams(page, filters));
    setHasMore(data.hasNextPage);
    setLaunches((launches) => [...launches, ...data.launches]);
    setIsLoading(false);
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
      {isLoading && <div className={styles.loader}>Loading</div>}
    </>
  );
};
