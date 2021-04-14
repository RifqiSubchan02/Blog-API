const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const { userRoutes, articleRoutes } = require("./routes/index")
require("dotenv").config();

// Middleware
app.use(bodyParser.json());

app.use("/v1/user", userRoutes);
app.use("/v1/article", articleRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server Up and Running on Port ${process.env.PORT}`)
);
