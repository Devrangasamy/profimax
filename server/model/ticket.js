const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Ticket Schema
const ticketSchema = new Schema({
  ticketID: {
    type: String,
    required: true,
    unique: true,
    default: () => `TICKET-${Date.now()}-${Math.floor(Math.random() * 10000)}`
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['Active', 'Pending', 'Closed'],
    default: 'Active'
  },
  customerName: {
    type: String,
    required: true
  },
  customerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Pre-save middleware to update the updatedAt field
ticketSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create and export Ticket model
module.exports = mongoose.model('Ticket', ticketSchema);
