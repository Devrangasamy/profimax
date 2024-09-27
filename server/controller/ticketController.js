const Ticket = require('../model/ticket');
const User = require('../model/user');

// Create a new ticket (Customer only)
exports.createTicket = async (req, res) => {
  try {
    const { title } = req.body;

    const customerID = req.user._id; // Use the logged-in user's ID

    // Create new ticket
    const newTicket = new Ticket({
      title,
      customerID,
      customerName: req.user.username
    });

    await newTicket.save();
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(500).json({ message: 'Error creating ticket', error });
  }
};

// Get all tickets (Agent and Admin)
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate('customerID', 'username email');
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tickets', error });
  }
};

// Get tickets by customer ID (Customer only)
exports.getTicketByCustomerId = async (req, res) => {
  try {
    const tickets = await Ticket.find({ customerID: req.user._id }); // Use the logged-in user's ID
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tickets', error });
  }
};

// Update ticket status or add note (Agent and Admin)
exports.updateTicketStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedTicket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.status(200).json(updatedTicket);
  } catch (error) {
    res.status(500).json({ message: 'Error updating ticket', error });
  }
};

// Delete a ticket (Admin only)
exports.deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.status(200).json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting ticket', error });
  }
};
