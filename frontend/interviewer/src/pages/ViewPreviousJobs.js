import React from 'react'
import Navbar from '../components/Navbar'
import PageHeading from '../components/PageHeading'
import Table from '../components/Table';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';
const ViewPreviousJobs = () => {
  const interviewer_id = localStorage.getItem("interviewer_id");
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const columns = ["Job name", "Requirements", "Enrollment"];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/interviewer/closed-jobs/${interviewer_id}`);
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data, please try again later.");
      }
    };

    fetchData();
  }, [interviewer_id]);

  const [jobsPerPage] = useState(6);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div><Navbar /> 
       <PageHeading title="View Past Jobs" />
        <Table columns={columns} data={jobs}/>
    </div>
  )
}

export default ViewPreviousJobs