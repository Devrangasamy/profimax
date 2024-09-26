const Note = require('../model/note');
const Ticket = require('../model/ticket');
const User = require('../model/user');

exports.addNote = async (req, res) => {
  try {
    const { ticketID, userID, note, attachment } = req.body;

    // Find ticket and user by ID
    const ticket = await Ticket.findById(ticketID);
    const user = await User.findById(userID);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create new note
    const newNote = new Note({
      ticketID,
      userID,
      note,
      attachment
    });

    await newNote.save();

    // Update ticket's last updated date
    ticket.updatedAt = Date.now();
    await ticket.save();

    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: 'Error adding note', error });
  }
};

// Get all notes for a ticket
exports.getNotesByTicketID = async (req, res) => {
  try {
    const notes = await Note.find({ ticketID: req.params.ticketID }).populate('userID', 'username email');
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notes', error });
  }
};

// Delete a note (Admin only)
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting note', error });
  }
};
