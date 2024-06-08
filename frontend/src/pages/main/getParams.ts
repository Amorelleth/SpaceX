import type { Filters } from "./Filters";

import type { Params } from "../../api/launches";

const statusMap = {
  success: { success: true },
  failed: { success: false },
  future: { upcoming: true },
};

const sortMap: Record<NonNullable<Filters["sort"]>, Params["sort"]> = {
  "name-asc": { name: "asc" },
  "name-desc": { name: "desc" },
  "date-asc": { date_utc: "asc" },
  "date-desc": { date_utc: "desc" },
};

export function getParams(page: number, filters: Filters): Params {
  return {
    page,
    ...(filters.sort && { sort: sortMap[filters.sort] }),
    query: {
      ...(filters.rocketId && { rocket: filters.rocketId }),
      ...(filters.status && statusMap[filters.status]),
      ...(filters.search && {
        $text: {
          $search: filters.search,
        },
      }),
    },
  };
}
