import React, { useState } from 'react';
import useAuth from '../../context/Authcontext';
import "./css/signup.css";

const Signup = () => {
  const { signup } = useAuth();
  const [inputValue, setInputValue] = useState({
    name: '',
    password: '',
    email: '',
  });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await signup(inputValue); 

      if (data && data.message) {
        if (data.message === 'User already exists. Please log in.') {
          setMessage(data.message);
        } else {
          setMessage('Signup successful');
        }
      }
    } catch (error) {
      console.error('Error signing up:', error.message);
      setMessage('Signup request failed');
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <div className="loginform">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={inputValue.name}
            name="name"
            onChange={handleChange}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={inputValue.password}
            name="password"
            onChange={handleChange}
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={inputValue.email}
            name="email"
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Signup;
