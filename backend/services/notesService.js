/**
 * Notes Service - In-memory storage
 * 
 * TODO: Add mutex/locking if we ever run multiple instances
 */

const { v4: uuidv4 } = require('uuid');

class NotesService {
  constructor() {
    this.notes = new Map();
  }

  createNote({ title, content }) {
    const id = uuidv4();
    const now = new Date().toISOString();
    
    const note = {
      id,
      title: title || '',
      content: content || '',
      createdAt: now,
      updatedAt: now,
    };

    this.notes.set(id, note);
    return note;
  }

  getAllNotes() {
    return Array.from(this.notes.values());
  }

  getNoteById(id) {
    return this.notes.get(id) || null;
  }

  updateNote(id, { title, content }) {
    const note = this.notes.get(id);
    if (!note) return null;

    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;
    note.updatedAt = new Date().toISOString();

    this.notes.set(id, note);
    return note;
  }

  deleteNote(id) {
    return this.notes.delete(id);
  }
}

module.exports = new NotesService();

