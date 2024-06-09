import type { Request, Response } from "express";

import { transformBody, type ReqBody } from "./transform-body";

type Launch = {
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

export async function fetchLaunches(
  req: Request<{}, {}, ReqBody>,
  res: Response<
    | {
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
      }
    | { error: string }
  >
) {
  const requestBody = req.body;

  try {
    const response = await fetch(
      "https://api.spacexdata.com/v5/launches/query",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transformBody(requestBody)),
      }
    );

    if (!response.ok) {
      throw new Error();
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching launches:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
