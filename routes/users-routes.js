const express = require("express");
const { check } = require("express-validator");
const usersController = require("../controllers/users-controllers");
const router = express.Router();

router.get("/downloadUserData", usersController.downloadUserData);

 
router.get("/paginatedUsersData/:page?/:size?", usersController.paginatedUsersData);


router.post(
  "/postUsersData",
  [
    check("name").trim().not().isEmpty().withMessage("Name must not be empty"),
    check("email")
      .trim()
      .normalizeEmail()
      .isEmail()
      .withMessage("Invalid email entered"),
    check("message")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Message must not be empty"),
    check("message")
      .trim()
      .isLength({ max: 1000 })
      .withMessage("Max Character allowed is only 1000"),
  ],
  usersController.postUsersData
);

module.exports = router;
