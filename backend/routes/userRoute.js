const express = require("express");
const router = express.Router();

const {
  addUser,
  getUser,
  getAllUsers,
  updateUser,
  getUserById,
} = require("../controllers/userCrl");

router.route("/").post(addUser);
router.route("/").get(getUser);
router.route("/getAll").get(getAllUsers);
router.route("/updateUser/:id").patch(updateUser);
router.route("/:id").get(getUserById);

module.exports = router;
