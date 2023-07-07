const express = require("express");
const {
  getUsers,
  getUserById,
  deleteUserById,
  processRegister,
} = require("../../controllers/userController");
const upload = require("../../middlewars/uploadFile");

const userRouter = express.Router();

// Get User API
userRouter.post("/process-register", upload.single("image"), processRegister);
userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);
userRouter.delete("/:id", deleteUserById);
// userRouter.route("/").get(getUsers);
// userRouter.route("/:id").get(getUserById).delete(deleteUserById);
module.exports = userRouter;
