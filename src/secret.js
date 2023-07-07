require("dotenv").config();
const serverPort = process.env.SERVER_PORT_NUMBER || 8000;
const mongodbURL =
  process.env.MONGODB_DATABASE || "mongodb://localhost:27017/Ecommerce-app";

const defaultUserImage =
  process.env.DEFAULT_USER_IMAGE ||
  "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg";

const jwtActivationKey =
  process.env.JWT_ACTIVATION_KEY || "ASSHuyweuiryweuihrfwefh%%^$@#%$bsfsbhfsdb";

const smtpUsername = process.env.SMTP_USERNAME || "";
const smtpPassword = process.env.SMTP_PASSWORD || "";

const clientUrl = process.env.CLIENT_URL || "";


module.exports = {
  serverPort,
  mongodbURL,
  defaultUserImage,
  jwtActivationKey,
  smtpUsername,
  smtpPassword,
  clientUrl,
};
