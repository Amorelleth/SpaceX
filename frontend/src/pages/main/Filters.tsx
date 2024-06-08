import { Input } from "@chakra-ui/input";
import { Select } from "@chakra-ui/select";

import styles from "./Filters.module.css";

type Status = "future" | "success" | "failed";

export type Filters = {
  status?: Status | undefined;
  search?: string;
  rocketId?: string;
  sort?: "name-asc" | "name-desc" | "date-asc" | "date-desc";
};

export const FiltersToolbar = ({
  value,
  onChange,
}: {
  value: Filters;
  onChange: (filters: Filters) => void;
}) => {
  return (
    <div className={styles.filters}>
      <Select
        placeholder="Select option"
        value={value.status}
        variant="filled"
        onChange={(event) =>
          onChange({ ...value, status: event.target.value as Status })
        }
      >
        <option value="future">Future</option>
        <option value="success">Success</option>
        <option value="failed">Failed</option>
      </Select>

      <Select
        placeholder="Sort by"
        value={value?.sort}
        variant="filled"
        onChange={(event) =>
          onChange({
            ...value,
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
        value={value.search ?? ""}
        placeholder="Search"
        variant="filled"
        onChange={(event) =>
          onChange({ ...value, search: event.target.value.trim() })
        }
      />

      <Input
        value={value.rocketId ?? ""}
        placeholder="Rocket ID"
        variant="filled"
        onChange={(event) =>
          onChange({ ...value, rocketId: event.target.value.trim() })
        }
      />
    </div>
  );
};
