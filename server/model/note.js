const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Note Schema
const noteSchema = new Schema({
  ticketID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticket',
    required: true
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  note: {
    type: String,
    required: true,
    trim: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  attachment: {
    type: String, // Path to the attachment file if applicable
    required: false
  }
});

// Create and export Note model
module.exports = mongoose.model('Note', noteSchema);
