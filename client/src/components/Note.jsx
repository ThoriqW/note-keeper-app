import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { axiosInstance } from "../config";

function Note(props) {
  function handleClick() {
    props.incrementCounter();
    const idNote = {
      id: props.id,
    };
    axiosInstance.post("/api/deleteNote", idNote);
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
