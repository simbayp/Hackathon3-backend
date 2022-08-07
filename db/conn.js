const mongoose = require("mongoose");

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "b36wd",
  })
  .then(() => console.log("Connection started"))
  .catch((error) => console.log(error.message));
