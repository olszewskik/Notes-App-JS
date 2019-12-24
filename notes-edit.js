const titleElement = document.querySelector("#noteTitle");
const bodyElement = document.querySelector("#noteBody");
const removeElement = document.querySelector("#removeNote");
const dateElement = document.querySelector("#lastEdited");
const noteId = location.hash.substring(1);
let notes = getSavedNotes();
let note = notes.find(note => {
  return note.id === noteId;
});

if (note === undefined) {
  location.assign("/index.html");
}

titleElement.value = note.title;
bodyElement.value = note.body;
dateElement.textContent = generateLastEdited(note.updateAt);

titleElement.addEventListener("input", e => {
  note.title = e.target.value;
  note.updateAt = moment().valueOf();
  dateElement.textContent = generateLastEdited(note.updateAt);
  saveNotes(notes);
});

bodyElement.addEventListener("input", e => {
  note.body = e.target.value;
  note.updateAt = moment().valueOf();
  dateElement.textContent = generateLastEdited(note.updateAt);
  saveNotes(notes);
});

removeElement.addEventListener("click", e => {
  removeNote(note.id);
  saveNotes(notes);
  location.assign("/index.html");
});

window.addEventListener("storage", e => {
  if (e.key === "notes") {
    notes = JSON.parse(e.newValue);
    note = notes.find(note => {
      return note.id === noteId;
    });

    if (note === undefined) {
      location.assign("/index.html");
    }

    titleElement.value = note.title;
    bodyElement.value = note.body;
    dateElement.textContent = generateLastEdited(note.updateAt);
  }
});
