const { validationResult } = require("express-validator");
const authModel = require("../model/AuthModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({
      message: "validation errors",
      error: errors.mapped(),
    });
  }
  const adminDetails = req.body;
  //   check if email exist before or not
  const isEmailexist = await authModel.findOne({ email: adminDetails.email });

  if (isEmailexist) {
    return res.status(401).json({
      message: "email already in use",
    });
  }
  const hashedPassword = await bcrypt.hash(adminDetails.password, 10);
  adminDetails.password = hashedPassword;
  const admin = new authModel(adminDetails);
  const newAdmin = await admin.save();
  if (newAdmin) {
    const mernCrudToken = jwt.sign({ _id: newAdmin._id }, "merncrud");
    res.cookie("mernCrudToken", mernCrudToken, new Date() + 9999);
    newAdmin.password = undefined;
    return res.status(201).json({
      message: "new admin created successfully",
      token: mernCrudToken,
      admin: newAdmin,
    });
  }
};
exports.signin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({
      message: "validation errors",
      error: errors.mapped(),
    });
  }
  const adminDetails = req.body;
  const isEmailexist = await authModel.findOne({ email: adminDetails.email });
  if (isEmailexist) {
    const isPasswordMatched = await bcrypt.compare(
      adminDetails.password,
      isEmailexist.password
    );
    if (isPasswordMatched) {
      const mernCrudToken = jwt.sign({ _id: isEmailexist._id }, "merncrud");
      res.cookie("mernCrudToken", mernCrudToken, new Date() + 9999);
      isEmailexist.password = undefined;
      return res.status(201).json({
        token: mernCrudToken,
        admin: isEmailexist,
      });
    } else {
      return res.status(401).json({
        message: "wrong creadentials",
      });
    }
  } else {
    return res.status(401).json({
      message: "wrong creadentials",
    });
  }
};
exports.signout = (req, res) => {
  res.clearCookie("mernCrudToken");
  res.status(200).json({
    message: "signout successfully",
  });
};
