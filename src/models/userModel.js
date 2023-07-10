const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const { defaultUserImage } = require("../secret");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required!"],
      trim: true,
      minLength: [3, "The length of username can be minimum 3 characters"],
      maxLength: [31, "The length of username can be minimum 31 characters"],
    },
    email: {
      type: String,
      required: [true, "User email is required!"],
      trim: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        },
        message: "Please enter your valid email",
      },
    },
    password: {
      type: String,
      required: [true, "User name is required!"],
      trim: true,
      minLength: [6, "The length of username can be minimum 6 characters"],
      set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
    },
    image: {
      type: String,
      default: defaultUserImage,
    },
    address: {
      type: String,
      required: [true, "User address is required!"],
      minLength: [3, "The length of address can be minimum 3 characters"],
    },
    phone: {
      type: String,
      required: [true, "User address is required!"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = model("users", userSchema);

module.exports = User;
