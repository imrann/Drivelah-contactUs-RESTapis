const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");
const {
  UnprocessableInputError,
  InternalServerError,
  NotFoundError,
} = require("../models/http-error");
const User = require("../models/user");

const downloadUserData = async (req, res, next) => {
  try {
    const usersData = fs.readFileSync(
      path.join(__dirname, "../cache", "userContact-cache.csv"),
      "utf8"
    );

    res.setHeader("Content-Disposition", "attachment; filename=tutorials.csv");
    res.set("Content-Type", "text/csv");
    res.status(200).send(usersData);
  } catch (err) {
    console.log(err);
    const error = new InternalServerError();
    return next(error);
  }
};



const paginatedUsersData = async (req, res, next) => {
  try {
    let page = req.params.page !== undefined ? req.params.page : 0;
    const size = req.params.size !== undefined ? req.params.size : 10;

    let nextPageValue = parseInt(page) + 1;
    let prevPageValue = parseInt(page) === -1 ? page : parseInt(page) - 1;

    let userChunkdata = await User.find({})
      .skip(page * 10)
      .limit(size);

    if (userChunkdata.length === 0) {
      userChunkdata = [{ email: "No Record Found" }];
    }

    res.render("userData", {
      userData: userChunkdata,
      prevPageValue: parseInt(prevPageValue),
      currentPage: page,
      nextPage:
        "http://localhost:5000/api/usersData/paginatedUsersData/" +
        nextPageValue +
        "/10/",
      prevPage:
        "http://localhost:5000/api/usersData/paginatedUsersData/" +
        prevPageValue +
        "/10/",
    });
  } catch (err) {
    const error = new InternalServerError();
    return next(error);
  }
};

const postUsersData = async (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return next(new UnprocessableInputError());
  }
  const { name, email, message } = req.body;

  const postedUserData = new User({
    name,
    email,
    message,
  });

  try {
    await postedUserData.save();

    fs.stat(
      path.join(__dirname, "../cache", "userContact-cache.csv"),
      "utf8",
      function (err, stat) {
        if (err == null) {
          var csv =
            `"${postedUserData.toObject()._id}",${
              postedUserData.toObject().name
            },${postedUserData.toObject().email},${
              postedUserData.toObject().message
            }` + "\r\n";

          fs.appendFile(
            path.join(__dirname, "../cache", "userContact-cache.csv"),
            csv,
            function (err) {
              if (err) throw err;
            }
          );
        }
      }
    );
  } catch (err) {
    const error = new InternalServerError();
    return next(error);
  }

  res.status(201).json({
    statusCode: 201,
    message: "Query Submitted Successfully",
    body: postedUserData.toObject({ getters: true }),
  });
};

exports.paginatedUsersData = paginatedUsersData;
exports.postUsersData = postUsersData;
exports.downloadUserData = downloadUserData;
