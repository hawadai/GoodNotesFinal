const mongodb = require("mongodb");
const db = require("../data/database");

class Note {
  constructor(noteData) {
    this.title = noteData.title;
    this.subject = noteData.subject;
    this.semester = noteData.semester;
    this.description = noteData.description;
    this.pdf = noteData.pdf; //name
    this.updatePdfData();
    if (noteData._id) {
      this.id = noteData._id.toString();
    }
  }

  static async findById(noteId) {
    let nId;
    try {
      nId = new mongodb.ObjectId(noteId);
    } catch (error) {
      error.code = 404;
      throw error;
    }
    const note = await db.getDb().collection("notes").findOne({ _id: nId });
    if (!note) {
      const error = new Error("Could not find the note with the provided id. ");
      error.code = 404;
      throw error;
    }
    return new Note(note);
  }

  static async findAll() {
    const notes = await db.getDb().collection("notes").find().toArray();
    return notes.map(function (noteDocument) {
      return new Note(noteDocument);
    });
  }

  updatePdfData() {
    this.pdfPath = `notes-data/pdfs/${this.pdf}`;
    this.pdfUrl = `/notes/assets/pdfs/${this.pdf}`;
  }

  async save() {
    const noteData = {
      title: this.title,
      subject: this.subject,
      semsester: this.semester,
      description: this.description,
      pdf: this.pdf,
    };

    if (this.id) {
      const noteId = new mongodb.ObjectId(this.id);
      if (!this.pdf) {
        delete noteData.pdf;
      }
      await db.getDb().collection("notes").updateOne(
        { _id: noteId },
        {
          $set: noteData,
        }
      );
    } else {
      await db.getDb().collection("notes").insertOne(noteData);
    }
  }
  replacePdf(newPdf) {
    this.pdf = newPdf;
    this.updatePdfData();
  }
  remove() {
    const noteId = new mongodb.ObjectId(this.id);
    return db.getDb().collection("notes").deleteOne({ _id: noteId });
  }

}

module.exports = Note;
