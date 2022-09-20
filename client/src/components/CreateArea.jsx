import React, { useState } from "react";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const [isEmpty, setIsEmpty] = useState(false);

  const [isExpanded, setisExpanded] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function submitNote(event) {
    if (note.title.trim().length && note.content.trim().length !== 0) {
      props.incrementCounter();
      setIsEmpty(false);
      setNote({
        title: note.title,
        content: note.content,
      });
      axios.post("/api/addNote", note).then(
        setNote({
          title: "",
          content: "",
        })
      );
    } else {
      setIsEmpty(true);
    }
    event.preventDefault();
  }

  function expanded() {
    setisExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}
        <textarea
          name="content"
          onChange={handleChange}
          onClick={expanded}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        {isEmpty && <p className="input-alert">Input value is empty</p>}
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
