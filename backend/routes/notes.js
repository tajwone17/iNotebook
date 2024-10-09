const fetchuser = require("../middleware/fetchuser");
const express = require("express");
const Note = require("../models/Notes");
const router = express.Router();
const { body, validationResult } = require("express-validator");
//Route:1 Get all the notes using GET "/api/notes/fetchallnotes"
router.get("/fetchallnotes", fetchuser, async (req, res) => {
 try{
  const notes = await Note.find({ user: req.user.id });
  res.json(notes);
 }
 catch(err){
  console.error(err);
  res.status(500).json({ message: err.message }); 
 }
});
//Route:2 Add notes using post "/api/notes/addnote"
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }), // Validate name
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),],
  
  async (req, res) => {
    try{
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }
      const note = await Note.create({
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
        user:req.user.id,
      });
      res.json(note);
    }
    catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
  }
);

module.exports = router;
