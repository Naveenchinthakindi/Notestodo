import React, { useState, useEffect } from 'react';
import { getDatabase, ref, push, remove, onValue, set } from 'firebase/database';
import { app } from './Firebase';
import CustomApp from './CustomApp';

const db = getDatabase(app);

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [noteInput, setNoteInput] = useState('');
  const [updateInput, setUpdateInput] = useState(''); 
  const [selectedNote, setSelectedNote] = useState(null); 
  const [searchInput, setSearchInput] = useState(''); 
  const [darkMode, setDarkMode] = useState(false); 
  const [showpopUP,setShowpopUp] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = () => {
    try {
      const notesRef = ref(db, 'notes');
      onValue(notesRef, (snapshot) => {
        const notesData = [];
        snapshot.forEach((childSnapshot) => {
          notesData.push({
            id: childSnapshot.key,
            title: childSnapshot.val().title,
            text: childSnapshot.val().text
          });
        });
        setNotes(notesData);
      });
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const addNote = () => {
    if (!noteInput.trim()) return;
    try {
      const notesRef = ref(db, 'notes');
      push(notesRef, { title: noteInput, text: '' });
      setNoteInput('');
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const deleteNote = (id) => {
    try {
      const noteRef = ref(db, `notes/${id}`);
      remove(noteRef);
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const selectNote = (note) => {
    setSelectedNote(note);
    setUpdateInput(note.title + ' ' + note.text); 
  };

  const updateNote = () => {
    if (!updateInput.trim() || !selectedNote) return;
    try {
      const noteRef = ref(db, `notes/${selectedNote.id}`);
      const titleTextArray = updateInput.split(' '); 
      const title = titleTextArray[0];
      const text = titleTextArray.slice(1).join(' '); 
      set(noteRef, { title, text });
      setSelectedNote(null);
      setUpdateInput('');
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const clearSelectedNote = () => {
    setSelectedNote(null);
    setUpdateInput('');
  };

  const filteredNotes = notes.filter((note) =>
    note.title && note.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (


    <>
     {/* {showpopUP ? <CustomApp showpopUP={showpopUP} setShowpopUp={setShowpopUp}/>: */}
     
     <div className={`app ${darkMode ? 'dark-mode' : ''}`}> 
      <div className="sidebar">
        <h1 onClick={clearSelectedNote}>Notes</h1>
        <ul className="notes-list">
          {notes.map((note) => (
            <li key={note.id} onClick={() => selectNote(note)}>{note.title}<button onClick={()=>setShowpopUp(true)}><i class="bi bi-trash"></i></button></li>
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
          <button onClick={() => setDarkMode(!darkMode)} className="toggle-btn">
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
        <div className="input-container">
          <input
            type="text"
            value={noteInput}
            onChange={(e) => setNoteInput(e.target.value)}
            placeholder="Enter a title..."
          />
          <button onClick={addNote}>Add Note</button>
        </div>
        
        <ul className="notes-list">
        {showpopUP && <CustomApp showpopUP={showpopUP} setShowpopUp={setShowpopUp}/>}
          {filteredNotes.map((note) => (
            <li key={note.id}>
              <h2>{note.title}</h2>
              <p>{note.text}</p>
              <div className="buttons-container">
                <button onClick={() => deleteNote(note.id)}>Delete</button>
                <button onClick={() => selectNote(note)}>Edit</button>
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
