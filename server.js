const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

mongoose.connect(
  "mongodb+srv://admin-thoriq:Barbossa5678@cluster0.ysri0.mongodb.net/notesDB"
);

const Note = mongoose.model("Note", { title: String, content: String });

app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("/api", function (req, res) {
  Note.find().then((foundNote) => res.json(foundNote));
});

app.post("/api/addNote", function (req, res) {
  const newNote = new Note({
    title: req.body.title,
    content: req.body.content,
  });

  newNote.save().then(() => console.log("Succesfully add new note"));
});

app.post("/api/deleteNote", function (req, res) {
  const id = req.body.id;

  Note.findByIdAndRemove(id, () => {
    console.log("Succesfully delete note!");
  });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}

app.listen(port);
