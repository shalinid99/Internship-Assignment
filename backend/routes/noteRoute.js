const express = require("express");
const router = express.Router();
const {
  addNote,
  updateNote,
  deleteNote,
  getAllNotes,
} = require("../controllers/noteCtr");

router.route("/addNote/:id").post(addNote);
router.route("/getNotes/:id").get(getAllNotes);
router.route("/updateNote/:id").patch(updateNote);
router.route("/deleteNote/:id").delete(deleteNote);

module.exports = router;
