export type ReqBody = {
  limit?: number;
  page?: number;
  search?: string;
  rocketId?: string;
  status?: "future" | "success" | "failed";
  sort?: "name-asc" | "name-desc" | "date-asc" | "date-desc";
};

export type Body = {
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
  options: {
    page?: number;
    limit?: number;
    pagination?: boolean;
    select?: string[];
  };
  sort?:
    | {
        name: "asc" | "desc";
      }
    | {
        date_utc: "asc" | "desc";
      };
};

const statusMap = {
  success: { success: true },
  failed: { success: false },
  future: { upcoming: true },
};

const sortMap: Record<NonNullable<ReqBody["sort"]>, Body["sort"]> = {
  "name-asc": { name: "asc" },
  "name-desc": { name: "desc" },
  "date-asc": { date_utc: "asc" },
  "date-desc": { date_utc: "desc" },
};

export function transformBody(body: ReqBody): Body {
  return {
    ...(body.sort && { sort: sortMap[body.sort] }),
    query: {
      ...(body.rocketId && { rocket: body.rocketId }),
      ...(body.status && statusMap[body.status]),
      ...(body.search && {
        $text: {
          $search: body.search,
        },
      }),
    },
    options: {
      limit: body.limit,
      page: body.page,
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
  };
}
