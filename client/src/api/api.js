import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Replace with your API URL

const api = axios.create({
  baseURL: API_URL,
});

// Register user
export const registerUser = (userData) => api.post('/users/register', userData);

// Login user
export const loginUser = (credentials) => api.post('/users/login', credentials);

// Create ticket
export const createTicket = (ticketData, token) => 
  api.post('/tickets', ticketData, { headers: { Authorization: `Bearer ${token}` } });

// Get all tickets
export const getAllTickets = (token) => 
  api.get('/tickets', { headers: { Authorization: `Bearer ${token}` } });

// Get tickets by customer ID
export const getCustomerTickets = (token) => 
  api.get('/tickets/customer', { headers: { Authorization: `Bearer ${token}` } });

// Get ticket details
export const getTicketDetails = (ticketId, token) => 
  api.get(`/tickets/${ticketId}`, { headers: { Authorization: `Bearer ${token}` } });

// Update ticket status
export const updateTicketStatus = (ticketId, status, token) => 
  api.put(`/tickets/${ticketId}`, { status }, { headers: { Authorization: `Bearer ${token}` } });

// Add note to ticket
export const addNoteToTicket = (ticketId, noteData, token) => 
  api.post(`/tickets/${ticketId}/notes`, noteData, { headers: { Authorization: `Bearer ${token}` } });

export default api;
