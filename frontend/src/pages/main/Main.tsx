import { useState, useEffect, useCallback } from "react";

import { fetchLaunches, type Launch } from "../../api/launches";
import { Launches } from "../../components/Launches";

import { FiltersToolbar, type Filters } from "./Filters";

import { fuzzySearch } from "./search";

import styles from "./Main.module.css";

export const Main = () => {
  const [filters, setFilters] = useState<Filters>({});
  const [search, setSearch] = useState<string>();

  return (
    <>
      <FiltersToolbar
        filters={filters}
        setFilters={setFilters}
        setSearch={setSearch}
        search={search}
      />
      <Content filters={filters} search={search} />
    </>
  );
};

const Content = ({
  filters,
  search,
}: {
  filters: Filters;
  search?: string;
}) => {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [launches, setLaunches] = useState<Launch[]>([]);
  const [searchedLaunches, setSearchedLaunches] = useState<Launch[]>([]);

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

  useEffect(() => {
    setSearchedLaunches(search ? fuzzySearch(launches, search) : launches);
  }, [search, launches]);

  return (
    <>
      <Launches
        value={searchedLaunches}
        hasMore={hasMore}
        isLoading={isLoading}
        loadMore={loadMore}
      />
      {isError && <div className={styles.error}>Something went wrong</div>}
      {isLoading && <div className={styles.loader}>Loading</div>}
    </>
  );
};
