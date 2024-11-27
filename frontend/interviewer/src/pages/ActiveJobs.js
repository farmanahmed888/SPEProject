import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { BASE_URL } from "../config";
const ActiveJobs = () => {
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
        console.log("modal data", response.data);
        setJobs(response.data);
      } catch (error) {
        console.error("Error getting data:", error);
      }
    };

    fetchData();
  }, [id, rerender]);

  const closeJob = async () => {
    await axios.post(`${BASE_URL}/interviewer/close-job/${id}`);
    alert("Job opening closed");
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
      <h2>Active Jobs</h2>
    </div>
  );
};

export default ActiveJobs;
