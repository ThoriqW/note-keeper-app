import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

function Note(props) {
  function handleClick() {
    props.incrementCounter();
    const idNote = {
      id: props.id,
    };
    axios.post("/api/deleteNote", idNote);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
