// Read existing notes from localStorage
const getSavedNotes = () => {
  const notesJSON = localStorage.getItem("notes");

  if (notesJSON !== null) {
    return JSON.parse(notesJSON);
  } else {
    return [];
  }
};

// Save the notes to localStorage
const saveNotes = notes => {
  localStorage.setItem("notes", JSON.stringify(notes));
};

// Remove a note from the list
const removeNote = id => {
  const noteIndex = notes.findIndex(note => {
    return note.id === id;
  });

  if (noteIndex > -1) {
    notes.splice(noteIndex, 1);
  }
};

// Generate the DOM structure for a note
const generateNoteDOM = note => {
  const noteElement = document.createElement("div");
  const textElement = document.createElement("span");
  const button = document.createElement("button");

  // Setup the remove note button
  button.textContent = "x";
  noteElement.appendChild(button);
  button.addEventListener("click", () => {
    removeNote(note.id);
    saveNotes(notes);
    renderNotes(notes, filters);
  });

  // Setup the note title text
  if (note.title.length > 0) {
    textElement.textContent = note.title;
  } else {
    textElement.textContent = "Unnamed note";
  }
  noteElement.appendChild(textElement);

  return noteElement;
};

// Render application notes
const renderNotes = (notes, filters) => {
  const filteredNotes = notes.filter(note => {
    return note.title.toLowerCase().includes(filters.searchText.toLowerCase());
  });

  document.querySelector("#notes").innerHTML = "";

  filteredNotes.forEach(note => {
    const noteElement = generateNoteDOM(note);
    document.querySelector("#notes").appendChild(noteElement);
  });
};
