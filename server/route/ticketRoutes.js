const express = require('express');
const { 
  createTicket, 
  getAllTickets, 
  getTicketByCustomerId, 
  updateTicketStatus, 
  deleteTicket 
} = require('../controller/ticketController');
const { protect,isAdmin, isAdminOrAgent } = require('../middleware/authMiddleware');

const router = express.Router();

// Protected Routes for Customers
router.route('/')
    .post(protect, createTicket) // Create a new ticket
    .get(protect, getAllTickets); // Get all tickets for logged-in user

router.route('/customer')
    .get(protect, getTicketByCustomerId); // Get all tickets for the logged-in customer

router.route('/:id')
    .put(protect, isAdminOrAgent, updateTicketStatus) // Update ticket status (Admin or Agent only)
    .delete(protect, isAdmin, deleteTicket); // Delete a ticket (Admin only)

module.exports = router;
