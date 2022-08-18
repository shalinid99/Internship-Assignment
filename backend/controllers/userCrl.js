const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");
const nodemailer = require("nodemailer");
const NotAllowedError = require("../errors/NotAllowedError");
const NotFoundError = require("../errors/NotFoundError");

const addUser = async (req, res) => {
  const {
    user: { type: requesterType },
  } = req;
  if (requesterType === "Student") {
    throw new NotAllowedError("You're not authorized access ");
  }
  const user = await User.create(req.body);

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "shyanne10@ethereal.email", // generated ethereal user
      pass: "h2hQrCfQxuUwPqxned", // generated ethereal password
    },
  });

  const msg = {
    from: '"Shalini De Silva👻" <shalinidesilva@example.com>', // senders address
    to: `${req.body.email}`, // list of receivers
    subject: "User Registration ✔", // Subject line
    text: ` `, // plain text body
    html: `<p>Click <a href="http://localhost:3000/login">here</a> to login to account. your password:${req.body.password}</p>`, // html body
  };

  // send mail with defined transport object
  const info = await transporter.sendMail(msg);

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  res.status(StatusCodes.CREATED).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    type: user.type,
    status: user.status,
  });
};
const getUser = async (req, res) => {
  const {
    query: { sid: userId, name: userName, email: email },
    user: { type: requesterType },
  } = req;

  const user = await User.findOne({
    $or: [{ firstName: userName }, { sid: userId }, { email: email }],
  });

  if (!user) {
    throw new NotFoundError(`No user found`);
  }

  res.status(StatusCodes.OK).json({
    _id: user._id,
    name: user.firstName,
    email: user.email,
    type: user.type,
  });
};
const getUserById = async (req, res) => {
  const {
    params: { id: userId },
  } = req;

  const user = await User.findOne({
    _id: userId,
  });

  if (!user) {
    throw new NotFoundError(`No user found with ID ${userId}`);
  }

  res.status(StatusCodes.OK).json({
    _id: user._id,
    sid: user.sid,
    name: user.firstName,
    email: user.email,
    status: user.status,
    password: user.password,
  });
};
const getAllUsers = async (req, res) => {
  const {
    user: { type: requesterType },
  } = req;

  if (requesterType === "Student") {
    throw new NotAllowedError("You're not authorized access ");
  }

  const users = await User.find({ type: "Student" });
  res.status(StatusCodes.OK).json(users);
};
const updateUser = async (req, res) => {
  const {
    body: { firstName, lastName, email, dateOfBirth, mobile, status, password },
    params: { id: userId },
  } = req;

  //get user details
  const user = await User.findOne({
    _id: userId,
  });

  if (!user) {
    throw new NotFoundError(`No user found with ID ${userId}`);
  }

  if (user.email === email) {
    delete req.body.email;
  }

  const salt = await bcrypt.genSalt(10);
  const newPassword = await bcrypt.hash(req.body.password, salt);

  const updatedUser = await User.findOneAndUpdate(
    { _id: userId },
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      mobile: req.body.mobile,
      dateOfBirth: req.body.dateOfBirth,
      email: req.body.email,
      status: req.body.status,
      password: newPassword,
    },

    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedUser) {
    throw new NotFoundError(`No user found with ID ${userId}`);
  }

  res.status(StatusCodes.OK).json({
    id: updatedUser.sid,
    firstName: updatedUser.firstName,
    lastName: updatedUser.lastName,
    email: updatedUser.email,
    type: updatedUser.type,
    status: false,
    mobile: updatedUser.mobile,
    dateOfBirth: updatedUser.dateOfBirth,
  });
};


module.exports = { addUser, getUser, getUserById, getAllUsers, updateUser };
