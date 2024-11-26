import React from 'react'
import Navbar from '../components/Navbar'
import PageHeading from '../components/PageHeading'
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';
const DisplayResult = () => {
  const location = useLocation();
    const [results, setResults] = useState({ positiveFeedback: '', negativeFeedback: '' });

    useEffect(() => {
        const fetchData = async () => {
            const { enrollId } = location.state || {};
            console.log(enrollId);
            const response = await axios.get(`${BASE_URL}/interviewer/result/${enrollId}`);
            setResults(response.data);
        }
        fetchData();
    }, [location.state]);
  return (
    <div>
        <Navbar /> 
        {results && results.enrollId ? (
          <>
            <PageHeading title={`Results for Enrollment ID: ${results.enrollId}`} />
            <PageHeading title="Positive Feedback" />
            <p>{results.positiveFeedback}</p>
            <PageHeading title="Negative Feedback" />
            <p>{results.negativeFeedback}</p>
          </>
        ) : (
          <p>No data</p>
        )}
    </div>
  )
}

export default DisplayResult