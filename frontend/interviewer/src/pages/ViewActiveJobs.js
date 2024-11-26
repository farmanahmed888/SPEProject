import React from 'react'
import Navbar from '../components/Navbar'
import PageHeading from '../components/PageHeading'
import Table from '../components/Table';
import { useState, useEffect } from 'react';
import { GetJobOpenings } from '../api/Apis';
import { useNavigate } from 'react-router-dom';

const ViewActiveJobs = () => {
  const [jobs, setjobs] = useState([]);
  const navigate = useNavigate();
  // Logging the passed jobs array
  console.log("Passed jobs array:", jobs);
  const handleViewMoreClick =(id) => {
     console.log(id);
     navigate(`/active-jobs-view/`, {state:{id}});
  };
  const columns = ["id", "company", "jobDescription", "roleType", "status"];
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetJobOpenings();
        console.log("R: after call "+ result)
        setjobs(result);
      } catch (error) {
        console.error("Error fetching job openings:", error);
        // Optionally, you can handle the error state here, e.g., setJobs([]) or display an error message.
      }
    };

    fetchData();
  }, []); // Empty dependency array to ensure useEffect only runs once when the component mounts
  

  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(6);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div>
        <Navbar /> 
       <PageHeading title="View Active Jobs" />
        <Table columns={columns} data={jobs}/>
    </div>
  )
}

export default ViewActiveJobs