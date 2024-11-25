import React from 'react'
import Navbar from '../components/Navbar';
import Table from '../components/Table';
import StatisticCard from '../components/StatisticCard';
import FeatureCard from '../components/FeatureCard';
import ShortListings from '../components/ShortListings';
import "./css/dashboard.css";
import { useState, useEffect } from "react";
const Dashboard = () => {
  
    const [tableData, setTableData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				// const response = await axios.get(
				// 	"http://localhost:9001/data"
				// );
				const response = {
					data: [
						{
							name: "John Doe",
							questionnaire: 10,
							chat: "https://example.com/chat1",
							view: "https://example.com/view1",
						},
						{
							name: "Alice Smith",
							questionnaire: 20,
							chat: "https://example.com/chat2",
							view: "https://example.com/view2",
						},
						{
							name: "Bob Johnson",
							questionnaire: 30,
							chat: "https://example.com/chat3",
							view: "https://example.com/view3",
						},
					],
				};

				setTableData(response.data); // Accessing data property of the response
				setLoading(false);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	const handleChatClick = (chatUrl) => {
		window.open(chatUrl, "_blank");
	};

	const handleViewClick = (viewUrl) => {
		window.open(viewUrl, "_blank");
	};

	const columns = ["Name", "Questionnaire", "View Diagnose"];

	// const renderChatButton = (chatUrl) => (
	//   <button onClick={() => handleChatClick(chatUrl)} className="primary-btn">
	//     Chat
	//   </button>
	// );

	const renderViewButton = (viewUrl) => (
		<button
			onClick={() => handleViewClick(viewUrl)}
			className="view-button"
		>
			{/* <img src={viewIcon} alt="View" /> */}
		</button>
	);

	return (
		<div>
			<Navbar />

			<main class="main-container">
				<div class="row1">
					
					<div class="section2">
						<FeatureCard
							cardClass="col2"
							image="doctor-chat.png"
							title="Active Jobs"
							btnText="Chat"
							link="/doctor-chat"
						/>

						<FeatureCard
							cardClass="col3"
							image="search.png"
							title="Closed Jobs"
							btnText="Search Records"
							link="/search-records"
						/>
                        <FeatureCard
							cardClass="col2"
							image="doctor-chat.png"
							title="Enroll"
							btnText="Chat"
							link="/doctor-chat"
						/>

						<FeatureCard
							cardClass="col3"
							image="search.png"
							title="Interviews"
							btnText="Search Records"
							link="/search-records"
						/>
					</div>
				</div>
				<br />

				<div class="row2">
					<div class="col1">
						<ShortListings
							listingClass="section1"
							title="Upcomming"
							noOfCards="3"
							link="/appointments"
						/>

						<ShortListings
							listingClass="section2"
							title="Completed"
							noOfCards="3"
							link="/recent-diagnose"
						/>
					</div>
				</div>
			</main>
			<br />
			<br />
		</div>
  )
}

export default Dashboard