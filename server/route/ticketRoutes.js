const express = require('express');
const { createTicket, getTickets, getTicketById, updateTicketStatus, deleteTicket } = require('../controller/ticketController');
const { protect, isAdminOrAgent, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Protected Routes for Customers
router.route('/')
    .post(protect, createTicket) // Create a new ticket
    .get(protect, getTickets); // Get all tickets for logged-in user

router.route('/:id')
    .get(protect, getTicketById) // Get specific ticket by ID
    .put(protect, isAdminOrAgent, updateTicketStatus) // Update ticket status (Admin or Agent only)
    .delete(protect, isAdmin, deleteTicket); // Delete a ticket (Admin only)

module.exports = router;
