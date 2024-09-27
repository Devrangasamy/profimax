// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext'; // Import the AuthProvider
import Login from './Auth/Login';
import Register from './Auth/Register';
import TicketList from './Tickets/TicketList';
import TicketDetail from './Tickets/TicketDetail';
import TicketForm from './Tickets/TicketForm';
import Dashboard from './Dashboard';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tickets" element={<TicketList />} />
          <Route path="/ticket/:id" element={<TicketDetail />} />
          <Route path="/create-ticket" element={<TicketForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
