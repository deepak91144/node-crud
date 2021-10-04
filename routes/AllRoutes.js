const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { check, validationResult } = require("express-validator");
var cookieParser = require("cookie-parser");

const authController = require("../controller/AuthController");
// parse application/json
router.use(bodyParser.json());
router.use(cookieParser());

router.post(
  "/signup",
  check("name", "name must be minimum of 2 character").isLength({ min: 2 }),
  check("email", "enter a valid email").isEmail(),
  check("password", "name must be minimum of 5 character").isLength({ min: 5 }),
  authController.signup
);
router.post(
  "/signin",
  check("email", "enter a valid email").isEmail(),
  check("password", "name must be minimum of 5 character").isLength({ min: 5 }),
  authController.signin
);
router.get("/signout", authController.signout);

module.exports = router;
