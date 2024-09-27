// src/Auth/Login.js
import React, { useState, useEffect } from 'react'; // Ensure useState and useEffect are imported
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { loginUser } from '../../api/api'; // Your loginUser API call
import { useAuth } from '../AuthContext'; // Importing useAuth from AuthContext

const Login = () => {
  const auth = useAuth(); // Use the context to get login function and token
  const [email, setEmail] = useState(''); // Define state for email
  const [password, setPassword] = useState(''); // Define state for password
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    if (auth.token) {
      // If token exists, navigate to dashboard (already logged in)
      navigate('/dashboard');
    }
  }, [auth.token, navigate]); // Dependency array includes token and navigate

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser({ email, password });
      if (response.data && response.data.token) {
        auth.login(response.data.token); // Set the token using the context
        console.log('Token set:', response.data.token); // Log the new token value
        navigate('/create-ticket'); // Redirect to the dashboard after login
      } else {
        console.error('Failed to get token from response');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email" 
        required 
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password" 
        required 
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
