import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { axiosInstance } from "../config";

function App() {
  const [noteData, setNoteData] = useState([{}]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    console.log("UseEffect");
    let isCencelled = false;
    axiosInstance
      .get("/api")
      .then((response) => response.json())
      .then((json) => {
        if (!isCencelled) {
          setNoteData(json);
          console.log(json);
        }
      });
    return () => {
      isCencelled = true;
    };
  }, [counter]);

  const incrementCounter = () => {
    setCounter(counter + 1);
  };

  return (
    <div>
      <Header />
      <CreateArea incrementCounter={incrementCounter} />
      {noteData.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            incrementCounter={incrementCounter}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
