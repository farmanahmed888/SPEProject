import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config";
import { Link } from "react-router-dom";
import InputField from "../components/Inputfield";
import "./css/login.css";
import "./css/common.css";
const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();
  
	const handleSubmit = async (e) => {
	  e.preventDefault();
	  setError(''); // Clear previous errors
  
	  try {
		const response = await axios.post(`${BASE_URL}/interviewer/login`, {
		  email,
		  password,
		});
		
		// If the login is successful, navigate to the dashboard
		if (response.status === 200) {
		  const interviewer_id = parseInt(response.data);
		  localStorage.setItem("interviewer_id", interviewer_id)
		  navigate('/dashboard');
		} else {
		  setError('Invalid login credentials');
		}
	  } catch (error) {
		console.error('Error logging in:', error);
		setError('Failed to login. Please try again.');
	  }
	};
  return (
    <div>
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
      <div className="login">
        <div className="content">
          <div className="greetings">
            <h1 className="greetings-1">Hello Interviewer, Welcome to</h1>
            <h1 className="greetings-2">Hackerrank</h1>
          </div>
          <h2 className="login-heading">Login</h2>
          <div className="subtext">
            <h3>Please Enter Below Details</h3>
			{error && <p className="error">{error}</p>}
          </div>
          <form onSubmit={handleSubmit}>
            <InputField
              type="email"
              placeholder="Interviewer Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <InputField
              type="password"
              placeholder="Interviewer Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="login-submit">
              <button type="submit" className="login-btn">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default Login;
