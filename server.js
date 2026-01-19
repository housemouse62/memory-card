import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());

app.get("/api/brainrots", async (req, res) => {
  try {
    const { name, key } = req.query;
    let url = "https://the-brainrots-almanac.com/api/brainrots";

    if (name) url += `?name=${name}`;
    else if (key) url += `key=${key}`;

    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
