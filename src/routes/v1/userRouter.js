const express = require("express");
const {
  getUsers,
  getUserById,
  deleteUserById,
  processRegister,
  activateUserAccount,
} = require("../../controllers/userController");
const upload = require("../../middlewars/uploadFile");
const { validatorUserRegistration } = require("../../validators/auth");
const runValidation = require("../../validators");

const userRouter = express.Router();

// Get User API
userRouter.post(
  "/process-register",
  upload.single("image"),
  validatorUserRegistration,
  runValidation,
  processRegister
);
userRouter.post("/verify", activateUserAccount);
userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);
userRouter.delete("/:id", deleteUserById);
// userRouter.route("/").get(getUsers);
// userRouter.route("/:id").get(getUserById).delete(deleteUserById);
module.exports = userRouter;
