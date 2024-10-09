const fetchuser = require("../middleware/fetchuser");
const express = require("express");
const Note = require("../models/Notes");
const router = express.Router();
const { body, validationResult } = require("express-validator");
//Route:1 Get all the notes using GET "/api/notes/fetchallnotes" (login required)
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});
//Route:2 Add notes using post "/api/notes/addnote" (login required)
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }), // Validate name
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = await Note.create({
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
        user: req.user.id,
      });
      res.json(note);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Route3 update notes using put "/api/notes/updatenote/id" (login required)

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    //create a new note object
    const newNote = {};
    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;
    //find the note to be updated
    let note = await Note.findById(req.params.id);
    if (!note) return res.status(404).send("Not found");
    if (note.user.toString() !== req.user.id)
      return res.status(401).send("Not allowed");
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//Route4 delete notes using put "api/notes/deletenote/:id" (login required)

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //find the note to be delete and delete it
    let note = await Note.findById(req.params.id);
    if (!note) return res.status(404).send("Not found");
    // allow deletion only if user owns this note
    if (note.user.toString() !== req.user.id)
      return res.status(401).send("Not allowed");
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note Has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
