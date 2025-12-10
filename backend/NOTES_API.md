# Notes API

A RESTful CRUD API for managing notes, built with Express.js.

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/notes` | Get all notes |
| GET | `/api/v1/notes/:id` | Get note by ID |
| POST | `/api/v1/notes` | Create a note |
| PUT | `/api/v1/notes/:id` | Update a note |
| DELETE | `/api/v1/notes/:id` | Delete a note |

## Features

- **UUID primary keys** - Notes use UUIDs instead of sequential IDs
- **Input validation** - Title/content sanitization, max lengths enforced
- **ID validation** - Invalid UUIDs return 400 Bad Request
- **API versioning** - `/api/v1/` prefix for future compatibility
- **Payload limit** - 10KB request body limit to prevent abuse
- **CORS enabled** - Cross-origin requests supported
- **Timestamps** - `createdAt` and `updatedAt` on each note

## Architecture

```
backend/
├── routes/notesRoute.js      # HTTP routing
├── controllers/notesController.js  # Request/response handling
├── services/notesService.js  # Business logic
└── services/notesService.test.js   # Unit tests
```

## Demo

Visit `http://localhost:4000/notes-demo.html` when the server is running.

## What's Omitted (Out of Scope)

- **Database** - Uses in-memory storage (data resets on restart)
- **Authentication** - No user auth or ownership
- **Pagination/filtering** - Returns all notes, no `?limit=` or `?search=`
- **Sorting** - Returns notes in insertion order

## TODO (Future Enhancements)

- [ ] Persist notes to database (MongoDB/PostgreSQL)
- [ ] Add user authentication and note ownership
- [ ] Pagination with `?page=` and `?limit=`
- [ ] Search/filter by title or content
- [ ] Soft delete instead of hard delete
- [ ] Rate limiting

## Running

```bash
cd backend
npm install
npm start
# Server runs on http://localhost:4000
```

## Testing

```bash
npm test
```
