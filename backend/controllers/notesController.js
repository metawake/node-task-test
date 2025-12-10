/**
 * Notes Controller - HTTP request handlers
 */

const notesService = require('../services/notesService');

const MAX_TITLE_LENGTH = 200;
const MAX_CONTENT_LENGTH = 10000;

// Sanitize and validate input
const sanitizeNote = (title, content) => {
  const cleanTitle = (title || '').toString().trim().slice(0, MAX_TITLE_LENGTH);
  const cleanContent = (content || '').toString().trim().slice(0, MAX_CONTENT_LENGTH);
  return { title: cleanTitle, content: cleanContent };
};

// Validate ID is a positive integer (fail fast on bad input)
const isValidId = (id) => /^\d+$/.test(id) && Number(id) > 0;

// POST /notes - Create a new note
exports.createNote = (req, res) => {
  const { title, content } = sanitizeNote(req.body.title, req.body.content);
  const note = notesService.createNote({ title, content });
  
  res.status(201).json({
    success: true,
    note,
  });
};

// GET /notes - Get all notes
exports.getAllNotes = (req, res) => {
  const notes = notesService.getAllNotes();
  
  res.status(200).json({
    success: true,
    count: notes.length,
    notes,
  });
};

// GET /notes/:id - Get single note
exports.getNoteById = (req, res) => {
  if (!isValidId(req.params.id)) {
    return res.status(400).json({ success: false, message: 'Invalid note ID' });
  }
  
  const note = notesService.getNoteById(req.params.id);
  
  if (!note) {
    return res.status(404).json({
      success: false,
      message: 'Note not found',
    });
  }
  
  res.status(200).json({
    success: true,
    note,
  });
};

// PUT /notes/:id - Update a note
exports.updateNote = (req, res) => {
  if (!isValidId(req.params.id)) {
    return res.status(400).json({ success: false, message: 'Invalid note ID' });
  }
  
  const { title, content } = sanitizeNote(req.body.title, req.body.content);
  const note = notesService.updateNote(req.params.id, { title, content });
  
  if (!note) {
    return res.status(404).json({
      success: false,
      message: 'Note not found',
    });
  }
  
  res.status(200).json({
    success: true,
    note,
  });
};

// DELETE /notes/:id - Delete a note
exports.deleteNote = (req, res) => {
  if (!isValidId(req.params.id)) {
    return res.status(400).json({ success: false, message: 'Invalid note ID' });
  }
  
  const deleted = notesService.deleteNote(req.params.id);
  
  if (!deleted) {
    return res.status(404).json({
      success: false,
      message: 'Note not found',
    });
  }
  
  res.status(200).json({
    success: true,
    message: 'Note deleted successfully',
  });
};

