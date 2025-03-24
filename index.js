const express = require("express");
require("dotenv").config();
const dbConnection = require("./config/dbConnection");
const cors = require("cors");
const router = require("./routes/index.routes");
const cookieParser = require("cookie-parser");
dbConnection();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173", // for local testing
      "http://localhost:4173", // for local build
      process.env.FRONTEND_PORT, //deployed frontend
      process.env.FRONTEND_PORT1, //deployed frontend
      process.env.FRONTEND_PORT2, //deployed frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow credentials (cookies) to be sent
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/favicon.ico", (req, res) => res.status(204).end());
app.get("/", (req, res) => {
  console.log("GET working fine");
  res.send("GET working fine");
});
app.use(cookieParser());
app.use("/", router);

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
