const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const usersRoutes = require("./routes/users-routes");
const { NotFoundError } = require("./models/http-error");
const app = express();
app.use(cors({ origin: true }));

app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', 'views');


app.use("/api/usersData", usersRoutes);

app.use((req, res, next) => {
  next(new NotFoundError());
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  error.statusCode = error.statusCode || 500;
  error.message = error.message || "An unknown error occurred!";

  res.status(error.statusCode).json({
    statusCode: error.statusCode,
    message: error.message,
  });
});

mongoose
  .connect(
    "mongodb+srv://Khan:%402fhikUA@cluster0.jkccg.mongodb.net/usersData?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
