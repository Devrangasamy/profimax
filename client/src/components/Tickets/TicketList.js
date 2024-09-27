// src/Tickets/TicketList.js
import React, { useEffect, useState } from 'react';
import { getAllTickets, getCustomerTickets } from '../../api/api';
import { useAuth } from '../AuthContext'; // Import useAuth hook

const TicketList = ({ isAdminOrAgent }) => {
  const [tickets, setTickets] = useState([]);
  const { token } = useAuth(); // Get token from context

  useEffect(() => {
    const fetchTickets = async () => {
      if (token) { // Check if token exists
        try {
          const response = isAdminOrAgent 
            ? await getAllTickets(token) 
            : await getCustomerTickets(token);
          setTickets(response.data);
        } catch (error) {
          console.error('Error fetching tickets:', error);
        }
      }
    };
    fetchTickets();
  }, [token, isAdminOrAgent]);

  return (
    <div>
      <h2>Ticket List</h2>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket._id}>
            <strong>Ticket ID:</strong> {ticket._id} | 
            <strong>Title:</strong> {ticket.title} | 
            <strong>Status:</strong> {ticket.status} | 
            <strong>Customer Name:</strong> {ticket.customerName} | 
            <strong>Last Updated On:</strong> {new Date(ticket.updatedAt).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketList;
