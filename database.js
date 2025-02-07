require("dotenv").config();

const mongoose = require("mongoose");
const URI = process.env.MONGO_URI;

mongoose
  .connect(URI)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.error(err));

module.exports = mongoose;
