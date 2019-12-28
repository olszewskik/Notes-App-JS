import { createNote, updateNote, removeNote } from "./notes";
import { setFilters } from "./filters";
import { renderNotes, initializeEditPage, generateLastEdited } from "./views";

const titleElement = document.querySelector("#noteTitle");
const bodyElement = document.querySelector("#noteBody");
const removeElement = document.querySelector("#removeNote");
const dateElement = document.querySelector("#lastEdited");
const noteId = location.hash.substring(1);

initializeEditPage(noteId);

titleElement.addEventListener("input", e => {
  const note = updateNote(noteId, {
    title: e.target.value
  });
  dateElement.textContent = generateLastEdited(note.updateAt);
});

bodyElement.addEventListener("input", e => {
  const note = updateNote(noteId, {
    body: e.target.value
  });
  dateElement.textContent = generateLastEdited(note.updateAt);
});

removeElement.addEventListener("click", e => {
  removeNote(noteId);
  location.assign("/index.html");
});

window.addEventListener("storage", e => {
  if (e.key === "notes") {
    initializeEditPage(noteId);
  }
});
