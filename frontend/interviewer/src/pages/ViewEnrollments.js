import React from "react";
import Navbar from "../components/Navbar";
import PageHeading from "../components/PageHeading";
import Table from "../components/Table";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import DatePicker from "react-datepicker";

const ViewEnrollments = () => {
  const location = useLocation();
  const { id } = location.state || {};
  const [jobs, setJobs] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedenrollId, setSelectedenrollId] = useState(null);
  const [rerender, setRerender] = useState(false);
  const navigate = useNavigate();
  

  const scheduleInterviewHandler = (enrollId) => {
    setSelectedenrollId(enrollId);
    setShowDatePicker(true);
  };

  const ViewInterviewHandler = (jobId, roomId) => {
    alert("Room ID: " + roomId + " Date:" + jobId);
  };

  const seeResultHandler = (enrollId) => {
    navigate(`/view-result`, { state: { enrollId: enrollId } });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/interviewer/jobEnrollments/${id}`
        );
        console.log("Data:", response.data);
        setJobs(response.data);
      } catch (error) {
        console.error("Error getting data:", error);
      }
    };

    fetchData();
  }, [id, rerender]);

  const closeJob = async () => {
    await axios.post(`${BASE_URL}/interviewer/close-job/${id}`);
    navigate("/dashboard");
  };

  const handleDateSubmit = async (selectedDate) => {
    try {
      const javaSqlDate = new Date(selectedDate).toISOString().split("T")[0];

      await axios.post(`${BASE_URL}/interviewer/scheduleInterview`, {
        enrollId: selectedenrollId,
        interviewDate: javaSqlDate,
      });

      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.jobId === selectedenrollId
            ? { ...job, interviewDate: javaSqlDate }
            : job
        )
      );
      setShowDatePicker(false);
      setRerender((prev) => !prev);
    } catch (error) {
      console.error("Error scheduling interview:", error);
    }
  };
  return (
    <div>
      <Navbar />
      <PageHeading title="Enrolled Candidates"/>
      <table>
        <thead>
          <tr>
            <th>Candidate Name</th>    
            <th>Interview Date</th>
            <th> Action</th>
            <th> Result</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job,index) => (
            <tr key={index}>
              <td>{job.candidateName}</td>
              <td>{job.interviewDate ? job.interviewDate : "Interview Date Not Available"}</td>
              <td>
                  {job.interviewDate ? (
                    <button onClick={() => ViewInterviewHandler(job.interviewDate,job.roomId)} className="small-primary-btn">
                      View Schedule
                    </button>
                  ) : (
                    <button className="small-primary-btn" onClick={() => scheduleInterviewHandler(job.enrollId)}>
                      Schedule Interview
                    </button>
                  )}
                </td>
                <td>
                    {job.resultStatus ===true ? (
                      <button onClick = {() => seeResultHandler(job.enrollId)} className="small-primary-btn">
                        View Result
                      </button>
                    ) : (
                      <button className="small-primary-btn">
                        not available
                      </button>
                    )}
                </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showDatePicker && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <DatePicker
            selected={new Date()}
            onChange={(date) => handleDateSubmit(date)}
          />
          </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button onClick={closeJob} className="small-primary-btn">Close Job</button>
      </div>
    </div>
  );
};

export default ViewEnrollments;
