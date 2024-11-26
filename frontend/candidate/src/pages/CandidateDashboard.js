import React from 'react'
import FeatureCard from "../components/cards/FeatureCard";
import Navbar from "../components/header/Navbar";
import PageHeading from "../components/header/PageHeading";
const CandidateDashboard = () => {
  return (
		<div>
			<Navbar />
			<PageHeading title="Candidate Dashboard" />

			<div className="cards">
				<div className="row">
					<FeatureCard
						cardColor="blue"
						title="View Availabe Jobs"
						link="/view-jobs"
					/>
					<FeatureCard
						cardColor="green"
						title="View Applied Jobs"
						link="/applied-jobs"
					/>
				</div>
			</div>
		</div>
	);
}

export default CandidateDashboard