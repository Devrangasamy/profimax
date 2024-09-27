const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Import the cors middleware
const { connectDB } = require('./config/db');
const userRoutes = require('./route/userRoutes');
const ticketRoutes = require('./route/ticketRoutes');
const noteRoutes = require('./route/noteRoutes');
const { protect } = require('./middleware/authMiddleware');

dotenv.config();

connectDB();

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// CORS Middleware to allow cross-origin requests
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Enable cookies or other credentials if needed
}));

// Routes
app.use('/api/users', userRoutes); // User routes
app.use('/api/tickets', protect, ticketRoutes); // Ticket routes
app.use('/api/notes', protect, noteRoutes); // Note routes

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
