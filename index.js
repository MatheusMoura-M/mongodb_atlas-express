require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const personRouter = require("./routes/personRoutes");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

const DB_USER = process.env.DB_USER;
const DB_PASS = encodeURIComponent(process.env.DB_PASS);

// Rotas / endpoint
app.use("/person", personRouter);

// Ler uma porta
mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.hyek0w7.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Conectamos ao MongoDb!!");
    app.listen(3000);
  })
  .catch((err) => console.log(err));
