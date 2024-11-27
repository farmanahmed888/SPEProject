import React from 'react'
import './css/navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav id="nav">
			<div className="nav-logo">
				{/* <Link to="/doctor-dashboard"> */}
					<div className="nav-heading">
						<span>
							{/* <img
								id="logo"
								src={require(`../../static/logo.png`)}
								alt=""
							/> */}
							Hackerrank
						</span>
					</div>
				{/* </Link> */}

				<div className="hamburger">
					<a href="#">
						<i className="fas fa-bars "></i>
					</a>
				</div>
			</div>

			<ul className="nav-links">
				<li className='nav-item'>
					<Link className="nav-item" to="/dashboard">
						Home
					</Link>
				</li>
				<li className='nav-item'>
					<Link className="nav-item" to="/">
						Logout
					</Link>
				</li>
			</ul>
		</nav>
  )
}

export default Navbar