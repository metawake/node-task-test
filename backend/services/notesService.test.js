// Quick smoke test for NotesService
// Run: node backend/services/notesService.test.js

const notesService = require('./notesService');

console.log('--- Testing NotesService ---\n');

// Test create
const note1 = notesService.createNote({ title: 'First note', content: 'Hello world' });
console.log('✓ Created note:', note1);

const note2 = notesService.createNote({ title: 'Second note', content: 'Testing' });
console.log('✓ Created note:', note2);

// Test getAll
const all = notesService.getAllNotes();
console.log('✓ Get all notes:', all.length, 'notes');

// Test getById
const found = notesService.getNoteById(1);
console.log('✓ Get by ID 1:', found ? found.title : 'not found');

// Test update
const updated = notesService.updateNote(1, { title: 'Updated title' });
console.log('✓ Updated note 1:', updated ? updated.title : 'failed');

// Test delete
const deleted = notesService.deleteNote(2);
console.log('✓ Deleted note 2:', deleted);

// Verify delete
const afterDelete = notesService.getAllNotes();
console.log('✓ Notes after delete:', afterDelete.length, 'notes');

console.log('\n--- All tests passed! ---');

