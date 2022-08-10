const jwt = require("jsonwebtoken");
const UnAuthenticatedError = require("../errors/UnAuthenticatedError");
const NotAllowedError = require("../errors/NotAllowedError");

const authenticateAdmin = async (req, res, next) => {

  //get the auth header from the request 
  const authHeader = req.headers.authorization;

  //if the auth header is not present throw an unauthorized error 
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnAuthenticatedError("Authentication invalid");
  }

  //get the token from the auth header by splitting the auth header
  const token = authHeader.split(" ")[1];

  let payload = null;

  //verify the token with the secret 
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new UnAuthenticatedError("Authentication invalid");
  }

  //if their is a payload and user type is admin or student, pass user details to the request and next 
  if (payload && (payload.type === "Admin" || payload.type === "Student")) {
    req.user = {
      userId: payload.userId,
      type: payload.type,
      userStatus: payload.status,
    };
    next();
  } else {
    throw new NotAllowedError("You're unauthorized to access this route");
  }
};

module.exports = { authenticateAdmin };
