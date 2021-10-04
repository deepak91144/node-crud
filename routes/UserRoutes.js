const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { check, validationResult } = require("express-validator");
var cookieParser = require("cookie-parser");
const userController = require("../controller/UserController");
const authMiddleware = require("../middleware/AuthMiddleware");
// parse application/json
router.use(bodyParser.json());
router.use(cookieParser());
router.post(
  "/user/add",
  [
    check("name", "name should be minimum of two character").isLength({
      min: 2,
    }),
    check("email", "email should be valid").isEmail(),
    check("mobile", "numbers only allowed").isNumeric(),
    check("city", "city should be minimum of two character").isLength({
      min: 2,
    }),
  ],
  authMiddleware.isSignedIn,
  userController.addUser
);
router.put(
  "/user/update/:userId",
  [
    check("name", "name should be minimum of two character").isLength({
      min: 2,
    }),
    check("email", "email should be valid").isEmail(),
    check("mobile", "numbers only allowed").isNumeric(),
    check("city", "city should be minimum of two character").isLength({
      min: 2,
    }),
  ],
  authMiddleware.isSignedIn,
  userController.updateUser
);
router.delete(
  "/user/delete/:userId",
  authMiddleware.isSignedIn,
  userController.deleteUser
);
router.get("/users", authMiddleware.isSignedIn, userController.getAllUsers);

module.exports = router;
