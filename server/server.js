const express = require('express');
const dotenv = require('dotenv');
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

// Routes
app.use('/api/users', userRoutes); // User routes
app.use('/api/tickets', protect, ticketRoutes); // Ticket routes
app.use('/api/notes', protect, noteRoutes); // Note routes

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
