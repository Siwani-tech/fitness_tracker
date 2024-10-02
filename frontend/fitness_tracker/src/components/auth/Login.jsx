import { useState } from "react";
import useAuth from "../../context/Authcontext";
import "./css/login.css";
import { Link } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();

  const [inputValue, setInputValue] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const data = await login(inputValue);
      console.log("Data received from login:", data);
  
      if (data && data.message) {
        setMessage(data.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("Login failed due to an error.");
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
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={inputValue.email}
            name="email"
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
          <button type="submit">Submit</button>
        </form>
        {message && <p>{message}</p>}
        {message===`Please signup` &&(
          <p>
            Don't have account? <Link to="/signup">signup here</Link>
          </p>
        )}
      </div>
    </div>
  );
}
