import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
import Note from "./components/note";
import CreateArea from "./components/CreateArea";
import axios from "axios";

function App() {
  const apiEndPoint = "http://localhost:4000";

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get(apiEndPoint).then((response) => {
      setNotes(response.data);
    });
  }, []);

  async function addNote(note) {
    await axios.post(apiEndPoint, note);
    setNotes((prevNotes) => [note, ...prevNotes]);
  }

  async function deleteNote(id) {
    await axios.delete(apiEndPoint + `/${id}`);
    axios.get(apiEndPoint).then((response) => {
      setNotes(response.data);
    });
  }
  return (
    <div>
      <Header />
      <CreateArea addNotes={addNote} />
      {notes.map((note) => {
        return (
          <Note
            key={note._id}
            id={note._id}
            title={note.title}
            content={note.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
