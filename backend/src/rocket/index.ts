import type { Request, Response } from "express";

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
