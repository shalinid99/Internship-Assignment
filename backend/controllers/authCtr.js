const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const BadRequestError = require("../errors/BadRequestError");
const UnAuthenticatedError = require("../errors/UnAuthenticatedError");
const { StatusCodes } = require("http-status-codes");

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide both email and password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnAuthenticatedError("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new UnAuthenticatedError("Invalid credentials");
  }

  const token = jwt.sign(
    {
      userId: user._id,
      sid: user.sid,
      name: user.firstName,
      type: user.type,
      userStatus: user.status,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );

  res.status(StatusCodes.OK).json({ token });
};

module.exports = { login };
