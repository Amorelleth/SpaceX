import { useState, useEffect, useCallback } from "react";
import { fetchLaunches, type Response, type Launch } from "../../api/launches";

import { Launches } from "../../components/Launches";

export const Main = () => {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [launches, setLaunches] = useState<Launch[]>([]);
  const [hasMore, setHasMore] = useState(false);
  // const [isError, setIsError] = useState(false);

  const fetchData = async (page: number) => {
    setIsLoading(true);

    try {
      const data = (await fetchLaunches({ page })) as Response;
      setHasMore(data.hasNextPage);
      setLaunches((launches) => [...launches, ...data.launches]);
    } catch {
      // setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const loadMore = useCallback(() => {
    setPage((page) => page + 1);
  }, []);

  // if (isLoading) return "Loading...";
  // if (isError) return "Error...";

  // if (!launches.length) return "Empty";

  return (
    <Launches
      value={launches}
      hasMore={hasMore}
      isLoading={isLoading}
      loadMore={loadMore}
    />
  );
};
