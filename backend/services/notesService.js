/**
 * Notes Service - In-memory storage
 * 
 * TODO: Add mutex/locking if we ever run multiple instances
 */

class NotesService {
  constructor() {
    this.notes = new Map();
    this.nextId = 1;
  }

  createNote({ title, content }) {
    const id = this.nextId++;
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
    return this.notes.get(Number(id)) || null;
  }

  updateNote(id, { title, content }) {
    const note = this.notes.get(Number(id));
    if (!note) return null;

    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;
    note.updatedAt = new Date().toISOString();

    this.notes.set(Number(id), note);
    return note;
  }

  deleteNote(id) {
    return this.notes.delete(Number(id));
  }
}

module.exports = new NotesService();

