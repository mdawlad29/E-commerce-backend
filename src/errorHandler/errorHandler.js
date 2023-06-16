const errorResponse = (
  res,
  { statusCode = 500, message = "Internal server error!" }
) => {
  return res.status(statusCode).json({
    success: false,
    message: message,
  });
};

const successResponse = (
  res,
  { statusCode = 200, message = "Successful", payload = {} }
) => {
  return res.status(statusCode).json({
    success: true,
    message: message,
    payload: payload,
  });
};

module.exports = { errorResponse, successResponse };
