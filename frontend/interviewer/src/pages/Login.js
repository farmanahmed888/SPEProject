import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import InputField from '../components/Inputfield'
import './css/login.css'
import './css/common.css'
const Login = () => {
  return (
    <div>
			<Navbar />

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
					</div>

					<InputField
						type="email"
						placeholder="Interviewer Email"
					/>

					<InputField
						type="password"
						placeholder="Interviewer Password"
					/>

					<div className="login-submit">
						<button className="login-btn">Login</button>
					</div>
				</div>
			</div>
			<br />
			<br />
			<br />
		</div>
  )
}

export default Login