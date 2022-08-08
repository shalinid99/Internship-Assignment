const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    sid: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: [true, "Please provide the title"],
    },
    description: {
      type: String,
      required: [true, "Please provide the description"],
      minlength: [5, "description too much small!"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
