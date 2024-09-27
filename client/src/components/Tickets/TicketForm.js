// src/Tickets/TicketForm.js
import React, { useState } from 'react';
import { createTicket } from '../../api/api';
import { useAuth } from '../AuthContext';

const TicketForm = () => {
  const [title, setTitle] = useState('');
  const { token } = useAuth(); // Get the token from context correctly

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Current token:', token); // Log current token value

    if (token) {
      await createTicket({ title }, token);
      alert('Ticket created successfully');
      setTitle('');
    } else {
      alert('You must be logged in to create a ticket.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Ticket Title"
        required
      />
      <button type="submit">Create Ticket</button>
    </form>
  );
};

export default TicketForm;
