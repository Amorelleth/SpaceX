import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/api/rocket/:id", async (req, res) => {
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
});

app.post("/api/launches", async (req, res) => {
  const requestBody = req.body;

  try {
    const response = await fetch(
      "https://api.spacexdata.com/v5/launches/query",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
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
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
