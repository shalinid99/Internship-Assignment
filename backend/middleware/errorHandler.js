const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong",
  };

  // to handle mongo db validation errors
  if (err.name === "ValidationError") {
    customError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  //to handle mongo db duplicate value errors
  if (err.code && err.code === 11000) {
    customError.message = `${Object.keys(
      err.keyValue
    )} already exists. Please choose another value`;

    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // to handle mongo db cast errors
  if (err.name === "CastError") {
    customError.message = `No item found with ID ${err.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }

  console.log(err);
  
  return res
    .status(customError.statusCode)
    .json({ message: customError.message });
};

module.exports = errorHandlerMiddleware;