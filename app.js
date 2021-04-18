const express = require("express");
const { setMulter, setBodyParser } = require("./config/middleware");
const app = express();
const { userRoutes, articleRoutes } = require("./routes/index")
require("dotenv").config();

// Middleware
app.use(setBodyParser);
app.use(setMulter);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use("/v1/user", userRoutes);
app.use("/v1/article", articleRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server Up and Running on Port ${process.env.PORT}`)
);
