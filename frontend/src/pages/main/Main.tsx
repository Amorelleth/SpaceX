import { useState, useEffect, useCallback } from "react";

import { fetchLaunches, type Launch } from "../../api/launches";
import { Launches } from "../../components/Launches";

import { FiltersToolbar, type Filters } from "./Filters";

import { fuzzySearch } from "./search";

import styles from "./Main.module.css";

// Main page component
export const Main = () => {
  // Backend filters state (except fuzzy search)
  const [filters, setFilters] = useState<Filters>({});
  // Fuzzy search state
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

// Content component fetching and displaying launch data
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
  const [hasMore, setHasMore] = useState(false);

  // State for storing fetched launches
  const [launches, setLaunches] = useState<Launch[]>([]);
  // State for storing launches after applying search filter
  const [searchedLaunches, setSearchedLaunches] = useState<Launch[]>([]);

  // Function to fetch launch data
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

  // Fetching data when loading state changes
  useEffect(() => {
    if (isLoading) {
      fetchData();
    }
  }, [isLoading, fetchData]);

  // Effect to reset launches and page number when filters change
  useEffect(() => {
    setLaunches([]);
    setPage(1);
    // Trigger refetch
    setIsLoading(true);
  }, [filters]);

  // Function to load more data (increment page number)
  const loadMore = useCallback(() => {
    setPage((page) => page + 1);
    setIsLoading(true);
  }, []);

  // Applying fuzzy search on launches when search query or fetched launches change
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
