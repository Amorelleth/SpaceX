import type { Request, Response } from "express";

/**
 * Fetches rocket data from the SpaceX API and sends it as a JSON response.
 * @param req - The request object, expected to contain the rocket ID as a URL parameter.
 * @param res - The response object, used to send the fetched rocket data or an error message.
 * @returns A JSON response containing the rocket data if the fetch is successful,
 *          or an error message if the fetch fails.
 * @throws Will return a 500 status code and an error message if the fetch operation fails.
 */
export async function fetchRocket(req: Request, res: Response) {
  try {
    const response = await fetch(
      `https://api.spacexdata.com/v4/rockets/${req.params.id}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching rocket data:", error);
    res.status(500).json({ error: "Failed to fetch rocket data" });
  }
}
