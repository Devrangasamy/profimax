import React from 'react';

const Dashboard = () => {
  // Assuming we have ticket and user counts from props or context
  const ticketCount = 100; // Replace with dynamic count
  const userCount = 50; // Replace with dynamic count

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Total Tickets: {ticketCount}</p>
      <p>Total Users: {userCount}</p>
    </div>
  );
};

export default Dashboard;
