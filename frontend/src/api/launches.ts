export type Launch = {
  flight_number: number;
  name?: string;
  date_utc: string;
  rocket?: string;
  success?: boolean;
  upcoming: boolean;
  details?: string;
  links?: {
    patch?: {
      small?: string;
      large?: string;
    };
  };
};

type Response = {
  launches: Launch[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number;
  nextPage: number;
};

export type Params = {
  limit?: number;
  page?: number;
  search?: string;
  rocketId?: string;
  status?: "future" | "success" | "failed";
  sort?: "name-asc" | "name-desc" | "date-asc" | "date-desc";
};

export const fetchLaunches = (params: Params = {}): Promise<Response> => {
  return fetch("http://localhost:3000/api/launches", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  })
    .then((r) => r.json())
    .then(({ docs, ...rest }) => ({ launches: docs, ...rest }));
};
