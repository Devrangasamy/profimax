const express = require('express');
const { addNote, getNotesByTicketID } = require('../controller/noteController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Protected Routes for Customers, Agents, and Admins
router.route('/:ticketId')
    .post(protect, addNote) // Add a note to a ticket
    .get(protect, getNotesByTicketID); // Get all notes for a specific ticket

module.exports = router;
