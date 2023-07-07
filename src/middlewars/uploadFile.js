const multer = require("multer");
const path = require("path");
const createError = require("http-errors");

const MAX_FILE_SIZE = process.env.MAX_FILE_SIZE || 2097152;
const ALLOWED_FILE_TYPES = process.env.ALLOWED_FILE_TYPES || [
  "jpg",
  "jpeg",
  "png",
];
const UPLOAD_DIC = process.env.UPLOAD_DIRECTORY || "public/images/users";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIC);
  },
  filename: function (req, file, cb) {
    const extname = path.extname(file.originalname);
    cb(
      null,
      Date.now() + "_" + file.originalname.replace(extname, "") + extname
    );
  },
});

const fileFilter = (req, file, cb) => {
  const extname = path.extname(file.originalname);
  if (!ALLOWED_FILE_TYPES.includes(extname.substring(1))) {
    return cb(createError(400, "File type not allowed"));
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter,
});

module.exports = upload;
