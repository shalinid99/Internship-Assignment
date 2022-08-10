const Note = require("../models/noteModel");
const { StatusCodes } = require("http-status-codes");
const NotFoundError = require("../errors/NotFoundError");

const addNote = async (req, res) => {
  const note = await Note.create({
    sid: req.params.id,
    title: req.body.title,
    description: req.body.description,
  });

  res.status(StatusCodes.CREATED).json({
    sid: note.sid,
    title: note.title,
    description: note.description,
  });
};

const getAllNotes = async (req, res) => {
  const notes = await Note.find({ sid: req.params.id });

  if (!notes) {
    res.status(StatusCodes.OK).json({ msg: "No notes available!" });
  }
  res.status(StatusCodes.OK).json(notes);
};

const updateNote = async (req, res) => {
  const {
    body: { title, description },
    params: { id: noteId },
  } = req;

  const note = await Note.findOne({ _id: noteId });

  if (!note) {
    throw new NotFoundError(`No note found with ID ${noteId}`);
  }

  const updatedNote = await Note.findByIdAndUpdate({ _id: noteId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedNote) {
    throw new NotFoundError(`No note found with ID ${noteId}`);
  }

  res.status(StatusCodes.OK).json({
    title: updatedNote.title,
    description: updatedNote.description,
  });
};

const deleteNote = async (req, res) => {
  const {
    params: { id: id },
  } = req;

  const note = await Note.findOne({
    _id: id,
  });

  if (!note) {
    throw new NotFoundError(`No note found with ID ${id}`);
  }
  const deletedNote = await Note.findByIdAndRemove({
    _id: id,
  });

  if (!deletedNote) {
    throw new NotFoundError(`No note found with ID ${id}`);
  }

  res.status(StatusCodes.OK).json({ mesg: "note deleted" });
};

module.exports = { addNote, updateNote, deleteNote, getAllNotes };
