import { Input } from "@chakra-ui/input";
import { Select } from "@chakra-ui/select";

import styles from "./Filters.module.css";

type Status = "future" | "success" | "failed";

export type Filters = {
  status?: Status;
  rocketId?: string;
  sort?: "name-asc" | "name-desc" | "date-asc" | "date-desc";
};

export const FiltersToolbar = ({
  filters,
  search,
  setSearch,
  setFilters,
}: {
  filters: Filters;
  search?: string;
  setSearch: (search: string) => void;
  setFilters: (filters: Filters) => void;
}) => {
  return (
    <div className={styles.filters}>
      <Select
        placeholder="Select option"
        value={filters.status}
        variant="filled"
        onChange={(event) =>
          setFilters({ ...filters, status: event.target.value as Status })
        }
      >
        <option value="future">Future</option>
        <option value="success">Success</option>
        <option value="failed">Failed</option>
      </Select>

      <Select
        placeholder="Sort by"
        value={filters?.sort}
        variant="filled"
        onChange={(event) =>
          setFilters({
            ...filters,
            sort: event.target.value as Filters["sort"],
          })
        }
      >
        <option value="name-asc">Name ↑</option>
        <option value="name-desc">Name ↓</option>
        <option value="date-asc"> Oldest</option>
        <option value="date-desc">Latest </option>
      </Select>

      <Input
        value={search ?? ""}
        placeholder="Search"
        variant="filled"
        onChange={(event) => setSearch(event.target.value.trim())}
      />

      <Input
        value={filters.rocketId ?? ""}
        placeholder="Rocket ID"
        variant="filled"
        onChange={(event) =>
          setFilters({ ...filters, rocketId: event.target.value.trim() })
        }
      />
    </div>
  );
};
