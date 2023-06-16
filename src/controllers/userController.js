const createError = require("http-errors");
const User = require("../models/userModel");
const { successResponse } = require("../errorHandler/errorHandler");
const mongoose = require("mongoose");
const { findWithId } = require("../services/findUser");
const fs = require("fs");
const { createJSONWebToken } = require("../helper/jsonwebToken");
const { jwtActivationKey, clientUrl } = require("../secret");
const emailWithNodemailer = require("../helper/email");

// Get All Users
const getUsers = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit || 1);

    const searchRegExp = new RegExp(".*" + search + ".*", "i");
    const filter = {
      isAdmin: { $ne: true },
      $or: [
        { name: { $regex: searchRegExp } },
        { email: { $regex: searchRegExp } },
        { phone: { $regex: searchRegExp } },
      ],
    };
    const options = { password: 0 };

    const users = await User.find(filter, options)
      .limit(limit)
      .skip((page - 1) * limit);

    const count = await User.find(filter).countDocuments();

    if (!users) throw createError(404, "No users found!");

    return successResponse(res, {
      statusCode: 200,
      message: "Users were returned successful",
      payload: {
        users,
        pagination: {
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          previousPage: page - 1 > 0 ? page - 1 : null,
          nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get User
const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };
    const user = await findWithId(User, id, options);
    return successResponse(res, {
      statusCode: 200,
      message: "User were returned successful",
      payload: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Delete User
const deleteUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };
    const user = await findWithId(User, id, options);

    const userImagePath = user.image;
    fs.access(userImagePath, (err) => {
      if (err) {
        console.error("user image doesn't exist");
      } else {
        fs.unlink(userImagePath, (err) => {
          if (err) throw err;
          console.log("user image was deleted");
        });
      }
    });

    await User.findByIdAndDelete({
      _id: id,
      isAdmin: false,
    });

    return successResponse(res, {
      statusCode: 200,
      message: "User was deleted successful",
    });
  } catch (error) {
    next(error);
  }
};

// Process Register
const processRegister = async (req, res, next) => {
  try {
    const { name, email, password, phone, address } = req.body;

    const userExist = await User.exists({ email: email });
    if (userExist) {
      throw createError(
        409,
        "User with this email already exist. Please login"
      );
    }

    // Create token
    const token = createJSONWebToken(
      { name, email, password, phone, address },
      jwtActivationKey,
      "10m"
    );

    // prepare email
    const emailData = {
      email,
      subject: "Account Activation Email",
      html: `
      <h2>Hello ${name} !</h2>
      <p>Please click here to <a href="${clientUrl}/api/users/activate/${token}" target="_blank">activate your account</a> </p>
      `,
    };

    // send email with nodemailer
    try {
      await emailWithNodemailer(emailData);
    } catch (emailError) {
      next(createError(500, "Failed to send verification email"));
      return;
    }

    return successResponse(res, {
      statusCode: 200,
      message: `Please go to yourjhjjgg ${email} for completing your registration process`,
      payload: { token },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsers, getUserById, deleteUserById, processRegister };
