import { useState, useEffect, useCallback } from "react";
import {
  fetchLaunches,
  type Response,
  type Launch,
  type Query,
} from "../../api/launches";

import { Select } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";

import styles from "./Main.module.css";

import { Launches } from "../../components/Launches";

type Filters = {
  status?: Status | undefined;
  search?: string;
  rocketId?: string;
  sort?: "name-asc" | "name-desc" | "date-asc" | "date-desc";
};

function filtersToQuery(filters: Filters = {}): Query {
  const query: Query = {};

  if (filters.search) {
    query.$text = {
      $search: filters.search,
    };
  }

  if (filters.rocketId) {
    query.rocket = filters.rocketId;
  }

  if (filters.status) {
    switch (filters.status) {
      case "failed": {
        query.success = false;
        break;
      }
      case "success": {
        query.success = true;
        break;
      }
      case "future": {
        query.upcoming = true;
        break;
      }
    }
  }

  return query;
}

export const Main = () => {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [launches, setLaunches] = useState<Launch[]>([]);
  const [hasMore, setHasMore] = useState(false);

  const [filters, setFilters] = useState<Filters>({
    status: undefined,
  });

  // const [isError, setIsError] = useState(false);

  const fetchData = async () => {
    const params: Parameters<typeof fetchLaunches>[0] = {
      page,
      query: filtersToQuery(filters),
    };

    if (filters?.sort) {
      switch (filters.sort) {
        case "name-asc": {
          params.sort = { name: "asc" };
          break;
        }
        case "name-desc": {
          params.sort = { name: "desc" };
          break;
        }
        case "date-asc": {
          params.sort = { date_utc: "asc" };
          break;
        }
        case "date-desc": {
          params.sort = { date_utc: "desc" };
          break;
        }
      }
    }

    try {
      const data = (await fetchLaunches(params)) as Response;
      setHasMore(data.hasNextPage);
      setLaunches((launches) => [...launches, ...data.launches]);
    } catch {
      // setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoading) {
      fetchData();
    }
  }, [isLoading]);

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
      <div className={styles.filters}>
        <StatusFilter
          value={filters.status}
          onChange={(selected) =>
            setFilters((prev) => ({ ...prev, status: selected as Status }))
          }
        />
        <SortFilter
          value={filters?.sort}
          onChange={(selected) =>
            setFilters((prev) => ({
              ...prev,
              sort: selected as Filters["sort"],
            }))
          }
        />
        <Search
          value={filters.search}
          placeholder="Search"
          onChange={(search) => setFilters((prev) => ({ ...prev, search }))}
        />
        <Search
          value={filters.rocketId}
          placeholder="Rocket ID"
          onChange={(rocketId) => setFilters((prev) => ({ ...prev, rocketId }))}
        />
      </div>

      <Launches
        value={launches}
        hasMore={hasMore}
        isLoading={isLoading}
        loadMore={loadMore}
      />
    </>
  );
};

type Status = "future" | "success" | "failed";

const StatusFilter = ({
  value,
  onChange,
}: {
  value?: Status;
  onChange: (selected?: string) => void;
}) => {
  return (
    <Select
      placeholder="Select option"
      value={value}
      variant="filled"
      onChange={(event) => onChange(event.target.value)}
    >
      <option value="future">Future</option>
      <option value="success">Success</option>
      <option value="failed">Failed</option>
    </Select>
  );
};

const SortFilter = ({
  value,
  onChange,
}: {
  value?: "name-asc" | "name-desc" | "date-asc" | "date-desc";
  onChange: (selected?: string) => void;
}) => {
  return (
    <Select
      placeholder="Sort by"
      value={value}
      variant="filled"
      onChange={(event) => onChange(event.target.value)}
    >
      <option value="name-asc"> Name asc </option>
      <option value="name-desc"> Name desc </option>
      <option value="date-asc"> Oldest</option>
      <option value="date-desc">Latest </option>
    </Select>
  );
};

const Search = ({
  onChange,
  value,
  placeholder,
}: {
  onChange: (text: string) => void;
  value?: string;
  placeholder?: string;
}) => {
  return (
    <Input
      value={value ?? ""}
      placeholder={placeholder}
      variant="filled"
      onChange={(event) => onChange(event.target.value)}
    />
  );
};
