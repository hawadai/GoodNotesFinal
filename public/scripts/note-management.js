const deleteNoteButtonElements = document.querySelectorAll(".note-item button");

async function deleteNote(event) {
  const buttonElement = event.target;
  const noteId = buttonElement.dataset.noteid;
  const csrfToken = buttonElement.dataset.csrf;

 const response = await fetch("/admin/notes/" + noteId + "?_csrf=" + csrfToken, {
    method: "DELETE",
  });

  if(!response.ok){
    alert('Something went wrong!');
    return;
  }
  buttonElement.parentElement.parentElement.parentElement.parentElement.remove();
}

for (const deleteNoteButtonElement of deleteNoteButtonElements) {
  deleteNoteButtonElement.addEventListener("click", deleteNote);
}
