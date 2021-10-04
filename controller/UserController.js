const { validationResult } = require("express-validator");
const userModel = require("../model/UserModel");
const authMiddleware = require("../middleware/AuthMiddleware");
exports.addUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({
        message: "validation errors",
        error: errors.mapped(),
      });
    }
    const userDetails = req.body;
    const user = new userModel(userDetails);
    const newUser = await user.save();
    if (newUser) {
      return res.status(201).json({
        message: "new user created successfully",
        user: newUser,
      });
    } else {
      return res.status(401).json({
        message: "something went wrong, try again later",
      });
    }
  } catch (error) {
    return res.status(401).json({
      error: error,
    });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({
        message: "validation errors",
        error: errors.mapped(),
      });
    }
    const updatedUserDetails = req.body;
    const updatedUser = await userModel.findOneAndUpdate(
      { _id: userId },
      updatedUserDetails,
      { new: true }
    );
    if (updatedUser) {
      return res.status(201).json({
        message: "user updated successfully",
        user: updatedUser,
      });
    } else {
      return res.status(401).json({
        message: "something went wrong, try again later",
      });
    }
  } catch (error) {
    return res.status(401).json({
      error: error,
    });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userDeleted = await userModel.findOneAndDelete({ _id: userId });

    if (userDeleted) {
      return res.status(201).json({
        message: "user deleted successfully",
        user: userDeleted,
      });
    } else {
      return res.status(401).json({
        message: "something went wrong, try again later",
      });
    }
  } catch (error) {
    return res.status(401).json({
      error: error,
    });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const userList = await userModel.find();
    if (userList.length > 0) {
      return res.status(200).json({
        message: "fetched successfully",
        users: userList,
      });
    } else {
      return res.status(200).json({
        message: "no user found",
      });
    }
  } catch (error) {
    return res.status(200).json({
      error: error,
    });
  }
};
