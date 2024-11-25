import React from 'react'
import Navbar from '../components/Navbar'
import PageHeading from '../components/PageHeading'
import Table from '../components/Table';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';
import DatePicker from 'react-datepicker';

const ViewEnrollments = () => {
  const location = useLocation();
  const { id } = location.state || {};
  const [jobs, setJobs] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedenrollId, setSelectedenrollId] = useState(null);
  const [rerender, setRerender] = useState(false);
  const navigate = useNavigate();
  const columns = ["Candidate Name","Interview Date", "Result", "Action"];
    
  const scheduleInterviewHandler = (enrollId) => {
    setSelectedenrollId(enrollId);
    setShowDatePicker(true);
  };
  
  const ViewInterviewHandler = (jobId, roomId) => {
    alert( 'Room ID: '+roomId+' Date:' + jobId);

  };

  const seeResultHandler= (enrollId)=>{
    navigate(`/view-result`,{state:{enrollId:enrollId}});
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/interviewer/jobEnrollments/${id}`);
        console.log('Data:', response.data);
        setJobs(response.data);
      } catch (error) {
        console.error('Error getting data:', error);
      }
    };

    fetchData();
  }, [id, rerender]);

  const closeJob = async()=>{
    
  await axios.post(`${BASE_URL}/interviewer/close-job/${id}`);
  alert("Job opening closed");
  }

  const handleDateSubmit = async (selectedDate) => {
    try {
      const javaSqlDate = new Date(selectedDate).toISOString().split('T')[0];
      
      await axios.post(`${BASE_URL}/interviewer/scheduleInterview`, {
        enrollId: selectedenrollId,
        interviewDate: javaSqlDate,
      });

      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.jobId === selectedenrollId ? { ...job, interviewDate: javaSqlDate } : job
        )
      );
      setShowDatePicker(false);
      setRerender(prev => !prev);
    } catch (error) {
      console.error('Error scheduling interview:', error);
    }
  };
  return (
    <div><Navbar /> 
       <PageHeading title="View Enrollments" />
        <button class="primary-btn" onClick={closeJob}>Close Job</button>
        <div>{showDatePicker && <DatePicker onSelect={handleDateSubmit}/>}</div>
        <Table columns={columns} data={jobs}/>
    </div>
  )
}

export default ViewEnrollments