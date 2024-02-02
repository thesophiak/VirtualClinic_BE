const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const questionsRoute = require("./routes/questionsRoute.js");
dotenv.config();
const { PORT, CORS_ORIGIN } = process.env || 5050;
console.log("cors:",CORS_ORIGIN )

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

// app.get("/", (_req, res) => {
//   res.send("Welcome to the page");
// });

app.use("/", questionsRoute)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
