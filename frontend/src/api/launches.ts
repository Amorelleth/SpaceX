export type Launch = {
  flight_number: number;
  name?: string;
  date_utc: string;
  // date_unix: number;
  // date_local: string;
  // date_precision: "half" | "quarter" | "year" | "month" | "day" | "hour";
  // static_fire_date_utc?: string;
  // static_fire_date_unix?: number;
  // tdb: boolean;
  // net: boolean;
  // window?: number;
  rocket?: string;
  success?: boolean;
  // failures: {
  //   time?: number;
  //   altitude?: number;
  //   reason?: string;
  // }[];
  upcoming: boolean;
  details?: string;

  // fairings: {
  //   reused?: boolean;
  //   recovery_attempt?: boolean;
  //   recovered?: boolean;
  //   ships: string[];
  // };

  // crew: {
  //   crew?: string;
  //   role?: string;
  // }[];

  // ships: string[];
  // capsules: string[];
  // payloads: string[];
  // launchpad?: string;

  // cores: {
  //   core?: string;
  //   flight?: number;
  //   gridfins?: boolean;
  //   legs?: boolean;
  //   reused?: boolean;
  //   landing_attempt?: boolean;
  //   landing_success?: boolean;
  //   landing_type?: string;
  //   landpad?: string;
  // }[];

  links?: {
    patch?: {
      small?: string;
      large?: string;
    };
    reddit?: {
      campaign?: string;
      launch?: string;
      media?: string;
      recovery?: string;
    };
    flickr?: {
      small?: string[];
      original?: string[];
    };
    presskit?: string;
    webcast?: string;
    youtube_id?: string;
    article?: string;
    wikipedia?: string;
  };
  // auto_update: boolean;
};

export type Response = {
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
}: Params = {}) => {
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
