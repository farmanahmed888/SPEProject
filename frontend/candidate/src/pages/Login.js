import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputField from "../components/inputs/InputField"
import "../static/css/Login.css";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await console.log("api call to load-balancer:8000");
      const response = await axios.post(
        "http://load-balancer:8000/candidate/login",
        { email, password }
      );
      console.log(response.data);
      // If the login is successful, navigate to the dashboard
      if (response.status === 200) {
        const id = parseInt(response.data); // Adjust this according to your API response structure
        localStorage.setItem("candidateId", id);
        navigate("/candidate-dashboard");
        console.log("Received id: " + id);
        console.log("Local Storage id: " + localStorage.getItem("candidateId"));
      } else {
        setError("Invalid login credentials");
      }
    } catch (err) {
      setError("Invalid email or password or exception"); // Set error message for invalid credentials
    }
  };
  return (
    <div className="mainContainer">
			<div className="login">
				<div className="content">
					<div className="greetings">
						<h1 className="greetings-1">Hello candidate, Welcome to</h1>
						<h1 className="greetings-2">Hackerrank</h1>
					</div>
					<div className="subtext">
						<h3>Please Enter Below Details</h3>
					</div>
					<form onSubmit={handleSubmit}>
						<InputField
							type="text"
							placeholder="Enter Username"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						<InputField
							type="password"
							placeholder="Enter Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						<br />
						{error && (
							<div className="error-message">{error}</div>
						)}
						<div className="login-submit">
							<button type="submit" className="login-btn">
								Login
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
