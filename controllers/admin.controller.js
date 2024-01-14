const Note = require("../models/note.model");

async function getNotes(req, res, next) {
  try {
    const notes = await Note.findAll();
    res.render("admin/notes/all-notes", { notes: notes });
  } catch (error) {
    next(error);
    return;
  }
}

function getNewNotes(req, res, next) {
  res.render("admin/notes/new-notes");
}

async function createNewNotes(req, res,next) {
  const note = new Note({
    ...req.body,
    pdf: req.file.filename,
  });
  try {
    await note.save();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect("/admin/notes");
}

async function getUpdateNote(req, res, next) {
  try {
    const note = await Note.findById(req.params.id);
    res.render('admin/notes/update-note',{note:note});
  } catch (error) {
    next(error);
    return;
  }
}
async function updateNote(req,res,next) {
  const note = new Note({
    ...req.body,
    _id: req.params.id,
  });

  if (req.file) {
    note.replacePdf(req.file.filename);
  }

  try {
    await note.save();
  } catch (error) {
    next(error);
    return;
  }
  
  res.redirect('/admin/notes');
}

async function deleteNote(req,res,next){
  let note;
  try{
  note = await Note.findById(req.params.id);
  await note.remove();
  }catch(error){
    return next(error);
  }
 res.redirect('/admin/notes');
}

module.exports = {
  getNotes: getNotes,
  getNewNotes: getNewNotes,
  createNewNotes: createNewNotes,
  getUpdateNote: getUpdateNote,
  updateNote: updateNote,
  deleteNote:deleteNote,
};
