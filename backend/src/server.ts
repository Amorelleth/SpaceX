import express from "express";
import https from "https";
import cors from "cors";

const app = express();
const port = 3000;

const fetchLaunches = () => {
  return new Promise((resolve, reject) => {
    https
      .get("https://api.spacexdata.com/v5/launches", (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          resolve(JSON.parse(data));
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/api/launches", async (_, res) => {
  try {
    const launches = await fetchLaunches();
    res.json(launches);
  } catch (error) {
    res.status(500).send("Error fetching launches");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
