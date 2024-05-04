import React, { useState, useEffect, } from "react";
import {
  getDatabase,
  ref,
  push,
  remove,
  onValue,
  set,
} from "firebase/database";

import { app } from "../Firebase";
import CustomApp from "./CustomApp";
import SignOut from "./SignOut";

const db = getDatabase(app);

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [noteInput, setNoteInput] = useState("");
  const [updateInput, setUpdateInput] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [showpopUP, setShowpopUp] = useState(false);
  const [deleteid, setDeleteId] = useState();

  const colors = ["#FD9A71","#FEC871","#E3ED8E","#B491FB","#00D3FE","#0198e1","#ffbf00","#EDEB4C","#D1FF36","#4DFFFF","#87CEFF","#4E9FFE","#838EDE"]

  const number = Math.ceil(Math.random()*12)
  console.log("number ",number)



  useEffect(() => {
    fetchNotes();
  }, []);
  const userId = localStorage.getItem("userID");
  const fetchNotes = () => {
    console.log("user ID ", userId);

    try {
      const notesRef = ref(db, `users/${userId}/notes`);
      onValue(notesRef, (snapshot) => {
        const notesData = [];
        snapshot.forEach((childSnapshot) => {
          notesData.push({
            id: childSnapshot.key,
            ...childSnapshot.val(),
          });
        });

        console.log("notes ", notesData);
        setNotes(notesData);
      });
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const addNote = () => {
    if (!noteInput.trim()) return;
    try {
      const notesRef = ref(db, `users/${userId}/notes`);
      push(notesRef, { title: noteInput, text: "" });
      setNoteInput("");
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const deleteNote = (id) => {
    console.log("calling from customapp ", id);
    try {
      const noteRef = ref(db, `users/${userId}/notes/${id}`);
      remove(noteRef);

      setShowpopUp(false);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const updateNote = () => {
    if (!updateInput.trim() || !selectedNote) return;
    try {
      const noteRef = ref(db, `users/${userId}/notes/${selectedNote?.id}`);

      console.log("updated input is ",updateInput)

      const [title, ...textArray] = updateInput.split(" ");
      
      console.log("title ",title)
      console.log('text area ',textArray)

      const text = textArray.join(" ");
      set(noteRef, { title, text });
      setSelectedNote(null);
      setUpdateInput("");
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const selectNote = (note) => {
    setSelectedNote(note);
    setUpdateInput(note.title + " " + note.text);
  };

  // const clearSelectedNote = () => {
  //   // setSelectedNote(null);
  //   // setUpdateInput("");
  // };

  const popUpmethod = (id) => {
    setShowpopUp(true);
    setDeleteId(id);
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title && note.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  // console.log("note is ",note)

  return (
    <>
      <div className={`app ${darkMode ? "dark-mode" : ""}`}>
        <div className="sidebar">
          <h1>Notes</h1>
          {/* <h1 onClick={clearSelectedNote}>Notes</h1> */}
          <ul className="notes-list">
            {notes.map((note) => (
              <li className="list" key={note.id} onClick={() => selectNote(note)}>
                {note.title}
                <span onClick={() => popUpmethod(note.id)}>
                  <i  className="bi bi-trash dlt"></i>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="main">
          <div className="header">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search..."
            />
            <div>
              <div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="toggle-btn"
                >
                  {darkMode ? "Light Mode" : "Dark Mode"}
                </button>
                <SignOut />
              </div>
            </div>
          </div>
          <div className="input-container">
            <input
              type="text"
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              placeholder="Enter a title..."
            />
            <button onClick={addNote}>+</button>
          </div>

          <ul className="notes-list" style={{display:'flex' ,flexWrap:'wrap'}}>
            {showpopUP && (
              <CustomApp
                showpopUP={showpopUP}
                setShowpopUp={setShowpopUp}
                deleteNote={deleteNote}
                keyid={deleteid}
              />
            )}
            {filteredNotes.map((note,i) => (
              <li key={note.id} className="list-item-body" style={{backgroundColor:colors[i%colors.length] }}>
                <div>
                <h2>{note.title}</h2>
                <p>{note.text}</p>
                </div>
               
                <div className="buttons-container">
                  <span onClick={() => deleteNote(note.id)}>
                  <i  className="bi bi-trash dlt"></i>
                  </span>
                  &nbsp;&nbsp;&nbsp;
                  <span onClick={() => selectNote(note)}>
                  <i class="bi bi-pen"></i>
                  </span>
                </div>
              </li>
            ))}
          </ul>
          {selectedNote && (
            <div className="update-container">
              <input
                type="text"
                value={updateInput}
                onChange={(e) => setUpdateInput(e.target.value)}
                placeholder="Update note..."
              />
              <button onClick={updateNote}>Update</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Notes;
