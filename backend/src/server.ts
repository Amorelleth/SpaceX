import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { fetchLaunches } from "./launches";
import { fetchRocket } from "./rocket";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/api/rocket/:id", fetchRocket);

app.post("/api/launches", fetchLaunches);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
