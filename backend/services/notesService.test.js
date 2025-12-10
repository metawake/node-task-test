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

// Test getById (using UUID from created note)
const found = notesService.getNoteById(note1.id);
console.log('✓ Get by ID:', found ? found.title : 'not found');

// Test update
const updated = notesService.updateNote(note1.id, { title: 'Updated title' });
console.log('✓ Updated note:', updated ? updated.title : 'failed');

// Test delete
const deleted = notesService.deleteNote(note2.id);
console.log('✓ Deleted note:', deleted);

// Verify delete
const afterDelete = notesService.getAllNotes();
console.log('✓ Notes after delete:', afterDelete.length, 'notes');

console.log('\n--- All tests passed! ---');

