export const sendSuccess = (res, statusCode = 200, message, data = {}) => {
  return res.status(statusCode).json({
    success: true,
    message,
    ...data,
  });
};

export const sendError = (res, statusCode = 500, message, error = "") => {
  return res.status(statusCode).json({
    success: false,
    message,
    error,
  });
};
