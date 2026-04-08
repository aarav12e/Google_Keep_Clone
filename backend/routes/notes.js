const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// ──────────────────────────────────────────────
// GET /api/notes?status=active|archived|deleted
// ──────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const notes = await Note.find(filter).sort({ updatedAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error('GET /api/notes error:', err.message);
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

// ──────────────────────────────────────────────
// POST /api/notes — Create a new note
// ──────────────────────────────────────────────
router.post('/', async (req, res) => {
  try {
    const { heading, text } = req.body;
    const note = await Note.create({ heading, text, status: 'active' });
    res.status(201).json(note);
  } catch (err) {
    console.error('POST /api/notes error:', err.message);
    res.status(500).json({ error: 'Failed to create note' });
  }
});

// ──────────────────────────────────────────────
// PUT /api/notes/:id — Update note (heading, text, or status)
// ──────────────────────────────────────────────
router.put('/:id', async (req, res) => {
  try {
    const updates = req.body; // { heading?, text?, status? }
    const note = await Note.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json(note);
  } catch (err) {
    console.error('PUT /api/notes/:id error:', err.message);
    res.status(500).json({ error: 'Failed to update note' });
  }
});

// ──────────────────────────────────────────────
// DELETE /api/notes/:id — Permanently delete
// ──────────────────────────────────────────────
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json({ message: 'Note deleted permanently' });
  } catch (err) {
    console.error('DELETE /api/notes/:id error:', err.message);
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

module.exports = router;
