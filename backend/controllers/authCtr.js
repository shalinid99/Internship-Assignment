const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const BadRequestError = require("../errors/BadRequestError");
const UnAuthenticatedError = require("../errors/UnAuthenticatedError");
const { StatusCodes } = require("http-status-codes");

const login = async (req, res) => {

   //get the email and password from the request 
  const { email, password } = req.body;

    //check if the email and password are filled in
  if (!email || !password) {
    throw new BadRequestError("Please provide both email and password");
  }

  //find the user details by passing the email to the mongodb
  const user = await User.findOne({ email });

  //if there is no user with the email , then throw the error message
  if (!user) {
    throw new UnAuthenticatedError("Invalid credentials");
  }

  //compare the user entered password with the password in the Database
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new UnAuthenticatedError("Invalid password");
  }

  //create the token with the user details while adding secret into it 
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
