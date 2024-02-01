const express = require("express");
// const cors = require("cors");
const PORT = process.env.PORT || 5050;
const app = express();

app.use(express.json());
// app.use(cors());

app.get("/", (_req, res) => {
  res.send("Welcome to the page");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
