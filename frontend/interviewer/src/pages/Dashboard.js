import React from "react";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import FeatureCard from "../components/FeatureCard";
import ShortListings from "../components/ShortListings";
import "./css/dashboard.css";
import { useState, useEffect } from "react";
import { GetJobOpenings, GetJobClosedOpenings } from "../api/Apis";
import { useNavigate } from "react-router-dom";
import "./css/common.css";
const Dashboard = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const columns = ["id", "company", "jobDescription", "roleType", "status"];
  const [closedJobs, setClosedJobs] = useState([]);
  const interviewer_id = localStorage.getItem("interviewer_id");

  const onCreateHandle = () => {
    navigate(`/create-job`);
  };
  const onShowEnrolled = () => {
    navigate(`/active-jobs-view`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetJobOpenings();
        const closedResult = await GetJobClosedOpenings();
        console.log("result: ", result);
        setJobs(result);
        setClosedJobs(closedResult);
      } catch (error) {
        console.error("Error fetching job openings:", error);
      }
    };

    fetchData();
  }, [interviewer_id]);

  useEffect(() => {
    console.log("closedJobs: ", closedJobs); // Log the updated state
  }, [closedJobs]);

  return (
    <div>
      <Navbar />

      <main class="main-container">
        <div class="row1">
          <div class="section2">
            <FeatureCard
              cardClass="col2"
              title="Active Jobs"
              count={jobs.length}
            />

            <FeatureCard
              cardClass="col3"
              title="Closed Jobs"
              count={closedJobs.length}
            />
          </div>
        </div>
        <div className="row1">
          <button class="primary-btn " onClick={onCreateHandle}>
            {" "}
            Create Job{" "}
          </button>
          <button class="primary-btn " onClick={onShowEnrolled}>
            {" "}
            View Enrollments{" "}
          </button>
        </div>

        <br />
        <br />
        <br />
        <br />
        <div class="row2">
          <div class="col1">
            <Table data={jobs} columns={columns} />
          </div>
          <div class="col1">
            <Table data={closedJobs} columns={columns} />
          </div>
        </div>
      </main>
      <br />
      <br />
    </div>
  );
};

export default Dashboard;
