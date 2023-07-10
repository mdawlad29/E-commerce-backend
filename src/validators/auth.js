const { body } = require("express-validator");
// Register validation
const validatorUserRegistration = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is require. Enter your name")
    .isLength({ min: 3, max: 31 })
    .withMessage("Name should be at least 3-31 character long"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is require. Enter your email")
    .isEmail()
    .withMessage("Invalid email address"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is require. Enter your password")
    .isLength({ min: 6 })
    .withMessage("Name should be at least 6 character long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{6,30}$/
    )
    .withMessage(
      "Password should contain at least one uppercase letter, lowercase letter, one number, and one special character."
    ),

  body("address")
    .trim()
    .notEmpty()
    .withMessage("Address is require. Enter your address")
    .isLength({ min: 3 })
    .withMessage("Address should be at least 3 character long"),
  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone is require. Enter your phone"),
  body("image").optional().isString().withMessage("Image is require"),
];

module.exports = { validatorUserRegistration };
