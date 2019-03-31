const mongoose = require("mongoose");

//Reference for the schema constructor
const Schema = mongoose.Schema;

//Put together information for the note object
let NoteSchema = new Schema ({
    title: String,
    body: String
});

const Note = mongoose.model("Note", NoteSchema); //create note collection useing the schema

module.exports = Note;