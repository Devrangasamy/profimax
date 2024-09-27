// src/Tickets/TicketDetail.js
import React, { useEffect, useState } from 'react';
import { getTicketDetails, addNoteToTicket } from '../../api/api';
import { useAuth } from '../AuthContext'; // Import useAuth hook

const TicketDetail = ({ ticketId }) => {
  const [ticket, setTicket] = useState({});
  const [note, setNote] = useState('');
  const { token } = useAuth(); // Get token from context

  useEffect(() => {
    const fetchTicketDetails = async () => {
      if (token) { // Check if token exists
        try {
          const response = await getTicketDetails(ticketId, token);
          setTicket(response.data);
        } catch (error) {
          console.error('Error fetching ticket details:', error);
        }
      }
    };
    fetchTicketDetails();
  }, [ticketId, token]);

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (token) { // Check if token exists
      try {
        await addNoteToTicket(ticketId, { note }, token);
        alert('Note added successfully');
        setNote(''); // Clear the note input
      } catch (error) {
        console.error('Error adding note:', error);
      }
    } else {
      alert('You must be logged in to add a note.');
    }
  };

  return (
    <div>
      <h2>Ticket Detail</h2>
      <p><strong>Title:</strong> {ticket.title}</p>
      <p><strong>Status:</strong> {ticket.status}</p>
      <p><strong>Customer Name:</strong> {ticket.customerName}</p>
      <p><strong>Last Updated On:</strong> {new Date(ticket.updatedAt).toLocaleString()}</p>
      
      <h3>Add Note</h3>
      <form onSubmit={handleAddNote}>
        <textarea 
          value={note} 
          onChange={(e) => setNote(e.target.value)} 
          placeholder="Add your note here" 
          required>
        </textarea>
        <button type="submit">Add Note</button>
      </form>
      
      <h3>Notes:</h3>
      <ul>
        {ticket.notes && ticket.notes.map((n, index) => (
          <li key={index}>
            <strong>{n.user}</strong>: {n.text} <em>{new Date(n.timestamp).toLocaleString()}</em>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketDetail;
