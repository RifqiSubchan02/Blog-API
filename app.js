const express = require("express");
const path = require('path');
const { setBodyParser, setCors, setMulter } = require("./config/middleware");
const app = express();
const { userRoutes, articleRoutes, categoryRoutes } = require("./routes/index");
require("dotenv").config();

// Middleware
app.use(setBodyParser);
app.use(setMulter);
app.use(setCors);
app.use('/assets/images/', express.static(path.join(__dirname, `assets/images`)));

app.get('/', (req, res) => res.send('Welcome to Blog API.'))
app.use("/v1/user", userRoutes);
app.use("/v1/article", articleRoutes);
app.use("/v1/category", categoryRoutes)

app.listen(process.env.PORT, () =>
  console.log(`Server Up and Running on Port ${process.env.PORT}`)
);
