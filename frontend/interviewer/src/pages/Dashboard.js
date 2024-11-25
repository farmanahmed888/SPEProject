import React from 'react'

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
			<img src={viewIcon} alt="View" />
		</button>
	);

	return (
		<div>
			<Navbar />

			<main class="main-container">
				<div class="row1">
					<StatisticCard image="login-bg.png" />

					<div class="section2">
						<FeatureCard
							cardClass="col2"
							image="doctor-chat.png"
							title="Chat with a Doctor"
							btnText="Chat"
							link="/doctor-chat"
						/>

						<FeatureCard
							cardClass="col3"
							image="search.png"
							title="Region & Disease"
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
							title="Appointments"
							noOfCards="3"
							link="/appointments"
						/>

						<ShortListings
							listingClass="section2"
							title="Recently Treated"
							noOfCards="3"
							link="/recent-diagnose"
						/>
					</div>
					<div class="col2" style={{ paddingLeft: "50px" }}>
						<h2>Patient Diagnosed Request</h2>
						<br />
						{loading ? (
							<p>Loading...</p>
						) : (
							<Table
								columns={columns}
								data={tableData.map((row) => ({
									Name: row.name,
									Questionnaire:
										row.questionnaire + "/30",
									"View Diagnose": renderViewButton(
										row.View
									),
								}))}
							/>
						)}
						<br/>
						<button className="medium-primary-btn">View More</button>
					</div>
				</div>
			</main>
			<br />
			<br />
		</div>
  )
}

export default Dashboard