require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conn");
require("dotenv").config();
const mongoose = require("mongoose");
const leads = require("./models/leadSchema");
const cors = require("cors");
const router = require("./routes/router");

const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Server started");
});

app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
