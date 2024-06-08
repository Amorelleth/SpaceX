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
  query?: {
    upcoming?: boolean;
    success?: boolean;
    rocket?: string;
    $text?: {
      $search?: string;
    };
  };
  sort?:
    | {
        name: "asc" | "desc";
      }
    | {
        date_utc: "asc" | "desc";
      };
};

export const fetchLaunches = ({
  limit = 10,
  page = 1,
  query = {},
  sort,
}: Params = {}): Promise<Response> => {
  return fetch("http://localhost:3000/api/launches", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      options: {
        limit,
        page,
        sort,
        pagination: true,
        select: [
          "name",
          "details",
          "date_utc",
          "rocket",
          "success",
          "details",
          "flight_number",
          "upcoming",
          "links",
        ],
      },
    }),
  })
    .then((r) => r.json())
    .then(({ docs, ...rest }) => ({ launches: docs, ...rest }));
};
