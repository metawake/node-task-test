/**
 * Notes Controller - HTTP request handlers
 */

const notesService = require('../services/notesService');

// POST /notes - Create a new note
exports.createNote = (req, res) => {
  const { title, content } = req.body;
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
  const { title, content } = req.body;
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

